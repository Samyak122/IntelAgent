import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SectionHeader, SentimentBadge } from '@/components/shared/indicators';
import { newsItems } from '@/data/mock-data';
import { Newspaper, Sparkles, ExternalLink, Flame, Building2, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

export function News() {
  const [analyzed, setAnalyzed] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<'all' | 'high' | 'medium'>('all');

  const filtered = newsItems.filter((n) => {
    if (filter === 'high') return n.importance >= 85;
    if (filter === 'medium') return n.importance >= 75 && n.importance < 85;
    return true;
  });

  const toggle = (id: string) => {
    const next = new Set(analyzed);
    next.has(id) ? next.delete(id) : next.add(id);
    setAnalyzed(next);
  };

  return (
    <div className="space-y-6">
      <SectionHeader title="News Monitoring" description="Live intelligence feed from GDELT, RSS, and competitor news sources." icon={<Newspaper className="h-5 w-5" />} />

      <div className="flex items-center gap-2">
        {(['all', 'high', 'medium'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn('px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors', filter === f ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/70')}
          >
            {f === 'all' ? 'All items' : f === 'high' ? 'High importance' : 'Medium importance'}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((n, i) => (
          <Card key={n.id} className={cn('p-5 hover:shadow-md transition-shadow animate-slide-up', n.importance >= 90 ? 'border-red-200/60' : n.importance >= 85 ? 'border-orange-200/60' : '')} style={{ animationDelay: `${i * 40}ms` }}>
            <div className="flex items-start gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  {n.importance >= 90 ? (
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200"><Flame className="h-3 w-3 mr-1" /> HIGH IMPORTANCE</Badge>
                  ) : n.importance >= 85 ? (
                    <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200"><Flame className="h-3 w-3 mr-1" /> IMPORTANT</Badge>
                  ) : (
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Standard</Badge>
                  )}
                  <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />{n.time}</span>
                </div>

                <h3 className="font-semibold text-base leading-snug mb-2">{n.headline}</h3>

                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{n.summary}</p>

                <div className="flex flex-wrap items-center gap-3 text-xs">
                  <span className="flex items-center gap-1 text-muted-foreground"><Newspaper className="h-3 w-3" />{n.source}</span>
                  <span className="flex items-center gap-1 text-muted-foreground"><Building2 className="h-3 w-3" />{n.company}</span>
                  <SentimentBadge sentiment={n.sentiment} />
                  {n.topics.map((t) => <Badge key={t} variant="secondary" className="text-[10px]">{t}</Badge>)}
                </div>
              </div>

              <div className="shrink-0 text-right">
                <p className="text-[10px] font-semibold uppercase text-muted-foreground tracking-wider mb-1">Importance</p>
                <div className={cn('font-display text-3xl font-bold tabular-nums', n.importance >= 90 ? 'text-red-600' : n.importance >= 85 ? 'text-orange-600' : 'text-primary')}>{n.importance}</div>
                <div className="text-[10px] text-muted-foreground">/100</div>
              </div>
            </div>

            <div className="flex gap-2 mt-4 pt-3 border-t">
              <Button size="sm" variant={analyzed.has(n.id) ? 'default' : 'outline'} onClick={() => toggle(n.id)}>
                <Sparkles className="h-3.5 w-3.5 mr-1" /> {analyzed.has(n.id) ? 'Analyzed' : 'Analyze'}
              </Button>
              <Button size="sm" variant="outline"><ExternalLink className="h-3.5 w-3.5 mr-1" /> View Source</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
