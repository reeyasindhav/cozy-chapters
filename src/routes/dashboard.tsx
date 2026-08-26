import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Clock, Flame, PenLine, Sparkles } from "lucide-react";
import { RequireAuth } from "@/components/require-auth";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StoryCard } from "@/components/story-card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/lib/auth";
import { getStory, stories } from "@/lib/data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Your dashboard — Storyvault" },
      {
        name: "description",
        content: "Track your reading streak, minutes read and the stories waiting on your shelf.",
      },
      { property: "og:title", content: "Your dashboard — Storyvault" },
      { property: "og:description", content: "Your streak, your minutes, your next short story." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <RequireAuth>
      <Dashboard />
    </RequireAuth>
  ),
});

const week = ["M", "T", "W", "T", "F", "S", "S"];
const done = [true, true, true, true, true, false, false];

function Dashboard() {
  const { user, bookmarks } = useAuth();
  const continueStory = stories[1]!;
  const saved = bookmarks.map((s) => getStory(s)).filter(Boolean).slice(0, 3);
  const suggestions = stories.slice(2, 5);

  return (
    <div className="paper min-h-screen">
      <SiteHeader />

      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="animate-fade-up">
          <p className="eyebrow">Good to see you</p>
          <h1 className="mt-3 font-display text-4xl md:text-5xl">
            Welcome back, <em className="font-light text-clay">{user?.name}</em>
          </h1>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            { icon: Flame, label: "Day streak", value: "5", hint: "Best: 18 days" },
            { icon: Clock, label: "Minutes read", value: "142", hint: "This month" },
            { icon: BookOpen, label: "Stories finished", value: "27", hint: "Since joining" },
          ].map((s, i) => (
            <div
              key={s.label}
              className="lift animate-fade-up rounded-xl border border-border bg-card p-6"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <s.icon className="h-5 w-5 text-clay" />
              <p className="mt-4 font-display text-4xl">{s.value}</p>
              <p className="mt-1 text-sm font-semibold">{s.label}</p>
              <p className="text-xs text-muted-foreground">{s.hint}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
          <div className="animate-fade-up rounded-xl border border-border bg-card p-7">
            <p className="eyebrow">Keep reading</p>
            <h2 className="mt-3 font-display text-2xl">{continueStory.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{continueStory.excerpt}</p>
            <Progress value={62} className="mt-5" />
            <p className="mt-2 text-xs text-muted-foreground">
              62% done · about {Math.max(1, Math.round(continueStory.minutes * 0.38))} min left
            </p>
            <Link to="/stories/$slug" params={{ slug: continueStory.slug }} className="mt-5 inline-block">
              <Button className="rounded-full px-6">Continue story</Button>
            </Link>
          </div>

          <div className="animate-fade-up rounded-xl bg-moss/60 p-7">
            <p className="eyebrow">This week</p>
            <h2 className="mt-3 font-display text-2xl">Your reading streak</h2>
            <div className="mt-6 flex gap-2">
              {week.map((d, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-2">
                  <div
                    className={`flex h-11 w-full items-center justify-center rounded-lg text-sm ${
                      done[i] ? "bg-primary text-primary-foreground" : "bg-background/70"
                    }`}
                  >
                    {done[i] ? <Flame className="h-4 w-4" /> : ""}
                  </div>
                  <span className="text-xs text-muted-foreground">{d}</span>
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm text-muted-foreground">
              Two more days to beat your longest streak. One short story is enough.
            </p>
          </div>
        </div>

        <div className="mt-14 flex items-end justify-between">
          <div>
            <p className="eyebrow flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5" /> Picked for your mood
            </p>
            <h2 className="mt-2 font-display text-3xl">Next up</h2>
          </div>
          <Link to="/discover">
            <Button variant="outline" className="rounded-full bg-background">
              Discover more
            </Button>
          </Link>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {suggestions.map((s, i) => (
            <StoryCard key={s.slug} story={s} index={i} />
          ))}
        </div>

        {saved.length > 0 && (
          <>
            <h2 className="mt-14 font-display text-3xl">Recently saved</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {saved.map((s, i) => (
                <StoryCard key={s!.slug} story={s!} index={i} />
              ))}
            </div>
          </>
        )}

        <div className="mt-14 flex flex-col items-start gap-4 rounded-2xl border border-border bg-card p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="eyebrow flex items-center gap-2">
              <PenLine className="h-3.5 w-3.5" /> Writers' corner
            </p>
            <h2 className="mt-2 font-display text-2xl">Got a story in you today?</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Publish a short piece and it lands on your author page instantly.
            </p>
          </div>
          <Link to="/write">
            <Button className="rounded-full px-6">Start writing</Button>
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
