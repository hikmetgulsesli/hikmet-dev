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
  progress: number;
  lastActivity: string;
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
    title: 'Core API Referansı',
    description: 'OpenClaw agent API\'sinin tam dokümantasyonu. Kimlik doğrulama, endpoint\'ler ve örnek kullanımlar.',
    icon: 'api',
    link: '/docs/api',
    category: 'API',
    progress: 100,
    lastActivity: '2 saat önce',
  },
  {
    id: 'agent-sdk',
    title: 'Agent SDK',
    description: 'Kendi agent\'ınızı geliştirmek için SDK rehberi. Araç tanımlama, state yönetimi ve deployment.',
    icon: 'code_blocks',
    link: '/docs/sdk',
    category: 'SDK',
    progress: 85,
    lastActivity: '1 gün önce',
  },
  {
    id: 'security',
    title: 'Güvenlik Rehberi',
    description: 'API anahtar yönetimi, erişim kontrolü ve güvenli kodlama pratikleri.',
    icon: 'security',
    link: '/docs/security',
    category: 'Security',
    progress: 75,
    lastActivity: '3 gün önce',
  },
  {
    id: 'deployment',
    title: 'Deployment',
    description: 'Üretim ortamına taşıma rehberi. Docker, Kubernetes ve cloud deployment seçenekleri.',
    icon: 'cloud_sync',
    link: '/docs/deployment',
    category: 'DevOps',
    progress: 60,
    lastActivity: '1 hafta önce',
  },
];

export const repoCards: RepoCard[] = [
  {
    id: 'ui-kit-pro',
    name: 'ui-kit-pro',
    description: 'Profesyonel React component kütüphanesi. 50+ shadcn/ui tabanlı component.',
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
    description: 'JWT tabanlı kimlik doğrulama servisi. OAuth2, 2FA ve rol yönetimi.',
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
    description: 'ETL pipeline framework\'ü. Büyük ölçekli veri işleme ve dönüştürme.',
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
    description: 'Edge computing için dağıtık cache çözümü. Redis-compatible API.',
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
    message: 'Agent "koda" görev aldı: US-002 veri dosyaları',
    source: 'setfarm',
  },
  {
    id: '2',
    timestamp: '18:32:15',
    level: 'success',
    message: 'Git branch oluşturuldu: 15653ab9-US-002',
    source: 'git',
  },
  {
    id: '3',
    timestamp: '18:33:42',
    level: 'info',
    message: 'TypeScript derlemesi başarılı',
    source: 'tsc',
  },
  {
    id: '4',
    timestamp: '18:34:05',
    level: 'warning',
    message: '1 kullanılmayan import tespit edildi',
    source: 'eslint',
  },
  {
    id: '5',
    timestamp: '18:34:12',
    level: 'success',
    message: 'Lint hataları düzeltildi',
    source: 'eslint',
  },
  {
    id: '6',
    timestamp: '18:35:28',
    level: 'info',
    message: 'Build işlemi başlatılıyor...',
    source: 'next',
  },
  {
    id: '7',
    timestamp: '18:36:45',
    level: 'success',
    message: 'Üretim build\'i tamamlandı: 2.4s',
    source: 'next',
  },
  {
    id: '8',
    timestamp: '18:36:52',
    level: 'info',
    message: 'Değişiklikler hazırlandı',
    source: 'git',
  },
  {
    id: '9',
    timestamp: '18:37:01',
    level: 'success',
    message: 'Commit oluşturuldu: feat: US-002 veri dosyaları',
    source: 'git',
  },
  {
    id: '10',
    timestamp: '18:37:15',
    level: 'success',
    message: 'Remote\'a push edildi: origin/15653ab9-US-002',
    source: 'git',
  },
];

export const getDocsByCategory = (category: string): DocCard[] => {
  return docsCards.filter((doc) => doc.category === category);
};

export const getRepoById = (id: string): RepoCard | undefined => {
  return repoCards.find((repo) => repo.id === id);
};
