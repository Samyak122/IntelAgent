import { useApp } from '@/context/AppContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AgentActivityPanel, LiveStreamFeed } from '@/components/shared/AgentActivity';
import { SectionHeader, ActivityScore, ChangeIndicator } from '@/components/shared/indicators';
import {
  dashboardStats, competitorActivityData, researchActivityData, patentActivityData,
  trendGrowthData, competitors, alerts,
} from '@/data/mock-data';
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import {
  Target, FileText, Shield, Zap, TrendingUp, BellRing,
  ArrowUpRight, Sparkles, ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Target, FileText, Shield, Zap, TrendingUp, BellRing,
};

export function Dashboard() {
  const { setPage, openCompetitor } = useApp();

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Intelligence Dashboard"
        description="Real-time overview of monitored competitors, research, and emerging trends."
        icon={<Sparkles className="h-5 w-5" />}
        action={<Button variant="outline" onClick={() => setPage('agent')}><TrendingUp className="h-4 w-4 mr-1.5" /> View Agent Console</Button>}
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {dashboardStats.map((s, i) => {
          const Icon = iconMap[s.icon];
          return (
            <Card key={s.label} className="p-4 hover:shadow-md transition-shadow animate-slide-up" style={{ animationDelay: `${i * 50}ms` }}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary"><Icon className="h-4 w-4" /></div>
                <span className="text-[11px] font-semibold text-success flex items-center gap-0.5"><ArrowUpRight className="h-3 w-3" />{s.trend}</span>
              </div>
              <div className="font-display text-2xl font-bold tabular-nums">{s.value}</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">{s.label}</div>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display font-semibold">Competitor Activity</h3>
              <p className="text-xs text-muted-foreground">Last 30 days · intelligence events per competitor</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setPage('competitors')}>All competitors <ChevronRight className="h-3.5 w-3.5" /></Button>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={competitorActivityData} margin={{ left: -20, right: 8, top: 4 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 32% 91%)" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: 'hsl(215 16% 47%)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'hsl(215 16% 47%)' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid hsl(214 32% 91%)', fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} iconType="circle" />
              <Line type="monotone" dataKey="NVIDIA" stroke="#16a34a" strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="OpenAI" stroke="#2563eb" strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="Google" stroke="#7c3aed" strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="Microsoft" stroke="#0891b2" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="Meta" stroke="#f59e0b" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-0 overflow-hidden flex flex-col">
          <AgentActivityPanel />
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="p-5">
          <h3 className="font-display font-semibold mb-1">Research Activity</h3>
          <p className="text-xs text-muted-foreground mb-4">New papers per day · last 30 days</p>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={researchActivityData} margin={{ left: -28, right: 8, top: 4 }}>
              <defs><linearGradient id="gradResearch" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#2563eb" stopOpacity={0.3} /><stop offset="100%" stopColor="#2563eb" stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 32% 91%)" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: 'hsl(215 16% 47%)' }} axisLine={false} tickLine={false} interval={6} />
              <YAxis tick={{ fontSize: 10, fill: 'hsl(215 16% 47%)' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid hsl(214 32% 91%)', fontSize: 12 }} />
              <Area type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2.5} fill="url(#gradResearch)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5">
          <h3 className="font-display font-semibold mb-1">Patent Activity</h3>
          <p className="text-xs text-muted-foreground mb-4">New filings per day · last 30 days</p>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={patentActivityData} margin={{ left: -28, right: 8, top: 4 }}>
              <defs><linearGradient id="gradPatent" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7c3aed" stopOpacity={0.3} /><stop offset="100%" stopColor="#7c3aed" stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 32% 91%)" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: 'hsl(215 16% 47%)' }} axisLine={false} tickLine={false} interval={6} />
              <YAxis tick={{ fontSize: 10, fill: 'hsl(215 16% 47%)' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid hsl(214 32% 91%)', fontSize: 12 }} />
              <Area type="monotone" dataKey="value" stroke="#7c3aed" strokeWidth={2.5} fill="url(#gradPatent)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5">
          <h3 className="font-display font-semibold mb-1">Technology Trend Growth</h3>
          <p className="text-xs text-muted-foreground mb-4">Quarter over quarter</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={trendGrowthData} layout="vertical" margin={{ left: 20, right: 12, top: 4 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 32% 91%)" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10, fill: 'hsl(215 16% 47%)' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="trend" tick={{ fontSize: 10, fill: 'hsl(215 16% 47%)' }} axisLine={false} tickLine={false} width={80} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid hsl(214 32% 91%)', fontSize: 12 }} cursor={{ fill: 'hsl(210 40% 96%)' }} />
              <Bar dataKey="growth" fill="#2563eb" radius={[0, 6, 6, 0]} barSize={14} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold">Competitor Snapshot</h3>
            <Button variant="ghost" size="sm" onClick={() => setPage('competitors')}>View all <ChevronRight className="h-3.5 w-3.5" /></Button>
          </div>
          <div className="space-y-2">
            {competitors.map((c) => (
              <button key={c.id} onClick={() => openCompetitor(c.id)} className="flex items-center gap-3 w-full p-3 rounded-xl border hover:border-primary/30 hover:bg-muted/40 transition-all text-left">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary/15 to-accent/15 text-primary font-bold text-sm shrink-0">{c.logo}</div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-sm truncate">{c.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{c.industry}</p>
                </div>
                <div className="hidden sm:flex items-center gap-4 text-xs">
                  <div className="text-center"><div className="text-muted-foreground">Research</div><ChangeIndicator value={c.researchChange} /></div>
                  <div className="text-center"><div className="text-muted-foreground">Patents</div><ChangeIndicator value={c.patentChange} /></div>
                  <div className="text-center"><div className="text-muted-foreground">News</div><ChangeIndicator value={c.newsChange} /></div>
                </div>
                <div className="flex flex-col items-end shrink-0">
                  <span className="text-[10px] text-muted-foreground uppercase">Activity</span>
                  <ActivityScore score={c.activityScore} size="sm" />
                </div>
              </button>
            ))}
          </div>
        </Card>

        <div className="space-y-4">
          <LiveStreamFeed />
          <Card className="p-4">
            <h3 className="font-display font-semibold text-sm mb-3">Priority Alerts</h3>
            <div className="space-y-2">
              {alerts.slice(0, 3).map((a) => (
                <button key={a.id} onClick={() => setPage('alerts')} className={cn('block w-full text-left p-3 rounded-lg border transition-all hover:shadow-sm', a.severity === 'critical' ? 'border-red-200 bg-red-50/50' : a.severity === 'high' ? 'border-orange-200 bg-orange-50/50' : a.severity === 'medium' ? 'border-amber-200 bg-amber-50/50' : 'border-blue-200 bg-blue-50/50')}>
                  <div className="flex items-center justify-between mb-1">
                    <span className={cn('text-[10px] font-bold uppercase tracking-wider', a.severity === 'critical' ? 'text-red-600' : a.severity === 'high' ? 'text-orange-600' : a.severity === 'medium' ? 'text-amber-600' : 'text-blue-600')}>{a.severity}</span>
                    <span className="text-[10px] text-muted-foreground">{a.detected}</span>
                  </div>
                  <p className="text-xs font-medium line-clamp-2">{a.title}</p>
                  <p className="text-[11px] text-muted-foreground mt-1">Confidence {a.confidence}%</p>
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
