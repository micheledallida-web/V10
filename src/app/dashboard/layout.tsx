import type { ReactNode } from 'react';
import { SidebarNav } from '@/components/dashboard/sidebar-nav';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-h-screen bg-slate-950 text-slate-100 lg:grid-cols-[280px_1fr]">
      <aside className="border-b border-white/10 lg:border-b-0 lg:border-r">
        <SidebarNav />
      </aside>
      <main className="min-w-0">{children}</main>
    </div>
  );
}
