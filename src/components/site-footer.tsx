import { Link } from "@tanstack/react-router";
import { LeafMark } from "./leaf-mark";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 md:flex-row md:items-center md:justify-between">
        <Link to="/" className="flex items-center gap-2.5 text-primary">
          <LeafMark className="h-6 w-6" />
          <span className="font-display text-base">storyvault</span>
        </Link>
        <p className="text-sm text-muted-foreground">Small stories. Big inner worlds.</p>
        <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
          <Link to="/about" className="underline-sweep hover:text-foreground">
            About
          </Link>
          <Link to="/contact" className="underline-sweep hover:text-foreground">
            Contact
          </Link>
          <Link to="/privacy" className="underline-sweep hover:text-foreground">
            Privacy
          </Link>
          <Link to="/terms" className="underline-sweep hover:text-foreground">
            Terms
          </Link>
          <Link to="/write" className="underline-sweep hover:text-foreground">
            For writers
          </Link>
          <Link to="/newsletter" className="underline-sweep hover:text-foreground">
            Newsletter
          </Link>
        </div>
      </div>
    </footer>
  );
}
