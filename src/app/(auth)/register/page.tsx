export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <section className="w-full max-w-2xl space-y-6 rounded-3xl border border-white/10 bg-slate-950/60 p-8">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.3em] text-sky-300">Create account</p>
          <h1 className="text-3xl font-semibold text-white">Start the onboarding flow.</h1>
          <p className="text-sm text-slate-400">TODO: connect registration, workspace bootstrap, and post-signup provisioning.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block space-y-2 text-sm text-slate-200">
            <span>Workspace name</span>
            <input className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3" type="text" placeholder="Acme Studio" />
          </label>
          <label className="block space-y-2 text-sm text-slate-200">
            <span>Owner email</span>
            <input className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3" type="email" placeholder="owner@example.com" />
          </label>
          <label className="block space-y-2 text-sm text-slate-200 md:col-span-2">
            <span>Product goal</span>
            <textarea className="min-h-28 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3" placeholder="Describe the app you want to generate and ship." />
          </label>
        </div>
        <button className="rounded-xl bg-sky-400 px-4 py-3 font-medium text-slate-950" type="button">
          Create workspace
        </button>
      </section>
    </main>
  );
}
