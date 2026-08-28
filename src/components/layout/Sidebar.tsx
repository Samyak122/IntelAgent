import { cn } from '@/lib/utils';
import { useApp } from '@/context/AppContext';
import {
  LayoutDashboard, Bot, Building2, FileText, Newspaper, Shield,
  TrendingUp, BellRing, FileBarChart, Database, Settings,
  BrainCircuit, LogOut, X,
} from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'agent', label: 'AI Agent', icon: Bot },
  { id: 'competitors', label: 'Competitors', icon: Building2 },
  { id: 'research', label: 'Research', icon: FileText },
  { id: 'news', label: 'News', icon: Newspaper },
  { id: 'patents', label: 'Patents', icon: Shield },
  { id: 'trends', label: 'Trends', icon: TrendingUp },
  { id: 'alerts', label: 'Alerts', icon: BellRing },
  { id: 'reports', label: 'Reports', icon: FileBarChart },
  { id: 'sources', label: 'Sources', icon: Database },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ mobileOpen, onClose }: { mobileOpen: boolean; onClose: () => void }) {
  const { page, setPage, unreadAlerts, agentActive, logout } = useApp();
  const handleNav = (id: string) => { setPage(id); onClose(); };

  return (
    <>
      {mobileOpen && <div className="fixed inset-0 bg-navy-950/40 z-40 lg:hidden" onClick={onClose} />}
      <aside
        className={cn(
          'fixed lg:sticky top-0 z-50 lg:z-30 h-screen w-64 shrink-0 flex flex-col bg-[hsl(var(--navy-950))] text-white transition-transform duration-300',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="flex items-center justify-between px-5 h-16 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/30">
              <BrainCircuit className="h-5 w-5 text-white" />
            </div>
            <div className="leading-tight">
              <div className="font-display font-bold text-base tracking-tight">IntelAgent</div>
              <div className="text-[10px] text-white/50 font-medium uppercase tracking-wider">AI Intelligence</div>
            </div>
          </div>
          <button className="lg:hidden text-white/70 hover:text-white" onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto scrollbar-thin px-3 py-4 space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = page === item.id || (item.id === 'competitors' && page === 'competitor-detail');
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={cn(
                  'group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
                  active ? 'bg-gradient-to-r from-primary/90 to-accent/80 text-white shadow-lg shadow-primary/20' : 'text-white/60 hover:bg-white/5 hover:text-white'
                )}
              >
                <Icon className={cn('h-[18px] w-[18px] shrink-0', active ? 'text-white' : 'text-white/50 group-hover:text-white')} />
                <span className="flex-1 text-left">{item.label}</span>
                {item.id === 'alerts' && unreadAlerts > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-bold text-white">{unreadAlerts}</span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-3 border-t border-white/10 shrink-0">
          <div className="rounded-xl bg-white/5 p-3 mb-2">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-white/50">Agent Status</span>
              <span className={cn('flex items-center gap-1 text-[10px] font-bold', agentActive ? 'text-emerald-400' : 'text-white/40')}>
                <span className={cn('h-1.5 w-1.5 rounded-full', agentActive ? 'bg-emerald-400 animate-pulse' : 'bg-white/30')} />
                {agentActive ? 'ACTIVE' : 'PAUSED'}
              </span>
            </div>
            <p className="text-[11px] text-white/50 leading-snug">Continuously monitoring intelligence sources</p>
          </div>
          <button onClick={logout} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/60 hover:bg-white/5 hover:text-white transition-all">
            <LogOut className="h-[18px] w-[18px]" /> Sign out
          </button>
        </div>
      </aside>
    </>
  );
}
