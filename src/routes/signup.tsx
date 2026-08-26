import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { LeafMark } from "@/components/leaf-mark";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create your account — Storyvault" },
      {
        name: "description",
        content:
          "Join Storyvault to save short fiction, build a reading streak and follow independent writers.",
      },
      { property: "og:title", content: "Create your account — Storyvault" },
      {
        property: "og:description",
        content: "Join Storyvault — short fiction matched to your mood and your minutes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Signup,
});

function Signup() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  return (
    <div className="grid min-h-screen md:grid-cols-2">
      <div className="flex items-center justify-center px-6 py-16">
        <div className="animate-fade-up w-full max-w-sm">
          <Link to="/" className="mb-10 flex items-center gap-2.5 text-primary">
            <LeafMark className="h-7 w-7" />
            <span className="font-display text-lg">storyvault</span>
          </Link>
          <p className="eyebrow">Start your shelf</p>
          <h1 className="mt-3 font-display text-4xl">Create your account</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            One story a day. Ten minutes at most. Yours to keep.
          </p>

          <form
            className="mt-8 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setBusy(true);
              setTimeout(() => {
                signIn(email, name);
                toast("Welcome to Storyvault");
                navigate({ to: "/dashboard" });
              }, 500);
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="name">Display name</Label>
              <Input
                id="name"
                required
                placeholder="Ada Lovelace"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" disabled={busy} className="w-full rounded-full" size="lg">
              {busy ? "Setting your shelf…" : "Create account"}
              {!busy && <ArrowRight className="ml-1 h-4 w-4" />}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already reading with us?{" "}
            <Link to="/login" className="font-semibold text-primary underline-sweep">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      <div className="relative hidden overflow-hidden md:block">
        <img
          src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=70"
          alt="A shelf of well-read books"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/70" />
        <div className="absolute inset-0 flex flex-col justify-end p-12 text-primary-foreground">
          <p className="animate-fade-up font-display text-3xl leading-snug">
            "Short fiction is the only thing that fits between the school run and the commute."
          </p>
          <p className="mt-4 text-sm opacity-80">— Marcus D., reader since 2025</p>
        </div>
      </div>
    </div>
  );
}
