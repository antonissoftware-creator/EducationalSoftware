import { SiteShell } from "@/components/layout/site-shell";
import { LoginForm } from "@/components/auth/login-form";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const params = await searchParams;
  const nextPath = params.next || "/dashboard";

  return (
    <SiteShell>
      <div className="mx-auto w-full max-w-[480px] rounded-md border border-[#d8d4cb] bg-[#f8f7f4] p-6">
        <h1 className="text-4xl font-semibold text-[var(--color-primary)]">Login</h1>
        <p className="mt-2 text-sm text-[#5c6774]">Sign in to take quizzes and view your progress dashboard.</p>
        <LoginForm nextPath={nextPath} />
      </div>
    </SiteShell>
  );
}
