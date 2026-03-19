'use client';

import Link from 'next/link';
import { Github, MessageCircle, Linkedin, Mail, ArrowRight } from 'lucide-react';
import { socialLinks } from '@/data/social';
import { footerContent } from '@/data/site';

const socialLinkIcons: Record<string, typeof Github> = {
  github: Github,
  discord: MessageCircle,
  linkedin: Linkedin,
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto w-full border-t border-slate-800/50 bg-slate-900">
      {/* Main footer content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <h2 className="mb-4 font-sora text-2xl font-bold text-slate-100">
              {footerContent.headline}
            </h2>
            <p className="mb-6 max-w-md text-slate-400">
              {footerContent.subheadline}
            </p>
            
            {/* Newsletter link */}
            <Link
              href="/newsletter"
              className="group inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
            >
              <Mail className="h-4 w-4" />
              Subscribe to Newsletter
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
              Navigation
            </h3>
            <ul className="space-y-2">
              {footerContent.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 transition-colors hover:text-slate-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
              Connect
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {socialLinks.map((social) => {
                const IconComponent = socialLinkIcons[social.icon];
                return (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 rounded-xl border border-slate-800 bg-slate-800/50 p-4 text-slate-400 transition-colors hover:border-primary/30 hover:bg-slate-800 hover:text-slate-200"
                    aria-label={social.name}
                  >
                    {IconComponent && <IconComponent className="h-6 w-6" />}
                    <span className="text-xs">{social.name}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-slate-800/50">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-sm text-slate-500">
            © {currentYear} {footerContent.copyright.replace(`© ${new Date().getFullYear()} `, '')}
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-sm text-slate-500 hover:text-slate-400">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-slate-500 hover:text-slate-400">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
