import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { SectionHeader } from '@/components/shared/indicators';
import { Settings as SettingsIcon, Bell, Target, Building2, Database, Brain, Save, CheckCircle2 } from 'lucide-react';

const trackedCompetitors = ['OpenAI', 'Google', 'Microsoft', 'NVIDIA', 'Meta'];
const trackedTechnologies = ['Generative AI', 'AI Agents', 'Speech Translation', 'Multilingual AI', 'AI Infrastructure'];

export function Settings() {
  const [prefs, setPrefs] = useState({
    autoMonitor: true,
    criticalAlerts: true,
    highAlerts: true,
    mediumAlerts: false,
    infoAlerts: false,
    dailyDigest: true,
    weeklyDigest: true,
    soundAlerts: false,
  });
  const [saved, setSaved] = useState(false);

  const toggle = (key: keyof typeof prefs) => setPrefs((p) => ({ ...p, [key]: !p[key] }));

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const alertPrefs: { key: keyof typeof prefs; label: string; desc: string }[] = [
    { key: 'criticalAlerts', label: 'Critical alerts', desc: 'Immediate notification for critical intelligence' },
    { key: 'highAlerts', label: 'High priority alerts', desc: 'Notifications for high-impact developments' },
    { key: 'mediumAlerts', label: 'Medium priority alerts', desc: 'Notifications for medium-impact items' },
    { key: 'infoAlerts', label: 'Informational alerts', desc: 'Low-priority intelligence notifications' },
  ];

  const digestPrefs: { key: keyof typeof prefs; label: string; desc: string }[] = [
    { key: 'dailyDigest', label: 'Daily digest', desc: 'Receive a daily intelligence summary' },
    { key: 'weeklyDigest', label: 'Weekly digest', desc: 'Receive a weekly intelligence report' },
  ];

  return (
    <div className="space-y-6">
      <SectionHeader title="Settings" description="Configure monitoring preferences, alerts, and tracked intelligence." icon={<SettingsIcon className="h-5 w-5" />} />

      <div className="grid lg:grid-cols-2 gap-4">
        <Card className="p-5">
          <h3 className="font-display font-semibold mb-4 flex items-center gap-2"><Target className="h-4 w-4 text-primary" /> Monitoring Configuration</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div><p className="text-sm font-medium">Autonomous monitoring</p><p className="text-xs text-muted-foreground">Agent runs continuously without manual intervention</p></div>
              <Switch checked={prefs.autoMonitor} onCheckedChange={() => toggle('autoMonitor')} />
            </div>
            <div className="pt-3 border-t">
              <p className="text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-2 flex items-center gap-1"><Building2 className="h-3 w-3" /> Tracked Competitors</p>
              <div className="flex flex-wrap gap-1.5">
                {trackedCompetitors.map((c) => <Badge key={c} variant="secondary" className="text-xs">{c}</Badge>)}
              </div>
            </div>
            <div className="pt-3 border-t">
              <p className="text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-2 flex items-center gap-1"><Database className="h-3 w-3" /> Tracked Technologies</p>
              <div className="flex flex-wrap gap-1.5">
                {trackedTechnologies.map((t) => <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>)}
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="font-display font-semibold mb-4 flex items-center gap-2"><Bell className="h-4 w-4 text-primary" /> Alert Preferences</h3>
          <div className="space-y-3">
            {alertPrefs.map((p) => (
              <div key={p.key} className="flex items-center justify-between">
                <div><p className="text-sm font-medium">{p.label}</p><p className="text-xs text-muted-foreground">{p.desc}</p></div>
                <Switch checked={prefs[p.key]} onCheckedChange={() => toggle(p.key)} />
              </div>
            ))}
            <div className="pt-3 border-t">
              <p className="text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-2">Digests</p>
              {digestPrefs.map((p) => (
                <div key={p.key} className="flex items-center justify-between py-1.5">
                  <div><p className="text-sm font-medium">{p.label}</p><p className="text-xs text-muted-foreground">{p.desc}</p></div>
                  <Switch checked={prefs[p.key]} onCheckedChange={() => toggle(p.key)} />
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-5">
        <h3 className="font-display font-semibold mb-4 flex items-center gap-2"><Brain className="h-4 w-4 text-primary" /> Agent Configuration</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="p-3 rounded-xl border">
            <p className="text-[10px] font-semibold uppercase text-muted-foreground tracking-wider">Monitoring interval</p>
            <p className="font-display text-lg font-bold mt-1">5 min</p>
            <p className="text-[11px] text-muted-foreground">Sources checked every 5 minutes</p>
          </div>
          <div className="p-3 rounded-xl border">
            <p className="text-[10px] font-semibold uppercase text-muted-foreground tracking-wider">Relevance threshold</p>
            <p className="font-display text-lg font-bold mt-1">75%</p>
            <p className="text-[11px] text-muted-foreground">Minimum relevance to surface</p>
          </div>
          <div className="p-3 rounded-xl border">
            <p className="text-[10px] font-semibold uppercase text-muted-foreground tracking-wider">Alert confidence</p>
            <p className="font-display text-lg font-bold mt-1">80%</p>
            <p className="text-[11px] text-muted-foreground">Minimum confidence to alert</p>
          </div>
        </div>
      </Card>

      <div className="flex justify-end gap-2">
        {saved && <span className="text-sm text-success flex items-center gap-1 animate-fade-in"><CheckCircle2 className="h-4 w-4" /> Settings saved</span>}
        <Button onClick={save}><Save className="h-4 w-4 mr-1" /> Save preferences</Button>
      </div>
    </div>
  );
}
