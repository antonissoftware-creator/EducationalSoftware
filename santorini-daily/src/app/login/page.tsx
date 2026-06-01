import { SiteShell } from "@/components/layout/site-shell";
import { LoginForm } from "@/components/auth/login-form";
import { getCurrentUser } from "@/lib/auth";
import { resolveLanguage } from "@/lib/i18n";
import { uiText } from "@/lib/translations";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; lang?: string }>;
}) {
  const params = await searchParams;
  const user = await getCurrentUser();
  const lang = resolveLanguage(user?.preferredLanguage, params.lang ?? null);
  const t = uiText[lang];
  const nextPath = params.next || "/dashboard";

  return (
    <SiteShell lang={lang}>
      <div className="mx-auto w-full max-w-[480px] rounded-md border border-[#d8d4cb] bg-[#f8f7f4] p-6">
        <h1 className="text-4xl font-semibold text-[var(--color-primary)]">{t.login_title}</h1>
        <p className="mt-2 text-sm text-[#5c6774]">{t.login_subtitle}</p>
        <LoginForm
          nextPath={nextPath}
          labels={{
            email: t.email,
            password: t.password,
            invalid: t.login_invalid,
            unavailable: t.login_unavailable,
            signingIn: t.signing_in,
            signIn: t.sign_in,
          }}
        />
      </div>
    </SiteShell>
  );
}
