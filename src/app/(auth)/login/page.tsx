export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <section className="w-full max-w-md space-y-6 rounded-3xl border border-white/10 bg-slate-950/60 p-8">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.3em] text-sky-300">Welcome back</p>
          <h1 className="text-3xl font-semibold text-white">Sign in to continue building.</h1>
          <p className="text-sm text-slate-400">TODO: connect Supabase email/password auth and Google OAuth handlers.</p>
        </div>
        <form className="space-y-4">
          <label className="block space-y-2 text-sm text-slate-200">
            <span>Email</span>
            <input className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3" type="email" placeholder="team@example.com" />
          </label>
          <label className="block space-y-2 text-sm text-slate-200">
            <span>Password</span>
            <input className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3" type="password" placeholder="••••••••" />
          </label>
          <button className="w-full rounded-xl bg-sky-400 px-4 py-3 font-medium text-slate-950" type="button">
            Continue with Supabase
          </button>
          <button className="w-full rounded-xl border border-white/10 px-4 py-3 font-medium text-white" type="button">
            Continue with Google
          </button>
        </form>
      </section>
    </main>
  );
}
