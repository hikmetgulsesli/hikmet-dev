"use client";

import Link from "next/link";
import { Terminal, Github, Linkedin, ArrowRight } from "lucide-react";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/workbench", label: "Resources" },
  { href: "/blog", label: "Blog" },
  { href: "/introduction", label: "About" },
];

const socialLinks = [
  {
    href: "https://github.com/hikmetgulsesli",
    label: "GitHub",
    icon: Github,
  },
  {
    href: "https://discord.gg/setroxhq",
    label: "Discord",
    icon: () => (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
    ),
  },
  {
    href: "https://linkedin.com/in/hikmetgulsesli",
    label: "LinkedIn",
    icon: Linkedin,
  },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-[var(--color-border-dark)] bg-slate-50 dark:bg-[var(--color-surface-dark)]">
      {/* Newsletter CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Birlikte çalışalım
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-xl mx-auto">
            Projeleriniz için AI destekli otomasyon çözümleri geliştiriyorum.
            İletişime geçin.
          </p>
          <Link
            href="mailto:contact@setrox.com.tr"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-[var(--color-primary)] text-[#0f2323] font-semibold hover:bg-[var(--color-accent)] transition-colors"
          >
            İletişime Geç
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-slate-200 dark:border-[var(--color-border-dark)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo & Copyright */}
            <div className="flex flex-col items-center md:items-start gap-2">
              <Link href="/" className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-[var(--color-primary)]" />
                <span className="text-lg font-bold text-slate-900 dark:text-white">
                  Hikmet Gulsesli
                </span>
              </Link>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                © {new Date().getFullYear()} Tüm hakları saklıdır.
              </p>
            </div>

            {/* Quick Links */}
            <nav className="flex flex-wrap items-center justify-center gap-6">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-[var(--color-primary)] dark:hover:text-[var(--color-primary)] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Social Links */}
            <div className="flex items-center gap-2">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-[var(--color-primary)] dark:hover:text-[var(--color-primary)] hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                    aria-label={link.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
