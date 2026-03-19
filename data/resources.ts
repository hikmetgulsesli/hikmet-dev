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

// 4 Docs Cards as specified in the story
export const docsCards: DocCard[] = [
  {
    id: 'openclaw-docs',
    title: 'OpenClaw Documentation',
    description: 'OpenClaw agent sisteminin tam dokümantasyonu. Kurulum, yapılandırma ve kullanım rehberleri.',
    icon: 'book',
    link: 'https://github.com/hikmetgulsesli/openclaw-core/blob/main/README.md',
    category: 'Documentation',
  },
  {
    id: 'setfarm-guide',
    title: 'Setfarm Guide',
    description: 'Pipeline engine kullanım kılavuzu. Workflow oluşturma, agent yönetimi ve deployment.',
    icon: 'git-branch',
    link: 'https://github.com/hikmetgulsesli/setfarm/blob/main/docs/README.md',
    category: 'Guide',
  },
  {
    id: 'api-reference',
    title: 'API Reference',
    description: 'REST API endpoint referansı. Kimlik doğrulama, istek formatları ve örnekler.',
    icon: 'code',
    link: 'https://github.com/hikmetgulsesli/openclaw-core/blob/main/docs/api.md',
    category: 'API',
  },
  {
    id: 'community-docs',
    title: 'Community Docs',
    description: 'Topluluk katkıları ve geliştirici kaynakları. Best practices ve örnek projeler.',
    icon: 'users',
    link: 'https://github.com/hikmetgulsesli/openclaw-core/blob/main/docs/community.md',
    category: 'Community',
  },
];

// 4 GitHub Repo Cards as specified in the story
export const repoCards: RepoCard[] = [
  {
    id: 'openclaw-core',
    name: 'openclaw-core',
    description: 'OpenClaw automation system core. Multi-agent orchestration and workflow engine.',
    language: 'TypeScript',
    stars: 342,
    forks: 67,
    progress: 85,
    lastActivity: '2 saat önce',
    url: 'https://github.com/hikmetgulsesli/openclaw-core',
  },
  {
    id: 'setfarm',
    name: 'setfarm',
    description: 'Pipeline engine for automated development workflows. GitHub integration and CI/CD.',
    language: 'TypeScript',
    stars: 189,
    forks: 34,
    progress: 92,
    lastActivity: '1 gün önce',
    url: 'https://github.com/hikmetgulsesli/setfarm',
  },
  {
    id: 'hikmet-dev',
    name: 'hikmet-dev',
    description: 'Personal developer portal. Next.js 14, Tailwind CSS, and shadcn/ui portfolio site.',
    language: 'TypeScript',
    stars: 78,
    forks: 12,
    progress: 100,
    lastActivity: '3 gün önce',
    url: 'https://github.com/hikmetgulsesli/hikmet-dev',
  },
  {
    id: 'templates',
    name: 'templates',
    description: 'Starter templates for React, Next.js, and Node.js projects. Production-ready boilerplates.',
    language: 'JavaScript',
    stars: 156,
    forks: 45,
    progress: 76,
    lastActivity: '1 hafta önce',
    url: 'https://github.com/hikmetgulsesli/templates',
  },
];

export const terminalLogs: TerminalLog[] = [
  {
    id: '1',
    timestamp: '18:32:14',
    level: 'info',
    message: 'Agent "koda" görev aldı: US-010 workbench sayfası',
    source: 'setfarm',
  },
  {
    id: '2',
    timestamp: '18:32:15',
    level: 'success',
    message: 'Git branch oluşturuldu: 15653ab9-US-010',
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
    message: 'Commit oluşturuldu: feat: US-010 workbench sayfası',
    source: 'git',
  },
  {
    id: '10',
    timestamp: '18:37:15',
    level: 'success',
    message: 'Remote\'a push edildi: origin/15653ab9-US-010',
    source: 'git',
  },
];

export const getDocsByCategory = (category: string): DocCard[] => {
  return docsCards.filter((doc) => doc.category === category);
};

export const getRepoById = (id: string): RepoCard | undefined => {
  return repoCards.find((repo) => repo.id === id);
};
