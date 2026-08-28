import { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AgentActivityPanel } from '@/components/shared/AgentActivity';
import { SectionHeader } from '@/components/shared/indicators';
import {
  initialAgentTasks, agentWorkflowSteps, shortTermMemory, longTermMemory,
  type AgentTask, type TaskStatus,
} from '@/data/mock-data';
import {
  Brain, GitBranch, Search, BarChart3, Lightbulb, BellRing,
  CheckCircle2, Loader2, Circle, AlertTriangle, RefreshCw,
  ArrowRight, Target, BrainCircuit, ListChecks, Database, Clock, Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const workflowIcons = [Target, ListChecks, Database, Search, BarChart3, Brain, GitBranch, Lightbulb, BellRing];

export function AgentConsole() {
  const { agentActive } = useApp();
  const [tasks, setTasks] = useState<AgentTask[]>(initialAgentTasks);
  const [activeStep, setActiveStep] = useState(5);

  useEffect(() => {
    if (!agentActive) return;
    const interval = setInterval(() => setActiveStep((s) => (s + 1) % agentWorkflowSteps.length), 3500);
    return () => clearInterval(interval);
  }, [agentActive]);

  useEffect(() => {
    if (!agentActive) return;
    const interval = setInterval(() => {
      setTasks((prev) => {
        const next = [...prev];
        const ipIdx = next.findIndex((t) => t.status === 'in-progress');
        if (ipIdx >= 0) {
          next[ipIdx] = { ...next[ipIdx], progress: Math.min(100, next[ipIdx].progress + 12), timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }) };
          if (next[ipIdx].progress >= 100) {
            next[ipIdx] = { ...next[ipIdx], status: 'completed' as TaskStatus, progress: 100 };
            if (ipIdx + 1 < next.length) {
              next[ipIdx + 1] = { ...next[ipIdx + 1], status: 'in-progress' as TaskStatus, progress: 8, timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }) };
            }
          }
        } else {
          const pIdx = next.findIndex((t) => t.status === 'pending');
          if (pIdx >= 0) {
            next[pIdx] = { ...next[pIdx], status: 'in-progress' as TaskStatus, progress: 10, timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }) };
          } else {
            return initialAgentTasks.map((t, i) => ({ ...t, status: i === 0 ? 'in-progress' as TaskStatus : 'pending' as TaskStatus, progress: i === 0 ? 12 : 0, timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }) }));
          }
        }
        return next;
      });
    }, 2200);
    return () => clearInterval(interval);
  }, [agentActive]);

  return (
    <div className="space-y-6">
      <SectionHeader title="Autonomous Agent Console" description="Watch the agent plan, execute, reason, and adapt in real time." icon={<BrainCircuit className="h-5 w-5" />} />

      <Card className="p-5 bg-gradient-to-br from-primary/[0.04] to-accent/[0.04] border-primary/20">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={cn('flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent', agentActive && 'animate-agent-pulse')}>
              <BrainCircuit className="h-7 w-7 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={cn('relative flex h-2.5 w-2.5', agentActive && 'animate-pulse')}>
                  <span className={cn('absolute inline-flex h-full w-full rounded-full opacity-75', agentActive ? 'bg-success animate-pulse-ring' : 'bg-muted-foreground')} />
                  <span className={cn('relative inline-flex rounded-full h-2.5 w-2.5', agentActive ? 'bg-success' : 'bg-muted-foreground')} />
                </span>
                <span className="font-display text-lg font-bold">{agentActive ? 'ACTIVE' : 'PAUSED'}</span>
                <Badge variant="outline" className="text-[10px] font-semibold">Autonomous Mode</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">{agentActive ? 'Continuously monitoring intelligence sources' : 'Agent monitoring is paused'}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-right"><p className="text-[11px] text-muted-foreground uppercase tracking-wider">Tasks Completed</p><p className="font-display text-xl font-bold tabular-nums">{tasks.filter((t) => t.status === 'completed').length}/{tasks.length}</p></div>
            <div className="h-10 w-px bg-border mx-2" />
            <div className="text-right"><p className="text-[11px] text-muted-foreground uppercase tracking-wider">Uptime</p><p className="font-display text-xl font-bold tabular-nums">99.9%</p></div>
          </div>
        </div>
      </Card>

      <Card className="p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700 shrink-0"><Target className="h-5 w-5" /></div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Agent Goal</p>
            <p className="text-base font-medium leading-relaxed">Track AI industry developments and monitor competitors for significant technology, product, and research updates.</p>
          </div>
        </div>
      </Card>

      <Card className="p-5">
        <h3 className="font-display font-semibold mb-1">Autonomous Workflow</h3>
        <p className="text-xs text-muted-foreground mb-5">Goal → Planning → Collection → Analysis → Decision → Insight → Alert</p>
        <div className="flex items-stretch gap-0 overflow-x-auto scrollbar-thin pb-2">
          {agentWorkflowSteps.map((step, i) => {
            const Icon = workflowIcons[i];
            const done = i < activeStep;
            const current = i === activeStep;
            return (
              <div key={step} className="flex items-center shrink-0">
                <div className={cn('flex flex-col items-center gap-2 px-3 py-3 rounded-xl border-2 min-w-[120px] transition-all', done && 'border-success/30 bg-success/5', current && 'border-primary bg-primary/5 animate-agent-pulse', !done && !current && 'border-border bg-muted/30 opacity-60')}>
                  <div className={cn('flex h-9 w-9 items-center justify-center rounded-lg', done && 'bg-success text-white', current && 'bg-gradient-to-br from-primary to-accent text-white', !done && !current && 'bg-muted text-muted-foreground')}>
                    {done ? <CheckCircle2 className="h-5 w-5" /> : <Icon className="h-4 w-4" />}
                  </div>
                  <span className={cn('text-[11px] font-semibold text-center leading-tight', done && 'text-success', current && 'text-primary', !done && !current && 'text-muted-foreground')}>{step}</span>
                </div>
                {i < agentWorkflowSteps.length - 1 && <ArrowRight className={cn('h-4 w-4 mx-1 shrink-0', done ? 'text-success' : 'text-border')} />}
              </div>
            );
          })}
        </div>
      </Card>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display font-semibold">Current Agent Plan</h3>
              <p className="text-xs text-muted-foreground">Goal: Identify recent AI developments from competitors</p>
            </div>
            <Badge variant="outline" className="text-xs">{tasks.filter((t) => t.status === 'completed').length} of {tasks.length} done</Badge>
          </div>
          <div className="space-y-2">
            {tasks.map((task) => <TaskRow key={task.id} task={task} />)}
          </div>
        </Card>

        <Card className="p-0 overflow-hidden flex flex-col max-h-[520px]">
          <AgentActivityPanel />
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <ReplanningDemo />
        <AgentMemoryPanel />
      </div>
    </div>
  );
}

function TaskRow({ task }: { task: AgentTask }) {
  const statusConfig: Record<TaskStatus, { icon: React.ReactNode; color: string; label: string }> = {
    completed: { icon: <CheckCircle2 className="h-4 w-4" />, color: 'text-success', label: 'Completed' },
    'in-progress': { icon: <Loader2 className="h-4 w-4 animate-spin" />, color: 'text-primary', label: 'In Progress' },
    pending: { icon: <Circle className="h-4 w-4" />, color: 'text-muted-foreground', label: 'Pending' },
    failed: { icon: <AlertTriangle className="h-4 w-4" />, color: 'text-destructive', label: 'Failed' },
    retrying: { icon: <RefreshCw className="h-4 w-4 animate-spin" />, color: 'text-warning', label: 'Retrying' },
  };
  const s = statusConfig[task.status];
  return (
    <div className={cn('flex items-center gap-3 p-3 rounded-xl border transition-all', task.status === 'in-progress' && 'border-primary/30 bg-primary/[0.03]', task.status === 'completed' && 'border-border bg-muted/20', task.status === 'pending' && 'border-dashed border-border opacity-70', task.status === 'failed' && 'border-destructive/30 bg-destructive/[0.03]', task.status === 'retrying' && 'border-warning/30 bg-warning/[0.03]')}>
      <span className={cn('shrink-0', s.color)}>{s.icon}</span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium truncate">{task.label}</p>
          <span className={cn('text-[10px] font-semibold uppercase shrink-0', s.color)}>{s.label}</span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[11px] text-muted-foreground flex items-center gap-1"><Database className="h-3 w-3" />{task.source}</span>
          <span className="text-muted-foreground/40">·</span>
          <span className="text-[11px] text-muted-foreground flex items-center gap-1 tabular-nums"><Clock className="h-3 w-3" />{task.timestamp}</span>
        </div>
        {task.status === 'in-progress' && (
          <div className="h-1 mt-2 rounded-full bg-muted overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all duration-700" style={{ width: `${task.progress}%` }} />
          </div>
        )}
      </div>
      {task.status !== 'pending' && <span className="text-xs font-bold tabular-nums text-muted-foreground shrink-0">{task.progress}%</span>}
    </div>
  );
}

function ReplanningDemo() {
  const [visible, setVisible] = useState(1);
  const steps = [
    { label: 'Search news', status: 'completed', detail: 'Found 7 relevant updates' },
    { label: 'Search research', status: 'completed', detail: 'Found 18 new papers' },
    { label: 'Search patents', status: 'failed', detail: 'Primary patent source unavailable' },
    { label: 'Selecting alternative source', status: 'retrying', detail: 'Falling back to Patent Mirror' },
    { label: 'Alternative patent source', status: 'completed', detail: 'Retrieved 6 new filings' },
    { label: 'Compare activity', status: 'completed', detail: '47% spike detected' },
    { label: 'Generate insight', status: 'completed', detail: 'Strategic recommendation ready' },
  ];

  useEffect(() => {
    const interval = setInterval(() => setVisible((v) => (v >= steps.length ? v : v + 1)), 1800);
    return () => clearInterval(interval);
  }, [steps.length]);

  const allDone = visible >= steps.length;
  const hasFailed = steps.slice(0, visible).some((s) => s.status === 'failed');

  return (
    <Card className="p-5">
      <div className="flex items-center gap-2 mb-1">
        <RefreshCw className="h-4 w-4 text-primary" />
        <h3 className="font-display font-semibold">Autonomous Re-Planning Demo</h3>
      </div>
      <p className="text-xs text-muted-foreground mb-4">User goal: "Find important developments from Competitor X."</p>

      <div className="space-y-1.5">
        {steps.slice(0, visible).map((s, i) => (
          <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg border animate-slide-in-right">
            <span className="text-[11px] font-bold text-muted-foreground w-4 shrink-0">{i + 1}</span>
            {s.status === 'completed' && <CheckCircle2 className="h-4 w-4 text-success shrink-0" />}
            {s.status === 'failed' && <AlertTriangle className="h-4 w-4 text-destructive shrink-0" />}
            {s.status === 'retrying' && <RefreshCw className="h-4 w-4 text-warning animate-spin shrink-0" />}
            <div className="min-w-0 flex-1"><p className="text-sm font-medium">{s.label}</p><p className="text-[11px] text-muted-foreground">{s.detail}</p></div>
          </div>
        ))}
      </div>

      {hasFailed && visible < steps.length && (
        <div className="mt-3 p-3 rounded-lg border border-warning/30 bg-warning/5">
          <p className="text-xs font-semibold text-warning flex items-center gap-1.5"><Sparkles className="h-3.5 w-3.5" /> Agent decision</p>
          <p className="text-sm mt-1">"Patent source unavailable. I will use an alternative source."</p>
        </div>
      )}

      {allDone && (
        <div className="mt-3 p-3 rounded-lg border border-success/30 bg-success/5 animate-fade-in">
          <p className="text-sm font-semibold text-success flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4" /> Agent successfully adapted its plan.</p>
          <Button size="sm" variant="ghost" className="mt-2 h-7 text-xs" onClick={() => setVisible(1)}><RefreshCw className="h-3 w-3 mr-1" /> Replay</Button>
        </div>
      )}
    </Card>
  );
}

function AgentMemoryPanel() {
  return (
    <Card className="p-5">
      <div className="flex items-center gap-2 mb-1">
        <Brain className="h-4 w-4 text-primary" />
        <h3 className="font-display font-semibold">Agent Memory</h3>
      </div>
      <p className="text-xs text-muted-foreground mb-4">What the agent knows and remembers</p>

      <div className="space-y-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-violet-600 mb-2 flex items-center gap-1"><Sparkles className="h-3 w-3" /> Short-term Memory</p>
          <div className="space-y-1.5">
            {shortTermMemory.map((m) => (
              <div key={m.key} className="p-2.5 rounded-lg border border-violet-100 bg-violet-50/40">
                <p className="text-[10px] font-semibold uppercase text-violet-700/70">{m.key}</p>
                <p className="text-xs mt-0.5 leading-snug">{m.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-blue-600 mb-2 flex items-center gap-1"><Database className="h-3 w-3" /> Long-term Memory</p>
          <div className="space-y-1.5">
            {longTermMemory.map((m) => (
              <div key={m.key} className="p-2.5 rounded-lg border border-blue-100 bg-blue-50/40">
                <p className="text-[10px] font-semibold uppercase text-blue-700/70">{m.key}</p>
                <p className="text-xs mt-0.5 leading-snug">{m.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
