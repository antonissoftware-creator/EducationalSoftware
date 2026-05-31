import { SiteShell } from "@/components/layout/site-shell";

export default function RegisterPage() {
  return (
    <SiteShell>
      <h1 className="mb-4 text-4xl font-semibold text-[var(--color-primary)]">Register</h1>
      <p className="text-sm text-[var(--color-on-surface-variant)]">Use POST /api/auth/register to create an account.</p>
    </SiteShell>
  );
}
