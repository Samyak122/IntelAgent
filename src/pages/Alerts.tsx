import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SectionHeader, SeverityBadge } from '@/components/shared/indicators';
import { alerts as initialAlerts, type Alert } from '@/data/mock-data';
import { BellRing, Sparkles, Search, FileBarChart, X, Lightbulb, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Alerts() {
  const { setPage } = useApp();
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);
  const [filter, setFilter] = useState<'all' | 'critical' | 'high' | 'medium' | 'informational'>('all');
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  const filtered = alerts.filter((a) => filter === 'all' || a.severity === filter);

  const dismiss = (id: string) => {
    setDismissed((prev) => new Set(prev).add(id));
  };
  const investigate = (a: Alert) => {
    if (a.company) {
      const comp = a.company.toLowerCase();
      setPage('competitors');
      void comp;
    } else {
      setPage('trends');
    }
  };

  const severityBorder: Record<string, string> = {
    critical: 'border-red-200',
    high: 'border-orange-200',
    medium: 'border-amber-200',
    informational: 'border-blue-200',
  };

  return (
    <div className="space-y-6">
      <SectionHeader title="Intelligent Alerts" description="Priority-ranked alerts with confidence scores and recommended actions." icon={<BellRing className="h-5 w-5" />} />

      <div className="flex items-center gap-2 flex-wrap">
        {(['all', 'critical', 'high', 'medium', 'informational'] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={cn('px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors', filter === f ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/70')}>
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((a, i) => {
          if (dismissed.has(a.id)) return null;
          return (
            <Card key={a.id} className={cn('p-5 animate-slide-up', severityBorder[a.severity])} style={{ animationDelay: `${i * 50}ms` }}>
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <SeverityBadge severity={a.severity} />
                    <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" /> {a.detected}</span>
                    {a.company && <span className="text-xs font-medium bg-muted px-2 py-0.5 rounded">{a.company}</span>}
                  </div>
                  <h3 className="font-semibold text-base leading-snug">{a.title}</h3>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-[10px] font-semibold uppercase text-muted-foreground tracking-wider">Confidence</p>
                  <p className={cn('font-display text-2xl font-bold tabular-nums', a.confidence >= 90 ? 'text-success' : 'text-primary')}>{a.confidence}%</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 mb-4">
                <div className="rounded-lg border p-3">
                  <p className="text-[10px] font-semibold uppercase text-muted-foreground tracking-wider flex items-center gap-1 mb-1"><Sparkles className="h-3 w-3" /> Why it matters</p>
                  <p className="text-sm leading-relaxed">{a.whyItMatters}</p>
                </div>
                <div className="rounded-lg border border-primary/20 bg-primary/[0.03] p-3">
                  <p className="text-[10px] font-semibold uppercase text-primary tracking-wider flex items-center gap-1 mb-1"><Lightbulb className="h-3 w-3" /> Recommended Action</p>
                  <p className="text-sm leading-relaxed">{a.recommendedAction}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" onClick={() => investigate(a)}><Search className="h-3.5 w-3.5 mr-1" /> Investigate</Button>
                <Button size="sm" variant="outline" onClick={() => setPage('reports')}><FileBarChart className="h-3.5 w-3.5 mr-1" /> Create Report</Button>
                <Button size="sm" variant="ghost" onClick={() => dismiss(a.id)}><X className="h-3.5 w-3.5 mr-1" /> Dismiss</Button>
              </div>
            </Card>
          );
        })}
      </div>

      {filtered.every((a) => dismissed.has(a.id)) && (
        <div className="text-center py-16 text-sm text-muted-foreground">All alerts in this category have been dismissed.</div>
      )}
    </div>
  );
}
