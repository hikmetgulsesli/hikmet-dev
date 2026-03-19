import Link from "next/link";
import { ArrowLeft, Terminal, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-16">
      <div className="text-center">
        {/* Terminal icon */}
        <div className="mb-6 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10">
            <Terminal className="h-10 w-10 text-primary" />
          </div>
        </div>

        {/* Error code */}
        <h1 className="mb-2 font-mono text-6xl font-bold text-primary md:text-8xl">
          404
        </h1>

        {/* Error message */}
        <h2 className="mb-4 text-2xl font-bold text-slate-100 md:text-3xl">
          Sayfa bulunamadı
        </h2>

        <p className="mb-8 max-w-md text-slate-400">
          Aradığınız sayfa mevcut değil veya taşınmış olabilir. 
          Ana sayfaya dönüp başka bir şeyler keşfedebilirsiniz.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-medium text-slate-900 transition-colors hover:bg-primary/90"
          >
            <Home className="h-4 w-4" />
            Ana Sayfaya Dön
          </Link>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/50 px-6 py-3 font-medium text-slate-300 transition-colors hover:border-slate-600 hover:bg-slate-800 hover:text-slate-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Projeleri Keşfet
          </Link>
        </div>

        {/* Terminal-like decoration */}
        <div className="mt-12 inline-block rounded-lg border border-slate-800 bg-slate-900/50 px-4 py-2 font-mono text-sm text-slate-500">
          <span className="text-primary">$</span> curl -I https://setrox.com.tr/404
          <br />
          <span className="text-red-400">HTTP/1.1 404 Not Found</span>
        </div>
      </div>
    </div>
  );
}
