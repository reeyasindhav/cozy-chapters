import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, Search, Settings, X } from "lucide-react";
import { LeafMark } from "./leaf-mark";
import { LogoutIcon } from "./logout-icon";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const nav = [
  { to: "/discover", label: "Discover" },
  { to: "/authors", label: "Authors" },
  { to: "/collections", label: "Collections" },
] as const;

export function SiteHeader() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  return (
    <>
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
                <Link to="/settings">
                  <Button variant="ghost" size="sm" className="rounded-full">
                    <Settings className="mr-1.5 h-4 w-4" />
                    Settings
                  </Button>
                </Link>
                <button
                  onClick={() => setLogoutOpen(true)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                  title="Sign out"
                >
                  <LogoutIcon className="h-4 w-4" />
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
              {user && (
                <Link
                  to="/settings"
                  onClick={() => setOpen(false)}
                  className="text-sm text-muted-foreground"
                >
                  Settings
                </Link>
              )}
              {user && (
                <button
                  onClick={() => setLogoutOpen(true)}
                  className="text-left text-sm text-muted-foreground"
                >
                  Sign out
                </button>
              )}
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

      <Dialog open={logoutOpen} onOpenChange={setLogoutOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign out?</DialogTitle>
            <DialogDescription>
              You’ll need to sign in again to access your shelf, streak, and saved stories.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setLogoutOpen(false)} className="rounded-full">
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                signOut();
                setLogoutOpen(false);
                navigate({ to: "/" });
              }}
              className="rounded-full"
            >
              Sign out
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
