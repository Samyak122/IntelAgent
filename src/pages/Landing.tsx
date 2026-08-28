import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import {
  BrainCircuit, Radar, TrendingUp, Building2, BellRing, Search,
  ArrowRight, Sparkles, Activity, Shield, FileText, GitBranch, Lightbulb,
} from 'lucide-react';

export function Landing() {
  const { login } = useApp();

  const features = [
    { icon: Radar, title: 'Continuous Monitoring', desc: 'Autonomous 24/7 scanning of research, news, patents & competitor sources.' },
    { icon: BrainCircuit, title: 'AI-Powered Research', desc: 'The agent reads, understands, and summarizes new information automatically.' },
    { icon: Building2, title: 'Competitor Intelligence', desc: 'Track rivals with activity scores, strategic moves, and risk analysis.' },
    { icon: TrendingUp, title: 'Trend Detection', desc: 'Spot emerging technologies before they go mainstream.' },
    { icon: GitBranch, title: 'Autonomous Investigation', desc: 'Goal-driven planning, multi-step execution, and adaptive re-planning.' },
    { icon: BellRing, title: 'Smart Alerts', desc: 'Priority-ranked notifications with confidence scores and recommended actions.' },
  ];

  const workflow = [
    { icon: Search, label: 'Data Collection' },
    { icon: BrainCircuit, label: 'AI Analysis' },
    { icon: Building2, label: 'Competitor Intel' },
    { icon: TrendingUp, label: 'Trend Detection' },
    { icon: BellRing, label: 'Alerts' },
    { icon: Lightbulb, label: 'Recommendations' },
  ];

  return (
    <div className="min-h-screen bg-[hsl(var(--navy-950))] text-white overflow-x-hidden">
      <div className="fixed inset-0 bg-grid-dark pointer-events-none" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative">
        <nav className="flex items-center justify-between px-6 lg:px-10 h-16">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/30">
              <BrainCircuit className="h-5 w-5 text-white" />
            </div>
            <span className="font-display font-bold text-lg tracking-tight">IntelAgent</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-white/60">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#workflow" className="hover:text-white transition-colors">How it works</a>
            <button onClick={login} className="hover:text-white transition-colors">Sign in</button>
          </div>
          <Button onClick={login} className="bg-white text-navy-950 hover:bg-white/90">
            Get Started <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </nav>

        <section className="px-6 lg:px-10 pt-16 lg:pt-24 pb-20 max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/70 mb-6 animate-slide-up">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Autonomous Research & Competitor Tracking Agent · VH26-AI-06
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] animate-slide-up">
            Your Autonomous Research &<br />
            <span className="text-gradient">Competitive Intelligence Agent</span>
          </h1>
          <p className="mt-6 text-lg text-white/60 max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '80ms' }}>
            IntelAgent continuously monitors research publications, news, patents, and competitor
            websites — then analyzes, scores, and alerts you to what actually matters.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 animate-slide-up" style={{ animationDelay: '160ms' }}>
            <Button size="lg" onClick={login} className="h-12 px-8 text-base bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-lg shadow-primary/30">
              Get Started <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
            <Button size="lg" variant="outline" onClick={login} className="h-12 px-8 text-base border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white">
              View Demo
            </Button>
          </div>

          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '240ms' }}>
            {[
              { label: 'Sources monitored', value: '9', icon: Activity },
              { label: 'Competitors tracked', value: '5', icon: Building2 },
              { label: 'Items analyzed', value: '37K+', icon: FileText },
              { label: 'Avg. confidence', value: '91%', icon: Shield },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <s.icon className="h-5 w-5 text-primary mx-auto mb-2" />
                <div className="font-display text-2xl font-bold">{s.value}</div>
                <div className="text-[11px] text-white/50 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="workflow" className="px-6 lg:px-10 py-16 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">Autonomous Agent Workflow</p>
            <h2 className="font-display text-3xl font-bold">From goal to actionable recommendation</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {workflow.map((step, i) => (
              <div key={step.label} className="relative rounded-xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm hover:bg-white/10 transition-colors">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary/80 to-accent/80 mx-auto mb-2">
                  <step.icon className="h-5 w-5 text-white" />
                </div>
                <p className="text-xs font-semibold">{step.label}</p>
                <span className="absolute top-2 left-2 text-[10px] font-bold text-white/30">{i + 1}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="features" className="px-6 lg:px-10 py-16 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">Capabilities</p>
            <h2 className="font-display text-3xl font-bold">Everything an intelligence analyst needs — automated</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f) => (
              <div key={f.title} className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm hover:border-primary/40 hover:bg-white/[0.07] transition-all">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary/80 to-accent/80 mb-4 group-hover:scale-110 transition-transform">
                  <f.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-1.5">{f.title}</h3>
                <p className="text-sm text-white/55 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 lg:px-10 py-20 max-w-4xl mx-auto text-center">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-primary/10 to-accent/10 p-10 backdrop-blur-sm">
            <Sparkles className="h-8 w-8 text-primary mx-auto mb-4" />
            <h2 className="font-display text-3xl font-bold mb-3">Ready to deploy your intelligence agent?</h2>
            <p className="text-white/60 mb-6 max-w-xl mx-auto">Enter the live demo to see the autonomous agent monitor, analyze, and alert in real time.</p>
            <Button size="lg" onClick={login} className="h-12 px-8 text-base bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-lg shadow-primary/30">
              Launch Demo <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </section>

        <footer className="px-6 lg:px-10 py-8 border-t border-white/10 text-center text-xs text-white/40">
          IntelAgent — Autonomous Research & Competitor Tracking Agent · Prototype for VH26-AI-06
        </footer>
      </div>
    </div>
  );
}
