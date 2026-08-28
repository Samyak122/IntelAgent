import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SectionHeader, ConfidenceBar } from '@/components/shared/indicators';
import { trends } from '@/data/mock-data';
import { TrendingUp, Sparkles, Building2, FileText, Shield, ArrowUpRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';

export function Trends() {
  const [selected, setSelected] = useState(trends[0].id);
  const trend = trends.find((t) => t.id === selected) ?? trends[0];

  return (
    <div className="space-y-6">
      <SectionHeader title="Emerging Trends" description="AI-detected technology trends with growth, confidence, and strategic context." icon={<TrendingUp className="h-5 w-5" />} />

      <div className="grid lg:grid-cols-4 gap-4">
        <div className="space-y-2">
          {trends.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setSelected(t.id)}
              className={cn('block w-full text-left p-4 rounded-xl border transition-all animate-slide-up', selected === t.id ? 'border-primary bg-primary/[0.04] shadow-sm' : 'border-border hover:border-primary/30 hover:bg-muted/40')}
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="font-semibold text-sm leading-snug">{t.name}</h3>
                <span className="text-xs font-bold text-success flex items-center gap-0.5 shrink-0"><ArrowUpRight className="h-3 w-3" />+{t.growth}%</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                <span>Confidence {t.confidence}%</span>
                <span>·</span>
                <span>{t.relatedResearch} papers</span>
              </div>
            </button>
          ))}
        </div>

        <Card className="lg:col-span-3 p-6">
          <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
            <div>
              <h2 className="font-display text-xl font-bold">{trend.name}</h2>
              <p className="text-sm text-muted-foreground mt-1">{trend.description}</p>
            </div>
            <div className="flex gap-2">
              <div className="text-center px-4 py-2 rounded-xl bg-success/10 border border-success/20">
                <p className="text-[10px] font-semibold uppercase text-success tracking-wider">Growth</p>
                <p className="font-display text-2xl font-bold text-success">+{trend.growth}%</p>
              </div>
              <div className="text-center px-4 py-2 rounded-xl bg-primary/10 border border-primary/20">
                <p className="text-[10px] font-semibold uppercase text-primary tracking-wider">Confidence</p>
                <p className="font-display text-2xl font-bold text-primary">{trend.confidence}%</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-semibold mb-3">Trend Timeline</h3>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={trend.timelineData} margin={{ left: -24, right: 8, top: 4 }}>
                <defs><linearGradient id="gradTrend" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7c3aed" stopOpacity={0.3} /><stop offset="100%" stopColor="#7c3aed" stopOpacity={0} /></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 32% 91%)" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: 'hsl(215 16% 47%)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: 'hsl(215 16% 47%)' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid hsl(214 32% 91%)', fontSize: 12 }} />
                <Area type="monotone" dataKey="value" stroke="#7c3aed" strokeWidth={2.5} fill="url(#gradTrend)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="grid sm:grid-cols-3 gap-3 mb-6">
            <div className="p-3 rounded-xl border">
              <p className="text-[10px] font-semibold uppercase text-muted-foreground tracking-wider flex items-center gap-1"><Building2 className="h-3 w-3" /> Related Companies</p>
              <p className="text-sm font-medium mt-1">{trend.relatedCompanies.join(', ')}</p>
            </div>
            <div className="p-3 rounded-xl border">
              <p className="text-[10px] font-semibold uppercase text-muted-foreground tracking-wider flex items-center gap-1"><FileText className="h-3 w-3" /> Related Research</p>
              <p className="text-sm font-medium mt-1">{trend.relatedResearch} papers</p>
            </div>
            <div className="p-3 rounded-xl border">
              <p className="text-[10px] font-semibold uppercase text-muted-foreground tracking-wider flex items-center gap-1"><Shield className="h-3 w-3" /> Related Patents</p>
              <p className="text-sm font-medium mt-1">{trend.relatedPatents} filings</p>
            </div>
          </div>

          <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/[0.04] to-accent/[0.04] p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary flex items-center gap-1.5 mb-2"><Sparkles className="h-3.5 w-3.5" /> Why this matters</p>
            <p className="text-sm leading-relaxed">{trend.whyItMatters}</p>
          </div>

          <div className="mt-4">
            <ConfidenceBar value={trend.confidence} />
          </div>
        </Card>
      </div>
    </div>
  );
}
