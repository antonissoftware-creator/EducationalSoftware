export const dynamic = "force-dynamic";

import Link from "next/link";
import { redirect } from "next/navigation";
import { AiTutorQuizBuilder } from "@/components/quiz/ai-tutor-quiz-builder";
import { SiteShell } from "@/components/layout/site-shell";
import { aiTutorConcepts, isAiEnabledForUser } from "@/lib/ai";
import { getCurrentUser } from "@/lib/auth";
import { pickLocalized, resolveLanguage } from "@/lib/i18n";
import { prisma } from "@/lib/prisma";
import { uiText } from "@/lib/translations";

export default async function AiTutorPage({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=%2Fai-tutor");

  const params = await searchParams;
  const lang = resolveLanguage(user.preferredLanguage, params.lang ?? null);
  const t = uiText[lang];
  const settings = await prisma.userSettings.findUnique({ where: { userId: user.id } });
  const aiReady = isAiEnabledForUser(settings);

  return (
    <SiteShell lang={lang}>
      <h1 className="text-4xl leading-[0.95] text-[#0b4f7d]">{t.ai_tutor_title}</h1>
      <p className="mt-3 max-w-[760px] text-lg text-[#4f5968]">{t.ai_tutor_subtitle}</p>

      {!aiReady ? (
        <section className="mt-8 rounded-md border border-[#d8d4cb] bg-[#f8f7f4] p-6">
          <p className="mt-3 max-w-[680px] text-sm leading-6 text-[#5f6977]">{t.ai_tutor_not_ready_help}</p>
          <Link href="/settings" className="mt-5 inline-flex rounded bg-[#0b4f7d] px-5 py-2.5 text-sm font-semibold text-white">
            {t.nav_settings}
          </Link>
        </section>
      ) : (
        <AiTutorQuizBuilder
          lang={lang}
          concepts={aiTutorConcepts.map((concept) => ({
            id: concept.id,
            title: pickLocalized(concept, "titleEn", "titleEl", lang),
            description: pickLocalized(concept, "descriptionEn", "descriptionEl", lang),
          }))}
          labels={{
            title: t.ai_tutor_title,
            subtitle: t.ai_tutor_subtitle,
            chooseConcept: t.ai_tutor_choose_concept,
            generate: t.ai_tutor_generate,
            generating: t.ai_tutor_generating,
            generateError: t.ai_tutor_generate_error,
            quizComplete: t.quiz_complete,
            youAnswered: t.answered,
            outOf: t.out_of,
            correctly: t.correctly,
            viewProgress: t.view_progress,
            question: t.question,
            of: t.of,
            previous: t.previous,
            submitting: t.submitting,
            submitQuiz: t.submit_quiz,
            nextQuestion: t.next_question,
            quizStartError: t.quiz_start_error,
            quizSubmitError: t.quiz_submit_error,
            backToTutor: t.ai_tutor_back,
          }}
        />
      )}
    </SiteShell>
  );
}
