"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";

type QuizOption = { id: string; textEn: string };
type QuizQuestion = { id: string; questionEn: string; options: QuizOption[] };
type QuizLabels = {
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
};

export function QuizStepper({
  quizId,
  title,
  questions,
  labels,
}: {
  quizId: string;
  title: string;
  questions: QuizQuestion[];
  labels: QuizLabels;
}) {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState<{ score: number; correctAnswers: number; totalQuestions: number } | null>(null);
  const [error, setError] = useState("");
  const startedAtRef = useRef<number | null>(null);

  const current = questions[step];
  const progress = useMemo(() => ((step + 1) / questions.length) * 100, [questions.length, step]);
  const isLast = step === questions.length - 1;

  async function ensureAttempt(): Promise<string | null> {
    if (attemptId) return attemptId;
    if (startedAtRef.current === null) startedAtRef.current = Date.now();
    const response = await fetch(`/api/quizzes/${quizId}/start`, { method: "POST" });
    if (!response.ok) return null;
    const data = (await response.json()) as { attemptId: string };
    setAttemptId(data.attemptId);
    return data.attemptId;
  }

  async function onNext() {
    setError("");
    if (!isLast) {
      setStep((prev) => Math.min(questions.length - 1, prev + 1));
      return;
    }

    setLoading(true);
    const currentAttemptId = await ensureAttempt();
    if (!currentAttemptId) {
      setLoading(false);
      setError(labels.quizStartError);
      return;
    }

    const answers = questions.map((question) => ({
      questionId: question.id,
      selectedOptionId: selected[question.id] ?? null,
    }));

    const response = await fetch(`/api/quizzes/${quizId}/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        attemptId: currentAttemptId,
        answers,
        timeSpentSeconds: Math.floor((Date.now() - (startedAtRef.current ?? Date.now())) / 1000),
      }),
    });

    if (!response.ok) {
      setLoading(false);
      setError(labels.quizSubmitError);
      return;
    }

    const data = (await response.json()) as { score: number; correctAnswers: number; totalQuestions: number };
    setSubmitted(data);
    setLoading(false);
  }

  if (submitted) {
    return (
      <div className="mx-auto w-full max-w-[760px] rounded-lg border border-[#d8d4cb] bg-[#f8f7f4] p-8 text-center">
        <p className="font-serif text-4xl leading-none text-[#0b4f7d]">{labels.quizComplete}</p>
        <p className="mt-4 text-5xl font-semibold text-[#232a33]">{Math.round(submitted.score)}%</p>
        <p className="mt-2 text-sm text-[#5c6774]">
          {labels.youAnswered} {submitted.correctAnswers} {labels.outOf} {submitted.totalQuestions} {labels.correctly}
        </p>
        <Link href="/dashboard" className="mt-6 inline-flex rounded bg-[#0b4f7d] px-6 py-2.5 text-sm font-semibold text-white">
          {labels.viewProgress}
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[760px]">
      <div className="mb-8 text-center">
        <p className="font-serif text-4xl leading-none text-[#0b4f7d]">Santorini Daily</p>
        <div className="mt-8 inline-block rounded-full border border-[#cfccd7] bg-[#eef3f7] px-4 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#0b4f7d]">
          {title}
        </div>
        <div className="mt-5 flex items-center justify-center gap-3">
          <p className="text-sm font-semibold text-[#2f4a68]">{labels.question} {step + 1} {labels.of} {questions.length}</p>
          <div className="h-1.5 w-36 overflow-hidden rounded-full bg-[#d9d6cf]">
            <div className="h-full bg-[#c69e14]" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-[#d8d4cb] bg-[#f8f7f4] shadow-sm">
        <div className="h-[2px] rounded-t-lg bg-[#c69e14]" />
        <div className="space-y-8 p-7 md:p-10">
          <h1 className="text-center text-[36px] leading-tight text-[#232a33] md:text-[44px]">{current.questionEn}</h1>

          <div className="space-y-3">
            {current.options.map((option) => {
              const active = selected[current.id] === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setSelected((prev) => ({ ...prev, [current.id]: option.id }))}
                  className={`flex w-full items-center gap-3 rounded border px-4 py-4 text-left text-[15px] ${
                    active ? "border-[#0b4f7d] bg-[#edf4fa]" : "border-[#c8ced6] bg-[#f8f7f4]"
                  }`}
                >
                  <span className={`h-4 w-4 rounded-full border ${active ? "border-[#0b4f7d] bg-[#0b4f7d]" : "border-[#99a3af]"}`} />
                  <span>{option.textEn}</span>
                </button>
              );
            })}
          </div>

          {error ? <p className="text-sm text-[#b02a37]">{error}</p> : null}

          <div className="flex items-center justify-between border-t border-[#dfdbd3] pt-5">
            <button
              type="button"
              onClick={() => setStep((prev) => Math.max(0, prev - 1))}
              disabled={step === 0 || loading}
              className="rounded border border-[#bfc7d1] px-4 py-2 text-sm disabled:opacity-40"
            >
              {labels.previous}
            </button>
            <button
              type="button"
              onClick={onNext}
              disabled={!selected[current.id] || loading}
              className="rounded bg-[#0b4f7d] px-8 py-2.5 text-sm font-semibold text-white disabled:opacity-40"
            >
              {loading ? labels.submitting : isLast ? labels.submitQuiz : labels.nextQuestion}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
