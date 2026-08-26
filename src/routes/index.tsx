import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, Check, Flame, Sparkles, Star } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { StoryCard } from "@/components/story-card";
import { Button } from "@/components/ui/button";
import { authors, getAuthor, MOODS, stories, type Mood } from "@/lib/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Storyvault — Find a story for right now" },
      {
        name: "description",
        content:
          "Short fiction for the in-between moments. Browse by mood and read time, follow independent writers, and keep a reading streak.",
      },
      { property: "og:title", content: "Storyvault — Find a story for right now" },
      {
        property: "og:description",
        content: "Short fiction for the in-between moments. Discover something lovely, strange or true.",
      },
    ],
  }),
  component: Home,
});

const lengths = ["Any length", "Under 5 min", "5–8 min", "Over 8 min"] as const;

function Home() {
  const [mood, setMood] = useState<Mood | "All">("All");
  const [length, setLength] = useState<(typeof lengths)[number]>("Any length");

  const shelf = useMemo(() => {
    return stories
      .filter((s) => (mood === "All" ? true : s.mood === mood))
      .filter((s) =>
        length === "Any length"
          ? true
          : length === "Under 5 min"
            ? s.minutes < 5
            : length === "5–8 min"
              ? s.minutes >= 5 && s.minutes <= 8
              : s.minutes > 8,
      )
      .slice(0, 6);
  }, [mood, length]);

  const featured = stories[0]!;
  const featuredAuthor = getAuthor(featured.author)!;

  return (
    <div className="paper min-h-screen">
      <SiteHeader />

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-14 px-5 py-16 md:grid-cols-2 md:py-24">
        <div className="animate-fade-up">
          <p className="eyebrow flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5" /> A little room for your imagination
          </p>
          <h1 className="mt-5 font-display text-5xl leading-[1.05] md:text-6xl">
            Find a story
            <br />
            <em className="font-light text-clay">for right now.</em>
          </h1>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted-foreground">
            Short fiction for the in-between moments. Discover something lovely, strange, or true —
            and make reading part of your everyday.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/discover">
              <Button size="lg" className="group rounded-full px-7">
                Explore the vault
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="lg" variant="outline" className="rounded-full px-7">
                Start a reading habit
              </Button>
            </Link>
          </div>

          <div className="mt-10 flex items-center gap-3">
            <div className="flex -space-x-2">
              {authors.slice(0, 3).map((a) => (
                <img
                  key={a.slug}
                  src={a.avatar}
                  alt={a.name}
                  className="h-8 w-8 rounded-full ring-2 ring-background"
                />
              ))}
            </div>
            <p className="text-xs leading-tight text-muted-foreground">
              <span className="font-semibold text-foreground">12,400+ readers</span>
              <br />
              found their next favorite story
            </p>
          </div>
        </div>

        {/* Featured card stack */}
        <div className="relative animate-fade-in md:h-[420px]">
          <div className="absolute right-2 top-8 hidden h-full w-[86%] rotate-3 rounded-xl bg-sand/70 md:block" />
          <div className="animate-float relative overflow-hidden rounded-xl border border-border bg-card shadow-lift">
            <div className="flex items-center justify-between px-5 pt-4 text-xs text-muted-foreground">
              <span>Editor's pick · {featured.minutes} min</span>
              <Star className="h-4 w-4 fill-clay text-clay" />
            </div>
            <div className="mt-3 aspect-[16/9] overflow-hidden">
              <img
                src={featured.cover}
                alt={featured.title}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-6">
              <span className="eyebrow">A story about becoming</span>
              <h2 className="mt-2 font-display text-2xl leading-snug">{featured.title}</h2>
              <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  <img src={featuredAuthor.avatar} className="h-7 w-7 rounded-full" alt="" />
                  by {featuredAuthor.name}
                </span>
                <Link
                  to="/stories/$slug"
                  params={{ slug: featured.slug }}
                  className="text-primary transition-transform hover:translate-x-1"
                >
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Streak strip */}
      <section className="border-y border-border bg-card/60">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-5 py-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sand">
              <Flame className="h-5 w-5 text-clay" />
            </span>
            <div>
              <p className="text-sm font-semibold">Keep your reading ritual</p>
              <p className="text-xs text-muted-foreground">You're on a 4 day streak. Keep going.</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <span className="text-[10px] text-muted-foreground">{d}</span>
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full border text-[10px] transition-transform hover:scale-110 ${
                    i < 4
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background"
                  }`}
                >
                  {i < 4 && <Check className="h-3 w-3" />}
                </span>
              </div>
            ))}
          </div>
          <Link
            to="/dashboard"
            className="flex items-center gap-1.5 text-sm font-semibold text-primary"
          >
            View reading log <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Shelf */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">The story shelf</p>
            <h2 className="mt-2 font-display text-4xl">What are you in the mood for?</h2>
          </div>
          <Link
            to="/discover"
            className="flex items-center gap-1.5 text-sm font-semibold text-primary"
          >
            See all stories <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3 border-b border-border pb-6">
          <span className="text-sm text-muted-foreground">I have</span>
          <select
            value={length}
            onChange={(e) => setLength(e.target.value as (typeof lengths)[number])}
            className="rounded-full border border-border bg-background px-4 py-1.5 text-sm outline-none focus:ring-2 focus:ring-ring/30"
          >
            {lengths.map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>
          <span className="mx-2 hidden h-6 w-px bg-border sm:block" />
          {(["All", ...MOODS] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMood(m as Mood | "All")}
              className={`rounded-full border px-4 py-1.5 text-sm transition-all duration-300 ${
                mood === m
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {m === "All" ? "All moods" : m}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shelf.map((s, i) => (
            <StoryCard key={s.slug} story={s} index={i} />
          ))}
        </div>
        {shelf.length === 0 && (
          <p className="py-16 text-center text-muted-foreground">
            No stories match that mood and length yet — try another combination.
          </p>
        )}
      </section>

      {/* Authors band */}
      <section className="mx-auto max-w-6xl px-5 pb-8">
        <div className="grid items-center gap-10 rounded-2xl bg-moss/60 p-10 md:grid-cols-[1fr_1.2fr_0.8fr]">
          <div className="hidden justify-center md:flex">
            <img
              src={topAuthor.cover}
              alt=""
              className="h-48 w-48 rounded-full object-cover shadow-soft"
            />
          </div>
          <div>
            <p className="eyebrow">Meet the voices</p>
            <h2 className="mt-3 font-display text-4xl leading-tight">
              Stories are better
              <br />
              <em className="font-light text-clay">when they're shared.</em>
            </h2>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Get to know the independent writers behind the words. Follow their work, find your
              favorites, and discover a new perspective.
            </p>
            <Link to="/authors" className="mt-6 inline-block">
              <Button variant="outline" className="rounded-full bg-background px-6">
                Browse all authors <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="border-l border-border/60 pl-6">
            <span className="text-xs text-muted-foreground">01</span>
            <img src={topAuthor.avatar} alt="" className="mt-4 h-12 w-12 rounded-full" />
            <h3 className="mt-4 font-display text-xl">{topAuthor.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{topAuthor.tagline}</p>
            <Link
              to="/authors/$slug"
              params={{ slug: topAuthor.slug }}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
            >
              View profile <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
