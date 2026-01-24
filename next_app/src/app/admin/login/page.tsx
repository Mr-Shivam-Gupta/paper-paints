"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError((data as { error?: string }).error || "Login failed");
        return;
      }
      router.replace("/admin");
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-off-white flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <h1 className="font-heading text-2xl font-bold text-deep-black mb-2">
          Admin Login
        </h1>
        <p className="text-dark-grey mb-6">Paper Paints admin panel</p>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              className="mt-1"
              required
              autoComplete="email"
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="mt-1"
              required
              autoComplete="current-password"
            />
          </div>
          {error && <p className="text-accent-red text-sm">{error}</p>}
          <Button
            type="submit"
            className="w-full bg-accent-red hover:bg-accent-red/90"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log in"}
          </Button>
        </form>
      </div>
    </div>
  );
}
