"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to monitoring service
    console.error("Global error caught:", error);
  }, [error]);

  return (
    <html>
      <body className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0f2323] p-4">
        <div className="text-center max-w-lg">
          {/* Error Icon */}
          <div className="mb-6 flex justify-center">
            <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20">
              <AlertTriangle className="w-12 h-12 text-red-500" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Bir şeyler ters gitti
          </h1>

          {/* Description */}
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-2">
            Uygulamada beklenmeyen bir hata oluştu. Teknik ekibimiz bilgilendirildi.
          </p>

          {/* Error Details (only in development) */}
          {process.env.NODE_ENV === "development" && (
            <div className="mt-4 p-4 rounded-lg bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 text-left">
              <p className="text-sm font-mono text-red-600 dark:text-red-400 break-all">
                {error.message}
              </p>
              {error.digest && (
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                  Hata Kodu: {error.digest}
                </p>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => reset()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-primary)] text-[#0f2323] font-semibold hover:bg-[var(--color-accent)] transition-colors"
            >
              <RefreshCw className="w-5 h-5" />
              Tekrar Dene
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 dark:border-[var(--color-border-dark)] text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
            >
              <Home className="w-5 h-5" />
              Ana Sayfa
            </Link>
          </div>

          {/* Support Info */}
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-[var(--color-border-dark)]">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Sorun devam ederse{" "}
              <a
                href="mailto:contact@setrox.com.tr"
                className="text-[var(--color-primary)] hover:underline"
              >
                iletişime geçin
              </a>
              .
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}
