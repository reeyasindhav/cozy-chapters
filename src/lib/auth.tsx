import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

export type User = {
  name: string;
  email: string;
  avatar: string;
};

type AuthState = {
  user: User | null;
  ready: boolean;
  signIn: (email: string, name?: string) => void;
  signOut: () => void;
  bookmarks: string[];
  toggleBookmark: (slug: string) => void;
};

const KEY = "storyvault.session";
const BM_KEY = "storyvault.bookmarks";

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setUser(JSON.parse(raw) as User);
      const bm = localStorage.getItem(BM_KEY);
      if (bm) setBookmarks(JSON.parse(bm) as string[]);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const signIn = useCallback((email: string, name?: string) => {
    const next: User = {
      email,
      name: name?.trim() || email.split("@")[0].replace(/[._-]/g, " "),
      avatar: "https://i.pravatar.cc/200?img=15",
    };
    localStorage.setItem(KEY, JSON.stringify(next));
    setUser(next);
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(KEY);
    setUser(null);
  }, []);

  const toggleBookmark = useCallback((slug: string) => {
    setBookmarks((prev) => {
      const next = prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug];
      localStorage.setItem(BM_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ user, ready, signIn, signOut, bookmarks, toggleBookmark }),
    [user, ready, signIn, signOut, bookmarks, toggleBookmark],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
