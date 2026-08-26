import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Mail, MessageSquare, Send } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Storyvault" },
      {
        name: "description",
        content: "Get in touch with Storyvault. We read every message.",
      },
      { property: "og:title", content: "Contact — Storyvault" },
      {
        property: "og:description",
        content: "Get in touch with the Storyvault team.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setTimeout(() => {
      toast("Message sent. We’ll be in touch.");
      setName("");
      setEmail("");
      setMessage("");
      setBusy(false);
    }, 500);
  };

  return (
    <div className="paper min-h-screen">
      <SiteHeader />

      <section className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <p className="eyebrow animate-fade-up">Get in touch</p>
            <h1 className="animate-fade-up mt-4 font-display text-5xl leading-tight md:text-6xl">
              Say <em className="font-light text-clay">hello.</em>
            </h1>
            <p className="animate-fade-up mt-6 text-[15px] leading-relaxed text-muted-foreground">
              Questions, ideas, or just want to say hi? We read every message. If you’re a writer
              with a story idea, we’d especially love to hear from you.
            </p>

            <div className="mt-10 space-y-6">
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-moss">
                  <Mail className="h-4.5 w-4.5 text-primary" />
                </span>
                <div>
                  <p className="text-sm font-semibold">Email</p>
                  <p className="text-sm text-muted-foreground">hello@storyvault.app</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-moss">
                  <MessageSquare className="h-4.5 w-4.5 text-primary" />
                </span>
                <div>
                  <p className="text-sm font-semibold">Response time</p>
                  <p className="text-sm text-muted-foreground">Usually within 24 hours</p>
                </div>
              </div>
            </div>
          </div>

          <div className="animate-fade-up">
            <form onSubmit={onSubmit} className="rounded-xl border border-border bg-card p-8">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    required
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    required
                    placeholder="Tell us what’s on your mind"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="min-h-[140px]"
                  />
                </div>
                <Button type="submit" disabled={busy} className="w-full rounded-full" size="lg">
                  {busy ? "Sending…" : "Send message"}
                  {!busy && <Send className="ml-1 h-4 w-4" />}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
