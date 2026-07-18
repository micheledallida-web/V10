import { PricingCards } from '@/components/marketing/pricing-cards';

export default function PricingPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-6 py-12 lg:px-10">
      <header className="space-y-3">
        <p className="text-sm uppercase tracking-[0.3em] text-sky-300">Pricing</p>
        <h1 className="text-4xl font-semibold text-white">Subscription tiers scaffolded for Stripe checkout.</h1>
        <p className="max-w-3xl text-slate-300">
          Replace the placeholders with server actions or route handlers that create Stripe checkout sessions and
          customer portal links.
        </p>
      </header>
      <PricingCards showPlaceholders />
    </main>
  );
}
