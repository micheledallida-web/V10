import { CreateModal } from '@/components/dashboard/create-modal';
import { ProjectCard } from '@/components/dashboard/project-card';

type ProjectSummary = {
  id: string;
  name: string;
  updatedAt: string;
  status: string;
};

async function getProjects(): Promise<ProjectSummary[]> {
  // TODO: replace with a Supabase server-side query or cached data loader.
  return [
    { id: 'alpha', name: 'Alpha Landing', updatedAt: '2 hours ago', status: 'Draft' },
    { id: 'beta', name: 'Beta Commerce', updatedAt: 'Yesterday', status: 'Deploying' },
    { id: 'gamma', name: 'Gamma Portal', updatedAt: '3 days ago', status: 'Live' },
  ];
}

export default async function DashboardPage() {
  const projects = await getProjects();

  return (
    <section className="space-y-8 px-6 py-8 lg:px-10">
      <header className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.3em] text-sky-300">Dashboard</p>
          <h1 className="text-3xl font-semibold text-white">Project control room</h1>
          <p className="text-slate-300">TODO: hydrate this grid from Supabase projects scoped to the authenticated workspace.</p>
        </div>
        <CreateModal />
      </header>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
