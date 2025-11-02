"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Shield, Zap, Clock, Brain, Lock, Heart } from "lucide-react"

interface LandingPageProps {
  onGetStarted: () => void
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Navigation */}
      <nav className="border-b border-slate-200 bg-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">BrandName</span>
          </div>
          <Button onClick={onGetStarted} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Get Started
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold text-foreground mb-6 leading-tight">
              Welcome to <span className="text-primary">Your Next Big Idea</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-4 leading-relaxed">
              Build, grow, and scale your business effortlessly. Our platform helps you take your vision from concept to
              reality.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Smart tools, secure systems, and modern design — everything you need to create something extraordinary.
            </p>
            <Button
              onClick={onGetStarted}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            >
              Get Started Now
            </Button>
          </div>

          <div className="relative">
            <div className="bg-primary/10 rounded-2xl p-8 h-96 flex items-center justify-center">
              <div className="text-center">
                <Heart className="w-24 h-24 text-primary mx-auto mb-4 opacity-20" />
                <p className="text-muted-foreground">Your success starts here.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-foreground mb-4 text-center">Features You'll Love</h2>
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Everything you need to launch, manage, and grow — all in one place.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Zap className="w-7 h-7 text-primary" />}
              title="Fast & Efficient"
              desc="Experience blazing performance and instant results with our optimized systems."
            />
            <FeatureCard
              icon={<Clock className="w-7 h-7 text-secondary" />}
              title="Time-Saving Tools"
              desc="Automate repetitive tasks and focus on what really matters — growth."
            />
            <FeatureCard
              icon={<Brain className="w-7 h-7 text-primary" />}
              title="Smart Insights"
              desc="Leverage intelligent analytics to make better decisions every step of the way."
            />
            <FeatureCard
              icon={<Heart className="w-7 h-7 text-secondary" />}
              title="User-Centered Design"
              desc="Beautiful, intuitive, and made for humans. Enjoy a seamless experience."
            />
            <FeatureCard
              icon={<Shield className="w-7 h-7 text-primary" />}
              title="Secure by Design"
              desc="Your data is protected with enterprise-grade encryption and privacy standards."
            />
            <FeatureCard
              icon={<Lock className="w-7 h-7 text-secondary" />}
              title="Reliable Support"
              desc="Get expert assistance whenever you need it, from setup to scaling."
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-foreground mb-4 text-center">How It Works</h2>
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Get started in just 4 simple steps
          </p>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { num: 1, title: "Sign Up", desc: "Create your free account" },
              { num: 2, title: "Customize", desc: "Set up your preferences and branding" },
              { num: 3, title: "Launch", desc: "Deploy your product or service effortlessly" },
              { num: 4, title: "Grow", desc: "Track progress and scale with insights" },
            ].map((step) => (
              <div key={step.num} className="text-center">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.num}
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="bg-slate-50 border-t border-slate-200 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border-2 border-yellow-200 rounded-lg p-8">
            <div className="flex gap-4">
              <AlertIcon className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-foreground mb-3">Disclaimer</h3>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  <strong>Note:</strong> This is a demo landing page with placeholder content. Replace text and assets
                  with your own branding before production use.
                </p>
                <p className="text-muted-foreground text-sm italic">
                  © All product names, logos, and brands are property of their respective owners.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="bg-white border-t border-slate-200 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Start Building Today</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Launch your next big project with confidence. Simple, fast, and scalable.
          </p>
          <Button
            onClick={onGetStarted}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
          >
            Get Started
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-400">© 2025 BrandName. Built for the future.</p>
        </div>
      </footer>
    </div>
  )
}

/* Components */

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode
  title: string
  desc: string
}) {
  return (
    <Card className="border border-slate-200 p-8 hover:shadow-lg transition-shadow">
      <div className="bg-primary/10 w-14 h-14 rounded-lg flex items-center justify-center mb-6">{icon}</div>
      <h3 className="text-xl font-bold text-foreground mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{desc}</p>
    </Card>
  )
}

function AlertIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  )
}
