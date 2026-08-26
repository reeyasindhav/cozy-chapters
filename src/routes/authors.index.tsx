import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Users } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { authors, storiesByAuthor } from "@/lib/data";

export const Route = createFileRoute("/authors/")({
  head: () => ({
    meta: [
      { title: "Meet the writers — Storyvault" },
      {
        name: "description",
        content:
          "Independent short fiction writers publishing on Storyvault. Follow their work and find your next favorite voice.",
      },
      { property: "og:title", content: "Meet the writers — Storyvault" },
      {
        property: "og:description",
        content: "Independent short fiction writers publishing on Storyvault.",
      },
    ],
  }),
  component: AuthorsIndex,
});

function AuthorsIndex() {
  return (
    <div className="paper min-h-screen">
      <SiteHeader />

      <section className="mx-auto max-w-6xl px-5 pt-14">
        <p className="eyebrow animate-fade-up">Meet the voices</p>
        <h1 className="animate-fade-up mt-3 max-w-2xl font-display text-5xl leading-tight">
          The writers behind <em className="font-light text-clay">the short stuff.</em>
        </h1>
        <p className="animate-fade-up mt-4 max-w-lg text-muted-foreground">
          Nurses, carpenters, cartographers of small things. Every story here comes from someone
          writing in the margins of an ordinary week.
        </p>
      </section>

      <section className="mx-auto mt-12 grid max-w-6xl gap-6 px-5 sm:grid-cols-2 lg:grid-cols-3">
        {authors.map((a, i) => (
          <Link
            key={a.slug}
            to="/authors/$slug"
            params={{ slug: a.slug }}
            className="lift animate-fade-up group overflow-hidden rounded-xl border border-border bg-card"
            style={{ animationDelay: `${i * 70}ms` }}
          >
            <div className="h-28 overflow-hidden">
              <img
                src={a.cover}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-110"
              />
            </div>
            <div className="px-6 pb-6">
              <img
                src={a.avatar}
                alt={a.name}
                className="-mt-8 h-16 w-16 rounded-full ring-4 ring-card"
              />
              <h2 className="mt-4 font-display text-2xl">{a.name}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{a.tagline}</p>
              <div className="mt-5 flex items-center gap-5 border-t border-border pt-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="h-3.5 w-3.5" /> {storiesByAuthor(a.slug).length} stories
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5" /> {a.followers.toLocaleString()} followers
                </span>
                <ArrowRight className="ml-auto h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        ))}
      </section>

      <SiteFooter />
    </div>
  );
}
