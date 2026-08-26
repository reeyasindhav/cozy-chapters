import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Clock, Search, SlidersHorizontal } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { StoryCard } from "@/components/story-card";
import { MOODS, stories, type Mood } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/discover")({
  head: () => ({
    meta: [
      { title: "Discover short fiction by mood — Storyvault" },
      {
        name: "description",
        content:
          "Filter short stories by mood, reading time and theme. Find a quick read that matches how you feel right now.",
      },
      { property: "og:title", content: "Discover short fiction by mood — Storyvault" },
      {
        property: "og:description",
        content: "Filter short stories by mood, reading time and theme on Storyvault.",
      },
    ],
  }),
  component: Discover,
});

const sorts = ["Newest", "Most read", "Shortest"] as const;

function Discover() {
  const [q, setQ] = useState("");
  const [mood, setMood] = useState<Mood | "All">("All");
  const [maxMin, setMaxMin] = useState(12);
  const [sort, setSort] = useState<(typeof sorts)[number]>("Newest");

  const results = useMemo(() => {
    const list = stories
      .filter((s) => (mood === "All" ? true : s.mood === mood))
      .filter((s) => s.minutes <= maxMin)
      .filter((s) =>
        q.trim()
          ? (s.title + s.excerpt + s.tags.join(" ")).toLowerCase().includes(q.toLowerCase())
          : true,
      );
    if (sort === "Most read") return [...list].sort((a, b) => b.claps - a.claps);
    if (sort === "Shortest") return [...list].sort((a, b) => a.minutes - b.minutes);
    return list;
  }, [q, mood, maxMin, sort]);

  return (
    <div className="paper min-h-screen">
      <SiteHeader />

      <section className="mx-auto max-w-6xl px-5 pt-14">
        <p className="eyebrow animate-fade-up">The vault</p>
        <h1 className="animate-fade-up mt-3 font-display text-5xl leading-tight">
          Browse by <em className="font-light text-clay">mood & minutes</em>
        </h1>
        <p className="animate-fade-up mt-4 max-w-lg text-muted-foreground">
          {stories.length} stories, all readable in a single sitting. Tell us how much time you
          have.
        </p>
      </section>

      <section className="mx-auto mt-10 max-w-6xl px-5">
        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <aside className="animate-fade-up h-fit rounded-xl border border-border bg-card p-6 lg:sticky lg:top-24">
            <p className="flex items-center gap-2 text-sm font-semibold">
              <SlidersHorizontal className="h-4 w-4" /> Refine
            </p>

            <div className="relative mt-5">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search titles & themes"
                className="rounded-full pl-9"
              />
            </div>

            <p className="mt-7 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Mood
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {(["All", ...MOODS] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMood(m as Mood | "All")}
                  className={`rounded-full border px-3 py-1 text-xs transition-all ${
                    mood === m
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground hover:border-primary/40"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>

            <p className="mt-7 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <Clock className="h-3.5 w-3.5" /> Up to {maxMin} min
            </p>
            <Slider
              value={[maxMin]}
              min={3}
              max={12}
              step={1}
              onValueChange={([v]) => setMaxMin(v ?? 3)}
              className="mt-4"
            />

            <p className="mt-7 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Sort
            </p>
            <div className="mt-3 flex flex-col gap-1">
              {sorts.map((s) => (
                <button
                  key={s}
                  onClick={() => setSort(s)}
                  className={`rounded-md px-3 py-1.5 text-left text-sm transition-colors ${
                    sort === s
                      ? "bg-secondary font-semibold"
                      : "text-muted-foreground hover:bg-secondary/60"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <Button
              variant="ghost"
              className="mt-6 w-full rounded-full text-xs"
              onClick={() => {
                setQ("");
                setMood("All");
                setMaxMin(12);
                setSort("Newest");
              }}
            >
              Reset filters
            </Button>
          </aside>

          <div>
            <p className="mb-5 text-sm text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{results.length}</span>{" "}
              stories
            </p>
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((s, i) => (
                <StoryCard key={s.slug} story={s} index={i} />
              ))}
            </div>
            {results.length === 0 && (
              <div className="rounded-xl border border-dashed border-border py-24 text-center">
                <p className="font-display text-xl">Nothing here yet</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try widening the reading time or clearing the mood filter.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
