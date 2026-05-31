import { SiteShell } from "@/components/layout/site-shell";

export default function LoginPage() {
  return (
    <SiteShell>
      <h1 className="mb-4 text-4xl font-semibold text-[var(--color-primary)]">Login</h1>
      <p className="text-sm text-[var(--color-on-surface-variant)]">Use POST /api/auth/login with email and password.</p>
    </SiteShell>
  );
}
