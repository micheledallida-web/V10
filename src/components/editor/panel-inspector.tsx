'use client';

type PanelInspectorProps = {
  activeSelection: string | null;
};

export function PanelInspector({ activeSelection }: PanelInspectorProps) {
  return (
    <section className="flex h-full flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-5">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-sky-300">Inspector</p>
        <h2 className="mt-2 text-xl font-semibold text-white">Spacing and layout controls</h2>
      </div>
      <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-sm text-slate-300">
        Active selection: <span className="font-medium text-white">{activeSelection ?? 'None'}</span>
      </div>
      {['Padding', 'Gap', 'Max width'].map((field) => (
        <label key={field} className="block space-y-2 text-sm text-slate-200">
          <span>{field}</span>
          <input className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3" placeholder="TODO: bind inspector controls to selected node styles" type="text" />
        </label>
      ))}
    </section>
  );
}
