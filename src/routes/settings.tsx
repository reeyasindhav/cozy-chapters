import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, BookOpen, Trash2, User } from "lucide-react";
import { RequireAuth } from "@/components/require-auth";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Storyvault" },
      {
        name: "description",
        content: "Manage your Storyvault account, profile, and preferences.",
      },
      { property: "og:title", content: "Settings — Storyvault" },
      { property: "og:description", content: "Manage your Storyvault account and preferences." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState(user?.name ?? "");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (user?.name) setName(user.name);
  }, [user?.name]);

  const onSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      toast("Profile updated");
      setSaving(false);
    }, 400);
  };

  const onDeleteAccount = () => {
    setDeleting(true);
    setTimeout(() => {
      signOut();
      toast("Account deleted");
      navigate({ to: "/" });
    }, 500);
  };

  return (
    <div className="paper min-h-screen">
      <SiteHeader />

      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="animate-fade-up">
          <Link
            to="/dashboard"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground underline-sweep hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to dashboard
          </Link>
          <p className="eyebrow">Your account</p>
          <h1 className="mt-3 font-display text-4xl md:text-5xl">Settings</h1>
          <p className="mt-3 max-w-md text-sm text-muted-foreground">
            Manage your profile and account preferences.
          </p>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-[1fr_1.2fr]">
          <div className="animate-fade-up rounded-xl border border-border bg-card p-8">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-moss">
                <User className="h-7 w-7 text-primary" />
              </div>
              <div>
                <p className="font-display text-xl">{user?.name}</p>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
            </div>
            <div className="mt-6 space-y-2 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Member since 2025
              </p>
              <p>Reading streak: 5 days</p>
              <p>Saved stories: see your library</p>
            </div>
          </div>

          <div className="space-y-8">
            <form
              onSubmit={onSaveProfile}
              className="animate-fade-up rounded-xl border border-border bg-card p-8"
            >
              <h2 className="font-display text-2xl">Profile</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Update your display name and email address.
              </p>
              <div className="mt-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Display name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={user?.email ?? ""} disabled />
                  <p className="text-xs text-muted-foreground">
                    Email changes are not supported in demo mode.
                  </p>
                </div>
                <Button type="submit" disabled={saving} className="rounded-full">
                  {saving ? "Saving…" : "Save changes"}
                </Button>
              </div>
            </form>

            <div className="animate-fade-up rounded-xl border border-border bg-card p-8">
              <h2 className="font-display text-2xl">Danger zone</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Once you delete your account, there is no going back. Your saved stories and streak
                will be removed permanently.
              </p>
              <Button
                type="button"
                variant="destructive"
                disabled={deleting}
                onClick={onDeleteAccount}
                className="mt-6 rounded-full"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                {deleting ? "Deleting…" : "Delete account"}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
