import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, BookOpen, Heart, MapPin, Users } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { StoryCard } from "@/components/story-card";
import { getAuthor, storiesByAuthor } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/authors/$slug")({
  loader: ({ params }) => {
    const author = getAuthor(params.slug);
    if (!author) throw notFound();
    return { author };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Writer not found — Storyvault" }, { name: "robots", content: "noindex" }],
      };
    }
    const { author } = loaderData;
    return {
      meta: [
        { title: `${author.name} — Storyvault` },
        { name: "description", content: author.tagline },
        { property: "og:title", content: `${author.name} — Storyvault` },
        { property: "og:description", content: author.bio },
        { property: "og:image", content: author.cover },
        { name: "twitter:image", content: author.cover },
      ],
    };
  },
  component: AuthorPage,
});

function AuthorPage() {
  const { author } = Route.useLoaderData();
  const list = storiesByAuthor(author.slug);
  const [following, setFollowing] = useState(false);
  const totalMinutes = list.reduce((n, s) => n + s.minutes, 0);
  const totalClaps = list.reduce((n, s) => n + s.claps, 0);

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <div className="relative h-56 overflow-hidden md:h-72">
        <img src={author.cover} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
      </div>

      <section className="mx-auto -mt-16 max-w-5xl px-5">
        <Link
          to="/authors"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> All writers
        </Link>
        <div className="animate-fade-up flex flex-col gap-6 rounded-2xl border border-border bg-card p-8 md:flex-row md:items-center">
          <img
            src={author.avatar}
            alt={author.name}
            className="h-24 w-24 rounded-full ring-4 ring-background"
          />
          <div className="flex-1">
            <h1 className="font-display text-4xl">{author.name}</h1>
            <p className="mt-1 text-clay">{author.tagline}</p>
            <p className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" /> {author.location}
              </span>
              <span>Joined {author.joined}</span>
            </p>
          </div>
          <Button
            onClick={() => {
              setFollowing((f) => !f);
              toast(following ? `Unfollowed ${author.name}` : `Following ${author.name}`);
            }}
            variant={following ? "outline" : "default"}
            className="rounded-full px-7"
          >
            {following ? "Following" : "Follow"}
          </Button>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-4">
          {[
            { label: "Stories", value: list.length, icon: BookOpen },
            { label: "Followers", value: author.followers.toLocaleString(), icon: Users },
            { label: "Applause", value: totalClaps.toLocaleString(), icon: Heart },
            { label: "Minutes written", value: totalMinutes, icon: BookOpen },
          ].map((s, i) => (
            <div
              key={s.label}
              className="animate-fade-up rounded-xl border border-border bg-card p-5"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <s.icon className="h-4 w-4 text-clay" />
              <p className="mt-3 font-display text-2xl">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-xl bg-sand/50 p-8">
          <p className="eyebrow">In their words</p>
          <p className="mt-3 font-display text-xl italic leading-relaxed">{author.bio}</p>
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-6xl px-5">
        <h2 className="font-display text-3xl">Stories by {author.name.split(" ")[0]}</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((s, i) => (
            <StoryCard key={s.slug} story={s} index={i} />
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
