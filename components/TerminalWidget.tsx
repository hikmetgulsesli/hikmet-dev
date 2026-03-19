"use client";

import { useCallback } from "react";

export interface TerminalLog {
  id: string;
  timestamp: string;
  level: "info" | "success" | "warning" | "error";
  message: string;
}

interface TerminalWidgetProps {
  logs?: TerminalLog[];
  className?: string;
  title?: string;
}

const defaultLogs: TerminalLog[] = [
  { id: "1", timestamp: "14:32:01", level: "info", message: "Connecting to API gateway..." },
  { id: "2", timestamp: "14:32:05", level: "info", message: "Syncing workflow database..." },
  { id: "3", timestamp: "14:32:10", level: "success", message: "Establishing secure handshake..." },
  { id: "4", timestamp: "14:32:12", level: "info", message: "Loading developer profile assets..." },
  { id: "5", timestamp: "14:32:15", level: "success", message: "System core initialized. Welcome, developer." },
  { id: "6", timestamp: "14:32:18", level: "info", message: "Loading workbench resources..." },
  { id: "7", timestamp: "14:32:20", level: "success", message: "4 docs cards loaded" },
  { id: "8", timestamp: "14:32:21", level: "success", message: "4 repo cards loaded" },
];

const levelColors = {
  info: "text-cyan-400",
  success: "text-green-400",
  warning: "text-yellow-400",
  error: "text-red-400",
};

const levelLabels = {
  info: "INFO",
  success: "OK",
  warning: "WARN",
  error: "ERR",
};

export function TerminalWidget({ logs = defaultLogs, className = "", title = "OpenClaw_Terminal" }: TerminalWidgetProps) {
  const handleCopy = useCallback(() => {
    const text = logs.map(log => `[${log.timestamp}] [${levelLabels[log.level]}] ${log.message}`).join('\n');
    navigator.clipboard.writeText(text).catch(() => {});
  }, [logs]);

  return (
    <div className={`bg-black rounded-xl border border-border-dark overflow-hidden flex flex-col shadow-2xl ${className}`}>
      {/* Header */}
      <div className="bg-surface-dark px-4 py-2 border-b border-border-dark flex items-center justify-between">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
        </div>
        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">
          {title}
        </span>
        <button 
          type="button" 
          onClick={handleCopy}
          aria-label="Copy terminal output"
          className="text-slate-500 hover:text-primary transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="p-4 font-mono text-xs overflow-y-auto flex-1 space-y-1 custom-scrollbar">
        {/* ASCII Art */}
        <div className="text-primary mb-4 whitespace-pre font-bold text-[10px] leading-tight animate-fadeIn">
{`███████╗███████╗████████╗██████╗  ██████╗ ██╗  ██╗
██╔════╝██╔════╝╚══██╔══╝██╔══██╗██╔═══██╗╚██╗██╔╝
███████╗█████╗     ██║   ██████╔╝██║   ██║ ╚███╔╝ 
╚════██║██╔══╝     ██║   ██╔══██╗██║   ██║ ██╔██╗ 
███████║███████╗   ██║   ██║  ██║╚██████╔╝██╔╝ ██╗
╚══════╝╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝`}
        </div>

        {/* Logs */}
        {logs.map((log, index) => (
          <div 
            key={log.id} 
            className="flex flex-wrap gap-2 animate-slideIn"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <span className="text-slate-600">[{log.timestamp}]</span>
            <span className={`${levelColors[log.level]} font-bold`}>
              [{levelLabels[log.level]}]
            </span>
            <span className="text-slate-300">{log.message}</span>
          </div>
        ))}

        {/* Cursor */}
        <div className="flex items-center gap-2 mt-2 animate-fadeIn" style={{ animationDelay: `${logs.length * 150 + 200}ms` }}>
          <span className="text-primary font-bold">$</span>
          <span className="text-slate-100">workbench</span>
          <span className="w-2 h-4 bg-primary animate-pulse ml-1" />
        </div>
      </div>
    </div>
  );
}
