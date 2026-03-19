"use client";

import { useState, useEffect } from "react";
import { Bot, Globe, GitBranch } from "lucide-react";
import Link from "next/link";

const iconMap = {
  Bot: Bot,
  Globe: Globe,
  GitBranch: GitBranch,
};

interface StatsCardProps {
  iconName: keyof typeof iconMap;
  value: string | number;
  label: string;
}

function StatsCard({ iconName, value, label }: StatsCardProps) {
  const Icon = iconMap[iconName];
  
  return (
    <div className="flex flex-col gap-1 rounded-xl p-5 border border-slate-800 bg-slate-900/40 backdrop-blur-sm group hover:border-primary/50 transition-colors">
      <Icon className="w-5 h-5 text-primary mb-1" />
      <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">{label}</p>
      <p className="text-white text-2xl font-bold font-display">{value}</p>
    </div>
  );
}

const ROTATING_WORDS = [
  "Building quiet",
  "scaling workflows", 
  "shipping projects"
];

export function Hero() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
        setIsAnimating(false);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full px-6 md:px-20 py-12 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left side - Content */}
        <div className="flex flex-col gap-8 order-2 lg:order-1">
          <div className="flex flex-col gap-4">
            {/* Available badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-wider">Yeni projeler için müsait</span>
            </div>

            {/* Title with word rotation */}
            <h1 className="font-display text-slate-100 text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tight">
              <span 
                className="text-primary inline-block transition-all duration-300 ease-out"
                style={{
                  opacity: isAnimating ? 0 : 1,
                  transform: isAnimating ? 'translateY(-10px)' : 'translateY(0)',
                }}
                data-testid="rotating-word"
              >
                {ROTATING_WORDS[currentWordIndex]}
              </span>
            </h1>

            {/* Description */}
            <p className="text-slate-400 text-lg md:text-xl max-w-lg leading-relaxed font-light">
              OpenClaw otomasyon sisteminin kurucusu. Kimi k2p5, MiniMax M2.7 ve açık kaynak araçlarla yapay zeka agentleri ve modern web uygulamaları geliştiriyorum.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <Link
              href="/projects"
              className="flex min-w-[160px] cursor-pointer items-center justify-center rounded-xl h-14 px-8 bg-primary text-background-dark text-base font-bold transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/20"
              data-testid="cta-primary"
            >
              Projeleri Keşfet
            </Link>
            <Link
              href="/introduction"
              className="flex min-w-[160px] cursor-pointer items-center justify-center rounded-xl h-14 px-8 bg-slate-800/50 border border-slate-700 text-white text-base font-bold transition-all hover:bg-slate-800"
              data-testid="cta-secondary"
            >
              Hakkımda
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-4 pt-4">
            <StatsCard iconName="Bot" value="10+" label="Agents" />
            <StatsCard iconName="Globe" value="24" label="Web Apps" />
            <StatsCard iconName="GitBranch" value="5" label="Workflows" />
          </div>
        </div>

        {/* Right side - Terminal Widget */}
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
          <TerminalWidget />
        </div>
      </div>
    </section>
  );
}

function TerminalWidget() {
  return (
    <div className="w-full max-w-[540px] aspect-[4/3] relative" data-testid="terminal-widget">
      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-purple-500/30 rounded-2xl blur-2xl opacity-50"></div>
      
      {/* Terminal container */}
      <div className="relative h-full w-full border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col bg-[rgba(15,30,35,0.8)] backdrop-blur-sm">
        {/* Terminal header */}
        <div className="h-10 bg-slate-900/90 border-b border-slate-800 flex items-center px-4 gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
          <div className="flex-1 flex justify-center">
            <span className="text-[10px] font-mono text-slate-500 font-medium">bash — hikmet@setrox — 80x24</span>
          </div>
        </div>

        {/* Terminal content */}
        <div className="flex-1 p-6 font-mono text-sm overflow-hidden relative">
          {/* Scanline effect */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="w-full h-[2px] bg-primary/10 absolute top-0 animate-pulse"></div>
          </div>

          {/* ASCII Art */}
          <div className="text-primary mb-4">
            <pre className="leading-none text-[10px] md:text-xs text-primary">
{`  _____  ________      __
 |  __ \\|  ____\\ \\    / /
 | |  | | |__   \\ \\  / / 
 | |  | |  __|   \\ \\/ /  
 | |__| | |____   \\  /   
 |_____/|______|   \\/    `}
            </pre>
          </div>

          {/* Terminal logs */}
          <div className="space-y-1.5">
            <div className="flex gap-2">
              <span className="text-green-400">➜</span>
              <span className="text-slate-300">setrox</span>
              <span className="text-primary">git:(main)</span>
              <span className="text-yellow-400">✗</span>
              <span className="text-slate-100 italic">npm start</span>
            </div>
            <div className="text-slate-500">[14:32:01] Starting compilation...</div>
            <div className="text-slate-400">Success! Compiled in 1.2s</div>
            <div className="text-slate-500">[14:32:05] Initializing Neural Engine...</div>
            <div className="text-primary/70">● Loading agent configuration... [OK]</div>
            <div className="text-primary/70">● Connecting to API gateway... [OK]</div>
            <div className="text-primary/70">● Syncing workflow database... [OK]</div>
            <div className="flex items-center gap-2">
              <span className="text-slate-500">[14:32:08]</span>
              <span className="text-green-400 font-bold uppercase text-[10px] px-1 bg-green-400/10 rounded">Live</span>
              <span className="text-slate-300">Listening at port 3000</span>
            </div>
            <div className="pt-4 text-slate-500 italic"># Running analytics worker...</div>
            <div className="text-slate-400">&gt; Processing payload #8271 ... done</div>
            <div className="text-slate-400">&gt; Processing payload #8272 ... done</div>
            <div className="text-slate-400">&gt; Processing payload #8273 ... done</div>
            <div className="flex gap-2">
              <span className="text-green-400">➜</span>
              <span className="text-slate-100">_</span>
              <span className="w-2 h-4 bg-primary animate-pulse"></span>
            </div>
          </div>
        </div>

        {/* Terminal footer */}
        <div className="h-8 bg-slate-900/50 border-t border-slate-800 flex items-center px-4 justify-between">
          <div className="flex items-center gap-4">
            <span className="text-[10px] text-slate-600">UTF-8</span>
            <span className="text-[10px] text-slate-600">Main branch</span>
          </div>
          <span className="text-[10px] text-primary font-bold">● System Active</span>
        </div>
      </div>
    </div>
  );
}
