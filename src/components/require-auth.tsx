import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { LeafMark } from "@/components/leaf-mark";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";

export function RequireAuth({ children }: { children: ReactNode }) {
  const { user, ready } = useAuth();

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LeafMark className="h-10 w-10 animate-float text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="paper flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <LeafMark className="h-10 w-10 text-primary" />
        <h1 className="mt-6 font-display text-3xl">This shelf is yours alone</h1>
        <p className="mt-3 max-w-sm text-sm text-muted-foreground">
          Sign in to see your reading streak, saved stories and drafts.
        </p>
        <div className="mt-7 flex gap-3">
          <Link to="/login">
            <Button className="rounded-full px-6">Sign in</Button>
          </Link>
          <Link to="/signup">
            <Button variant="outline" className="rounded-full bg-background px-6">
              Create account
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
