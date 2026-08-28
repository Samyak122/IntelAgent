import { useApp } from '@/context/AppContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SectionHeader, ActivityScore, ChangeIndicator } from '@/components/shared/indicators';
import { competitors } from '@/data/mock-data';
import { Building2, ArrowRight, TrendingUp, FileText, Shield } from 'lucide-react';

export function Competitors() {
  const { openCompetitor } = useApp();

  return (
    <div className="space-y-6">
      <SectionHeader title="Competitor Intelligence" description="Tracked companies with live activity scores and intelligence summaries." icon={<Building2 className="h-5 w-5" />} />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {competitors.map((c, i) => (
          <Card key={c.id} className="p-5 hover:shadow-lg hover:border-primary/30 transition-all cursor-pointer group animate-slide-up" style={{ animationDelay: `${i * 60}ms` }} onClick={() => openCompetitor(c.id)}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-accent/15 text-primary font-bold text-lg shrink-0">{c.logo}</div>
                <div>
                  <h3 className="font-display font-semibold text-base group-hover:text-primary transition-colors">{c.name}</h3>
                  <p className="text-xs text-muted-foreground">{c.industry}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-muted/40 mb-4">
              <div>
                <p className="text-[10px] font-semibold uppercase text-muted-foreground tracking-wider">Activity Score</p>
                <ActivityScore score={c.activityScore} />
              </div>
              <div className="h-10 w-px bg-border" />
              <div>
                <p className="text-[10px] font-semibold uppercase text-muted-foreground tracking-wider">Launches</p>
                <p className="font-display text-xl font-bold tabular-nums">{c.productLaunches}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4 text-center">
              <div className="p-2 rounded-lg border"><FileText className="h-3.5 w-3.5 text-primary mx-auto mb-1" /><p className="text-[10px] text-muted-foreground">Research</p><ChangeIndicator value={c.researchChange} /></div>
              <div className="p-2 rounded-lg border"><Shield className="h-3.5 w-3.5 text-accent mx-auto mb-1" /><p className="text-[10px] text-muted-foreground">Patents</p><ChangeIndicator value={c.patentChange} /></div>
              <div className="p-2 rounded-lg border"><TrendingUp className="h-3.5 w-3.5 text-info mx-auto mb-1" /><p className="text-[10px] text-muted-foreground">News</p><ChangeIndicator value={c.newsChange} /></div>
            </div>

            <div className="mb-4">
              <p className="text-[10px] font-semibold uppercase text-muted-foreground tracking-wider mb-1.5">Technology Focus</p>
              <div className="flex flex-wrap gap-1">
                {c.techFocus.slice(0, 3).map((t) => <Badge key={t} variant="secondary" className="text-[10px] font-medium">{t}</Badge>)}
              </div>
            </div>

            <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors">
              View Intelligence <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
