import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SectionHeader, ConfidenceBar } from '@/components/shared/indicators';
import { patents, patentFilingsByCompetitor } from '@/data/mock-data';
import { Shield, Sparkles, Plus, Building2, User, Calendar, Cpu } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { cn } from '@/lib/utils';

export function Patents() {
  const [added, setAdded] = useState<Set<string>>(new Set());
  const toggle = (id: string) => {
    const next = new Set(added);
    next.has(id) ? next.delete(id) : next.add(id);
    setAdded(next);
  };

  const colors = ['#2563eb', '#7c3aed', '#0891b2', '#16a34a', '#f59e0b'];

  return (
    <div className="space-y-6">
      <SectionHeader title="Patent Intelligence" description="Monitor patent filings to detect competitor IP strategy and technology bets." icon={<Shield className="h-5 w-5" />} />

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-1 p-5">
          <h3 className="font-display font-semibold mb-1">Patent Filings by Competitor</h3>
          <p className="text-xs text-muted-foreground mb-4">Last 90 days</p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={patentFilingsByCompetitor} layout="vertical" margin={{ left: 20, right: 16, top: 4 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 32% 91%)" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10, fill: 'hsl(215 16% 47%)' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="competitor" tick={{ fontSize: 11, fill: 'hsl(215 16% 47%)' }} axisLine={false} tickLine={false} width={72} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid hsl(214 32% 91%)', fontSize: 12 }} cursor={{ fill: 'hsl(210 40% 96%)' }} />
              <Bar dataKey="patents" radius={[0, 6, 6, 0]} barSize={18}>
                {patentFilingsByCompetitor.map((_, i) => <Cell key={i} fill={colors[i % colors.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <div className="lg:col-span-2 space-y-3">
          {patents.map((p, i) => (
            <Card key={p.id} className="p-4 hover:shadow-md transition-shadow animate-slide-up" style={{ animationDelay: `${i * 40}ms` }}>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm leading-snug">{p.title}</h3>
                </div>
                <Badge variant="outline" className={cn('shrink-0', p.relevanceScore >= 90 ? 'bg-red-50 text-red-700 border-red-200' : 'bg-sky-50 text-sky-700 border-sky-200')}>
                  Relevance {p.relevanceScore}%
                </Badge>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-muted-foreground mb-3">
                <span className="flex items-center gap-1"><Building2 className="h-3 w-3" />{p.applicant}</span>
                <span className="flex items-center gap-1"><User className="h-3 w-3" />{p.inventor}</span>
                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{p.publicationDate}</span>
                <span className="flex items-center gap-1"><Cpu className="h-3 w-3" />{p.technology}</span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <div className="flex-1">
                  <Badge variant="secondary" className="text-[10px]">{p.competitor}</Badge>
                </div>
                <ConfidenceBar value={p.relevanceScore} className="w-32" />
              </div>

              <div className="rounded-lg border border-primary/20 bg-primary/[0.03] p-2.5 mt-3">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-primary flex items-center gap-1 mb-0.5"><Sparkles className="h-3 w-3" /> AI Summary</p>
                <p className="text-xs leading-relaxed">{p.summary}</p>
              </div>

              <div className="flex gap-2 mt-3">
                <Button size="sm" variant="outline">Details</Button>
                <Button size="sm" variant={added.has(p.id) ? 'default' : 'outline'} onClick={() => toggle(p.id)}>
                  <Plus className="h-3.5 w-3.5 mr-1" /> {added.has(p.id) ? 'Added' : 'Add to Intelligence'}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
