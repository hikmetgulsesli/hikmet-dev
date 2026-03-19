"use client";

import { useEffect, useRef, useState } from "react";
import { Maximize2, Minimize2 } from "lucide-react";

export interface TerminalLog {
  id: string;
  timestamp: string;
  level: "info" | "success" | "warning" | "error";
  message: string;
  source: string;
}

export interface TerminalWidgetProps {
  logs: TerminalLog[];
  title?: string;
}

const levelColors = {
  info: "text-primary",
  success: "text-green-500",
  warning: "text-yellow-500",
  error: "text-red-500",
};

const levelLabels = {
  info: "[INFO]",
  success: "[SUCCESS]",
  warning: "[WARN]",
  error: "[ERROR]",
};

export function TerminalWidget({ logs, title = "DevHub_Terminal" }: TerminalWidgetProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [lastLogin] = useState<string>(() =>
    new Date().toLocaleString("tr-TR", { dateStyle: "medium", timeStyle: "short" })
  );

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div
      className={`bg-black rounded-xl border border-primary/30 overflow-hidden terminal-glow flex flex-col ${
        expanded ? "h-[600px] fixed inset-4 z-50" : "h-full min-h-[500px]"
      }`}
    >
      {/* Header */}
      <div className="bg-slate-900 px-4 py-2 flex items-center justify-between border-b border-primary/20">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
        </div>
        <span className="text-[10px] font-mono text-primary/60 uppercase tracking-widest">
          {title}
        </span>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-primary/60 hover:text-primary transition-colors"
          aria-label={expanded ? "Küçült" : "Büyüt"}
        >
          {expanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Terminal Content */}
      <div
        ref={scrollRef}
        className="p-5 font-mono text-xs leading-relaxed flex-1 overflow-y-auto custom-scrollbar"
      >
        <div className="text-primary mb-1">
          Last login: <span suppressHydrationWarning>{lastLogin}</span>
        </div>
        <div className="text-slate-500 mb-4">$ openclaw --version 2.0.0</div>

        {logs.map((log) => (
          <div key={log.id} className="flex gap-2 mb-1">
            <span className={levelColors[log.level]}>{levelLabels[log.level]}</span>
            <span className="text-slate-300">{log.message}</span>
          </div>
        ))}

        {/* Animated cursor */}
        <div className="flex gap-2 mb-1 mt-2">
          <span className="text-slate-500 animate-pulse">_</span>
        </div>

        {/* Footer message */}
        <div className="text-slate-600 mt-10 italic opacity-50">
          System background tasks active...
        </div>
      </div>

      {/* Overlay close button for expanded mode */}
      {expanded && (
        <button
          onClick={() => setExpanded(false)}
          className="absolute top-4 right-4 p-2 bg-slate-800 rounded-lg text-white hover:bg-slate-700"
          aria-label="Terminal penceresini kapat"
        >
          <Minimize2 className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
