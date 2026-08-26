import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock, Feather, Heart, Zap } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Storyvault — a home for short fiction" },
      {
        name: "description",
        content:
          "Why Storyvault exists: bite-sized fiction matched to your mood and the minutes you actually have, and a focused stage for independent writers.",
      },
      { property: "og:title", content: "About Storyvault — a home for short fiction" },
      {
        property: "og:description",
        content: "Bite-sized fiction matched to your mood and your minutes.",
      },
    ],
  }),
  component: About,
});

const values = [
  {
    icon: Clock,
    title: "Time-honest reading",
    body: "Every story carries a real read-time badge. No infinite scroll, no cliffhanger traps — just an honest estimate so you can start and actually finish.",
  },
  {
    icon: Zap,
    title: "Mood before genre",
    body: "Genre tells you what happens. Mood tells you how it feels. We index the second one, because that's what you're actually shopping for at 11pm.",
  },
  {
    icon: Feather,
    title: "Writers first",
    body: "Independent writers get a profile, an audience, and applause that belongs to them — not to an algorithm that buries short work under novels.",
  },
  {
    icon: Heart,
    title: "A habit, not a binge",
    body: "Streaks, a reading log, and a saved library. Small and repeatable beats big and abandoned.",
  },
];

function About() {
  return (
    <div className="paper min-h-screen">
      <SiteHeader />

      <section className="mx-auto max-w-3xl px-5 py-20 text-center">
        <p className="eyebrow animate-fade-up">Our story about stories</p>
        <h1 className="animate-fade-up mt-4 font-display text-5xl leading-tight md:text-6xl">
          Reading shouldn't need <em className="font-light text-clay">a free weekend.</em>
        </h1>
        <p className="animate-fade-up mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
          Most reading apps are built for novels — long, linear, and demanding. But most of us read
          in the cracks: a bus ride, a lunch break, ten minutes before sleep. Storyvault is built
          for those cracks, and for the writers whose work fits perfectly inside them.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-5">
        <div className="grid gap-5 sm:grid-cols-2">
          {values.map((v, i) => (
            <div
              key={v.title}
              className="animate-fade-up lift rounded-xl border border-border bg-card p-8"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-moss">
                <v.icon className="h-4.5 w-4.5 text-primary" />
              </span>
              <h2 className="mt-5 font-display text-2xl">{v.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-5xl px-5">
        <div className="grid gap-10 rounded-2xl bg-sand/50 p-10 md:grid-cols-3">
          {[
            { n: "12,400+", l: "monthly readers" },
            { n: "740", l: "published stories" },
            { n: "6 min", l: "average read" },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <p className="font-display text-5xl text-primary">{s.n}</p>
              <p className="mt-2 text-sm text-muted-foreground">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-3xl px-5 text-center">
        <h2 className="font-display text-4xl">Write something small</h2>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">
          If you have a story that takes eight minutes to read, this is the right shelf for it.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/signup">
            <Button size="lg" className="rounded-full px-7">
              Join Storyvault <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
          <Link to="/write">
            <Button size="lg" variant="outline" className="rounded-full px-7">
              Start writing
            </Button>
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
