'use client';

type CanvasProps = {
  html: string;
  onSelect: (selection: string | null) => void;
};

export function Canvas({ html, onSelect }: CanvasProps) {
  return (
    <section className="flex h-full flex-col gap-4 rounded-3xl border border-white/10 bg-slate-950/60 p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-sky-300">Canvas</p>
          <h2 className="mt-2 text-xl font-semibold text-white">Sandboxed iframe preview</h2>
        </div>
        <button className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white" onClick={() => onSelect('root-frame')} type="button">
          Select frame
        </button>
      </div>
      <iframe className="min-h-[65vh] w-full rounded-2xl border border-white/10 bg-white" sandbox="allow-scripts" srcDoc={html} title="Project canvas preview" />
    </section>
  );
}
