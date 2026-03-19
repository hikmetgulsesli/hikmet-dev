import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-lg">
        {/* Error Code */}
        <div className="mb-8">
          <span className="text-9xl font-bold text-[var(--color-primary)]/20">404</span>
        </div>

        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div className="p-4 rounded-2xl bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20">
            <Search className="w-12 h-12 text-[var(--color-primary)]" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
          Sayfa bulunamadı
        </h1>

        {/* Description */}
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
          Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir.
          Lütfen URL&apos;yi kontrol edin veya ana sayfaya dönün.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-primary)] text-[#0f2323] font-semibold hover:bg-[var(--color-accent)] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Ana Sayfaya Dön
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 dark:border-[var(--color-border-dark)] text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
          >
            Projeleri Keşfet
          </Link>
        </div>

        {/* Suggested Links */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-[var(--color-border-dark)]">
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            Belki bunlar ilginizi çekebilir:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/projects"
              className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 text-sm hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
            >
              Projeler
            </Link>
            <Link
              href="/blog"
              className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 text-sm hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/introduction"
              className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 text-sm hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
            >
              Hakkımda
            </Link>
            <Link
              href="/workbench"
              className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 text-sm hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
            >
              Kaynaklar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
