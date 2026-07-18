import Link from 'next/link';

type ProjectCardProps = {
  project: {
    id: string;
    name: string;
    updatedAt: string;
    status: string;
  };
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-white">{project.name}</h2>
          <p className="mt-1 text-sm text-slate-400">Updated {project.updatedAt}</p>
        </div>
        <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.25em] text-slate-300">{project.status}</span>
      </div>
      <p className="text-sm text-slate-300">Continue iterating on the prompt-driven editor and deployment flow for this project.</p>
      <Link className="inline-flex rounded-xl bg-sky-400 px-4 py-3 font-medium text-slate-950" href={`/dashboard/project/${project.id}`}>
        Open editor
      </Link>
    </article>
  );
}
