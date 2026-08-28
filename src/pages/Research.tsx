import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SectionHeader, ConfidenceBar, SourceBadge } from '@/components/shared/indicators';
import { researchPapers, competitors } from '@/data/mock-data';
import { FileText, BookOpen, Sparkles, Plus, ExternalLink, Users, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const allTopics = Array.from(new Set(researchPapers.flatMap((p) => p.topics))).sort();
const allSources = Array.from(new Set(researchPapers.map((p) => p.source))).sort();

export function Research() {
  const [tech, setTech] = useState('all');
  const [company, setCompany] = useState('all');
  const [source, setSource] = useState('all');
  const [analyzed, setAnalyzed] = useState<Set<string>>(new Set());
  const [added, setAdded] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => researchPapers.filter((p) => {
    if (tech !== 'all' && !p.topics.includes(tech)) return false;
    if (company !== 'all' && p.company !== company) return false;
    if (source !== 'all' && p.source !== source) return false;
    return true;
  }), [tech, company, source]);

  const toggle = (set: Set<string>, id: string, setter: (s: Set<string>) => void) => {
    const next = new Set(set);
    next.has(id) ? next.delete(id) : next.add(id);
    setter(next);
  };

  return (
    <div className="space-y-6">
      <SectionHeader title="Research Publications" description="AI-discovered papers from arXiv, Crossref, and connected sources." icon={<FileText className="h-5 w-5" />} />

      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Filters</span>
          <Select value={tech} onValueChange={setTech}>
            <SelectTrigger className="w-[180px] h-9 text-xs"><SelectValue placeholder="Technology" /></SelectTrigger>
            <SelectContent><SelectItem value="all">All technologies</SelectItem>{allTopics.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
          </Select>
          <Select value={company} onValueChange={setCompany}>
            <SelectTrigger className="w-[160px] h-9 text-xs"><SelectValue placeholder="Company" /></SelectTrigger>
            <SelectContent><SelectItem value="all">All companies</SelectItem>{competitors.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
          </Select>
          <Select value={source} onValueChange={setSource}>
            <SelectTrigger className="w-[140px] h-9 text-xs"><SelectValue placeholder="Source" /></SelectTrigger>
            <SelectContent><SelectItem value="all">All sources</SelectItem>{allSources.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
          </Select>
          <span className="ml-auto text-xs text-muted-foreground">{filtered.length} papers</span>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((p, i) => (
          <Card key={p.id} className="p-5 hover:shadow-md transition-shadow animate-slide-up" style={{ animationDelay: `${i * 40}ms` }}>
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm leading-snug">{p.title}</h3>
                <div className="flex items-center gap-2 mt-1.5 text-xs text-muted-foreground">
                  <Users className="h-3 w-3" />{p.authors.join(', ')}
                </div>
              </div>
              <SourceBadge source={p.source} />
            </div>

            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
              <span className="flex items-center gap-1"><Building2 className="h-3 w-3" />{p.organization}</span>
              <span>·</span>
              <span className="tabular-nums">{p.publishedDate}</span>
            </div>

            <div className="flex flex-wrap gap-1 mb-3">
              {p.topics.map((t) => <Badge key={t} variant="secondary" className="text-[10px]">{t}</Badge>)}
            </div>

            <div className="rounded-lg border border-primary/20 bg-primary/[0.03] p-3 mb-3">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-primary flex items-center gap-1 mb-1"><Sparkles className="h-3 w-3" /> AI Summary</p>
              <p className="text-xs leading-relaxed text-foreground">{p.summary}</p>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-semibold uppercase text-muted-foreground tracking-wider">Relevance</span>
                <span className={cn('text-xs font-bold', p.relevanceScore >= 90 ? 'text-success' : 'text-primary')}>{p.relevanceScore}%</span>
              </div>
              <ConfidenceBar value={p.relevanceScore} />
            </div>

            <div className="flex gap-2">
              <Button size="sm" variant="outline"><BookOpen className="h-3.5 w-3.5 mr-1" /> Read</Button>
              <Button size="sm" variant={analyzed.has(p.id) ? 'default' : 'outline'} onClick={() => toggle(analyzed, p.id, setAnalyzed)}>
                <Sparkles className="h-3.5 w-3.5 mr-1" /> {analyzed.has(p.id) ? 'Analyzed' : 'Analyze'}
              </Button>
              <Button size="sm" variant={added.has(p.id) ? 'default' : 'outline'} onClick={() => toggle(added, p.id, setAdded)}>
                <Plus className="h-3.5 w-3.5 mr-1" /> {added.has(p.id) ? 'Added' : 'Add to Intelligence'}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && <div className="text-center py-16 text-sm text-muted-foreground">No papers match these filters.</div>}
    </div>
  );
}
