import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import type { AlertSeverity, Sentiment } from '@/data/mock-data';

export function ConfidenceBar({ value, className }: { value: number; className?: string }) {
  const color = value >= 90 ? 'bg-success' : value >= 75 ? 'bg-primary' : value >= 60 ? 'bg-warning' : 'bg-destructive';
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
        <div className={cn('h-full rounded-full transition-all duration-700', color)} style={{ width: `${value}%` }} />
      </div>
      <span className="text-xs font-semibold tabular-nums text-foreground w-9 text-right">{value}%</span>
    </div>
  );
}

export function ScoreRing({ value, size = 56, label }: { value: number; size?: number; label?: string }) {
  const stroke = 5;
  const radius = (size - stroke) / 2;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (value / 100) * circ;
  const color = value >= 85 ? 'hsl(142 71% 45%)' : value >= 70 ? 'hsl(221 83% 53%)' : 'hsl(38 92% 50%)';
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="hsl(214 32% 91%)" strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={color} strokeWidth={stroke} strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" className="transition-all duration-700" />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-base font-bold tabular-nums">{value}</span>
        {label && <span className="text-[9px] text-muted-foreground leading-none">{label}</span>}
      </div>
    </div>
  );
}

export function SeverityBadge({ severity, className }: { severity: AlertSeverity; className?: string }) {
  const map: Record<AlertSeverity, { label: string; cls: string }> = {
    critical: { label: 'CRITICAL', cls: 'bg-red-50 text-red-700 border-red-200' },
    high: { label: 'HIGH', cls: 'bg-orange-50 text-orange-700 border-orange-200' },
    medium: { label: 'MEDIUM', cls: 'bg-amber-50 text-amber-700 border-amber-200' },
    informational: { label: 'INFO', cls: 'bg-blue-50 text-blue-700 border-blue-200' },
  };
  const s = map[severity];
  return <Badge variant="outline" className={cn('font-semibold', s.cls, className)}>{s.label}</Badge>;
}

export function SentimentBadge({ sentiment }: { sentiment: Sentiment }) {
  const map: Record<Sentiment, { label: string; cls: string }> = {
    positive: { label: 'Positive', cls: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    neutral: { label: 'Neutral', cls: 'bg-slate-50 text-slate-600 border-slate-200' },
    negative: { label: 'Negative', cls: 'bg-red-50 text-red-700 border-red-200' },
  };
  const s = map[sentiment];
  return <Badge variant="outline" className={s.cls}>{s.label}</Badge>;
}

export function SourceBadge({ source }: { source: string }) {
  const isArxiv = source.toLowerCase() === 'arxiv';
  const cls = isArxiv ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-sky-50 text-sky-700 border-sky-200';
  return <Badge variant="outline" className={cls}>{source}</Badge>;
}

export function ChangeIndicator({ value }: { value: number }) {
  const positive = value >= 0;
  return (
    <span className={cn('inline-flex items-center gap-0.5 text-xs font-semibold', positive ? 'text-success' : 'text-destructive')}>
      {positive ? '+' : ''}{value}%
    </span>
  );
}

export function SectionHeader({
  title, description, icon, action,
}: { title: string; description?: string; icon?: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
      <div className="flex items-start gap-3">
        {icon && <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">{icon}</div>}
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight">{title}</h1>
          {description && <p className="text-sm text-muted-foreground mt-0.5">{description}</p>}
        </div>
      </div>
      {action}
    </div>
  );
}

export function ActivityScore({ score, size = 'md' }: { score: number; size?: 'sm' | 'md' }) {
  const color = score >= 85 ? 'text-success' : score >= 70 ? 'text-primary' : 'text-warning';
  const dim = size === 'sm' ? 'text-sm' : 'text-lg';
  return (
    <span className={cn('font-bold tabular-nums', color, dim)}>
      {score}<span className="text-muted-foreground font-normal text-xs">/100</span>
    </span>
  );
}
