'use client';

type TopbarProps = {
  canUndo: boolean;
  canRedo: boolean;
  isDeploying: boolean;
  statusMessage: string;
  onUndo: () => void;
  onRedo: () => void;
  onDeploy: () => void;
};

export function Topbar({ canUndo, canRedo, isDeploying, statusMessage, onUndo, onRedo, onDeploy }: TopbarProps) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/10 bg-white/5 px-5 py-4">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-sky-300">Editor controls</p>
        <p className="mt-1 text-sm text-slate-400">Undo/redo and deploy actions are wired to local history and a Vercel adapter placeholder.</p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <button className="rounded-xl border border-white/10 px-4 py-2 text-sm disabled:opacity-40" disabled={!canUndo} onClick={onUndo} type="button">
          Undo
        </button>
        <button className="rounded-xl border border-white/10 px-4 py-2 text-sm disabled:opacity-40" disabled={!canRedo} onClick={onRedo} type="button">
          Redo
        </button>
        <button className="rounded-xl bg-sky-400 px-4 py-2 text-sm font-medium text-slate-950" disabled={isDeploying} onClick={onDeploy} type="button">
          {isDeploying ? 'Deploying...' : 'Deploy preview'}
        </button>
      </div>
      <p className="w-full text-sm text-slate-400">{statusMessage}</p>
    </header>
  );
}
