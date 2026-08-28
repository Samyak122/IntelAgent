import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SectionHeader } from '@/components/shared/indicators';
import { sources, type SourceType } from '@/data/mock-data';
import { Database, FileText, Newspaper, Shield, Building2, CheckCircle2, AlertTriangle, XCircle, Clock, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

const categoryConfig: Record<SourceType, { label: string; icon: React.ComponentType<{ className?: string }>; color: string }> = {
  research: { label: 'Research', icon: FileText, color: 'bg-blue-50 text-blue-700 border-blue-200' },
  news: { label: 'News', icon: Newspaper, color: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
  patent: { label: 'Patents', icon: Shield, color: 'bg-violet-50 text-violet-700 border-violet-200' },
  competitor: { label: 'Competitor', icon: Building2, color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
};

const statusConfig: Record<string, { label: string; icon: React.ReactNode; cls: string }> = {
  connected: { label: 'Connected', icon: <CheckCircle2 className="h-3.5 w-3.5" />, cls: 'text-success' },
  degraded: { label: 'Degraded', icon: <AlertTriangle className="h-3.5 w-3.5" />, cls: 'text-warning' },
  disconnected: { label: 'Disconnected', icon: <XCircle className="h-3.5 w-3.5" />, cls: 'text-destructive' },
};

export function Sources() {
  const categories: SourceType[] = ['research', 'news', 'patent', 'competitor'];

  return (
    <div className="space-y-6">
      <SectionHeader title="Connected Sources" description="Intelligence sources monitored continuously by the autonomous agent." icon={<Database className="h-5 w-5" />} />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {categories.map((cat) => {
          const catSources = sources.filter((s) => s.category === cat);
          const config = categoryConfig[cat];
          const totalNew = catSources.reduce((sum, s) => sum + s.newItems, 0);
          return (
            <Card key={cat} className="p-4">
              <div className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-semibold mb-3', config.color)}>
                <config.icon className="h-3.5 w-3.5" /> {config.label}
              </div>
              <p className="font-display text-2xl font-bold tabular-nums">{catSources.length}</p>
              <p className="text-[11px] text-muted-foreground">sources · {totalNew} new items</p>
            </Card>
          );
        })}
      </div>

      <div className="space-y-6">
        {categories.map((cat) => {
          const catSources = sources.filter((s) => s.category === cat);
          const config = categoryConfig[cat];
          return (
            <div key={cat}>
              <h3 className="font-display font-semibold text-sm mb-3 flex items-center gap-2">
                <config.icon className="h-4 w-4 text-muted-foreground" /> {config.label} Sources
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {catSources.map((s, i) => {
                  const st = statusConfig[s.status];
                  return (
                    <Card key={s.id} className={cn('p-4 hover:shadow-sm transition-shadow animate-slide-up', s.status === 'degraded' && 'border-warning/30')} style={{ animationDelay: `${i * 40}ms` }}>
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-sm">{s.name}</h4>
                          <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">{s.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 mb-3">
                        <span className={cn('flex items-center gap-1 text-xs font-semibold', st.cls)}>
                          <span className={cn('relative flex h-2 w-2', s.status === 'connected' && 'animate-pulse')}>
                            {s.status === 'connected' && <span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-75 animate-pulse-ring" />}
                            <span className={cn('relative inline-flex rounded-full h-2 w-2', s.status === 'connected' ? 'bg-success' : s.status === 'degraded' ? 'bg-warning' : 'bg-destructive')} />
                          </span>
                          {st.label}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {s.lastChecked}</span>
                        <span className="flex items-center gap-1"><RefreshCw className="h-3 w-3" /> {s.newItems} new</span>
                      </div>
                      <div className="mt-1 text-[10px] text-muted-foreground">{s.totalItems.toLocaleString()} total items</div>
                    </Card>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
