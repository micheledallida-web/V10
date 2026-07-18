'use client';

import { useState } from 'react';

export function CreateModal() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button className="rounded-xl bg-sky-400 px-4 py-3 font-medium text-slate-950" onClick={() => setOpen(true)} type="button">
        New project
      </button>
      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4" role="dialog" aria-modal="true">
          <div className="w-full max-w-lg space-y-4 rounded-3xl border border-white/10 bg-slate-950 p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-white">Create a new project</h2>
                <p className="text-sm text-slate-400">TODO: persist project metadata and create a Supabase row.</p>
              </div>
              <button className="text-sm text-slate-400" onClick={() => setOpen(false)} type="button">
                Close
              </button>
            </div>
            <label className="block space-y-2 text-sm text-slate-200">
              <span>Project name</span>
              <input className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3" type="text" placeholder="Launch campaign site" />
            </label>
            <label className="block space-y-2 text-sm text-slate-200">
              <span>Initial prompt</span>
              <textarea className="min-h-32 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3" placeholder="Describe the product, audience, and launch goal." />
            </label>
            <button className="rounded-xl bg-white px-4 py-3 font-medium text-slate-950" type="button">
              Save draft
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
