/**
 * Resources data types and static data
 * Hikmet Gulsesli Developer Portal
 */

export interface DocCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  link: string;
  category: string;
}

export interface RepoCard {
  id: string;
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  progress: number;
  lastActivity: string;
  url: string;
}

export interface TerminalLog {
  id: string;
  timestamp: string;
  level: 'info' | 'success' | 'warning' | 'error';
  message: string;
  source: string;
}

export const docsCards: DocCard[] = [
  {
    id: 'core-api',
    title: 'Core API Referans\u0131',
    description: 'OpenClaw agent API\u2019sinin tam dokümantasyonu. Kimlik do\u011Frulama, endpoint\u2019ler ve örnek kullan\u0131mlar.',
    icon: 'api',
    link: '/docs/api',
    category: 'API',
  },
  {
    id: 'agent-sdk',
    title: 'Agent SDK',
    description: 'Kendi agent\u2019\u0131n\u0131z\u0131 geli\u015Ftirmek için SDK rehberi. Araç tan\u0131mlama, state yönetimi ve deployment.',
    icon: 'code_blocks',
    link: '/docs/sdk',
    category: 'SDK',
  },
  {
    id: 'security',
    title: 'Güvenlik Rehberi',
    description: 'API anahtar yönetimi, eri\u015Fim kontrolü ve güvenli kodlama pratikleri.',
    icon: 'security',
    link: '/docs/security',
    category: 'Security',
  },
  {
    id: 'deployment',
    title: 'Deployment',
    description: 'Üretim ortam\u0131na ta\u015F\u0131ma rehberi. Docker, Kubernetes ve cloud deployment seçenekleri.',
    icon: 'cloud_sync',
    link: '/docs/deployment',
    category: 'DevOps',
  },
];

export const repoCards: RepoCard[] = [
  {
    id: 'ui-kit-pro',
    name: 'ui-kit-pro',
    description: 'Profesyonel React component kütüphanesi. 50+ shadcn/ui tabanl\u0131 component.',
    language: 'TypeScript',
    stars: 342,
    forks: 67,
    progress: 85,
    lastActivity: '2 saat önce',
    url: 'https://github.com/hikmetgulsesli/ui-kit-pro',
  },
  {
    id: 'auth-service-v3',
    name: 'auth-service-v3',
    description: 'JWT tabanl\u0131 kimlik do\u011Frulama servisi. OAuth2, 2FA ve rol yönetimi.',
    language: 'Node.js',
    stars: 189,
    forks: 34,
    progress: 92,
    lastActivity: '1 gün önce',
    url: 'https://github.com/hikmetgulsesli/auth-service-v3',
  },
  {
    id: 'data-pipeline',
    name: 'data-pipeline',
    description: 'ETL pipeline framework\u2019ü. Büyük ölçekli veri i\u015Fleme ve dönü\u015Ftürme.',
    language: 'Python',
    stars: 278,
    forks: 56,
    progress: 78,
    lastActivity: '3 gün önce',
    url: 'https://github.com/hikmetgulsesli/data-pipeline',
  },
  {
    id: 'edge-cache',
    name: 'edge-cache',
    description: 'Edge computing için da\u011F\u0131t\u0131k cache çözümü. Redis-compatible API.',
    language: 'Rust',
    stars: 156,
    forks: 23,
    progress: 64,
    lastActivity: '1 hafta önce',
    url: 'https://github.com/hikmetgulsesli/edge-cache',
  },
];

export const terminalLogs: TerminalLog[] = [
  {
    id: '1',
    timestamp: '18:32:14',
    level: 'info',
    message: 'Agent "koda" görev ald\u0131: US-002 veri dosyalar\u0131',
    source: 'setfarm',
  },
  {
    id: '2',
    timestamp: '18:32:15',
    level: 'success',
    message: 'Git branch olu\u015Fturuldu: 15653ab9-US-002',
    source: 'git',
  },
  {
    id: '3',
    timestamp: '18:33:42',
    level: 'info',
    message: 'TypeScript derlemesi ba\u015Far\u0131l\u0131',
    source: 'tsc',
  },
  {
    id: '4',
    timestamp: '18:34:05',
    level: 'warning',
    message: '1 kullan\u0131lmayan import tespit edildi',
    source: 'eslint',
  },
  {
    id: '5',
    timestamp: '18:34:12',
    level: 'success',
    message: 'Lint hatalar\u0131 düzeltildi',
    source: 'eslint',
  },
  {
    id: '6',
    timestamp: '18:35:28',
    level: 'info',
    message: 'Build i\u015Flemi ba\u015Flat\u0131l\u0131yor...',
    source: 'next',
  },
  {
    id: '7',
    timestamp: '18:36:45',
    level: 'success',
    message: 'Üretim build\u2019i tamamland\u0131: 2.4s',
    source: 'next',
  },
  {
    id: '8',
    timestamp: '18:36:52',
    level: 'info',
    message: 'De\u011Fi\u015Fiklikler haz\u0131rland\u0131',
    source: 'git',
  },
  {
    id: '9',
    timestamp: '18:37:01',
    level: 'success',
    message: 'Commit olu\u015Fturuldu: feat: US-002 veri dosyalar\u0131',
    source: 'git',
  },
  {
    id: '10',
    timestamp: '18:37:15',
    level: 'success',
    message: 'Remote\u2019a push edildi: origin/15653ab9-US-002',
    source: 'git',
  },
];

export const getDocsByCategory = (category: string): DocCard[] => {
  return docsCards.filter((doc) => doc.category === category);
};

export const getRepoById = (id: string): RepoCard | undefined => {
  return repoCards.find((repo) => repo.id === id);
};
