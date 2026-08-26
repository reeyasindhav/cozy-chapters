import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PenLine, Clock } from "lucide-react";
import { toast } from "sonner";
import { RequireAuth } from "@/components/require-auth";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MOODS, type Mood } from "@/lib/data";

export const Route = createFileRoute("/write")({
  head: () => ({
    meta: [
      { title: "Write a short story — Storyvault" },
      {
        name: "description",
        content:
          "Draft, tag and publish short fiction on Storyvault — a focused stage for independent writers.",
      },
      { property: "og:title", content: "Write a short story — Storyvault" },
      {
        property: "og:description",
        content: "A quiet editor built for short fiction: mood tags, read time, publish.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <RequireAuth>
      <Write />
    </RequireAuth>
  ),
});

function Write() {
  const [title, setTitle] = useState("");
  const [mood, setMood] = useState<Mood>("Tender");
  const [body, setBody] = useState("");

  const words = useMemo(() => body.trim().split(/\s+/).filter(Boolean).length, [body]);
  const minutes = Math.max(1, Math.round(words / 220));

  return (
    <div className="paper min-h-screen">
      <SiteHeader />

      <section className="mx-auto max-w-3xl px-5 py-12">
        <div className="animate-fade-up">
          <p className="eyebrow flex items-center gap-2">
            <PenLine className="h-3.5 w-3.5" /> New draft
          </p>
          <h1 className="mt-3 font-display text-4xl md:text-5xl">Write something short</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Aim for under 2,000 words. Readers come here for a story between two stops.
          </p>
        </div>

        <form
          className="animate-fade-up mt-10 space-y-6 rounded-2xl border border-border bg-card p-7"
          onSubmit={(e) => {
            e.preventDefault();
            toast("Story published to your author page");
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              required
              placeholder="The last lighthouse keeper"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="font-display text-lg"
            />
          </div>

          <div className="space-y-3">
            <Label>Mood tag</Label>
            <div className="flex flex-wrap gap-2">
              {MOODS.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMood(m)}
                  className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
                    mood === m
                      ? "bg-primary text-primary-foreground"
                      : "border border-border bg-background hover:bg-secondary"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="body">Story</Label>
            <Textarea
              id="body"
              required
              rows={16}
              placeholder="She left the lamp burning even after the ships stopped coming…"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="leading-relaxed"
            />
            <p className="flex items-center gap-3 text-xs text-muted-foreground">
              <span>{words} words</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" /> {minutes} min read
              </span>
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button type="submit" className="rounded-full px-6">
              Publish story
            </Button>
            <Button
              type="button"
              variant="outline"
              className="rounded-full bg-background px-6"
              onClick={() => toast("Draft saved")}
            >
              Save draft
            </Button>
          </div>
        </form>
      </section>

      <SiteFooter />
    </div>
  );
}
