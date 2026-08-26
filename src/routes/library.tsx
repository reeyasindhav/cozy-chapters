import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { BookMarked } from "lucide-react";
import { RequireAuth } from "@/components/require-auth";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StoryCard } from "@/components/story-card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { getStory, stories } from "@/lib/data";

export const Route = createFileRoute("/library")({
  head: () => ({
    meta: [
      { title: "Your library — Storyvault" },
      {
        name: "description",
        content: "Every short story you saved, finished or want to read again — kept in one shelf.",
      },
      { property: "og:title", content: "Your library — Storyvault" },
      { property: "og:description", content: "Saved stories, finished reads and your own shelf." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <RequireAuth>
      <Library />
    </RequireAuth>
  ),
});

const tabs = ["Saved", "Finished", "Highlights"] as const;

function Library() {
  const { bookmarks } = useAuth();
  const [tab, setTab] = useState<(typeof tabs)[number]>("Saved");

  const savedStories = bookmarks.map((s) => getStory(s)).filter(Boolean);
  const finished = stories.slice(3, 7);
  const list = tab === "Saved" ? savedStories : tab === "Finished" ? finished : stories.slice(0, 2);

  return (
    <div className="paper min-h-screen">
      <SiteHeader />

      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="animate-fade-up">
          <p className="eyebrow flex items-center gap-2">
            <BookMarked className="h-3.5 w-3.5" /> Your shelf
          </p>
          <h1 className="mt-3 font-display text-4xl md:text-5xl">Library</h1>
          <p className="mt-3 max-w-md text-sm text-muted-foreground">
            Stories you've kept close. Nothing here disappears — read them whenever the mood lands.
          </p>
        </div>

        <div className="mt-8 flex gap-2">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-full px-5 py-2 text-sm transition-colors ${
                tab === t
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-background hover:bg-secondary"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {list.length === 0 ? (
          <div className="mt-14 rounded-2xl border border-dashed border-border py-20 text-center">
            <p className="font-display text-2xl">Your shelf is still empty</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Tap the bookmark on any story to keep it here.
            </p>
            <Link to="/discover" className="mt-6 inline-block">
              <Button className="rounded-full px-6">Find a story</Button>
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {list.map((s, i) => (
              <StoryCard key={s!.slug} story={s!} index={i} />
            ))}
          </div>
        )}
      </section>

      <SiteFooter />
    </div>
  );
}
