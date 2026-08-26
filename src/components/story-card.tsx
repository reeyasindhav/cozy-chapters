import { Link } from "@tanstack/react-router";
import { ArrowRight, Bookmark, Clock } from "lucide-react";
import { getAuthor, type Story } from "@/lib/data";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

export function StoryCard({ story, index = 0 }: { story: Story; index?: number }) {
  const author = getAuthor(story.author)!;
  const { bookmarks, toggleBookmark } = useAuth();
  const saved = bookmarks.includes(story.slug);

  return (
    <article
      className="lift animate-fade-up group flex flex-col overflow-hidden rounded-xl border border-border bg-card"
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
        <img
          src={story.cover}
          alt={story.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
        />
        <button
          onClick={() => {
            toggleBookmark(story.slug);
            toast(saved ? "Removed from your library" : "Saved to your library");
          }}
          aria-label="Save story"
          className="absolute right-3 top-3 rounded-full bg-background/90 p-2 text-foreground shadow-soft transition-transform hover:scale-110"
        >
          <Bookmark className={`h-4 w-4 ${saved ? "fill-current text-primary" : ""}`} />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between">
          <span className="eyebrow">{story.mood}</span>
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5" /> {story.minutes} min read
          </span>
        </div>
        <h3 className="mt-3 text-xl leading-snug">
          <Link to="/stories/$slug" params={{ slug: story.slug }} className="underline-sweep">
            {story.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{story.excerpt}</p>

        <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
          <Link
            to="/authors/$slug"
            params={{ slug: author.slug }}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <img src={author.avatar} alt={author.name} className="h-7 w-7 rounded-full" />
            {author.name}
          </Link>
          <Link
            to="/stories/$slug"
            params={{ slug: story.slug }}
            className="flex items-center gap-1.5 text-sm font-semibold text-primary"
          >
            Read
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
