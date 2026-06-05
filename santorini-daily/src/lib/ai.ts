import { createHash } from "node:crypto";
import { EncryptJWT, jwtDecrypt } from "jose";
import { z } from "zod";

export const aiTutorConcepts = [
  {
    id: "history",
    titleEn: "Myths & History of Santorini",
    titleEl: "Μύθοι και Ιστορία της Σαντορίνης",
    descriptionEn: "Santorini from mythology to Akrotiri, the Theran eruption, and ancient Thera.",
    descriptionEl: "Η Σαντορίνη από τη μυθολογία έως το Ακρωτήρι, τη Θηραϊκή έκρηξη και την αρχαία Θήρα.",
  },
  {
    id: "volcano",
    titleEn: "Volcano, Caldera & Environment",
    titleEl: "Ηφαίστειο, Καλντέρα και Περιβάλλον",
    descriptionEn: "Volcanic activity, caldera formation, monitoring, and environmental adaptation.",
    descriptionEl: "Ηφαιστειακή δραστηριότητα, σχηματισμός καλντέρας, παρακολούθηση και περιβαλλοντική προσαρμογή.",
  },
  {
    id: "culture",
    titleEn: "Villages, Architecture & Culture",
    titleEl: "Χωριά, Αρχιτεκτονική και Πολιτισμός",
    descriptionEn: "Cycladic architecture, village life, vineyards, festivals, and heritage preservation.",
    descriptionEl: "Κυκλαδίτικη αρχιτεκτονική, ζωή στα χωριά, αμπελώνες, γιορτές και διατήρηση κληρονομιάς.",
  },
] as const;

export type AiTutorConceptId = (typeof aiTutorConcepts)[number]["id"];

const tutorQuestionSchema = z.object({
  question: z.string().min(8),
  options: z.array(z.string().min(1)).length(4),
  correctOptionIndex: z.number().int().min(0).max(3),
});

const tutorQuizSchema = z.object({
  questions: z.array(tutorQuestionSchema).length(5),
});

export type AiTutorQuestion = {
  id: string;
  questionEn: string;
  options: Array<{ id: string; textEn: string }>;
};

type TutorTokenPayload = {
  userId: string;
  conceptId: AiTutorConceptId;
  answers: Record<string, string>;
};

export function isAiEnabledForUser(settings: { aiEnabled: boolean; geminiApiKeyEncrypted: string | null } | null): boolean {
  if (!settings) return false;
  return settings.aiEnabled && Boolean(settings.geminiApiKeyEncrypted);
}

export function createPracticePrompt(topic: string): string {
  return `Generate 3 beginner-level questions about ${topic} in JSON format with 4 options and one correct answer.`;
}

export function getAiTutorConcept(conceptId: string) {
  return aiTutorConcepts.find((concept) => concept.id === conceptId) ?? null;
}

function tokenSecret(apiKey: string): Uint8Array {
  return createHash("sha256").update(`santorini-ai-tutor:${apiKey}`).digest();
}

function buildTutorPrompt(concept: (typeof aiTutorConcepts)[number], lang: "en" | "el"): string {
  const title = lang === "el" ? concept.titleEl : concept.titleEn;
  const description = lang === "el" ? concept.descriptionEl : concept.descriptionEn;
  const language = lang === "el" ? "Greek" : "English";
  return [
    `Create a 5-question beginner quiz in ${language}.`,
    `Concept: ${title}.`,
    `Source scope: ${description}`,
    "Use only this concept scope. Do not ask about unrelated islands or general travel trivia.",
    "Each question must have exactly four answer options and exactly one correct option.",
    "Return JSON only with this shape: {\"questions\":[{\"question\":\"...\",\"options\":[\"...\",\"...\",\"...\",\"...\"],\"correctOptionIndex\":0}]}",
  ].join("\n");
}

export async function generateAiTutorQuiz({
  apiKey,
  conceptId,
  lang,
  userId,
}: {
  apiKey: string;
  conceptId: AiTutorConceptId;
  lang: "en" | "el";
  userId: string;
}): Promise<{ quizToken: string; questions: AiTutorQuestion[] }> {
  const concept = getAiTutorConcept(conceptId);
  if (!concept) throw new Error("UNKNOWN_CONCEPT");

  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: buildTutorPrompt(concept, lang) }] }],
      generationConfig: {
        temperature: 0.5,
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            questions: {
              type: "ARRAY",
              minItems: 5,
              maxItems: 5,
              items: {
                type: "OBJECT",
                properties: {
                  question: { type: "STRING" },
                  options: { type: "ARRAY", minItems: 4, maxItems: 4, items: { type: "STRING" } },
                  correctOptionIndex: { type: "INTEGER" },
                },
                required: ["question", "options", "correctOptionIndex"],
              },
            },
          },
          required: ["questions"],
        },
      },
    }),
  });

  if (!response.ok) throw new Error("GEMINI_REQUEST_FAILED");
  const gemini = (await response.json()) as { candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }> };
  const rawText = gemini.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawText) throw new Error("GEMINI_EMPTY_RESPONSE");

  const parsed = tutorQuizSchema.parse(JSON.parse(rawText));
  const answers: Record<string, string> = {};
  const questions = parsed.questions.map((question, questionIndex) => {
    const questionId = `ai-q-${questionIndex + 1}`;
    const options = question.options.map((option, optionIndex) => ({
      id: `${questionId}-o-${optionIndex + 1}`,
      textEn: option,
    }));
    answers[questionId] = options[question.correctOptionIndex].id;
    return { id: questionId, questionEn: question.question, options };
  });

  const quizToken = await new EncryptJWT({ userId, conceptId, answers } satisfies TutorTokenPayload)
    .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
    .setIssuedAt()
    .setExpirationTime("30m")
    .encrypt(tokenSecret(apiKey));

  return { quizToken, questions };
}

export async function scoreAiTutorQuiz({
  apiKey,
  quizToken,
  userId,
  answers,
}: {
  apiKey: string;
  quizToken: string;
  userId: string;
  answers: Array<{ questionId: string; selectedOptionId: string | null }>;
}): Promise<{ score: number; correctAnswers: number; totalQuestions: number }> {
  const { payload } = await jwtDecrypt(quizToken, tokenSecret(apiKey));
  if (payload.userId !== userId) throw new Error("TOKEN_USER_MISMATCH");
  const correctAnswersByQuestion = payload.answers as Record<string, string> | undefined;
  if (!correctAnswersByQuestion || typeof correctAnswersByQuestion !== "object") throw new Error("TOKEN_INVALID");

  let correctAnswers = 0;
  for (const answer of answers) {
    if (correctAnswersByQuestion[answer.questionId] === answer.selectedOptionId) correctAnswers += 1;
  }

  const totalQuestions = answers.length || Object.keys(correctAnswersByQuestion).length || 1;
  return { score: (correctAnswers / totalQuestions) * 100, correctAnswers, totalQuestions };
}
