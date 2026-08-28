import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Search, BellRing, Menu, MessageSquare, Pause, Play, ChevronDown } from 'lucide-react';

export function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  const { unreadAlerts, markAlertsRead, setSearchOpen, setChatOpen, agentActive, toggleAgent, setPage } = useApp();
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 glass border-b border-border/80">
      <div className="flex items-center gap-3 px-4 lg:px-6 h-16">
        <button className="lg:hidden text-muted-foreground hover:text-foreground" onClick={onMenuClick}>
          <Menu className="h-5 w-5" />
        </button>

        <button onClick={() => setSearchOpen(true)} className="hidden md:flex items-center gap-2 h-9 px-3 rounded-lg bg-muted/70 hover:bg-muted border border-transparent hover:border-border transition-colors text-sm text-muted-foreground w-72">
          <Search className="h-4 w-4" />
          <span>Search intelligence…</span>
          <kbd className="ml-auto text-[10px] font-semibold bg-background border rounded px-1.5 py-0.5">⌘K</kbd>
        </button>
        <button onClick={() => setSearchOpen(true)} className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg hover:bg-muted text-muted-foreground">
          <Search className="h-4 w-4" />
        </button>

        <div className="flex-1" />

        <Button variant="outline" size="sm" onClick={toggleAgent} className={cn('hidden sm:flex items-center gap-1.5 h-9', agentActive ? 'border-success/30 text-success' : 'border-muted text-muted-foreground')}>
          {agentActive ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          <span className="font-semibold">{agentActive ? 'Agent Active' : 'Agent Paused'}</span>
        </Button>

        <Button variant="outline" size="icon" onClick={() => setChatOpen(true)} className="relative h-9 w-9">
          <MessageSquare className="h-4 w-4" />
        </Button>

        <div className="relative">
          <Button variant="outline" size="icon" onClick={() => { setNotifOpen((o) => !o); if (!notifOpen) markAlertsRead(); }} className="relative h-9 w-9">
            <BellRing className="h-4 w-4" />
            {unreadAlerts > 0 && <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">{unreadAlerts}</span>}
          </Button>
          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-xl border bg-popover shadow-xl z-50 animate-slide-up overflow-hidden">
              <div className="px-4 py-3 border-b"><p className="font-semibold text-sm">Notifications</p></div>
              <div className="max-h-80 overflow-y-auto scrollbar-thin divide-y">
                <div className="px-4 py-3 hover:bg-muted/50 cursor-pointer" onClick={() => { setPage('alerts'); setNotifOpen(false); }}>
                  <p className="text-xs font-semibold text-red-600">CRITICAL</p>
                  <p className="text-sm mt-0.5">NVIDIA announces next-gen GPU architecture</p>
                  <p className="text-[11px] text-muted-foreground mt-1">12 min ago</p>
                </div>
                <div className="px-4 py-3 hover:bg-muted/50 cursor-pointer" onClick={() => { setPage('alerts'); setNotifOpen(false); }}>
                  <p className="text-xs font-semibold text-orange-600">HIGH</p>
                  <p className="text-sm mt-0.5">Google patent activity increased 47%</p>
                  <p className="text-[11px] text-muted-foreground mt-1">2 min ago</p>
                </div>
                <div className="px-4 py-3 hover:bg-muted/50 cursor-pointer" onClick={() => { setPage('alerts'); setNotifOpen(false); }}>
                  <p className="text-xs font-semibold text-amber-600">MEDIUM</p>
                  <p className="text-sm mt-0.5">OpenAI launched agentic framework</p>
                  <p className="text-[11px] text-muted-foreground mt-1">25 min ago</p>
                </div>
              </div>
              <button onClick={() => { setPage('alerts'); setNotifOpen(false); }} className="w-full px-4 py-2.5 text-xs font-semibold text-primary hover:bg-muted/50 border-t">View all alerts</button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 pl-1">
          <Avatar className="h-8 w-8 border">
            <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-xs font-bold">IA</AvatarFallback>
          </Avatar>
          <div className="hidden lg:block leading-tight">
            <p className="text-sm font-semibold">IntelAgent User</p>
            <p className="text-[11px] text-muted-foreground">Research Analyst</p>
          </div>
          <ChevronDown className="hidden lg:block h-4 w-4 text-muted-foreground" />
        </div>
      </div>
    </header>
  );
}
