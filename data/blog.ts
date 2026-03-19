/**
 * Blog post data types and static data
 * Hikmet Gulsesli Developer Portal
 */

export type BlogCategory = 'AI' | 'DevOps' | 'Automation' | 'Tutorial' | 'Announcement';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: BlogCategory;
  author: string;
  date: string;
  readTime: number;
  slug: string;
  tags: string[];
  featured?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Kimi k2p5 ile Otonom Agent Mimarisi Tasarlama',
    excerpt: 'Kimi k2p5 modelini kullanarak çoklu agent sistemleri nas\u0131l tasarlan\u0131r? State yönetimi, araç entegrasyonu ve ölçeklendirme stratejileri.',
    content: `
# Kimi k2p5 ile Otonom Agent Mimarisi Tasarlama

Yapay zeka agentlar\u0131 günümüzde yaz\u0131l\u0131m geli\u015Ftirme süreçlerini dönü\u015Ftürüyor. Bu yaz\u0131da Kimi k2p5 modeli üzerinde çoklu agent mimarisi kurma deneyimlerimi payla\u015Faca\u011F\u0131m.

## Agent Nedir?

Agent, çevresini alg\u0131layabilen, kararlar alabilen ve eylemler gerçekle\u015Ftirebilen otonom bir yapay zeka sistemidir.

## Mimari Bile\u015Fenler

1. **State Yönetimi**: Agent'\u0131n haf\u0131zas\u0131 ve context'i
2. **Araç Entegrasyonu**: Harici API'ler ve fonksiyonlar
3. **Planlama**: Görev ayr\u0131\u015Ft\u0131rma ve strateji olu\u015Fturma
4. **Refleksiyon**: Kendi ç\u0131kt\u0131lar\u0131n\u0131 de\u011Ferlendirme
    `,
    category: 'AI',
    author: 'Hikmet Gulsesli',
    date: '2024-03-15',
    readTime: 12,
    slug: 'kimi-k2p5-otonam-agent-mimarisi',
    tags: ['AI', 'Kimi', 'Agent', 'Architecture'],
    featured: true,
  },
  {
    id: '2',
    title: 'GitHub Actions ile CI/CD Pipeline Optimizasyonu',
    excerpt: 'Deployment sürelerini %60 azaltan pratik optimizasyon teknikleri. Cache stratejileri, paralel i\u015Fler ve matrix build yap\u0131land\u0131rmas\u0131.',
    content: `
# GitHub Actions ile CI/CD Pipeline Optimizasyonu

Sürekli entegrasyon ve deployment pipeline'\u0131n\u0131z\u0131 optimize etmek, geli\u015Ftirme verimlili\u011Finizi ciddi şekilde art\u0131rabilir.

## Cache Stratejileri

\`\`\`yaml
- uses: actions/cache@v3
  with:
    path: ~/.npm
    key: \${{ runner.os }}-node-\${{ hashFiles('**/package-lock.json') }}
\`\`\`

## Paralel \u0130\u015Fler

\`\`\`yaml
strategy:
  matrix:
    node-version: [18.x, 20.x]
    os: [ubuntu-latest, windows-latest]
\`\`\`
    `,
    category: 'DevOps',
    author: 'Hikmet Gulsesli',
    date: '2024-02-28',
    readTime: 8,
    slug: 'github-actions-cicd-optimizasyonu',
    tags: ['CI/CD', 'GitHub Actions', 'DevOps', 'Performance'],
    featured: false,
  },
  {
    id: '3',
    title: 'Setfarm: Çoklu Agent i\u015F Ak\u0131\u015F Motoru',
    excerpt: 'OpenClaw ekosisteminde kulland\u0131\u011F\u0131m\u0131z pipeline motorunun teknik detaylar\u0131. Redis kuyruk yönetimi, PostgreSQL durum takibi ve hata kurtarma mekanizmalar\u0131.',
    content: `
# Setfarm: Çoklu Agent i\u015F Ak\u0131\u015F Motoru

Setfarm, birden fazla AI agent\u2019\u0131n koordineli çal\u0131\u015Fmas\u0131n\u0131 sa\u011Flayan bir i\u015F ak\u0131\u015F motorudur.

## Teknik Altyap\u0131

- **Redis**: Kuyruk yönetimi ve pub/sub
- **PostgreSQL**: Durum kal\u0131c\u0131l\u0131\u011F\u0131
- **BullMQ**: Güvenilir i\u015F kuyruklar\u0131
- **Docker**: Konteynerizasyon

## Hata Kurtarma

Her agent çöktü\u011Fünde otomatik yeniden deneme ve rollback mekanizmalar\u0131 devreye girer.
    `,
    category: 'Automation',
    author: 'Hikmet Gulsesli',
    date: '2024-02-10',
    readTime: 10,
    slug: 'setfarm-coklu-agent-is-akisi',
    tags: ['Automation', 'Redis', 'PostgreSQL', 'Setfarm'],
    featured: true,
  },
  {
    id: '4',
    title: 'Next.js 14 App Router ile Full-Stack Uygulama',
    excerpt: 'App Router mimarisini kullanarak modern bir web uygulamas\u0131 nas\u0131l geli\u015Ftirilir? Server components, streaming ve paralel route\u2019lar.',
    content: `
# Next.js 14 App Router ile Full-Stack Uygulama

Next.js 14, App Router ile birlikte gelen büyük bir mimari de\u011Fi\u015Fikli\u011Fi sunuyor.

## Server Components

\`\`\`tsx
// Bu component sunucuda render edilir
async function ProductList() {
  const products = await db.products.findMany();
  return <ul>{products.map(p => <li key={p.id}>{p.name}</li>)}</ul>;
}
\`\`\`

## Streaming

Yavaş yüklenen component\u2019lar\u0131 Suspense ile asenkron render edebilirsiniz.
    `,
    category: 'Tutorial',
    author: 'Hikmet Gulsesli',
    date: '2024-01-22',
    readTime: 15,
    slug: 'nextjs-14-app-router-full-stack',
    tags: ['Next.js', 'React', 'Tutorial', 'Full-Stack'],
    featured: false,
  },
  {
    id: '5',
    title: 'OpenClaw 2.0 Yay\u0131nland\u0131!',
    excerpt: 'Yeni sürümde gelen özellikler: MiniMax M2.7 deste\u011Fi, geli\u015Fmi\u015F araç kullan\u0131m\u0131, yeni dashboard ve daha fazlas\u0131.',
    content: `
# OpenClaw 2.0 Yay\u0131nland\u0131!

Uzun süredir üzerinde çal\u015Ft\u0131\u011F\u0131m\u0131z OpenClaw 2.0 sonunda kullan\u0131ma sunuldu.

## Yeni Özellikler

- **MiniMax M2.7 Deste\u011Fi**: Yeni model entegrasyonu
- **Araç Zincirleme**: Birden fazla arac\u0131 ard\u0131\u015F\u0131k kullanma
- **Yeni Dashboard**: Daha iyi görselle\u015Ftirme
- **WebSocket API**: Gerçek zamanl\u0131 ileti\u015Fim

## Yükseltme Rehberi

\`\`\`bash
npm install @openclaw/core@latest
\`\`\`
    `,
    category: 'Announcement',
    author: 'Hikmet Gulsesli',
    date: '2024-01-05',
    readTime: 5,
    slug: 'openclaw-2-0-yayinlandi',
    tags: ['OpenClaw', 'Release', 'Announcement', 'AI'],
    featured: true,
  },
];

export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find((post) => post.slug === slug);
};

export const getPostsByCategory = (category: BlogCategory): BlogPost[] => {
  return blogPosts.filter((post) => post.category === category);
};

export const getFeaturedPosts = (): BlogPost[] => {
  return blogPosts.filter((post) => post.featured);
};

export const getRecentPosts = (limit: number = 3): BlogPost[] => {
  return [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
};

export const categories: BlogCategory[] = ['AI', 'DevOps', 'Automation', 'Tutorial', 'Announcement'];
