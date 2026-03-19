import Link from 'next/link';
import { StatsCard } from '@/components/cards';
import { socialLinks, contactInfo } from '@/data/social';
import { siteMetadata } from '@/data/site';
import { Brain, Cloud, Settings, Github, MessageCircle, Linkedin, Terminal } from 'lucide-react';

const competencies = [
  {
    id: 'ai',
    title: 'AI Engineering',
    icon: Brain,
    description: 'Cutting-edge implementation of Kimi k2p5 and MiniMax M2.7. Designing cognitive architectures for next-gen AI agents.',
    points: ['Kimi k2p5 & MiniMax M2.7', 'AI Agent Mimarisi', 'LLM Entegrasyonu', 'Autonomous Systems'],
  },
  {
    id: 'devops',
    title: 'DevOps Excellence',
    icon: Cloud,
    description: 'Leveraging OpenClaw for distributed infrastructure. Building scalable automation and robust developer-centric workflows.',
    points: ['OpenClaw Infrastructure', 'Docker & Kubernetes', 'CI/CD Pipelines', 'Cloud Automation'],
  },
  {
    id: 'automation',
    title: 'Otomasyon',
    icon: Settings,
    description: 'Advanced CI/CD pipelines, custom python scripting, and highly efficient tooling systems designed to minimize human intervention.',
    points: ['CI/CD Pipelines', 'Python Scripting', 'Workflow Automation', 'Tooling Systems'],
  },
];

const techStack = [
  { name: 'Python', category: 'Language' },
  { name: 'Next.js', category: 'Framework' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'Docker', category: 'DevOps' },
  { name: 'Kubernetes', category: 'DevOps' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'Redis', category: 'Database' },
  { name: 'Terraform', category: 'IaC' },
  { name: 'GitHub Actions', category: 'CI/CD' },
  { name: 'Nginx', category: 'Server' },
  { name: 'Prometheus', category: 'Monitoring' },
  { name: 'LLMs', category: 'AI' },
];

export default function IntroductionPage() {
  const githubLink = socialLinks.find((link) => link.id === 'github');
  const discordLink = socialLinks.find((link) => link.id === 'discord');
  const linkedinLink = socialLinks.find((link) => link.id === 'linkedin');

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#0f2323]">
      {/* Background gradient */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(at 0% 0%, rgba(0, 255, 255, 0.15) 0px, transparent 50%),
            radial-gradient(at 100% 100%, rgba(0, 255, 255, 0.1) 0px, transparent 50%)
          `,
        }}
      />

      <main className="relative z-10 max-w-6xl mx-auto w-full px-6 py-10">
        {/* Hero Section */}
        <section className="flex flex-col gap-10 md:flex-row items-center py-12 md:py-24" data-testid="hero-section">
          <div className="flex flex-col gap-8 flex-1">
            {/* Availability Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Yeni projeler için uygun
            </div>

            {/* Name and Title */}
            <div className="flex flex-col gap-4">
              <h1 className="text-slate-100 text-4xl md:text-6xl font-extrabold leading-[1.1] tracking-tight" data-testid="hero-name">
                {siteMetadata.author}
              </h1>
              <p className="text-primary text-xl md:text-2xl font-bold" data-testid="hero-title">
                Developer Portal / OpenClaw Builder
              </p>
              <p className="text-slate-400 text-lg md:text-xl max-w-2xl leading-relaxed" data-testid="hero-bio">
                {siteMetadata.description}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/projects"
                className="flex min-w-[160px] cursor-pointer items-center justify-center rounded-lg h-14 px-6 bg-primary text-[#0f2323] text-base font-bold shadow-[0_0_20px_rgba(0,255,255,0.3)] hover:shadow-[0_0_30px_rgba(0,255,255,0.5)] transition-all"
              >
                Projeleri Keşfet
              </Link>
              <Link
                href="#expertise"
                className="flex min-w-[160px] cursor-pointer items-center justify-center rounded-lg h-14 px-6 border border-slate-700 bg-slate-800/50 text-slate-100 text-base font-bold hover:bg-slate-800 transition-all"
              >
                Yetkinliklerim
              </Link>
            </div>
          </div>

          {/* Image/Visual */}
          <div className="flex-1 relative w-full aspect-square max-w-[500px]">
            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full"></div>
            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-slate-700/50 bg-slate-900 shadow-2xl flex items-center justify-center">
              <div className="text-center p-8">
                <Terminal className="w-24 h-24 text-primary mx-auto mb-4" />
                <p className="text-slate-400 font-mono text-sm">&lt;OpenClaw /&gt;</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 py-12 border-y border-slate-800/50 my-12" data-testid="stats-section">
          <StatsCard iconName="Bot" value="10+" label="Agents" />
          <StatsCard iconName="Globe" value="24" label="Web Apps" />
          <StatsCard iconName="GitBranch" value="5" label="Workflows" />
        </section>

        {/* Mission Section */}
        <section className="py-20" data-testid="mission-section">
          <div className="flex flex-col gap-4 mb-8">
            <h2 className="text-slate-100 text-3xl md:text-4xl font-bold tracking-tight">Misyon</h2>
            <div className="h-1.5 w-20 bg-primary rounded-full"></div>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
            <p className="text-slate-300 text-lg leading-relaxed">
              OpenClaw otomasyon sistemi ile AI agent mimarisi, otomasyon çözümleri ve modern web teknolojileri 
              üzerine çalışıyorum. Karmaşık süreçleri zarif dijital çözümlere dönüştüren akıllı ajanlar 
              ve sorunsuz iş akışları oluşturmaya odaklanıyorum. Otonom ekosistemler yaratarak 
              ölçeklenebilir, verimli ve minimal insan müdahalesi gerektiren sistemler inşa ediyorum.
            </p>
          </div>
        </section>

        {/* Core Expertise Section */}
        <section id="expertise" className="py-20" data-testid="expertise-section">
          <div className="flex flex-col gap-4 mb-12">
            <h2 className="text-slate-100 text-3xl md:text-4xl font-bold tracking-tight">Core Expertise</h2>
            <div className="h-1.5 w-20 bg-primary rounded-full"></div>
            <p className="text-slate-400 text-lg max-w-xl">AI, DevOps ve Otomasyon alanlarında derin teknik uzmanlık.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {competencies.map((comp) => (
              <div
                key={comp.id}
                className="group flex flex-col gap-6 rounded-2xl border border-slate-800 bg-slate-900/40 p-8 hover:border-primary/50 transition-all hover:bg-slate-800/60"
                data-testid={`competency-${comp.id}`}
              >
                <div className="size-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <comp.icon className="w-7 h-7" />
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="text-slate-100 text-xl font-bold">{comp.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{comp.description}</p>
                  <ul className="mt-2 space-y-2">
                    {comp.points.map((point, index) => (
                      <li key={index} className="flex items-center gap-2 text-slate-300 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="py-20" data-testid="techstack-section">
          <div className="flex flex-col gap-4 mb-12 items-center text-center">
            <h2 className="text-slate-100 text-3xl md:text-4xl font-bold tracking-tight">Tech Stack</h2>
            <div className="h-1.5 w-20 bg-primary rounded-full"></div>
            <p className="text-slate-400 text-lg">Geleceği inşa etmek için kullandığım araçlar ve teknolojiler.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4" data-testid="tech-grid">
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl border border-slate-800 bg-slate-900/30 hover:bg-slate-800/50 transition-colors"
                data-testid={`tech-${tech.name}`}
              >
                <span className="text-slate-300 text-sm font-medium">{tech.name}</span>
                <span className="text-slate-500 text-xs">{tech.category}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20" data-testid="contact-section">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 p-8 md:p-16">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 size-80 bg-primary/20 blur-[100px] rounded-full"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="flex flex-col gap-4 text-center md:text-left">
                <h2 className="text-3xl md:text-5xl font-extrabold text-slate-100">Otomasyona hazır mısınız?</h2>
                <p className="text-slate-400 text-lg md:text-xl max-w-md">
                  Akıllı ajanlar ve verimli iş akışlarıyla işletmenizi nasıl ölçeklendirebileceğimizi konuşalım.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                {githubLink && (
                  <a
                    href={githubLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-xl h-14 px-6 bg-slate-800 text-slate-100 font-bold hover:bg-slate-700 transition-all"
                    data-testid="link-github"
                  >
                    <Github className="w-5 h-5" />
                    GitHub
                  </a>
                )}
                {linkedinLink && (
                  <a
                    href={linkedinLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-xl h-14 px-6 bg-slate-800 text-slate-100 font-bold hover:bg-slate-700 transition-all"
                    data-testid="link-linkedin"
                  >
                    <Linkedin className="w-5 h-5" />
                    LinkedIn
                  </a>
                )}
                {discordLink && (
                  <a
                    href={discordLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-xl h-14 px-6 bg-primary text-[#0f2323] font-bold hover:bg-cyan-400 transition-all"
                    data-testid="link-discord"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Discord
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-12 border-t border-slate-800/50" data-testid="contact-info">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-slate-500 text-sm mb-1">E-posta</p>
              <a href={`mailto:${contactInfo.email}`} className="text-slate-300 hover:text-primary transition-colors">
                {contactInfo.email}
              </a>
            </div>
            <div>
              <p className="text-slate-500 text-sm mb-1">Domain</p>
              <span className="text-slate-300">{contactInfo.domain}</span>
            </div>
            <div>
              <p className="text-slate-500 text-sm mb-1">Konum</p>
              <span className="text-slate-300">{contactInfo.location}</span>
            </div>
            <div>
              <p className="text-slate-500 text-sm mb-1">Zaman Dilimi</p>
              <span className="text-slate-300">{contactInfo.timezone}</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
