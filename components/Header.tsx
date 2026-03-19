'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeSwitcher } from './ThemeSwitcher';
import { Github, MessageCircle, Linkedin, Menu, X, Terminal } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/resources', label: 'Resources' },
  { href: '/writing', label: 'Writing' },
];

const socialLinks = [
  { href: 'https://github.com', icon: Github, label: 'GitHub' },
  { href: 'https://discord.com', icon: MessageCircle, label: 'Discord' },
  { href: 'https://linkedin.com', icon: Linkedin, label: 'LinkedIn' },
];

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/50 bg-slate-900/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Terminal className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold text-slate-100">Hikmet Gulsesli</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors hover:text-slate-200 ${
                isActive(link.href)
                  ? 'font-medium text-primary'
                  : 'text-slate-400'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right section: Theme switcher, social icons, live badge */}
        <div className="flex items-center gap-3">
          {/* Social icons - desktop only */}
          <div className="hidden items-center gap-1 border-r border-slate-700 pr-3 md:flex">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white/5 hover:text-slate-200"
                aria-label={social.label}
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>

          {/* Live badge */}
          <div className="hidden items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 md:flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
            </span>
            <span className="text-xs font-medium text-green-400">10 agents live</span>
          </div>

          {/* Theme switcher */}
          <ThemeSwitcher />

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 md:hidden"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="border-t border-slate-800/50 bg-slate-900/95 backdrop-blur-md md:hidden">
          <nav className="flex flex-col gap-1 p-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`rounded-lg px-4 py-3 text-sm transition-colors ${
                  isActive(link.href)
                    ? 'bg-white/10 font-medium text-primary'
                    : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Mobile social links */}
            <div className="mt-4 flex items-center gap-2 border-t border-slate-800/50 pt-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white/5 hover:text-slate-200"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>

            {/* Mobile live badge */}
            <div className="mt-3 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
              </span>
              <span className="text-sm text-green-400">10 agents live</span>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
