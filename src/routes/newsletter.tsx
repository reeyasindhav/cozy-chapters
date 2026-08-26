import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, BookOpen, Flame, Zap } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/newsletter")({
  head: () => ({
    meta: [
      { title: "Newsletter — Storyvault" },
      {
        name: "description",
        content:
          "Get one short story and a reading note in your inbox every week. No spam, just something worth your ten minutes.",
      },
      { property: "og:title", content: "Newsletter — Storyvault" },
      {
        property: "og:description",
        content: "One short story and a reading note in your inbox every week.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Newsletter,
});

function Newsletter() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setTimeout(() => {
      toast("You're on the list. Look out for your first story.");
      setEmail("");
      setBusy(false);
    }, 600);
  };

  return (
    <div className="paper min-h-screen">
      <SiteHeader />

      <section className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <p className="eyebrow animate-fade-up">In your inbox, weekly</p>
            <h1 className="animate-fade-up mt-4 font-display text-5xl leading-tight md:text-6xl">
              One story. <br />
              <em className="font-light text-clay">Ten minutes. Zero noise.</em>
            </h1>
            <p className="animate-fade-up mt-6 text-[15px] leading-relaxed text-muted-foreground">
              Join readers who get one short story, a tiny reading note, and nothing else. No
              cliffhanger hooks, no promos — just something you can actually finish between chores.
            </p>

            <form onSubmit={onSubmit} className="mt-8 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Button type="submit" disabled={busy} className="w-full rounded-full" size="lg">
                {busy ? "Adding you…" : "Get the newsletter"}
                {!busy && <ArrowRight className="ml-1 h-4 w-4" />}
              </Button>
            </form>

            <p className="mt-4 text-xs text-muted-foreground">
              By subscribing you agree to our friendly privacy policy. Unsubscribe anytime.
            </p>
          </div>

          <div className="grid gap-5">
            {[
              {
                icon: BookOpen,
                title: "A real short story",
                body: "Handpicked from the vault — fiction you can finish before your coffee gets cold.",
              },
              {
                icon: Zap,
                title: "One tiny reading note",
                body: "A sentence or two on why this story fits the mood you’re probably in this week.",
              },
              {
                icon: Flame,
                title: "A weekly ritual, not a chore",
                body: "Short enough to actually read, consistent enough to miss if it’s late.",
              },
            ].map((item, i) => (
              <div
                key={item.title}
                className="animate-fade-up lift rounded-xl border border-border bg-card p-6"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-moss">
                  <item.icon className="h-4.5 w-4.5 text-primary" />
                </span>
                <h2 className="mt-4 font-display text-xl">{item.title}</h2>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
