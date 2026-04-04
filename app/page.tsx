import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SignUpButton } from "@clerk/nextjs";
import {
  Link2,
  BarChart3,
  Shield,
  Zap,
  Globe,
  MousePointerClick,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    icon: Zap,
    title: "Instant Shortening",
    description:
      "Paste any long URL and get a short, shareable link in seconds. No sign-up required to try it out.",
  },
  {
    icon: BarChart3,
    title: "Click Analytics",
    description:
      "Track every click on your links. See how many people are clicking, and watch your reach grow in real time.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description:
      "Your links are protected behind your account. Only you can see, edit, or delete the links you create.",
  },
  {
    icon: Globe,
    title: "Works Everywhere",
    description:
      "Share your short links on social media, emails, messages, or anywhere else — they work on every device.",
  },
  {
    icon: MousePointerClick,
    title: "Easy Management",
    description:
      "View and manage all your links from a single dashboard. Edit destinations, copy links, or remove old ones.",
  },
  {
    icon: Link2,
    title: "Memorable Links",
    description:
      "Short links are easier to remember and share. Replace long, messy URLs with clean, concise alternatives.",
  },
];

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col flex-1">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center flex-1 gap-8 px-6 py-24 text-center">
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
          Shorten links.{" "}
          <span className="text-primary">Share smarter.</span>
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground">
          Turn long, unwieldy URLs into clean, trackable short links in seconds.
          Monitor clicks, manage your links, and grow your reach — all from one
          place.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <SignUpButton mode="modal" forceRedirectUrl="/dashboard">
            <Button size="lg" className="px-8">
              Get Started Free
            </Button>
          </SignUpButton>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-20 bg-muted/40">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to manage your links
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Simple, powerful tools built for individuals and teams.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, description }) => (
              <Card key={title}>
                <CardHeader>
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Ready to get started?
        </h2>
        <p className="mt-4 text-muted-foreground text-lg max-w-lg mx-auto">
          Create your free account today and start shortening links in under a
          minute.
        </p>
        <div className="mt-8">
          <SignUpButton mode="modal" forceRedirectUrl="/dashboard">
            <Button size="lg" className="px-10">
              Create Free Account
            </Button>
          </SignUpButton>
        </div>
      </section>
    </div>
  );
}
