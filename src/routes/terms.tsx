import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Shield,
  UserPlus,
  FileText,
  AlertTriangle,
  Scale,
  RefreshCw,
  Mail,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Storyvault" },
      {
        name: "description",
        content:
          "Storyvault terms of service: what you can expect from us, what we expect from you, and the rules of the vault.",
      },
      { property: "og:title", content: "Terms of Service — Storyvault" },
      {
        property: "og:description",
        content: "Clear, readable terms of service for Storyvault.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Terms,
});

const sections = [
  {
    icon: UserPlus,
    title: "Acceptance of terms",
    body: "By using Storyvault, you agree to these terms. If you don’t agree, please don’t use the service. We may update these terms from time to time, and continued use means you accept the updated terms.",
  },
  {
    icon: Shield,
    title: "Accounts",
    body: "You’re responsible for what happens under your account. Please keep your login details safe and let us know if anything looks unusual. You must be at least 13 years old to create an account.",
  },
  {
    icon: FileText,
    title: "Content and ownership",
    body: "Writers keep full rights to their stories. By publishing on Storyvault, you grant us a limited license to display and distribute your content through the app and website. You may remove your work at any time.",
  },
  {
    icon: AlertTriangle,
    title: "Acceptable use",
    body: "No harassment, spam, hate speech, or harmful content. No automated scraping or republishing without permission. If you see something that breaks these terms, report it and we’ll take action promptly.",
  },
  {
    icon: Scale,
    title: "Disclaimer",
    body: "Storyvault is provided as-is. We don’t guarantee uninterrupted access or error-free content. To the fullest extent permitted by law, we’re not liable for indirect, incidental, or consequential damages arising from your use of the service.",
  },
  {
    icon: RefreshCw,
    title: "Changes to service",
    body: "We may modify, suspend, or discontinue parts of the service at any time. We’ll notify users of significant changes through the app or email when possible. Your continued use after changes constitutes acceptance.",
  },
];

function Terms() {
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
          <p className="eyebrow">Rules of the vault</p>
          <h1 className="mt-4 font-display text-5xl leading-tight md:text-6xl">
            Terms of <em className="font-light text-clay">service.</em>
          </h1>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
            These terms keep things fair for readers and writers. They’re written to be read, not to
            be hidden. By using Storyvault, you agree to these terms. If you have questions, just
            ask.
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
          <h2 className="mt-5 font-display text-3xl">Questions about these terms?</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
            We’re happy to clarify anything. If you have questions about account ownership, content
            rights, or acceptable use, reach out and we’ll respond promptly.
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
