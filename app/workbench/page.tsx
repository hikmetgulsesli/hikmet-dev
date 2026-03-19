import { docsCards, repoCards } from "@/data/resources";
import { TerminalWidget } from "@/components/TerminalWidget";
import { 
  BookOpen, 
  GitBranch, 
  Code, 
  Users, 
  Star, 
  GitFork, 
  ExternalLink,
  FileText,
  Layers,
  Zap
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  book: BookOpen,
  'git-branch': GitBranch,
  code: Code,
  users: Users,
};

const languageColors: Record<string, string> = {
  TypeScript: 'bg-blue-500',
  JavaScript: 'bg-yellow-500',
  Python: 'bg-green-500',
  Rust: 'bg-orange-500',
  'Node.js': 'bg-green-600',
};

function DocCardComponent({ card }: { card: typeof docsCards[0] }) {
  const Icon = iconMap[card.icon] || FileText;
  
  return (
    <a
      href={card.link}
      target={card.link.startsWith('http') ? '_blank' : undefined}
      rel={card.link.startsWith('http') ? 'noopener noreferrer' : undefined}
      className="group bg-surface-dark border border-border-dark rounded-xl p-6 hover:border-primary/50 transition-all cursor-pointer relative overflow-hidden flex flex-col h-full"
      data-testid={`doc-card-${card.id}`}
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -mr-12 -mt-12 group-hover:bg-primary/10 transition-all" />
      <div className="size-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 text-primary">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-white text-xl font-bold mb-2 group-hover:text-primary transition-colors">
        {card.title}
      </h3>
      <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">
        {card.description}
      </p>
      <div className="flex items-center justify-between mt-auto">
        <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">
          {card.category}
        </span>
        <ExternalLink className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0" />
      </div>
    </a>
  );
}

function RepoCardComponent({ repo }: { repo: typeof repoCards[0] }) {
  const langColor = languageColors[repo.language] || 'bg-slate-500';
  
  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group bg-surface-dark/50 border border-border-dark rounded-xl p-5 hover:bg-surface-dark transition-colors flex flex-col h-full"
      data-testid={`repo-card-${repo.id}`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full ${langColor}`} />
          <span className="font-bold text-white">{repo.name}</span>
        </div>
      </div>
      
      <p className="text-slate-400 text-sm mb-4 flex-1">
        {repo.description}
      </p>
      
      {/* Progress bar */}
      <div className="mb-4">
        <div className="w-full bg-border-dark h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-primary h-full rounded-full transition-all"
            style={{ width: `${repo.progress}%`, boxShadow: '0 0 10px rgba(0,255,255,0.4)' }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-[10px] text-slate-500 uppercase font-bold">{repo.language}</span>
          <span className="text-[10px] text-slate-500 uppercase font-bold">{repo.progress}%</span>
        </div>
      </div>
      
      {/* Stats and activity */}
      <div className="flex items-center justify-between pt-3 border-t border-border-dark">
        <div className="flex items-center gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5" />
            <span>{repo.stars}</span>
          </div>
          <div className="flex items-center gap-1">
            <GitFork className="w-3.5 h-3.5" />
            <span>{repo.forks}</span>
          </div>
        </div>
        <span className="text-xs text-slate-500">{repo.lastActivity}</span>
      </div>
    </a>
  );
}

function QuickLinkCard({ 
  icon: Icon, 
  title, 
  subtitle 
}: { 
  icon: React.ComponentType<{ className?: string }>; 
  title: string; 
  subtitle: string;
}) {
  return (
    <div className="bg-surface-dark/30 border border-border-dark rounded-xl p-4 flex items-center gap-4 hover:bg-surface-dark/50 transition-colors">
      <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-white text-sm font-bold">{title}</p>
        <p className="text-slate-500 text-xs">{subtitle}</p>
      </div>
    </div>
  );
}

export default function WorkbenchPage() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <section className="mb-12" data-testid="workbench-header">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <span className="text-primary text-sm font-bold tracking-widest uppercase mb-2 block">
                Geliştirici Merkezi
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                Developer Resources & APIs
              </h1>
              <p className="text-slate-400 max-w-2xl text-lg">
                Uygulama geliştirmek için ihtiyacınız olan tüm kaynaklar. Dokümantasyon, API referansları ve geliştirici araçları.
              </p>
            </div>
          </div>
        </section>

        {/* Docs Cards Grid */}
        <section className="mb-12" data-testid="docs-section">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Dokümantasyon</h2>
            <a 
              href="https://github.com/hikmetgulsesli" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary text-sm font-semibold flex items-center gap-1 hover:underline"
            >
              Tümünü Gör <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" data-testid="docs-grid">
            {docsCards.map((card) => (
              <DocCardComponent key={card.id} card={card} />
            ))}
          </div>
        </section>

        {/* Repo Cards and Terminal Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Repository Cards */}
          <section className="lg:col-span-2" data-testid="repos-section">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">GitHub Repositories</h2>
              <a 
                href="https://github.com/hikmetgulsesli" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary text-sm font-semibold flex items-center gap-1 hover:underline"
              >
                GitHub&apos;da Gör <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-testid="repos-grid">
              {repoCards.map((repo) => (
                <RepoCardComponent key={repo.id} repo={repo} />
              ))}
            </div>
          </section>

          {/* Terminal Widget */}
          <section className="lg:col-span-1" data-testid="terminal-section">
            <h2 className="text-2xl font-bold text-white mb-6">Sistem Terminali</h2>
            <TerminalWidget className="h-[400px]" />
          </section>
        </div>

        {/* Quick Links Section */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6" data-testid="quick-links">
          <QuickLinkCard
            icon={FileText}
            title="API Docs"
            subtitle="v2.4.0 Güncellendi"
          />
          <QuickLinkCard
            icon={Layers}
            title="Discord Topluluğu"
            subtitle="12.4k Üye"
          />
          <QuickLinkCard
            icon={Code}
            title="Örnek Repo"
            subtitle="React, Next.js"
          />
          <QuickLinkCard
            icon={Zap}
            title="Direkt Destek"
            subtitle="7/24 Aktif"
          />
        </section>
      </div>
    </div>
  );
}
