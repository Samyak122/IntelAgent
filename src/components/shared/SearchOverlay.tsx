import { useEffect, useState } from 'react';
import { useApp } from '@/context/AppContext';
import { searchSuggestions, competitors, researchPapers, newsItems, patents, trends } from '@/data/mock-data';
import { Search, X, Sparkles, ArrowRight, FileText, Newspaper, Shield, TrendingUp, Building2 } from 'lucide-react';

interface SearchResult {
  type: string;
  title: string;
  detail: string;
  icon: React.ReactNode;
  page: string;
}

export function SearchOverlay() {
  const { searchOpen, setSearchOpen, setPage } = useApp();
  const [query, setQuery] = useState('');
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    if (!searchOpen) { setQuery(''); setAnswered(false); }
  }, [searchOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setSearchOpen(true); }
      if (e.key === 'Escape') setSearchOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [setSearchOpen]);

  if (!searchOpen) return null;

  const results: SearchResult[] = [];
  if (query.trim()) {
    const q = query.toLowerCase();
    competitors.filter((c) => c.name.toLowerCase().includes(q) || c.techFocus.some((t) => t.toLowerCase().includes(q)))
      .forEach((c) => results.push({ type: 'Competitor', title: c.name, detail: c.industry, icon: <Building2 className="h-4 w-4" />, page: 'competitors' }));
    researchPapers.filter((p) => p.title.toLowerCase().includes(q) || p.topics.some((t) => t.toLowerCase().includes(q)))
      .forEach((p) => results.push({ type: 'Research', title: p.title, detail: p.organization, icon: <FileText className="h-4 w-4" />, page: 'research' }));
    newsItems.filter((n) => n.headline.toLowerCase().includes(q) || n.topics.some((t) => t.toLowerCase().includes(q)))
      .forEach((n) => results.push({ type: 'News', title: n.headline, detail: n.source, icon: <Newspaper className="h-4 w-4" />, page: 'news' }));
    patents.filter((p) => p.title.toLowerCase().includes(q) || p.technology.toLowerCase().includes(q))
      .forEach((p) => results.push({ type: 'Patent', title: p.title, detail: p.applicant, icon: <Shield className="h-4 w-4" />, page: 'patents' }));
    trends.filter((t) => t.name.toLowerCase().includes(q))
      .forEach((t) => results.push({ type: 'Trend', title: t.name, detail: `+${t.growth}% growth`, icon: <TrendingUp className="h-4 w-4" />, page: 'trends' }));
  }

  const go = (p: string) => { setPage(p); setSearchOpen(false); };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh] px-4">
      <div className="absolute inset-0 bg-navy-950/50 backdrop-blur-sm animate-fade-in" onClick={() => setSearchOpen(false)} />
      <div className="relative w-full max-w-2xl rounded-2xl bg-card border shadow-2xl animate-slide-up overflow-hidden">
        <div className="flex items-center gap-3 px-4 border-b">
          <Search className="h-5 w-5 text-muted-foreground" />
          <input
            autoFocus
            value={query}
            onChange={(e) => { setQuery(e.target.value); setAnswered(false); }}
            onKeyDown={(e) => { if (e.key === 'Enter' && query.trim()) setAnswered(true); }}
            placeholder="Ask IntelAgent anything… e.g. 'Show me recent AI activity from NVIDIA'"
            className="flex-1 h-14 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
          />
          <button onClick={() => setSearchOpen(false)} className="text-muted-foreground hover:text-foreground"><X className="h-5 w-5" /></button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto scrollbar-thin">
          {!query.trim() && (
            <div className="p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2 px-1">Suggested searches</p>
              <div className="space-y-1">
                {searchSuggestions.map((s) => (
                  <button key={s} onClick={() => { setQuery(s); setAnswered(true); }} className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg hover:bg-muted text-sm text-left transition-colors">
                    <Sparkles className="h-4 w-4 text-primary shrink-0" />
                    <span className="flex-1">{s}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {query.trim() && !answered && results.length > 0 && (
            <div className="p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2 px-1">Matching intelligence ({results.length})</p>
              <div className="space-y-1">
                {results.slice(0, 8).map((r, i) => (
                  <button key={i} onClick={() => go(r.page)} className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg hover:bg-muted text-left transition-colors">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">{r.icon}</span>
                    <div className="min-w-0 flex-1"><p className="text-sm font-medium truncate">{r.title}</p><p className="text-xs text-muted-foreground truncate">{r.detail}</p></div>
                    <span className="text-[10px] font-semibold uppercase text-muted-foreground bg-muted px-2 py-0.5 rounded">{r.type}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {query.trim() && answered && (
            <div className="p-4 animate-fade-in">
              <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">AI Answer</span>
                  <span className="ml-auto text-[10px] text-muted-foreground">Confidence: 91%</span>
                </div>
                <p className="text-sm leading-relaxed text-foreground">
                  Based on continuous monitoring, I detected {results.length} relevant intelligence items matching "{query}". Recent activity is dominated by NVIDIA and Google, with a strong emerging trend in real-time multilingual AI. Patent filings in speech translation have risen 47% over the 30-day baseline.
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="text-[10px] font-semibold bg-muted px-2 py-1 rounded">Sources: {results.length}</span>
                  <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 px-2 py-1 rounded">Cross-verified</span>
                </div>
              </div>
              {results.length > 0 && (
                <div className="mt-3 space-y-1">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1 px-1">Supporting sources</p>
                  {results.slice(0, 5).map((r, i) => (
                    <button key={i} onClick={() => go(r.page)} className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-muted text-left transition-colors">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-muted text-muted-foreground shrink-0">{r.icon}</span>
                      <span className="text-sm flex-1 truncate">{r.title}</span>
                      <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {query.trim() && !answered && results.length === 0 && (
            <div className="p-8 text-center text-sm text-muted-foreground">No matches yet. Press Enter for an AI-generated answer.</div>
          )}
        </div>
      </div>
    </div>
  );
}
