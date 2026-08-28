export type AlertSeverity = 'critical' | 'high' | 'medium' | 'informational';
export type TaskStatus = 'completed' | 'in-progress' | 'pending' | 'failed' | 'retrying';
export type SourceType = 'research' | 'news' | 'patent' | 'competitor';
export type Sentiment = 'positive' | 'neutral' | 'negative';

export interface Competitor {
  id: string;
  name: string;
  industry: string;
  logo: string;
  activityScore: number;
  researchChange: number;
  patentChange: number;
  newsChange: number;
  productLaunches: number;
  techFocus: string[];
  overview: string;
  strengths: string[];
  risks: string[];
  strategicMoves: string[];
  recentDevelopments: string[];
  timeline: TimelineEvent[];
}

export interface TimelineEvent {
  date: string;
  label: string;
  type: 'product' | 'research' | 'patent' | 'partnership' | 'news';
}

export interface ResearchPaper {
  id: string;
  title: string;
  authors: string[];
  organization: string;
  publishedDate: string;
  source: string;
  topics: string[];
  relevanceScore: number;
  summary: string;
  company?: string;
}

export interface NewsItem {
  id: string;
  headline: string;
  source: string;
  time: string;
  company: string;
  topics: string[];
  importance: number;
  sentiment: Sentiment;
  summary: string;
}

export interface Patent {
  id: string;
  title: string;
  applicant: string;
  inventor: string;
  publicationDate: string;
  technology: string;
  competitor: string;
  relevanceScore: number;
  summary: string;
}

export interface Trend {
  id: string;
  name: string;
  growth: number;
  confidence: number;
  relatedCompanies: string[];
  relatedResearch: number;
  relatedPatents: number;
  description: string;
  whyItMatters: string;
  timelineData: { date: string; value: number }[];
}

export interface Alert {
  id: string;
  severity: AlertSeverity;
  title: string;
  detected: string;
  confidence: number;
  whyItMatters: string;
  recommendedAction: string;
  company?: string;
  acknowledged?: boolean;
}

export interface SourceInfo {
  id: string;
  name: string;
  category: SourceType;
  status: 'connected' | 'degraded' | 'disconnected';
  lastChecked: string;
  newItems: number;
  totalItems: number;
  description: string;
}

export interface AgentTask {
  id: string;
  label: string;
  status: TaskStatus;
  progress: number;
  source: string;
  timestamp: string;
}

export interface AgentEvent {
  id: string;
  type: 'planning' | 'collection' | 'analysis' | 'decision' | 'insight' | 'alert' | 'replan';
  message: string;
  timestamp: string;
}

export interface AgentMemoryItem {
  key: string;
  value: string;
}

export const competitors: Competitor[] = [
  {
    id: 'openai',
    name: 'OpenAI',
    industry: 'Artificial Intelligence',
    logo: 'OG',
    activityScore: 92,
    researchChange: 28,
    patentChange: 12,
    newsChange: 35,
    productLaunches: 4,
    techFocus: ['Generative AI', 'Large Language Models', 'AI Agents', 'Multimodal AI'],
    overview:
      'OpenAI is a leading AI research lab and product company focused on developing safe and beneficial artificial general intelligence. Known for the GPT family of models and the ChatGPT platform.',
    strengths: ['Brand leadership in consumer AI', 'Rapid model capability gains', 'Strong enterprise adoption'],
    risks: ['Intensifying competition from open-source models', 'High compute costs', 'Regulatory scrutiny'],
    strategicMoves: ['Expanded enterprise tier', 'Launched agent framework', 'Partnered with major cloud providers'],
    recentDevelopments: [
      'Released next-generation reasoning model',
      'Expanded enterprise pricing tiers',
      'Announced agent orchestration framework',
    ],
    timeline: [
      { date: 'Aug 27', label: 'New agentic framework announced', type: 'product' },
      { date: 'Aug 25', label: 'Research paper on reasoning scaling', type: 'research' },
      { date: 'Aug 23', label: 'Patent on context compression', type: 'patent' },
      { date: 'Aug 20', label: 'Cloud infrastructure partnership', type: 'partnership' },
      { date: 'Aug 17', label: 'Enterprise tier expansion', type: 'news' },
    ],
  },
  {
    id: 'google',
    name: 'Google',
    industry: 'Technology / AI',
    logo: 'GG',
    activityScore: 88,
    researchChange: 31,
    patentChange: 22,
    newsChange: 24,
    productLaunches: 6,
    techFocus: ['Multilingual AI', 'Speech Translation', 'AI Infrastructure', 'Generative AI'],
    overview:
      'Google is a global technology leader with deep AI research through Google DeepMind and broad product integration across Search, Cloud, and Workspace.',
    strengths: ['World-class research output', 'Massive infrastructure', 'Multilingual AI leadership'],
    risks: ['Monopoly scrutiny', 'Talent retention', 'Open-source commoditization'],
    strategicMoves: ['Unified DeepMind research unit', 'Multilingual translation breakthrough', 'Custom TPU acceleration'],
    recentDevelopments: [
      'Published breakthrough in real-time multilingual speech translation',
      'Expanded Gemini model family',
      'Announced new TPU generation',
    ],
    timeline: [
      { date: 'Aug 27', label: 'Real-time speech translation breakthrough', type: 'research' },
      { date: 'Aug 24', label: 'Gemini model family expansion', type: 'product' },
      { date: 'Aug 22', label: 'New TPU accelerator announced', type: 'product' },
      { date: 'Aug 19', label: 'Patent on efficient attention', type: 'patent' },
    ],
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    industry: 'Cloud / AI',
    logo: 'MS',
    activityScore: 81,
    researchChange: 19,
    patentChange: 16,
    newsChange: 28,
    productLaunches: 5,
    techFocus: ['Enterprise AI', 'AI Agents', 'AI Infrastructure', 'Copilot'],
    overview:
      'Microsoft is integrating AI across its entire product stack through Azure OpenAI, Copilot, and its own research division, targeting enterprise AI dominance.',
    strengths: ['Enterprise distribution', 'Azure infrastructure scale', 'Copilot product surface'],
    risks: ['Dependence on OpenAI partnership', 'Enterprise sales cycles', 'Antitrust attention'],
    strategicMoves: ['Copilot expansion to all products', 'Azure AI platform growth', 'Agent framework integration'],
    recentDevelopments: [
      'Expanded Copilot to new product surfaces',
      'Azure AI revenue growth acceleration',
      'New enterprise agent capabilities',
    ],
    timeline: [
      { date: 'Aug 26', label: 'Copilot expansion announcement', type: 'product' },
      { date: 'Aug 23', label: 'Azure AI platform update', type: 'news' },
      { date: 'Aug 21', label: 'Enterprise agent capability launch', type: 'product' },
      { date: 'Aug 18', label: 'Research on AI safety alignment', type: 'research' },
    ],
  },
  {
    id: 'nvidia',
    name: 'NVIDIA',
    industry: 'AI Hardware',
    logo: 'NV',
    activityScore: 87,
    researchChange: 32,
    patentChange: 18,
    newsChange: 41,
    productLaunches: 3,
    techFocus: ['AI Infrastructure', 'GPU Computing', 'AI Agents', 'Data Center'],
    overview:
      'NVIDIA is the dominant provider of AI compute infrastructure, powering the training and inference of nearly all frontier AI models through its GPU and CUDA ecosystem.',
    strengths: ['CUDA ecosystem lock-in', 'Data center dominance', 'Software stack depth'],
    risks: ['Competition from custom silicon', 'Geopolitical export controls', 'Valuation pressure'],
    strategicMoves: ['Next-gen GPU architecture', 'Expanded agent SDKs', 'Cloud partnership expansion'],
    recentDevelopments: [
      'Announced next-generation GPU architecture',
      'Launched new agent SDK toolkit',
      'Reported record data center revenue',
    ],
    timeline: [
      { date: 'Aug 27', label: 'New GPU architecture unveiled', type: 'product' },
      { date: 'Aug 24', label: 'Agent SDK toolkit launch', type: 'product' },
      { date: 'Aug 22', label: 'Record data center revenue', type: 'news' },
      { date: 'Aug 19', label: 'Patent on interconnect fabric', type: 'patent' },
    ],
  },
  {
    id: 'meta',
    name: 'Meta',
    industry: 'Social / AI',
    logo: 'MT',
    activityScore: 76,
    researchChange: 24,
    patentChange: 9,
    newsChange: 18,
    productLaunches: 2,
    techFocus: ['Open-source AI', 'Multilingual AI', 'Generative AI', 'AI Infrastructure'],
    overview:
      'Meta is pursuing an open-source AI strategy through its Llama model family, with strong research output and a focus on multilingual and multimodal capabilities.',
    strengths: ['Open-source community momentum', 'Massive user distribution', 'Research talent'],
    risks: ['Monetization of open models', 'Regulatory pressure on social platforms', 'Capital expenditure'],
    strategicMoves: ['Llama model releases', 'Open-source multilingual models', 'Custom infrastructure investment'],
    recentDevelopments: [
      'Released new multilingual Llama variant',
      'Expanded open-source model ecosystem',
      'Invested in custom AI infrastructure',
    ],
    timeline: [
      { date: 'Aug 25', label: 'Multilingual Llama variant released', type: 'product' },
      { date: 'Aug 22', label: 'Open-source ecosystem expansion', type: 'news' },
      { date: 'Aug 20', label: 'Custom infrastructure investment', type: 'partnership' },
      { date: 'Aug 17', label: 'Research on low-resource languages', type: 'research' },
    ],
  },
];

export const researchPapers: ResearchPaper[] = [
  {
    id: 'r1',
    title: 'Real-Time Multilingual Speech Translation with Streaming Transformers',
    authors: ['A. Chen', 'M. Rodriguez', 'K. Patel'],
    organization: 'Google DeepMind',
    publishedDate: '2026-08-26',
    source: 'arXiv',
    topics: ['Speech Translation', 'Multilingual AI', 'Transformers'],
    relevanceScore: 94,
    summary:
      'Research demonstrates significant improvements in low-resource multilingual speech translation using a streaming transformer architecture with cascaded encoder-decoder decoding, achieving 12% BLEU improvement on 40+ languages.',
    company: 'google',
  },
  {
    id: 'r2',
    title: 'Scaling Reasoning Capabilities in Large Language Models via Self-Play',
    authors: ['J. Park', 'L. Wang', 'S. Kumar'],
    organization: 'OpenAI',
    publishedDate: '2026-08-25',
    source: 'arXiv',
    topics: ['Reasoning', 'Large Language Models', 'Self-Play'],
    relevanceScore: 91,
    summary:
      'This paper introduces a self-play training methodology that improves multi-step reasoning in LLMs by 23% on benchmarks, with implications for agentic task planning and decision-making.',
    company: 'openai',
  },
  {
    id: 'r3',
    title: 'Efficient Context Compression for Long-Context Language Models',
    authors: ['R. Sharma', 'T. Nakamura'],
    organization: 'OpenAI',
    publishedDate: '2026-08-23',
    source: 'Crossref',
    topics: ['Long Context', 'Efficiency', 'Language Models'],
    relevanceScore: 87,
    summary:
      'A novel context compression technique reduces memory usage by 40% while preserving retrieval accuracy, enabling longer agent interactions with lower compute cost.',
    company: 'openai',
  },
  {
    id: 'r4',
    title: 'TPU-Optimized Attention Mechanisms for Real-Time Inference',
    authors: ['D. Liu', 'P. Anderson', 'F. Gomez'],
    organization: 'Google',
    publishedDate: '2026-08-22',
    source: 'arXiv',
    topics: ['AI Infrastructure', 'Attention', 'Inference'],
    relevanceScore: 82,
    summary:
      'Presents TPU-specific optimizations for attention computation delivering 3.2x throughput improvement, relevant to infrastructure trends in the AI hardware space.',
    company: 'google',
  },
  {
    id: 'r5',
    title: 'Low-Resource Language Coverage in Open Multilingual Models',
    authors: ['V. Iyer', 'N. Singh', 'A. Bose'],
    organization: 'Meta AI',
    publishedDate: '2026-08-20',
    source: 'arXiv',
    topics: ['Multilingual AI', 'Low-resource NLP', 'Open Source'],
    relevanceScore: 85,
    summary:
      'Evaluates low-resource language coverage across open multilingual models, showing meaningful gaps and proposing data augmentation strategies for Indian and African languages.',
    company: 'meta',
  },
  {
    id: 'r6',
    title: 'Agent Orchestration Frameworks: A Comparative Analysis',
    authors: ['C. Becker', 'H. Tanaka'],
    organization: 'Microsoft Research',
    publishedDate: '2026-08-19',
    source: 'Crossref',
    topics: ['AI Agents', 'Orchestration', 'Planning'],
    relevanceScore: 89,
    summary:
      'Compares emerging agent orchestration frameworks on planning, memory, and tool-use dimensions, highlighting trade-offs between autonomy and controllability.',
    company: 'microsoft',
  },
  {
    id: 'r7',
    title: 'Interconnect Fabrics for Large-Scale GPU Clusters',
    authors: ['G. Peters', 'M. Volkov'],
    organization: 'NVIDIA Research',
    publishedDate: '2026-08-18',
    source: 'Crossref',
    topics: ['AI Infrastructure', 'GPU Computing', 'Networking'],
    relevanceScore: 78,
    summary:
      'Describes a new interconnect fabric architecture reducing communication latency by 35% across large GPU clusters, directly impacting training throughput for frontier models.',
    company: 'nvidia',
  },
  {
    id: 'r8',
    title: 'Alignment and Safety in Autonomous AI Agents',
    authors: ['E. Foster', 'Y. Zhang', 'R. Ali'],
    organization: 'Microsoft Research',
    publishedDate: '2026-08-17',
    source: 'arXiv',
    topics: ['AI Safety', 'Alignment', 'AI Agents'],
    relevanceScore: 80,
    summary:
      'Examines alignment challenges specific to autonomous agents operating over long horizons, proposing guardrail mechanisms for safe multi-step execution.',
    company: 'microsoft',
  },
];

export const newsItems: NewsItem[] = [
  {
    id: 'n1',
    headline: 'Google announces real-time multilingual speech translation breakthrough',
    source: 'TechCrunch',
    time: '2 minutes ago',
    company: 'Google',
    topics: ['Generative AI', 'Multilingual AI'],
    importance: 92,
    sentiment: 'positive',
    summary:
      'Google revealed a new streaming speech translation system supporting 40+ languages in real-time, marking a significant step toward universal translation.',
  },
  {
    id: 'n2',
    headline: 'OpenAI launches agentic framework for multi-step task automation',
    source: 'The Verge',
    time: '18 minutes ago',
    company: 'OpenAI',
    topics: ['AI Agents', 'Enterprise AI'],
    importance: 88,
    sentiment: 'positive',
    summary:
      'OpenAI unveiled a new framework allowing developers to build autonomous agents that plan and execute multi-step tasks with tool access.',
  },
  {
    id: 'n3',
    headline: 'NVIDIA unveils next-generation GPU architecture for AI workloads',
    source: 'Reuters',
    time: '45 minutes ago',
    company: 'NVIDIA',
    topics: ['AI Infrastructure'],
    importance: 90,
    sentiment: 'positive',
    summary:
      'NVIDIA announced its next GPU architecture targeting a 4x improvement in AI training performance, reinforcing its infrastructure dominance.',
  },
  {
    id: 'n4',
    headline: 'Microsoft expands Copilot to all enterprise product surfaces',
    source: 'Bloomberg',
    time: '1 hour ago',
    company: 'Microsoft',
    topics: ['Enterprise AI', 'AI Agents'],
    importance: 84,
    sentiment: 'positive',
    summary:
      'Microsoft expanded its Copilot assistant across the full enterprise product line, signaling deeper AI integration in workplace software.',
  },
  {
    id: 'n5',
    headline: 'Meta releases open multilingual Llama variant covering 100+ languages',
    source: 'VentureBeat',
    time: '3 hours ago',
    company: 'Meta',
    topics: ['Multilingual AI', 'Open Source'],
    importance: 79,
    sentiment: 'positive',
    summary:
      'Meta released an open-source multilingual Llama model covering over 100 languages, strengthening its open AI strategy.',
  },
  {
    id: 'n6',
    headline: 'EU regulators open inquiry into AI agent safety practices',
    source: 'Financial Times',
    time: '5 hours ago',
    company: 'OpenAI',
    topics: ['AI Safety', 'Regulation'],
    importance: 72,
    sentiment: 'negative',
    summary:
      'European regulators announced a new inquiry examining safety practices around autonomous AI agents, potentially affecting multiple vendors.',
  },
  {
    id: 'n7',
    headline: 'NVIDIA reports record data center revenue driven by AI demand',
    source: 'CNBC',
    time: '8 hours ago',
    company: 'NVIDIA',
    topics: ['AI Infrastructure', 'Earnings'],
    importance: 86,
    sentiment: 'positive',
    summary:
      'NVIDIA reported quarterly data center revenue well above expectations, citing sustained enterprise AI demand.',
  },
];

export const patents: Patent[] = [
  {
    id: 'p1',
    title: 'Streaming encoder-decoder architecture for real-time speech translation',
    applicant: 'Google LLC',
    inventor: 'A. Chen, M. Rodriguez',
    publicationDate: '2026-08-23',
    technology: 'Speech Translation',
    competitor: 'Google',
    relevanceScore: 95,
    summary:
      'Patent covers a streaming transformer architecture for low-latency multilingual speech translation with incremental decoding.',
  },
  {
    id: 'p2',
    title: 'Context compression via learned token importance scoring',
    applicant: 'OpenAI',
    inventor: 'R. Sharma, T. Nakamura',
    publicationDate: '2026-08-22',
    technology: 'Long Context',
    competitor: 'OpenAI',
    relevanceScore: 88,
    summary:
      'Describes techniques for compressing long context windows using learned token importance to reduce memory footprint.',
  },
  {
    id: 'p3',
    title: 'High-bandwidth interconnect fabric for GPU clusters',
    applicant: 'NVIDIA Corporation',
    inventor: 'G. Peters, M. Volkov',
    publicationDate: '2026-08-19',
    technology: 'AI Infrastructure',
    competitor: 'NVIDIA',
    relevanceScore: 81,
    summary:
      'Covers a scalable interconnect fabric design reducing communication overhead across distributed GPU clusters.',
  },
  {
    id: 'p4',
    title: 'Agent orchestration with constraint-guided planning',
    applicant: 'Microsoft Corporation',
    inventor: 'C. Becker, H. Tanaka',
    publicationDate: '2026-08-17',
    technology: 'AI Agents',
    competitor: 'Microsoft',
    relevanceScore: 84,
    summary:
      'Patent describes a planning system for autonomous agents that enforces constraints during multi-step task execution.',
  },
  {
    id: 'p5',
    title: 'Low-resource language augmentation for multilingual models',
    applicant: 'Meta Platforms',
    inventor: 'V. Iyer, N. Singh',
    publicationDate: '2026-08-16',
    technology: 'Multilingual AI',
    competitor: 'Meta',
    relevanceScore: 83,
    summary:
      'Covers data augmentation methods to improve low-resource language coverage in multilingual neural models.',
  },
  {
    id: 'p6',
    title: 'Hardware-aware attention scheduling for inference acceleration',
    applicant: 'Google LLC',
    inventor: 'D. Liu, P. Anderson',
    publicationDate: '2026-08-14',
    technology: 'AI Infrastructure',
    competitor: 'Google',
    relevanceScore: 77,
    summary:
      'Describes scheduling attention computation to exploit hardware-specific memory hierarchies for faster inference.',
  },
];

export const trends: Trend[] = [
  {
    id: 't1',
    name: 'Real-Time Multilingual AI',
    growth: 68,
    confidence: 91,
    relatedCompanies: ['Google', 'Microsoft', 'OpenAI', 'Meta'],
    relatedResearch: 124,
    relatedPatents: 38,
    description:
      'A sharp acceleration in research, patents, and product launches targeting real-time multilingual speech translation and low-resource language coverage.',
    whyItMatters:
      'This trend signals a strategic race toward universal translation. Companies leading here will own a foundational capability for global AI products, with particular impact in emerging markets and low-resource languages.',
    timelineData: [
      { date: 'May', value: 42 },
      { date: 'Jun', value: 51 },
      { date: 'Jul', value: 63 },
      { date: 'Aug', value: 88 },
    ],
  },
  {
    id: 't2',
    name: 'Autonomous AI Agents',
    growth: 54,
    confidence: 86,
    relatedCompanies: ['OpenAI', 'Microsoft'],
    relatedResearch: 97,
    relatedPatents: 29,
    description:
      'Rapid growth in frameworks and patents for autonomous agents that plan, use tools, and execute multi-step tasks with minimal human oversight.',
    whyItMatters:
      'Agentic AI is shifting the product paradigm from passive assistants to autonomous workers. Early platform winners will define how enterprises build and deploy automated workflows.',
    timelineData: [
      { date: 'May', value: 38 },
      { date: 'Jun', value: 44 },
      { date: 'Jul', value: 55 },
      { date: 'Aug', value: 72 },
    ],
  },
  {
    id: 't3',
    name: 'AI Infrastructure Scaling',
    growth: 41,
    confidence: 88,
    relatedCompanies: ['NVIDIA', 'Google', 'Microsoft'],
    relatedResearch: 68,
    relatedPatents: 44,
    description:
      'Sustained growth in patents and product launches around GPU architecture, interconnects, and custom silicon for AI training and inference.',
    whyItMatters:
      'Infrastructure is the foundation of the AI stack. Advances here determine the cost and feasibility of frontier models, creating durable competitive moats for hardware leaders.',
    timelineData: [
      { date: 'May', value: 50 },
      { date: 'Jun', value: 58 },
      { date: 'Jul', value: 64 },
      { date: 'Aug', value: 78 },
    ],
  },
  {
    id: 't4',
    name: 'Low-Resource NLP',
    growth: 37,
    confidence: 82,
    relatedCompanies: ['Meta', 'Google'],
    relatedResearch: 56,
    relatedPatents: 18,
    description:
      'Growing research focus on extending AI capabilities to low-resource languages, particularly Indian and African language families.',
    whyItMatters:
      'Coverage of low-resource languages unlocks large underserved populations and is becoming a differentiator for global AI platforms.',
    timelineData: [
      { date: 'May', value: 28 },
      { date: 'Jun', value: 33 },
      { date: 'Jul', value: 39 },
      { date: 'Aug', value: 48 },
    ],
  },
];

export const alerts: Alert[] = [
  {
    id: 'a1',
    severity: 'high',
    title: 'Google has significantly increased patent activity in real-time speech translation',
    detected: '2 minutes ago',
    confidence: 93,
    whyItMatters: 'Patent activity increased 47% over the previous 30-day average, signaling a strategic IP push.',
    recommendedAction: "Investigate Google\u2019s recent product and research activity in multilingual AI.",
    company: 'Google',
  },
  {
    id: 'a2',
    severity: 'critical',
    title: 'NVIDIA announces next-generation GPU architecture with 4x training performance',
    detected: '12 minutes ago',
    confidence: 96,
    whyItMatters: 'A major infrastructure leap that may shift the competitive balance in AI compute for 12-18 months.',
    recommendedAction: "Assess impact on competitors\u2019 infrastructure roadmaps and pricing.",
    company: 'NVIDIA',
  },
  {
    id: 'a3',
    severity: 'medium',
    title: 'OpenAI launched a new agentic framework for multi-step task automation',
    detected: '25 minutes ago',
    confidence: 84,
    whyItMatters: 'Agentic frameworks are a fast-growing segment; this launch expands OpenAI\u2019s developer surface.',
    recommendedAction: 'Compare with Microsoft and open-source agent frameworks.',
    company: 'OpenAI',
  },
  {
    id: 'a4',
    severity: 'informational',
    title: 'Research activity around multilingual AI increased 68% this quarter',
    detected: '1 hour ago',
    confidence: 88,
    whyItMatters: 'A confirmed emerging trend with broad participation across tracked competitors.',
    recommendedAction: 'Generate a technology trend report on multilingual AI.',
  },
];

export const sources: SourceInfo[] = [
  { id: 's1', name: 'Crossref', category: 'research', status: 'connected', lastChecked: '1 minute ago', newItems: 12, totalItems: 4823, description: 'Academic publication metadata across all disciplines.' },
  { id: 's2', name: 'arXiv', category: 'research', status: 'connected', lastChecked: '2 minutes ago', newItems: 18, totalItems: 3120, description: 'Pre-print server for physics, CS, and AI research.' },
  { id: 's3', name: 'GDELT', category: 'news', status: 'connected', lastChecked: '2 minutes ago', newItems: 28, totalItems: 18432, description: 'Global news event monitoring across 50+ languages.' },
  { id: 's4', name: 'RSS Feeds', category: 'news', status: 'connected', lastChecked: '4 minutes ago', newItems: 9, totalItems: 5621, description: 'Aggregated RSS feeds from tech and business outlets.' },
  { id: 's5', name: 'Patent Registry', category: 'patent', status: 'degraded', lastChecked: '6 minutes ago', newItems: 0, totalItems: 2104, description: 'Patent filing and grant monitoring (primary source degraded).' },
  { id: 's6', name: 'Patent Mirror', category: 'patent', status: 'connected', lastChecked: '3 minutes ago', newItems: 6, totalItems: 1980, description: 'Secondary patent data source used as fallback.' },
  { id: 's7', name: 'Company Websites', category: 'competitor', status: 'connected', lastChecked: '5 minutes ago', newItems: 4, totalItems: 1120, description: 'Direct monitoring of competitor product and press pages.' },
  { id: 's8', name: 'Company Blogs', category: 'competitor', status: 'connected', lastChecked: '7 minutes ago', newItems: 3, totalItems: 860, description: 'Engineering and research blogs from tracked companies.' },
  { id: 's9', name: 'Press Releases', category: 'competitor', status: 'connected', lastChecked: '8 minutes ago', newItems: 5, totalItems: 1430, description: 'Wire services and official press release feeds.' },
];

export const initialAgentTasks: AgentTask[] = [
  { id: 't1', label: 'Search recent research publications', status: 'completed', progress: 100, source: 'arXiv + Crossref', timestamp: '09:41:02' },
  { id: 't2', label: 'Monitor company announcements', status: 'completed', progress: 100, source: 'Company Websites', timestamp: '09:41:18' },
  { id: 't3', label: 'Check patent activity', status: 'completed', progress: 100, source: 'Patent Registry', timestamp: '09:41:35' },
  { id: 't4', label: 'Analyze product updates', status: 'completed', progress: 100, source: 'Press Releases', timestamp: '09:41:51' },
  { id: 't5', label: 'Compare with historical activity', status: 'completed', progress: 100, source: 'Agent Memory', timestamp: '09:42:09' },
  { id: 't6', label: 'Identify emerging trends', status: 'in-progress', progress: 64, source: 'Trend Engine', timestamp: '09:42:28' },
  { id: 't7', label: 'Generate strategic recommendation', status: 'pending', progress: 0, source: 'Insight Engine', timestamp: '—' },
];

export const shortTermMemory: AgentMemoryItem[] = [
  { key: 'Current Goal', value: 'Track AI industry developments and monitor competitors for significant technology, product, and research updates.' },
  { key: 'Active Plan', value: '7-step monitoring plan covering research, news, patents, and competitor activity.' },
  { key: 'Current Observation', value: 'Unusual spike in multilingual speech translation patents and research across Google and Meta.' },
  { key: 'In-Progress Task', value: 'Identifying emerging trend: Real-Time Multilingual AI' },
];

export const longTermMemory: AgentMemoryItem[] = [
  { key: 'Tracked Competitors', value: 'OpenAI, Google, Microsoft, NVIDIA, Meta' },
  { key: 'Tracked Technologies', value: 'Generative AI, AI Agents, Speech Translation, Multilingual AI, AI Infrastructure' },
  { key: 'User Interests', value: 'AI, Speech Translation, Indian Languages, Low-resource NLP' },
  { key: 'Historical Trend', value: 'Autonomous AI Agents growth: +54% over last quarter' },
  { key: 'Previous Finding', value: 'NVIDIA infrastructure dominance sustained for 5 quarters' },
];

export const agentWorkflowSteps = [
  'Goal Understanding',
  'Task Planning',
  'Source Selection',
  'Data Collection',
  'Analysis',
  'Importance Evaluation',
  'Decision',
  'Insight Generation',
  'Alert / Report',
];

export const liveActivityFeed: { message: string; type: AgentEvent['type'] }[] = [
  { message: 'Goal understood: track AI industry developments', type: 'planning' },
  { message: 'Generated monitoring plan (7 tasks)', type: 'planning' },
  { message: 'Checking research publications on arXiv', type: 'collection' },
  { message: 'Found 18 new papers matching tracked technologies', type: 'collection' },
  { message: 'Checking competitor news via GDELT', type: 'collection' },
  { message: 'Found 7 relevant competitor updates', type: 'collection' },
  { message: 'Checking patent activity via Patent Registry', type: 'collection' },
  { message: 'Detected unusual patent spike in speech translation', type: 'analysis' },
  { message: 'Primary patent source degraded \u2014 selecting alternative source', type: 'replan' },
  { message: 'Alternative patent source retrieved 6 new filings', type: 'collection' },
  { message: 'Comparing activity with historical baseline (last 30 days)', type: 'analysis' },
  { message: 'Importance score calculated: 93/100 for multilingual AI trend', type: 'analysis' },
  { message: 'Decision: generate strategic insight + high-priority alert', type: 'decision' },
  { message: 'Generated strategic insight on real-time multilingual AI', type: 'insight' },
  { message: 'Alert created: Google patent activity +47%', type: 'alert' },
  { message: 'Re-planning: schedule follow-up monitoring in 30 minutes', type: 'replan' },
];

export const chatSuggestions = [
  'What changed in the AI industry this week?',
  'Which competitors are working on speech translation?',
  'Find emerging AI trends',
  'Show me recent AI activity from NVIDIA',
  'What changed in the last 7 days?',
];

export const searchSuggestions = [
  'Show me recent AI activity from NVIDIA',
  'Which competitors are working on speech translation?',
  'What changed in the last 7 days?',
  'Find emerging AI trends',
];

export const dashboardStats = [
  { label: 'Competitors Tracked', value: 12, icon: 'Target', trend: '+2', trendLabel: 'this month' },
  { label: 'New Research', value: 36, icon: 'FileText', trend: '+18', trendLabel: 'today' },
  { label: 'New Patents', value: 14, icon: 'Shield', trend: '+6', trendLabel: 'today' },
  { label: 'Important Updates', value: 8, icon: 'Zap', trend: '+3', trendLabel: 'today' },
  { label: 'Emerging Trends', value: 6, icon: 'TrendingUp', trend: '+1', trendLabel: 'this week' },
  { label: 'High Priority Alerts', value: 4, icon: 'BellRing', trend: '+2', trendLabel: 'today' },
];

export function generate30DaySeries(base: number, volatility: number, trend = 0) {
  const days: { date: string; value: number }[] = [];
  let current = base;
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const noise = (Math.random() - 0.5) * volatility;
    current = Math.max(0, current + noise + trend);
    days.push({ date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), value: Math.round(current) });
  }
  return days;
}

export const competitorActivityData = [
  { date: 'Aug 1', OpenAI: 14, Google: 12, NVIDIA: 18, Microsoft: 9, Meta: 7 },
  { date: 'Aug 5', OpenAI: 18, Google: 15, NVIDIA: 22, Microsoft: 11, Meta: 8 },
  { date: 'Aug 10', OpenAI: 21, Google: 19, NVIDIA: 25, Microsoft: 13, Meta: 10 },
  { date: 'Aug 15', OpenAI: 25, Google: 22, NVIDIA: 28, Microsoft: 15, Meta: 11 },
  { date: 'Aug 20', OpenAI: 28, Google: 26, NVIDIA: 31, Microsoft: 17, Meta: 13 },
  { date: 'Aug 25', OpenAI: 32, Google: 31, NVIDIA: 35, Microsoft: 21, Meta: 16 },
  { date: 'Aug 27', OpenAI: 34, Google: 33, NVIDIA: 38, Microsoft: 24, Meta: 18 },
];

export const researchActivityData = generate30DaySeries(8, 3, 0.4);
export const patentActivityData = generate30DaySeries(4, 2, 0.15);

export const trendGrowthData = [
  { trend: 'Multilingual AI', growth: 68 },
  { trend: 'AI Agents', growth: 54 },
  { trend: 'AI Infra', growth: 41 },
  { trend: 'Low-Resource NLP', growth: 37 },
  { trend: 'Reasoning', growth: 29 },
];

export const patentFilingsByCompetitor = [
  { competitor: 'Google', patents: 42 },
  { competitor: 'NVIDIA', patents: 36 },
  { competitor: 'Microsoft', patents: 28 },
  { competitor: 'OpenAI', patents: 19 },
  { competitor: 'Meta', patents: 14 },
];
