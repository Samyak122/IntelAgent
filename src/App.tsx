import './App.css';
import { useState } from 'react';
import { AppProvider, useApp } from '@/context/AppContext';
import { Sidebar } from '@/components/layout/Sidebar';
import { Topbar } from '@/components/layout/Topbar';
import { SearchOverlay } from '@/components/shared/SearchOverlay';
import { ChatDrawer } from '@/components/shared/ChatDrawer';
import { Landing } from '@/pages/Landing';
import { Dashboard } from '@/pages/Dashboard';
import { AgentConsole } from '@/pages/AgentConsole';
import { Competitors } from '@/pages/Competitors';
import { CompetitorDetail } from '@/pages/CompetitorDetail';
import { Research } from '@/pages/Research';
import { News } from '@/pages/News';
import { Patents } from '@/pages/Patents';
import { Trends } from '@/pages/Trends';
import { Alerts } from '@/pages/Alerts';
import { Reports } from '@/pages/Reports';
import { Sources } from '@/pages/Sources';
import { Settings } from '@/pages/Settings';

function AppShell() {
  const { authed, page } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!authed) return <Landing />;

  const renderPage = () => {
    switch (page) {
      case 'dashboard': return <Dashboard />;
      case 'agent': return <AgentConsole />;
      case 'competitors': return <Competitors />;
      case 'competitor-detail': return <CompetitorDetail />;
      case 'research': return <Research />;
      case 'news': return <News />;
      case 'patents': return <Patents />;
      case 'trends': return <Trends />;
      case 'alerts': return <Alerts />;
      case 'reports': return <Reports />;
      case 'sources': return <Sources />;
      case 'settings': return <Settings />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 p-4 lg:p-6 max-w-[1600px] w-full mx-auto">
          <div key={page} className="animate-fade-in">{renderPage()}</div>
        </main>
      </div>
      <SearchOverlay />
      <ChatDrawer />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}

export default App;
