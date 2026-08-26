import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { LeafMark } from "@/components/leaf-mark";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — Storyvault" },
      {
        name: "description",
        content: "Sign in to your Storyvault account to keep your library, streak and reading log.",
      },
      { property: "og:title", content: "Sign in — Storyvault" },
      { property: "og:description", content: "Sign in to Storyvault to keep reading where you left off." },
    ],
  }),
  component: Login,
});

function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("reader@storyvault.app");
  const [password, setPassword] = useState("shortstories");
  const [busy, setBusy] = useState(false);

  return (
    <div className="grid min-h-screen md:grid-cols-2">
      <div className="relative hidden overflow-hidden md:block">
        <img
          src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=70"
          alt="A quiet library"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/70" />
        <div className="absolute inset-0 flex flex-col justify-between p-12 text-primary-foreground">
          <Link to="/" className="flex items-center gap-2.5">
            <LeafMark className="h-7 w-7" />
            <span className="font-display text-lg">storyvault</span>
          </Link>
          <div className="animate-fade-up">
            <p className="font-display text-3xl leading-snug">
              "I read one story every night before bed. It's the only habit that ever stuck."
            </p>
            <p className="mt-4 text-sm opacity-80">— Priya R., reader since 2024</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center px-6 py-16">
        <div className="animate-fade-up w-full max-w-sm">
          <Link to="/" className="mb-10 flex items-center gap-2.5 text-primary md:hidden">
            <LeafMark className="h-7 w-7" />
            <span className="font-display text-lg">storyvault</span>
          </Link>
          <p className="eyebrow">Welcome back</p>
          <h1 className="mt-3 font-display text-4xl">Pick up where you stopped</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Your library, streak and saved stories are waiting.
          </p>

          <form
            className="mt-8 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setBusy(true);
              setTimeout(() => {
                signIn(email);
                toast("Welcome back to the vault");
                navigate({ to: "/dashboard" });
              }, 500);
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <button type="button" className="text-xs text-muted-foreground underline-sweep">
                  Forgot?
                </button>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" disabled={busy} className="w-full rounded-full" size="lg">
              {busy ? "Opening the vault…" : "Sign in"}
              {!busy && <ArrowRight className="ml-1 h-4 w-4" />}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            New here?{" "}
            <Link to="/signup" className="font-semibold text-primary underline-sweep">
              Create an account
            </Link>
          </p>
          <p className="mt-8 rounded-lg bg-secondary px-4 py-3 text-center text-xs text-muted-foreground">
            Demo mode — any email and password will sign you in.
          </p>
        </div>
      </div>
    </div>
  );
}
