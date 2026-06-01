"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function LoginForm({ nextPath }: { nextPath: string }) {
  const router = useRouter();
  const [email, setEmail] = useState("student@santorini.local");
  const [password, setPassword] = useState("Password123!");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    fetch("/api/auth/me")
      .then((res) => {
        if (mounted && res.ok) router.replace(nextPath);
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, [nextPath, router]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        setError("Invalid email or password.");
        setLoading(false);
        return;
      }

      router.push(nextPath);
      router.refresh();
    } catch {
      setError("Unable to sign in right now. Try again.");
      setLoading(false);
    }
  }

  return (
    <form className="mt-6 space-y-4" onSubmit={onSubmit}>
      <label className="block space-y-1">
        <span className="text-sm font-medium text-[#1f252d]">Email</span>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="h-11 w-full rounded border border-[#c8ced6] bg-white px-3 text-sm"
          required
        />
      </label>

      <label className="block space-y-1">
        <span className="text-sm font-medium text-[#1f252d]">Password</span>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="h-11 w-full rounded border border-[#c8ced6] bg-white px-3 text-sm"
          required
        />
      </label>

      {error ? <p className="text-sm text-[#b02a37]">{error}</p> : null}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded bg-[#0b4f7d] px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
