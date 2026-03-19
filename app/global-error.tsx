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
    // Log the error to an error reporting service
    console.error("Global error caught:", error);
  }, [error]);

  return (
    <html lang="tr">
      <body className="min-h-full bg-background-dark text-slate-100">
        <div className="flex min-h-screen flex-col items-center justify-center px-4 py-16">
          <div className="text-center">
            {/* Error icon */}
            <div className="mb-6 flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-red-500/30 bg-red-500/10">
                <AlertTriangle className="h-10 w-10 text-red-400" />
              </div>
            </div>

            {/* Error title */}
            <h1 className="mb-2 text-3xl font-bold text-slate-100 md:text-4xl">
              Bir şeyler yanlış gitti
            </h1>

            <p className="mb-8 max-w-md text-slate-400">
              Uygulamada beklenmeyen bir hata oluştu. 
              Sorun devam ederse lütfen daha sonra tekrar deneyin.
            </p>

            {/* Error details (in development) */}
            {process.env.NODE_ENV === "development" && (
              <div className="mb-8 rounded-lg border border-red-500/20 bg-red-500/5 p-4 text-left">
                <p className="mb-2 font-mono text-sm text-red-400">
                  Error: {error.message}
                </p>
                {error.digest && (
                  <p className="font-mono text-xs text-slate-500">
                    Digest: {error.digest}
                  </p>
                )}
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <button
                onClick={reset}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-medium text-slate-900 transition-colors hover:bg-primary/90"
              >
                <RefreshCw className="h-4 w-4" />
                Tekrar Dene
              </button>

              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/50 px-6 py-3 font-medium text-slate-300 transition-colors hover:border-slate-600 hover:bg-slate-800 hover:text-slate-200"
              >
                <Home className="h-4 w-4" />
                Ana Sayfaya Dön
              </Link>
            </div>

            {/* Terminal decoration */}
            <div className="mt-12 inline-block rounded-lg border border-slate-800 bg-slate-900/50 px-4 py-2 font-mono text-sm text-slate-500">
              <span className="text-red-400">[ERROR]</span>{" "}
              <span className="text-slate-400">Unhandled exception in application</span>
              <br />
              <span className="text-primary">$</span>{" "}
              <span className="text-slate-400">systemctl status app</span>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
