import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { useApp } from '@/context/AppContext';
import type { AgentEvent } from '@/data/mock-data';
import { Brain, Search, BarChart3, GitBranch, Lightbulb, BellRing, CheckCircle2, Activity } from 'lucide-react';

const typeIcon: Record<AgentEvent['type'], React.ReactNode> = {
  planning: <Brain className="h-3.5 w-3.5" />,
  collection: <Search className="h-3.5 w-3.5" />,
  analysis: <BarChart3 className="h-3.5 w-3.5" />,
  decision: <GitBranch className="h-3.5 w-3.5" />,
  insight: <Lightbulb className="h-3.5 w-3.5" />,
  alert: <BellRing className="h-3.5 w-3.5" />,
  replan: <GitBranch className="h-3.5 w-3.5" />,
};

const typeColor: Record<AgentEvent['type'], string> = {
  planning: 'bg-violet-100 text-violet-700',
  collection: 'bg-blue-100 text-blue-700',
  analysis: 'bg-cyan-100 text-cyan-700',
  decision: 'bg-indigo-100 text-indigo-700',
  insight: 'bg-amber-100 text-amber-700',
  alert: 'bg-red-100 text-red-700',
  replan: 'bg-orange-100 text-orange-700',
};

export function AgentActivityPanel({ compact = false }: { compact?: boolean }) {
  const { liveEvents, agentActive } = useApp();
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-primary" />
          <h3 className="font-display font-semibold text-sm">Agent Activity</h3>
        </div>
        <div className="flex items-center gap-1.5">
          <span className={cn('relative flex h-2 w-2', agentActive && 'animate-pulse')}>
            <span className={cn('absolute inline-flex h-full w-full rounded-full opacity-75', agentActive ? 'bg-success animate-pulse-ring' : 'bg-muted-foreground')} />
            <span className={cn('relative inline-flex rounded-full h-2 w-2', agentActive ? 'bg-success' : 'bg-muted-foreground')} />
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            {agentActive ? 'Live' : 'Paused'}
          </span>
        </div>
      </div>
      <div className={cn('flex-1 overflow-y-auto scrollbar-thin px-2 py-2 space-y-1', compact ? 'max-h-72' : '')}>
        {liveEvents.length === 0 && (
          <div className="text-xs text-muted-foreground px-2 py-4 text-center">Waiting for agent activity…</div>
        )}
        {liveEvents.map((evt) => (
          <div key={evt.id} className="flex items-start gap-2 px-2 py-1.5 rounded-lg hover:bg-muted/60 transition-colors animate-slide-in-right">
            <span className={cn('flex h-6 w-6 shrink-0 items-center justify-center rounded-md', typeColor[evt.type])}>
              {typeIcon[evt.type]}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-foreground leading-snug">{evt.message}</p>
              <span className="text-[10px] text-muted-foreground tabular-nums">{evt.timestamp}</span>
            </div>
            <CheckCircle2 className="h-3 w-3 text-success shrink-0 mt-0.5" />
          </div>
        ))}
      </div>
    </div>
  );
}

const simulationTemplates: Omit<AgentEvent, 'id'>[] = [
  { type: 'collection', message: 'New research discovered: "Streaming transformer for low-resource translation"', timestamp: '' },
  { type: 'collection', message: 'New news article discovered via GDELT', timestamp: '' },
  { type: 'collection', message: 'New patent discovered from Patent Mirror', timestamp: '' },
  { type: 'analysis', message: 'Competitor update detected: NVIDIA product launch', timestamp: '' },
  { type: 'analysis', message: 'Trend detected: Multilingual AI activity rising', timestamp: '' },
  { type: 'analysis', message: 'Agent analysis started on 3 new items', timestamp: '' },
  { type: 'decision', message: 'Agent decision completed: prioritize multilingual AI', timestamp: '' },
  { type: 'alert', message: 'Alert generated: Google patent spike +47%', timestamp: '' },
  { type: 'replan', message: 'Re-planning: scheduling deeper competitor investigation', timestamp: '' },
];

export function LiveStreamFeed() {
  const { agentActive } = useApp();
  const [items, setItems] = useState<(AgentEvent & { id: string })[]>([]);

  useEffect(() => {
    if (!agentActive) return;
    let idx = 0;
    const interval = setInterval(() => {
      const tmpl = simulationTemplates[idx % simulationTemplates.length];
      const evt = { ...tmpl, id: `stream-${Date.now()}`, timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }) };
      setItems((prev) => [evt, ...prev].slice(0, 30));
      idx++;
    }, 3000);
    return () => clearInterval(interval);
  }, [agentActive]);

  return (
    <div className="rounded-xl border bg-card overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b bg-muted/40">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 animate-pulse-ring" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-red-600">Demo Live Stream</span>
        </div>
        <span className="text-[10px] text-muted-foreground">Simulation mode</span>
      </div>
      <div className="max-h-80 overflow-y-auto scrollbar-thin divide-y">
        {items.length === 0 && <div className="px-4 py-6 text-xs text-muted-foreground text-center">Stream starting…</div>}
        {items.map((evt) => (
          <div key={evt.id} className="flex items-center gap-3 px-4 py-2 animate-slide-in-right">
            <span className={cn('flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[10px]', typeColor[evt.type])}>
              {typeIcon[evt.type]}
            </span>
            <p className="text-xs text-foreground flex-1 min-w-0 truncate">{evt.message}</p>
            <span className="text-[10px] text-muted-foreground tabular-nums shrink-0">{evt.timestamp}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
