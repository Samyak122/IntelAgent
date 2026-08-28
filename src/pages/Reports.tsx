import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SectionHeader } from '@/components/shared/indicators';
import { FileBarChart, FileText, Calendar, Building2, TrendingUp, Loader2, Download, Sparkles, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type ReportType = 'daily' | 'weekly' | 'competitor' | 'trend';

const reportTypes: { id: ReportType; label: string; desc: string; icon: React.ComponentType<{ className?: string }>; color: string }[] = [
  { id: 'daily', label: 'Daily Report', desc: 'Today\u2019s key intelligence summary', icon: Calendar, color: 'from-blue-500 to-blue-600' },
  { id: 'weekly', label: 'Weekly Intelligence Report', desc: '7-day competitor & trend digest', icon: FileText, color: 'from-violet-500 to-violet-600' },
  { id: 'competitor', label: 'Competitor Report', desc: 'Deep-dive on a single competitor', icon: Building2, color: 'from-emerald-500 to-emerald-600' },
  { id: 'trend', label: 'Technology Trend Report', desc: 'Emerging technology analysis', icon: TrendingUp, color: 'from-amber-500 to-amber-600' },
];

const reportSections = [
  { title: 'Executive Summary', content: 'The AI industry saw significant acceleration this week, led by a multilingual speech translation breakthrough from Google and a next-generation GPU architecture from NVIDIA. Patent activity in speech translation rose 47%, confirming an emerging trend with 91% confidence.' },
  { title: 'Key Developments', content: '3 high-impact developments detected: (1) Google real-time multilingual translation, (2) NVIDIA next-gen GPU architecture, (3) OpenAI agentic framework launch. Each carries enterprise and competitive implications.' },
  { title: 'Competitor Activity', content: 'NVIDIA leads with activity score 87/100 (+41% news). Google shows +31% research and +22% patents. OpenAI maintains 92/100 with +35% news volume. Microsoft and Meta show steady growth.' },
  { title: 'Research Developments', content: '36 new papers discovered. Top relevance: "Real-Time Multilingual Speech Translation with Streaming Transformers" (94%). Strong cluster in low-resource NLP and agent orchestration.' },
  { title: 'Patent Activity', content: '14 new patents. Google filed the most relevant patent (streaming speech translation, 95% relevance). Infrastructure patents from NVIDIA suggest continued hardware dominance.' },
  { title: 'Emerging Trends', content: 'Real-Time Multilingual AI (+68%, 91% confidence) is the strongest trend. Autonomous AI Agents (+54%) and AI Infrastructure (+41%) remain elevated. Low-Resource NLP (+37%) is accelerating.' },
  { title: 'Risks', content: 'EU regulatory inquiry into AI agent safety may impact multiple vendors. Custom silicon competition threatens NVIDIA margins. Open-source commoditization pressures closed-model providers.' },
  { title: 'Opportunities', content: 'Multilingual AI opens underserved markets (Indian and African languages). Agentic frameworks create new enterprise workflow automation category. Infrastructure demand sustains hardware vendors.' },
  { title: 'Recommended Actions', content: '1. Investigate Google\u2019s multilingual AI patent strategy. 2. Assess NVIDIA GPU roadmap impact on competitors. 3. Evaluate agent framework positioning. 4. Generate deep-dive trend report on multilingual AI.' },
  { title: 'Sources', content: 'arXiv, Crossref, GDELT, RSS Feeds, Patent Registry, Patent Mirror, Company Websites, Company Blogs, Press Releases — 9 sources, 37,420 total items analyzed.' },
];

export function Reports() {
  const [generating, setGenerating] = useState<ReportType | null>(null);
  const [generated, setGenerated] = useState<ReportType | null>(null);
  const [progress, setProgress] = useState(0);

  const generate = (type: ReportType) => {
    setGenerating(type);
    setGenerated(null);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setGenerating(null);
          setGenerated(type);
          return 100;
        }
        return p + 10;
      });
    }, 200);
  };

  return (
    <div className="space-y-6">
      <SectionHeader title="Report Generation" description="Generate intelligence reports from the agent\u2019s continuous monitoring." icon={<FileBarChart className="h-5 w-5" />} />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {reportTypes.map((r, i) => (
          <Card key={r.id} className="p-5 hover:shadow-md transition-shadow animate-slide-up" style={{ animationDelay: `${i * 60}ms` }}>
            <div className={cn('flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br mb-3', r.color)}>
              <r.icon className="h-5 w-5 text-white" />
            </div>
            <h3 className="font-display font-semibold text-sm mb-1">{r.label}</h3>
            <p className="text-xs text-muted-foreground mb-4">{r.desc}</p>
            <Button size="sm" className="w-full" onClick={() => generate(r.id)} disabled={generating !== null}>
              {generating === r.id ? <><Loader2 className="h-3.5 w-3.5 mr-1 animate-spin" /> Generating…</> : <><FileBarChart className="h-3.5 w-3.5 mr-1" /> Generate</>}
            </Button>
            {generating === r.id && (
              <div className="h-1 mt-3 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all duration-200" style={{ width: `${progress}%` }} />
              </div>
            )}
            {generated === r.id && generating === null && (
              <p className="text-[11px] text-success flex items-center gap-1 mt-2 animate-fade-in"><CheckCircle2 className="h-3 w-3" /> Generated successfully</p>
            )}
          </Card>
        ))}
      </div>

      {generated && generating === null && (
        <Card className="p-6 animate-slide-up">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary"><FileText className="h-5 w-5" /></div>
              <div>
                <h2 className="font-display text-lg font-bold">{reportTypes.find((r) => r.id === generated)?.label}</h2>
                <p className="text-xs text-muted-foreground">Generated {new Date().toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200"><Sparkles className="h-3 w-3 mr-1" /> AI-generated</Badge>
              <Button size="sm" variant="outline"><Download className="h-3.5 w-3.5 mr-1" /> Export</Button>
            </div>
          </div>

          <div className="space-y-4">
            {reportSections.map((s, i) => (
              <div key={i} className={cn(i === 0 ? 'rounded-xl border border-primary/20 bg-primary/[0.03] p-4' : 'border-l-2 border-border pl-4')}>
                <h3 className="font-semibold text-sm mb-1.5 flex items-center gap-2">
                  <span className={cn('flex h-5 w-5 items-center justify-center rounded text-[10px] font-bold', i === 0 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground')}>{i + 1}</span>
                  {s.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.content}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {!generated && generating === null && (
        <Card className="p-12 text-center">
          <FileText className="h-10 w-10 text-muted-foreground/40 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">Select a report type above to generate an AI intelligence report.</p>
        </Card>
      )}
    </div>
  );
}
