import Link from "next/link";
import { Terminal, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 mb-6">
                <Terminal className="w-4 h-4 text-[var(--color-primary)]" />
                <span className="text-sm font-medium text-[var(--color-primary)]">
                  OpenClaw Builder
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
                Geleceği inşa ediyoruz{" "}
                <span className="text-[var(--color-primary)]">
                  yapay zeka ile
                </span>
              </h1>

              <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-lg">
                10 AI agent, 24 deployed web app, 5 automated workflow. Kimi k2p5, MiniMax M2.7 ve açık kaynak araçlarla geliştiriyoruz.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-primary)] text-[#0f2323] font-semibold hover:bg-[var(--color-accent)] transition-colors"
                >
                  Projeleri Keşfet
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/introduction"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 dark:border-[var(--color-border-dark)] text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                >
                  Hakkımda
                </Link>
              </div>
            </div>

            {/* Right Content - Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-[var(--color-border-dark)]">
                <div className="text-4xl font-bold text-[var(--color-primary)] mb-2">
                  10+
                </div>
                <div className="text-slate-600 dark:text-slate-400">AI Agent</div>
              </div>
              <div className="p-6 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-[var(--color-border-dark)]">
                <div className="text-4xl font-bold text-[var(--color-primary)] mb-2">
                  24
                </div>
                <div className="text-slate-600 dark:text-slate-400">Web Uygulaması</div>
              </div>
              <div className="p-6 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-[var(--color-border-dark)] col-span-2">
                <div className="text-4xl font-bold text-[var(--color-primary)] mb-2">
                  5
                </div>
                <div className="text-slate-600 dark:text-slate-400">Otomatik Workflow</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="py-20 border-t border-slate-200 dark:border-[var(--color-border-dark)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Öne Çıkan Projeler
            </h2>
            <Link
              href="/projects"
              className="text-[var(--color-primary)] hover:underline"
            >
              Tümünü gör →
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Mission Control",
                desc: "AI agent yönetim dashboard'u",
                status: "shipped",
              },
              {
                name: "Setfarm",
                desc: "Otomasyon pipeline motoru",
                status: "shipped",
              },
              {
                name: "Hızlı Okuma",
                desc: "Hızlı okuma eğitim uygulaması",
                status: "shipped",
              },
            ].map((project) => (
              <div
                key={project.name}
                className="p-6 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-[var(--color-border-dark)] hover:border-[var(--color-primary)]/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                    {project.name}
                  </h3>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    {project.status}
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-400">
                  {project.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
