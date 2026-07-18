import { HeroSection } from '@/components/marketing/hero-section';
import { Navbar } from '@/components/marketing/navbar';
import { PricingCards } from '@/components/marketing/pricing-cards';

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-16 px-6 py-8 lg:px-10">
      <Navbar />
      <HeroSection />
      <section className="grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-sky-300">How it works</p>
          <h2 className="text-3xl font-semibold text-white">From prompt to live project without losing control.</h2>
          <p className="text-slate-300">
            The scaffold separates conversion pages, secure auth, and the editor workspace so product teams can
            introduce real integrations incrementally.
          </p>
        </div>
        <div className="grid gap-4 text-sm text-slate-200 sm:grid-cols-3 lg:grid-cols-1">
          <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">Prompt orchestration with stream-safe UI hooks.</div>
          <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">Workspace shells ready for Supabase and Stripe wiring.</div>
          <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">Deploy actions staged behind typed Vercel adapters.</div>
        </div>
      </section>
      <PricingCards />
    </main>
  );
}
