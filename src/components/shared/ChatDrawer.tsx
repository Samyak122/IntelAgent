import { useEffect, useRef, useState } from 'react';
import { useApp } from '@/context/AppContext';
import { chatSuggestions } from '@/data/mock-data';
import { Button } from '@/components/ui/button';
import { X, Send, Sparkles, BrainCircuit, CornerDownLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Msg {
  role: 'user' | 'agent';
  text: string;
  sources?: string[];
  confidence?: number;
}

function generateAnswer(q: string): Msg {
  const lower = q.toLowerCase();
  if (lower.includes('nvidia')) {
    return {
      role: 'agent',
      text: "I detected 3 significant developments from NVIDIA this week: (1) A next-generation GPU architecture announcement targeting 4x training performance, (2) a new agent SDK toolkit launch, and (3) record data center revenue reported. Activity score is 87/100, the highest among tracked competitors. I recommend reviewing the infrastructure implications for your AI roadmap.",
      sources: ['Reuters', 'CNBC', 'NVIDIA Press'],
      confidence: 94,
    };
  }
  if (lower.includes('speech translation') || lower.includes('multilingual')) {
    return {
      role: 'agent',
      text: "Multiple competitors are actively working on speech translation: Google published a real-time multilingual speech translation breakthrough, Meta released an open multilingual model covering 100+ languages, and 124 related research papers have appeared this quarter. This is a confirmed emerging trend with 68% growth and 91% confidence.",
      sources: ['arXiv', 'Google DeepMind', 'Meta AI'],
      confidence: 91,
    };
  }
  if (lower.includes('last 7 days') || lower.includes('changed') || lower.includes('this week')) {
    return {
      role: 'agent',
      text: "In the last 7 days I detected 3 significant developments:\n1. Google announced a real-time multilingual speech translation breakthrough.\n2. NVIDIA unveiled a next-generation GPU architecture.\n3. OpenAI launched an agentic framework for multi-step automation.\nAdditionally, research activity around multilingual AI increased 68% and a high-priority alert was generated for Google's patent spike (+47%).",
      sources: ['GDELT', 'arXiv', 'Patent Mirror'],
      confidence: 89,
    };
  }
  if (lower.includes('trend')) {
    return {
      role: 'agent',
      text: "I'm currently tracking 6 emerging trends. The strongest is Real-Time Multilingual AI with +68% growth and 91% confidence, driven by 124 research papers and 38 patents. Other notable trends: Autonomous AI Agents (+54%), AI Infrastructure Scaling (+41%), and Low-Resource NLP (+37%).",
      sources: ['Trend Engine', 'arXiv', 'Patent Mirror'],
      confidence: 88,
    };
  }
  return {
    role: 'agent',
    text: "I'm continuously monitoring research, news, patents, and competitor activity. I'm currently tracking 5 competitors (OpenAI, Google, Microsoft, NVIDIA, Meta) across 5 technology areas. The most significant recent signal is a 47% spike in Google's patent activity around multilingual AI. Ask me about any competitor, technology, or time range for a detailed brief.",
    sources: ['Agent Memory', 'Live Monitor'],
    confidence: 86,
  };
}

export function ChatDrawer() {
  const { chatOpen, setChatOpen } = useApp();
  const [messages, setMessages] = useState<Msg[]>([
    { role: 'agent', text: "Hello! I'm your IntelAgent. I'm continuously monitoring 5 competitors across research, news, patents, and product activity. Ask me about recent developments, emerging trends, or specific competitors.", confidence: 100 },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatOpen) endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, chatOpen]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: 'user', text }]);
    setInput('');
    setTyping(true);
    setTimeout(() => { setMessages((m) => [...m, generateAnswer(text)]); setTyping(false); }, 900);
  };

  if (!chatOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-navy-950/40 backdrop-blur-sm animate-fade-in" onClick={() => setChatOpen(false)} />
      <div className="relative w-full max-w-md h-full bg-card border-l shadow-2xl flex flex-col animate-slide-in-right">
        <div className="flex items-center justify-between px-4 h-16 border-b shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
                <BrainCircuit className="h-5 w-5 text-white" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-success border-2 border-card" />
            </div>
            <div className="leading-tight">
              <p className="font-display font-semibold text-sm">Chat with Agent</p>
              <p className="text-[11px] text-success font-medium">Online · Autonomous mode</p>
            </div>
          </div>
          <button onClick={() => setChatOpen(false)} className="text-muted-foreground hover:text-foreground"><X className="h-5 w-5" /></button>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={cn('flex', m.role === 'user' ? 'justify-end' : 'justify-start')}>
              <div className="max-w-[85%]">
                {m.role === 'agent' && (
                  <div className="flex items-center gap-1.5 mb-1">
                    <Sparkles className="h-3 w-3 text-primary" />
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">IntelAgent</span>
                  </div>
                )}
                <div className={cn('rounded-2xl px-4 py-2.5 text-sm whitespace-pre-line', m.role === 'user' ? 'bg-primary text-primary-foreground rounded-br-md' : 'bg-muted text-foreground rounded-bl-md')}>
                  {m.text}
                </div>
                {m.sources && (
                  <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                    {m.sources.map((s) => (<span key={s} className="text-[10px] bg-muted px-2 py-0.5 rounded font-medium text-muted-foreground">{s}</span>))}
                    {m.confidence && <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-semibold">Confidence {m.confidence}%</span>}
                  </div>
                )}
              </div>
            </div>
          ))}
          {typing && (
            <div className="flex justify-start">
              <div className="rounded-2xl rounded-bl-md bg-muted px-4 py-3 flex gap-1">
                <span className="h-2 w-2 rounded-full bg-muted-foreground/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="h-2 w-2 rounded-full bg-muted-foreground/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="h-2 w-2 rounded-full bg-muted-foreground/60 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {messages.length <= 1 && (
          <div className="px-4 pb-2">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">Try asking</p>
            <div className="flex flex-wrap gap-1.5">
              {chatSuggestions.slice(0, 3).map((s) => (
                <button key={s} onClick={() => send(s)} className="text-xs bg-muted hover:bg-muted/70 rounded-full px-3 py-1.5 transition-colors text-left">{s}</button>
              ))}
            </div>
          </div>
        )}

        <div className="p-3 border-t shrink-0">
          <div className="flex items-end gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input); } }}
              rows={1}
              placeholder="Ask a follow-up question…"
              className="flex-1 resize-none rounded-xl border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 max-h-24"
            />
            <Button size="icon" onClick={() => send(input)} className="h-10 w-10 rounded-xl shrink-0">
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-[10px] text-muted-foreground mt-1.5 flex items-center gap-1">
            <CornerDownLeft className="h-3 w-3" /> Enter to send · Shift+Enter for newline
          </p>
        </div>
      </div>
    </div>
  );
}
