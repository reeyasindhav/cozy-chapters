import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { StoryCard } from "@/components/story-card";
import { collections, MOODS, stories } from "@/lib/data";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title: "Curated collections of short fiction — Storyvault" },
      {
        name: "description",
        content:
          "Hand-picked shelves of short stories: flash fiction, rain-soaked rooms, softly strange tales and more.",
      },
      { property: "og:title", content: "Curated collections — Storyvault" },
      {
        property: "og:description",
        content: "Hand-picked shelves of short fiction, grouped by feeling and length.",
      },
    ],
  }),
  component: Collections,
});

function Collections() {
  return (
    <div className="paper min-h-screen">
      <SiteHeader />

      <section className="mx-auto max-w-6xl px-5 pt-14">
        <p className="eyebrow animate-fade-up">Curated shelves</p>
        <h1 className="animate-fade-up mt-3 max-w-2xl font-display text-5xl leading-tight">
          Collections for <em className="font-light text-clay">particular evenings.</em>
        </h1>
      </section>

      <section className="mx-auto mt-12 grid max-w-6xl gap-6 px-5 md:grid-cols-3">
        {collections.map((c, i) => (
          <Link
            key={c.title}
            to="/discover"
            className="lift animate-fade-up group relative h-72 overflow-hidden rounded-xl"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <img
              src={c.cover}
              alt={c.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1000ms] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-primary-foreground">
              <span className="text-[11px] uppercase tracking-[0.18em] opacity-80">
                {c.count} stories
              </span>
              <h2 className="mt-1 font-display text-2xl">{c.title}</h2>
              <p className="mt-1 text-sm opacity-85">{c.description}</p>
            </div>
          </Link>
        ))}
      </section>

      <section className="mx-auto mt-20 max-w-6xl px-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Browse by feeling</p>
            <h2 className="mt-2 font-display text-3xl">Six moods, one shelf each</h2>
          </div>
          <Link to="/discover" className="flex items-center gap-1.5 text-sm font-semibold text-primary">
            Open the vault <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          {MOODS.map((m) => (
            <Link
              key={m}
              to="/discover"
              className="rounded-full border border-border bg-card px-5 py-2 text-sm transition-colors hover:border-primary hover:text-primary"
            >
              {m}
            </Link>
          ))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stories.slice(6, 12).map((s, i) => (
            <StoryCard key={s.slug} story={s} index={i} />
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
