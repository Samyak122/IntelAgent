import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import { liveActivityFeed, type AgentEvent } from '@/data/mock-data';

interface LiveEvent extends AgentEvent {}

interface AppState {
  authed: boolean;
  login: () => void;
  logout: () => void;
  page: string;
  setPage: (p: string) => void;
  competitorId: string | null;
  openCompetitor: (id: string) => void;
  backToList: () => void;
  liveEvents: LiveEvent[];
  agentActive: boolean;
  toggleAgent: () => void;
  unreadAlerts: number;
  markAlertsRead: () => void;
  searchOpen: boolean;
  setSearchOpen: (v: boolean) => void;
  chatOpen: boolean;
  setChatOpen: (v: boolean) => void;
}

const Ctx = createContext<AppState | null>(null);

export function useApp() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [authed, setAuthed] = useState(false);
  const [page, setPage] = useState('dashboard');
  const [competitorId, setCompetitorId] = useState<string | null>(null);
  const [liveEvents, setLiveEvents] = useState<LiveEvent[]>([]);
  const [agentActive, setAgentActive] = useState(true);
  const [unreadAlerts, setUnreadAlerts] = useState(4);
  const [searchOpen, setSearchOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  const login = useCallback(() => {
    setAuthed(true);
    setPage('dashboard');
  }, []);

  const logout = useCallback(() => setAuthed(false), []);

  const openCompetitor = useCallback((id: string) => {
    setCompetitorId(id);
    setPage('competitor-detail');
  }, []);

  const backToList = useCallback(() => {
    setCompetitorId(null);
    setPage('competitors');
  }, []);

  const toggleAgent = useCallback(() => setAgentActive((a) => !a), []);
  const markAlertsRead = useCallback(() => setUnreadAlerts(0), []);

  useEffect(() => {
    if (!authed || !agentActive) return;
    let idx = 0;
    const seedInitial = liveActivityFeed.slice(0, 6).map((e, i) => ({
      id: `evt-${Date.now()}-${i}`,
      type: e.type,
      message: e.message,
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
    }));
    setLiveEvents(seedInitial.reverse());
    idx = 6;

    const interval = setInterval(() => {
      const entry = liveActivityFeed[idx % liveActivityFeed.length];
      const evt: LiveEvent = {
        id: `evt-${Date.now()}`,
        type: entry.type,
        message: entry.message,
        timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
      };
      setLiveEvents((prev) => [evt, ...prev].slice(0, 24));
      idx++;
      if (entry.type === 'alert') {
        setUnreadAlerts((c) => c + 1);
      }
    }, 4200);

    return () => clearInterval(interval);
  }, [authed, agentActive]);

  return (
    <Ctx.Provider
      value={{
        authed, login, logout, page, setPage, competitorId, openCompetitor, backToList,
        liveEvents, agentActive, toggleAgent, unreadAlerts, markAlertsRead,
        searchOpen, setSearchOpen, chatOpen, setChatOpen,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}
