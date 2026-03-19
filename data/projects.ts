/**
 * Project data types and static data
 * Hikmet Gulsesli Developer Portal
 */

export type ProjectStatus = 'shipped' | 'in-progress' | 'archived';

export interface Project {
  id: string;
  title: string;
  description: string;
  status: ProjectStatus;
  year: number;
  tags: string[];
  stars?: number;
  forks?: number;
  liveUrl?: string;
  sourceUrl?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: 'mission-control',
    title: 'Mission Control',
    description: 'AI agent yönetim dashboard\u0131. 10+ aktif agent\u0131n performans\u0131n\u0131 gerçek zamanl\u0131 izleme ve kontrol merkezi.',
    status: 'shipped',
    year: 2024,
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'WebSocket'],
    stars: 128,
    forks: 24,
    liveUrl: 'https://mission.setrox.com.tr',
    sourceUrl: 'https://github.com/hikmetgulsesli/mission-control',
    featured: true,
  },
  {
    id: 'setfarm',
    title: 'Setfarm',
    description: 'Otomasyon pipeline motoru. Çoklu agent i\u015F ak\u0131\u015Flar\u0131n\u0131 koordine eden, ölçeklenebilir i\u015F yönetim sistemi.',
    status: 'shipped',
    year: 2024,
    tags: ['Node.js', 'Redis', 'PostgreSQL', 'Docker'],
    stars: 256,
    forks: 42,
    liveUrl: 'https://setfarm.setrox.com.tr',
    sourceUrl: 'https://github.com/hikmetgulsesli/setfarm',
    featured: true,
  },
  {
    id: 'hizli-okuma',
    title: 'H\u0131zl\u0131 Okuma',
    description: 'H\u0131zl\u0131 okuma teknikleri e\u011Fitim uygulamas\u0131. RSVP tekni\u011Fi ile dakikada 1000+ kelime okuma h\u0131z\u0131na ç\u0131kma antrenman\u0131.',
    status: 'shipped',
    year: 2023,
    tags: ['React', 'PWA', 'TypeScript', 'Vite'],
    stars: 89,
    forks: 15,
    liveUrl: 'https://hizliokuma.setrox.com.tr',
    sourceUrl: 'https://github.com/hikmetgulsesli/hizli-okuma',
    featured: false,
  },
  {
    id: 'pomodoro-timer',
    title: 'Pomodoro Timer',
    description: 'Minimalist pomodoro tekni\u011Fi zamanlay\u0131c\u0131. Çal\u0131\u015Fma istatistikleri ve odak modu ile üretkenli\u011Fi art\u0131r\u0131r.',
    status: 'shipped',
    year: 2023,
    tags: ['React', 'TypeScript', 'CSS Modules'],
    stars: 67,
    forks: 12,
    liveUrl: 'https://pomodoro.setrox.com.tr',
    sourceUrl: 'https://github.com/hikmetgulsesli/pomodoro-timer',
    featured: false,
  },
  {
    id: 'online-tools',
    title: 'Online Tools',
    description: 'Geli\u015Ftiriciler için kullan\u0131\u015Fl\u0131 araçlar koleksiyonu. JSON formatter, Base64 encoder, regex tester ve daha fazlas\u0131.',
    status: 'shipped',
    year: 2023,
    tags: ['Next.js', 'Tailwind', 'Monaco Editor'],
    stars: 145,
    forks: 31,
    liveUrl: 'https://tools.setrox.com.tr',
    sourceUrl: 'https://github.com/hikmetgulsesli/online-tools',
    featured: true,
  },
  {
    id: 'typing-practice',
    title: 'Typing Practice',
    description: 'Türkçe klavye pratik uygulamas\u0131. WPM hesaplama, hata analizi ve ilerleme takibi ile yazma h\u0131z\u0131n\u0131 art\u0131r.',
    status: 'shipped',
    year: 2023,
    tags: ['React', 'TypeScript', 'Canvas API'],
    stars: 52,
    forks: 8,
    liveUrl: 'https://typing.setrox.com.tr',
    sourceUrl: 'https://github.com/hikmetgulsesli/typing-practice',
    featured: false,
  },
  {
    id: 'recipe-book',
    title: 'Recipe Book',
    description: 'Ak\u0131ll\u0131 tarif uygulamas\u0131. Malzeme bazl\u0131 arama, besin de\u011Ferleri ve otomatik al\u0131\u015Fveri\u015F listesi olu\u015Fturma.',
    status: 'shipped',
    year: 2022,
    tags: ['Next.js', 'Prisma', 'PostgreSQL', 'NextAuth'],
    stars: 78,
    forks: 19,
    liveUrl: 'https://recipes.setrox.com.tr',
    sourceUrl: 'https://github.com/hikmetgulsesli/recipe-book',
    featured: false,
  },
  {
    id: 'expense-tracker',
    title: 'Expense Tracker',
    description: 'Ki\u015Fisel finans yönetim uygulamas\u0131. Harcama kategorizasyonu, bütçe planlamas\u0131 ve finansal raporlar.',
    status: 'shipped',
    year: 2022,
    tags: ['React', 'Chart.js', 'LocalStorage', 'PWA'],
    stars: 94,
    forks: 23,
    liveUrl: 'https://expense.setrox.com.tr',
    sourceUrl: 'https://github.com/hikmetgulsesli/expense-tracker',
    featured: false,
  },
  {
    id: 'qr-code-generator',
    title: 'QR Code Generator',
    description: 'Özelle\u015Ftirilebilir QR kod olu\u015Fturucu. Logo ekleme, renk özelle\u015Ftirme ve vektör ç\u0131kt\u0131 deste\u011Fi.',
    status: 'shipped',
    year: 2022,
    tags: ['React', 'QRCode.js', 'Canvas API'],
    stars: 112,
    forks: 28,
    liveUrl: 'https://qr.setrox.com.tr',
    sourceUrl: 'https://github.com/hikmetgulsesli/qr-generator',
    featured: false,
  },
  {
    id: 'color-palette',
    title: 'Color Palette',
    description: 'Renk paleti olu\u015Fturucu ve yönetici. Harmonik renk şemalar\u0131, eri\u015Filebilirlik kontrolü ve CSS export.',
    status: 'shipped',
    year: 2022,
    tags: ['React', 'Color Theory', 'TypeScript'],
    stars: 156,
    forks: 34,
    liveUrl: 'https://colors.setrox.com.tr',
    sourceUrl: 'https://github.com/hikmetgulsesli/color-palette',
    featured: true,
  },
];

export const getProjectById = (id: string): Project | undefined => {
  return projects.find((project) => project.id === id);
};

export const getFeaturedProjects = (): Project[] => {
  return projects.filter((project) => project.featured);
};

export const getProjectsByStatus = (status: ProjectStatus): Project[] => {
  return projects.filter((project) => project.status === status);
};

export const getProjectsByTag = (tag: string): Project[] => {
  return projects.filter((project) => project.tags.includes(tag));
};
