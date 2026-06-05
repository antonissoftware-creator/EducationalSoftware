"use client";

import { FormEvent, useState } from "react";
import { BookOpenText, Landmark, Mountain, Sparkles } from "lucide-react";
import { QuizStepper } from "@/components/quiz/quiz-stepper";
import type { AiTutorConceptId, AiTutorQuestion } from "@/lib/ai";

type ConceptOption = {
  id: AiTutorConceptId;
  title: string;
  description: string;
};

type AiTutorQuizBuilderProps = {
  concepts: ConceptOption[];
  lang: "en" | "el";
  labels: {
    title: string;
    subtitle: string;
    chooseConcept: string;
    generate: string;
    generating: string;
    generateError: string;
    quizComplete: string;
    youAnswered: string;
    outOf: string;
    correctly: string;
    viewProgress: string;
    question: string;
    of: string;
    previous: string;
    submitting: string;
    submitQuiz: string;
    nextQuestion: string;
    quizStartError: string;
    quizSubmitError: string;
    backToTutor: string;
  };
};

const conceptIcons = {
  history: Landmark,
  volcano: Mountain,
  culture: BookOpenText,
} satisfies Record<AiTutorConceptId, typeof Landmark>;

export function AiTutorQuizBuilder({ concepts, lang, labels }: AiTutorQuizBuilderProps) {
  const [conceptId, setConceptId] = useState<AiTutorConceptId>(concepts[0]?.id ?? "history");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [quiz, setQuiz] = useState<{ quizToken: string; questions: AiTutorQuestion[]; title: string } | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setQuiz(null);

    try {
      const response = await fetch("/api/ai/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conceptId, lang }),
      });

      if (!response.ok) {
        setError(labels.generateError);
        return;
      }

      const data = (await response.json()) as { quizToken: string; questions: AiTutorQuestion[] };
      const selectedConcept = concepts.find((concept) => concept.id === conceptId);
      setQuiz({ ...data, title: selectedConcept?.title ?? labels.title });
    } catch {
      setError(labels.generateError);
    } finally {
      setLoading(false);
    }
  }

  if (quiz) {
    return (
      <QuizStepper
        quizToken={quiz.quizToken}
        title={quiz.title}
        questions={quiz.questions}
        resultLabel={labels.backToTutor}
        onResultClick={() => setQuiz(null)}
        labels={{
          quizComplete: labels.quizComplete,
          youAnswered: labels.youAnswered,
          outOf: labels.outOf,
          correctly: labels.correctly,
          viewProgress: labels.viewProgress,
          question: labels.question,
          of: labels.of,
          previous: labels.previous,
          submitting: labels.submitting,
          submitQuiz: labels.submitQuiz,
          nextQuestion: labels.nextQuestion,
          quizStartError: labels.quizStartError,
          quizSubmitError: labels.quizSubmitError,
        }}
      />
    );
  }

  return (
    <form className="mt-8" onSubmit={onSubmit}>
      <div className="mb-5">
        <h2 className="text-4xl text-[#232a33]">{labels.chooseConcept}</h2>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {concepts.map((concept) => {
          const Icon = conceptIcons[concept.id];
          const active = concept.id === conceptId;
          return (
            <button
              key={concept.id}
              type="button"
              onClick={() => setConceptId(concept.id)}
              className={`min-h-[190px] rounded-md border p-5 text-left transition ${
                active ? "border-[#0b4f7d] bg-[#eef5fa]" : "border-[#d8d4cb] bg-[#f8f7f4] hover:border-[#8ca5be]"
              }`}
            >
              <span className={`inline-flex h-9 w-9 items-center justify-center rounded ${active ? "bg-[#0b4f7d] text-white" : "bg-[#e6e2d9] text-[#0b4f7d]"}`}>
                <Icon className="h-4 w-4" />
              </span>
              <span className="mt-5 block text-3xl leading-tight text-[#0b4f7d]">{concept.title}</span>
              <span className="mt-3 block text-sm leading-6 text-[#5f6977]">{concept.description}</span>
            </button>
          );
        })}
      </div>

      {error ? <p className="mt-4 text-sm text-[#b02a37]">{error}</p> : null}

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 rounded bg-[#0b4f7d] px-6 py-3 text-sm font-semibold text-white disabled:opacity-50"
        >
          <Sparkles className="h-4 w-4" />
          {loading ? labels.generating : labels.generate}
        </button>
      </div>
    </form>
  );
}
