import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Bookmark, Clock, Heart, Share2 } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { StoryCard } from "@/components/story-card";
import { getAuthor, getStory, stories } from "@/lib/data";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/stories/$slug")({
  loader: ({ params }) => {
    const story = getStory(params.slug);
    if (!story) throw notFound();
    return { story };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Story not found — Storyvault" }, { name: "robots", content: "noindex" }],
      };
    }
    const { story } = loaderData;
    return {
      meta: [
        { title: `${story.title} — Storyvault` },
        { name: "description", content: story.excerpt },
        { property: "og:title", content: `${story.title} — Storyvault` },
        { property: "og:description", content: story.excerpt },
        { property: "og:image", content: story.cover },
        { name: "twitter:image", content: story.cover },
      ],
    };
  },
  component: StoryPage,
});

function StoryPage() {
  const { story } = Route.useLoaderData();
  const author = getAuthor(story.author)!;
  const { bookmarks, toggleBookmark } = useAuth();
  const saved = bookmarks.includes(story.slug);
  const [progress, setProgress] = useState(0);
  const [clapped, setClapped] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      setProgress((h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const more = stories.filter((s) => s.slug !== story.slug && s.mood === story.mood).slice(0, 3);

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="fixed left-0 top-16 z-40 h-0.5 w-full bg-transparent">
        <div
          className="h-full bg-clay transition-[width] duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      <article className="mx-auto max-w-3xl px-5 pt-12">
        <Link
          to="/discover"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to the vault
        </Link>

        <header className="animate-fade-up mt-8">
          <div className="flex items-center gap-4">
            <span className="eyebrow">{story.mood}</span>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" /> {story.minutes} min read
            </span>
            <span className="text-xs text-muted-foreground">{story.published}</span>
          </div>
          <h1 className="mt-4 font-display text-4xl leading-tight md:text-5xl">{story.title}</h1>
          <p className="mt-4 text-lg italic text-muted-foreground">{story.excerpt}</p>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-border py-4">
            <Link
              to="/authors/$slug"
              params={{ slug: author.slug }}
              className="flex items-center gap-3"
            >
              <img src={author.avatar} alt={author.name} className="h-10 w-10 rounded-full" />
              <span>
                <span className="block text-sm font-semibold">{author.name}</span>
                <span className="block text-xs text-muted-foreground">{author.tagline}</span>
              </span>
            </Link>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  toggleBookmark(story.slug);
                  toast(saved ? "Removed from your library" : "Saved to your library");
                }}
                className="rounded-full border border-border p-2 transition-colors hover:bg-secondary"
                aria-label="Save"
              >
                <Bookmark className={`h-4 w-4 ${saved ? "fill-current text-primary" : ""}`} />
              </button>
              <button
                onClick={() => toast("Link copied to clipboard")}
                className="rounded-full border border-border p-2 transition-colors hover:bg-secondary"
                aria-label="Share"
              >
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </header>

        <img
          src={story.cover}
          alt={story.title}
          className="animate-fade-in mt-10 aspect-[16/9] w-full rounded-xl object-cover"
        />

        <div className="mt-12 space-y-6">
          {story.body.map((p, i) => (
            <p
              key={i}
              className={`text-[1.0625rem] leading-[1.85] text-foreground/90 ${
                i === 0
                  ? "first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-6xl first-letter:leading-[0.8] first-letter:text-clay"
                  : ""
              }`}
            >
              {p}
            </p>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {story.tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground"
            >
              #{t}
            </span>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center gap-4 rounded-xl bg-card p-6">
          <button
            onClick={() => {
              setClapped((c) => !c);
              toast(clapped ? "Applause withdrawn" : "Thanks for the applause!");
            }}
            className="flex items-center gap-2 rounded-full border border-border px-5 py-2 text-sm transition-transform hover:scale-105"
          >
            <Heart className={`h-4 w-4 ${clapped ? "fill-clay text-clay" : ""}`} />
            {story.claps + (clapped ? 1 : 0)}
          </button>
          <span className="text-sm text-muted-foreground">
            Enjoyed this? Follow {author.name.split(" ")[0]}.
          </span>
        </div>

        <div className="mt-10 flex flex-col gap-5 rounded-xl border border-border bg-moss/50 p-8 sm:flex-row sm:items-center">
          <img src={author.avatar} alt="" className="h-16 w-16 rounded-full" />
          <div className="flex-1">
            <p className="eyebrow">About the writer</p>
            <h3 className="mt-1 font-display text-2xl">{author.name}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{author.bio}</p>
          </div>
          <Link to="/authors/$slug" params={{ slug: author.slug }}>
            <Button variant="outline" className="rounded-full bg-background">
              Profile <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </article>

      <section className="mx-auto mt-20 max-w-6xl px-5">
        <p className="eyebrow">More {story.mood.toLowerCase()} stories</p>
        <h2 className="mt-2 font-display text-3xl">If you liked this one</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {more.map((s, i) => (
            <StoryCard key={s.slug} story={s} index={i} />
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
