import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { LeafMark } from "./leaf-mark";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/discover", label: "Discover" },
  { to: "/authors", label: "Authors" },
  { to: "/collections", label: "Collections" },
  { to: "/about", label: "About" },
] as const;

export function SiteHeader() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link to="/" className="flex items-center gap-2.5 text-primary">
          <LeafMark className="h-7 w-7" />
          <span className="font-display text-lg tracking-tight">storyvault</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="underline-sweep text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            aria-label="Search stories"
            onClick={() => navigate({ to: "/discover" })}
            className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <Search className="h-4 w-4" />
          </button>

          {user ? (
            <div className="hidden items-center gap-2 md:flex">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm" className="rounded-full">
                  Dashboard
                </Button>
              </Link>
              <button
                onClick={() => {
                  signOut();
                  navigate({ to: "/" });
                }}
                className="h-9 w-9 overflow-hidden rounded-full ring-1 ring-border transition-transform hover:scale-105"
                title="Sign out"
              >
                <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
              </button>
            </div>
          ) : (
            <Link to="/login" className="hidden md:block">
              <Button variant="outline" size="sm" className="rounded-full px-5">
                Sign in
              </Button>
            </Link>
          )}

          <button
            className="rounded-full p-2 text-foreground md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="animate-fade-in border-t border-border bg-background px-5 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="text-sm text-muted-foreground"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to={user ? "/dashboard" : "/login"}
              onClick={() => setOpen(false)}
              className="text-sm font-semibold text-primary"
            >
              {user ? "Dashboard" : "Sign in"}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
