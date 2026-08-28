import { useApp } from '@/context/AppContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SectionHeader, ActivityScore, ChangeIndicator } from '@/components/shared/indicators';
import { competitors } from '@/data/mock-data';
import {
  ArrowLeft, Building2, FileText, Shield, TrendingUp, Rocket,
  Target, CheckCircle2, AlertTriangle, Zap, Lightbulb, Calendar,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const timelineTypeStyle: Record<string, { color: string; icon: React.ReactNode }> = {
  product: { color: 'bg-blue-500', icon: <Rocket className="h-3 w-3 text-white" /> },
  research: { color: 'bg-violet-500', icon: <FileText className="h-3 w-3 text-white" /> },
  patent: { color: 'bg-emerald-500', icon: <Shield className="h-3 w-3 text-white" /> },
  partnership: { color: 'bg-amber-500', icon: <Target className="h-3 w-3 text-white" /> },
  news: { color: 'bg-cyan-500', icon: <TrendingUp className="h-3 w-3 text-white" /> },
};

export function CompetitorDetail() {
  const { competitorId, backToList } = useApp();
  const competitor = competitors.find((c) => c.id === competitorId);

  if (!competitor) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">Competitor not found.</p>
        <Button variant="outline" onClick={backToList} className="mt-4">Back to competitors</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Button variant="ghost" size="sm" onClick={backToList} className="mb-3"><ArrowLeft className="h-4 w-4 mr-1" /> Back to competitors</Button>
        <SectionHeader title={competitor.name} description={competitor.industry} icon={<Building2 className="h-5 w-5" />} />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="p-5">
          <p className="text-[10px] font-semibold uppercase text-muted-foreground tracking-wider mb-1">Activity Score</p>
          <ActivityScore score={competitor.activityScore} />
          <div className="grid grid-cols-3 gap-2 mt-4 text-center">
            <div className="p-2 rounded-lg border"><FileText className="h-3.5 w-3.5 text-primary mx-auto mb-1" /><p className="text-[10px] text-muted-foreground">Research</p><ChangeIndicator value={competitor.researchChange} /></div>
            <div className="p-2 rounded-lg border"><Shield className="h-3.5 w-3.5 text-accent mx-auto mb-1" /><p className="text-[10px] text-muted-foreground">Patents</p><ChangeIndicator value={competitor.patentChange} /></div>
            <div className="p-2 rounded-lg border"><TrendingUp className="h-3.5 w-3.5 text-info mx-auto mb-1" /><p className="text-[10px] text-muted-foreground">News</p><ChangeIndicator value={competitor.newsChange} /></div>
          </div>
          <div className="mt-4">
            <p className="text-[10px] font-semibold uppercase text-muted-foreground tracking-wider mb-1.5">Technology Focus</p>
            <div className="flex flex-wrap gap-1">
              {competitor.techFocus.map((t) => <Badge key={t} variant="secondary" className="text-[10px]">{t}</Badge>)}
            </div>
          </div>
        </Card>

        <Card className="lg:col-span-2 p-5">
          <h3 className="font-display font-semibold mb-2">Company Overview</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{competitor.overview}</p>
          <div className="mt-4">
            <p className="text-[10px] font-semibold uppercase text-muted-foreground tracking-wider mb-2">Recent Developments</p>
            <div className="space-y-1.5">
              {competitor.recentDevelopments.map((d, i) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  <Zap className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                  <span>{d}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card className="p-5">
          <h3 className="font-display font-semibold mb-3 flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success" /> Strategic Moves</h3>
          <div className="space-y-2">
            {competitor.strategicMoves.map((m, i) => (
              <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-success/5 border border-success/20">
                <Target className="h-3.5 w-3.5 text-success mt-0.5 shrink-0" />
                <span className="text-sm">{m}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-display font-semibold mb-3 flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success" /> Strengths</h3>
              <div className="space-y-2">
                {competitor.strengths.map((s, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm"><CheckCircle2 className="h-3.5 w-3.5 text-success mt-0.5 shrink-0" /><span>{s}</span></div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-display font-semibold mb-3 flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-warning" /> Potential Risks</h3>
              <div className="space-y-2">
                {competitor.risks.map((r, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm"><AlertTriangle className="h-3.5 w-3.5 text-warning mt-0.5 shrink-0" /><span>{r}</span></div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-5">
        <h3 className="font-display font-semibold mb-4 flex items-center gap-2"><Calendar className="h-4 w-4 text-primary" /> Activity Timeline</h3>
        <div className="relative pl-6">
          <div className="absolute left-2 top-1 bottom-1 w-px bg-border" />
          <div className="space-y-4">
            {competitor.timeline.map((evt, i) => {
              const style = timelineTypeStyle[evt.type];
              return (
                <div key={i} className="relative animate-slide-up" style={{ animationDelay: `${i * 60}ms` }}>
                  <div className={cn('absolute -left-[18px] top-1 flex h-4 w-4 items-center justify-center rounded-full ring-4 ring-background', style.color)}>{style.icon}</div>
                  <div className="ml-2">
                    <p className="text-[11px] font-bold text-muted-foreground tabular-nums">{evt.date}</p>
                    <p className="text-sm font-medium mt-0.5">{evt.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      <Card className="p-5 bg-gradient-to-br from-primary/[0.04] to-accent/[0.04] border-primary/20">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0"><Lightbulb className="h-5 w-5" /></div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">AI Strategic Insight</p>
            <p className="text-sm leading-relaxed">
              {competitor.name} shows a {competitor.researchChange}% increase in research activity and {competitor.patentChange}% in patents, indicating accelerated investment in {competitor.techFocus[0]}. The agent recommends monitoring their next product cycle closely, as the combination of research output and patent filings suggests a major release within 1-2 quarters.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
