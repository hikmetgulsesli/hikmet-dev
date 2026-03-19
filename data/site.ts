/**
 * Site metadata, stats and configuration
 * Hikmet Gulsesli Developer Portal
 */

export interface SiteMetadata {
  title: string;
  description: string;
  author: string;
  authorTitle: string;
  domain: string;
  language: string;
  theme: 'dark' | 'light' | 'system';
}

export interface SiteStats {
  agents: number;
  webApps: number;
  workflows: number;
  uptime: string;
  lastUpdated: string;
}

export interface HeroContent {
  greeting: string;
  name: string;
  title: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
  rotatingWords: string[];
}

export interface StatCard {
  id: string;
  label: string;
  value: string;
  description: string;
  icon: string;
}

export const siteMetadata: SiteMetadata = {
  title: 'Hikmet Gulsesli — Developer Portal',
  description: 'OpenClaw automation system kurucusu. AI agent mimarisi, otomasyon çözümleri ve modern web teknolojileri üzerine çal\u0131\u015Fmalar.',
  author: 'Hikmet Gulsesli',
  authorTitle: 'Founder of OpenClaw',
  domain: 'setrox.com.tr',
  language: 'tr',
  theme: 'dark',
};

export const siteStats: SiteStats = {
  agents: 10,
  webApps: 24,
  workflows: 5,
  uptime: '99.9%',
  lastUpdated: '2026-01-01T00:00:00.000Z',
};

export const heroContent: HeroContent = {
  greeting: 'Merhaba, ben',
  name: 'Hikmet Gulsesli',
  title: 'Developer & AI Architect',
  description: 'OpenClaw otomasyon sisteminin kurucusu. Kimi k2p5, MiniMax M2.7 ve aç\u0131k kaynak araçlarla 10 AI agent, 24 web uygulamas\u0131 ve 5 otomatik i\u015F ak\u0131\u015F\u0131 geli\u015Ftiriyorum.',
  ctaPrimary: 'Projeleri Ke\u015Ffet',
  ctaSecondary: 'Hakk\u0131mda',
  rotatingWords: ['Building', 'quiet', 'scaling', 'workflows', 'shipping', 'projects'],
};

export const statCards: StatCard[] = [
  {
    id: 'agents',
    label: 'Aktif Agent',
    value: '10+',
    description: 'Otonom AI sistemleri',
    icon: 'smart_toy',
  },
  {
    id: 'webapps',
    label: 'Web Uygulamas\u0131',
    value: '24',
    description: 'Yay\u0131nda olan projeler',
    icon: 'language',
  },
  {
    id: 'workflows',
    label: '\u0130\u015F Ak\u0131\u015F\u0131',
    value: '5',
    description: 'Otomatik pipeline',
    icon: 'account_tree',
  },
];

export interface FooterContent {
  headline: string;
  subheadline: string;
  copyright: string;
  links: {
    label: string;
    href: string;
  }[];
}

export const footerContent: FooterContent = {
  headline: "Let's build together",
  subheadline: 'Aç\u0131k kaynak projeler, otomasyon çözümleri ve AI araçlar\u0131 üzerine çal\u0131\u015F\u0131yorum.',
  copyright: `© ${new Date().getFullYear()} Hikmet Gulsesli. Tüm haklar\u0131 sakl\u0131d\u0131r.`,
  links: [
    { label: 'Ana Sayfa', href: '/' },
    { label: 'Projeler', href: '/projects' },
    { label: 'Kaynaklar', href: '/resources' },
    { label: 'Yaz\u0131lar', href: '/blog' },
    { label: 'Hakk\u0131mda', href: '/about' },
    { label: 'Gizlilik', href: '/privacy' },
  ],
};

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon?: string;
  external?: boolean;
}

export const navigation: NavigationItem[] = [
  { id: 'home', label: 'Ana Sayfa', href: '/' },
  { id: 'projects', label: 'Projeler', href: '/projects' },
  { id: 'resources', label: 'Kaynaklar', href: '/resources' },
  { id: 'blog', label: 'Yaz\u0131lar', href: '/blog' },
  { id: 'about', label: 'Hakk\u0131mda', href: '/about' },
];

export const externalLinks: NavigationItem[] = [
  { id: 'github', label: 'GitHub', href: 'https://github.com/hikmetgulsesli', icon: 'github', external: true },
  { id: 'discord', label: 'Discord', href: 'https://discord.gg/setrox', icon: 'discord', external: true },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/in/hikmetgulsesli', icon: 'linkedin', external: true },
];
