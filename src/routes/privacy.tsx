import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Shield,
  Lock,
  Cookie,
  UserCheck,
  Trash2,
  Mail,
  FileText,
  Eye,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Storyvault" },
      {
        name: "description",
        content:
          "How Storyvault handles your data, cookies, reading history, and email preferences. Transparent, readable, and honest.",
      },
      { property: "og:title", content: "Privacy Policy — Storyvault" },
      {
        property: "og:description",
        content: "Transparent privacy policy for Storyvault.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Privacy,
});

const sections = [
  {
    icon: FileText,
    title: "What we collect",
    body: "Your account email, display name, reading streak, saved stories, bookmarks, and any notes you add. We also collect minimal usage data like page views and feature interactions to improve the experience.",
  },
  {
    icon: Eye,
    title: "How we use it",
    body: "We use your data only to run the app: show your library, keep your streak, personalize recommendations, and send the newsletter if you asked for it. We don’t profile you, sell your data, or show targeted ads.",
  },
  {
    icon: Cookie,
    title: "Cookies",
    body: "We use essential cookies for login, session management, and preferences only. No marketing cookies, no cross-site trackers, no third-party ad pixels. You can disable cookies in your browser, but some features may not work.",
  },
  {
    icon: UserCheck,
    title: "Your rights",
    body: "You can update your profile anytime in Settings. You can unsubscribe from the newsletter in one click. You can export your saved stories and reading history. You can delete your account permanently at any time.",
  },
  {
    icon: Trash2,
    title: "Data deletion",
    body: "When you delete your account, we remove your personal information, reading history, bookmarks, and saved stories within 30 days. Some anonymized usage data may be retained for analytics purposes only.",
  },
  {
    icon: Lock,
    title: "Security",
    body: "We use industry-standard encryption and security practices to protect your data. Access to personal information is restricted to authorized personnel only. We regularly audit our systems for vulnerabilities.",
  },
];

function Privacy() {
  return (
    <div className="paper min-h-screen">
      <SiteHeader />

      <section className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <div className="animate-fade-up">
          <Link
            to="/about"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground underline-sweep hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to about
          </Link>
          <p className="eyebrow">Your data</p>
          <h1 className="mt-4 font-display text-5xl leading-tight md:text-6xl">
            Privacy, <em className="font-light text-clay">simplified.</em>
          </h1>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
            We keep the boring legal stuff short and readable. This page explains what we collect,
            why we collect it, and what we will never do with it. No jargon, no loopholes.
          </p>
          <p className="mt-3 text-xs text-muted-foreground">Last updated: August 2026</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20">
        <div className="grid gap-5 md:grid-cols-2">
          {sections.map((section, i) => (
            <div
              key={section.title}
              className="animate-fade-up lift rounded-xl border border-border bg-card p-8"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-moss">
                <section.icon className="h-5 w-5 text-primary" />
              </span>
              <h2 className="mt-5 font-display text-xl">{section.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{section.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 animate-fade-up rounded-2xl border border-border bg-card p-10 text-center">
          <Mail className="mx-auto h-10 w-10 text-primary" />
          <h2 className="mt-5 font-display text-3xl">Questions about your data?</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
            We read every message. If you have concerns about your privacy, want to request a data
            export, or need help with account deletion, reach out directly.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href="mailto:hello@storyvault.app">
              <Button className="rounded-full px-7" size="lg">
                Email us
              </Button>
            </a>
            <Link to="/contact">
              <Button variant="outline" className="rounded-full px-7 bg-background" size="lg">
                Contact form
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
