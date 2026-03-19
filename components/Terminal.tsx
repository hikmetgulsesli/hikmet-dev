"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

export interface LogEntry {
  timestamp: string;
  status: "ok" | "info" | "warn" | "error";
  message: string;
}

export interface TerminalProps {
  /** Custom ASCII art to display at the top */
  asciiArt?: string;
  /** Initial log entries to display */
  initialLogs?: LogEntry[];
  /** Custom className for styling */
  className?: string;
  /** Height when minimized */
  minHeight?: number;
  /** Height when maximized */
  maxHeight?: number;
  /** Whether to start minimized */
  defaultMinimized?: boolean;
  /** Auto-scroll to bottom when new logs are added */
  autoScroll?: boolean;
}

const DEFAULT_ASCII_ART = `██████   ███████  ██    ██ 
██   ██  ██       ██    ██ 
██   ██  █████    ██    ██ 
██   ██  ██        ██  ██  
██████   ███████    ████   `;

const PREDEFINED_LOGS: Omit<LogEntry, "timestamp">[] = [
  { status: "ok", message: "Connecting to API gateway..." },
  { status: "info", message: "Syncing workflow database..." },
  { status: "ok", message: "Establishing secure handshake..." },
  { status: "info", message: "Loading developer profile assets..." },
  { status: "ok", message: "System core initialized. Welcome, developer." },
  { status: "info", message: "Agent swarm status: 10 agents active" },
  { status: "ok", message: "Deployed 24 web applications successfully" },
  { status: "info", message: "Workflow pipeline: 5 pipelines running" },
  { status: "ok", message: "OpenClaw automation system online" },
  { status: "info", message: "Monitoring system metrics..." },
  { status: "ok", message: "Health check passed - all systems nominal" },
  { status: "info", message: "Fetching project repositories..." },
  { status: "ok", message: "Repository sync completed" },
  { status: "info", message: "Building with Kimi k2p5..." },
  { status: "ok", message: "MiniMax M2.7 integration ready" },
  { status: "info", message: "Next.js build optimization enabled" },
  { status: "ok", message: "Tailwind CSS v4 loaded" },
  { status: "info", message: "shadcn/ui components initialized" },
  { status: "ok", message: "Dark theme system activated" },
  { status: "info", message: "oklch color system engaged" },
];

function formatTimestamp(date: Date): string {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  return `[${hours}:${minutes}:${seconds}]`;
}

function getStatusClass(status: LogEntry["status"]): string {
  switch (status) {
    case "ok":
      return "status-ok";
    case "info":
      return "status-info";
    case "warn":
      return "status-warn";
    case "error":
      return "status-error";
    default:
      return "status-info";
  }
}

function getStatusLabel(status: LogEntry["status"]): string {
  return status.toUpperCase();
}

/**
 * Terminal Widget component with ASCII art and scrolling log animation
 * 
 * Features:
 * - Black background with green/cyan monospace text
 * - ASCII art header
 * - Continuous scrolling fake log lines with timestamps
 * - New line added every 100-200ms (randomized)
 * - Min/max toggle button
 * - Smooth CSS animations
 */
export function Terminal({
  asciiArt = DEFAULT_ASCII_ART,
  initialLogs = [],
  className = "",
  minHeight = 280,
  maxHeight = 700,
  defaultMinimized = false,
  autoScroll = true,
}: TerminalProps) {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isMinimized, setIsMinimized] = useState(defaultMinimized);
  const [isClient, setIsClient] = useState(false);
  const logsEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const logIndexRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize logs on client side only
  useEffect(() => {
    // Mark as client-side immediately
    setIsClient(true);
  }, []);

  // Set up initial logs after client-side is confirmed
  useEffect(() => {
    if (!isClient) return;
    
    const initial: LogEntry[] = initialLogs.length > 0 
      ? initialLogs 
      : PREDEFINED_LOGS.slice(0, 5).map((log) => ({
          ...log,
          timestamp: formatTimestamp(new Date()),
        }));
    setLogs(initial);
    logIndexRef.current = 5;
  }, [isClient, initialLogs]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (autoScroll && logsEndRef.current && !isMinimized) {
      // Check if scrollIntoView is available (for jsdom compatibility)
      if (typeof logsEndRef.current.scrollIntoView === 'function') {
        logsEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [logs, autoScroll, isMinimized]);

  // Add new logs at random intervals (100-200ms)
  useEffect(() => {
    if (!isClient) return;

    const addLog = () => {
      setLogs((prev) => {
        const nextLog = PREDEFINED_LOGS[logIndexRef.current % PREDEFINED_LOGS.length];
        logIndexRef.current += 1;
        
        const newLog: LogEntry = {
          timestamp: formatTimestamp(new Date()),
          status: nextLog.status,
          message: nextLog.message,
        };

        // Keep only last 50 logs to prevent memory issues
        const newLogs = [...prev, newLog];
        if (newLogs.length > 50) {
          return newLogs.slice(newLogs.length - 50);
        }
        return newLogs;
      });

      // Random interval between 100-200ms
      const nextInterval = 100 + Math.random() * 100;
      timeoutRef.current = setTimeout(addLog, nextInterval);
    };

    // Start the log rotation
    const nextInterval = 100 + Math.random() * 100;
    timeoutRef.current = setTimeout(addLog, nextInterval);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isClient]);

  const handleToggleMinimize = useCallback(() => {
    setIsMinimized((prev) => !prev);
  }, []);

  const currentHeight = isMinimized ? minHeight : maxHeight;

  // Prevent hydration mismatch by not rendering until client-side
  if (!isClient) {
    return (
      <div
        ref={containerRef}
        className={`w-full max-w-4xl bg-[#0a0a0a] rounded-xl border border-[#0df20d]/20 overflow-hidden flex flex-col ${className}`}
        style={{ height: currentHeight }}
        data-testid="terminal-loading"
      >
        <header className="flex items-center justify-between bg-[#111] px-4 py-3 border-b border-[#0df20d]/10 select-none">
          <div className="flex gap-2 w-1/4">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          <div className="text-xs md:text-sm text-slate-400 font-medium flex items-center gap-2">
            <span>⌘</span>
            bash — user@portfolio — 80x24
          </div>
          <div className="flex gap-3 w-1/4 justify-end text-slate-400">
            <button className="hover:text-[#0df20d] transition-colors">
              <span>_</span>
            </button>
            <button className="hover:text-[#0df20d] transition-colors">
              <span>□</span>
            </button>
          </div>
        </header>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`w-full max-w-4xl bg-[#0a0a0a] rounded-xl border border-[#0df20d]/20 shadow-[0_0_40px_rgba(13,242,13,0.1)] overflow-hidden flex flex-col transition-all duration-300 ease-in-out ${className}`}
      style={{ height: currentHeight }}
      data-testid="terminal-widget"
    >
      {/* Chrome-style Header */}
      <header className="flex items-center justify-between bg-[#111] px-4 py-3 border-b border-[#0df20d]/10 select-none shrink-0">
        {/* Window Controls */}
        <div className="flex gap-2 w-1/4">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>

        {/* Title */}
        <div className="text-xs md:text-sm text-slate-400 font-medium flex items-center gap-2">
          <span className="text-[14px]">⌘</span>
          bash — user@portfolio — 80x24
        </div>

        {/* Utility Icons */}
        <div className="flex gap-3 w-1/4 justify-end text-slate-400">
          <button
            onClick={handleToggleMinimize}
            className="hover:text-[#0df20d] transition-colors p-1"
            aria-label={isMinimized ? "Expand terminal" : "Minimize terminal"}
            data-testid="terminal-minimize-btn"
          >
            <span className="text-[18px]">{isMinimized ? "□" : "_"}</span>
          </button>
          <button
            onClick={handleToggleMinimize}
            className="hover:text-[#0df20d] transition-colors p-1"
            aria-label={isMinimized ? "Expand terminal" : "Maximize terminal"}
            data-testid="terminal-maximize-btn"
          >
            <span className="text-[18px]">{isMinimized ? "□" : "□"}</span>
          </button>
        </div>
      </header>

      {/* Terminal Content Area */}
      <main className="flex-1 p-6 overflow-y-auto font-mono text-sm md:text-base selection:bg-[#0df20d]/30 selection:text-[#0df20d] terminal-scroll">
        {/* ASCII Art Section */}
        <div
          className="text-[#00f2ff] mb-8 ascii-art font-bold text-center sm:text-left overflow-x-hidden"
          data-testid="terminal-ascii-art"
        >
          <pre className="inline-block text-xs sm:text-sm md:text-base">
            {asciiArt}
          </pre>
        </div>

        {/* Log Output Section */}
        <div className="space-y-1.5 mb-8" data-testid="terminal-logs">
          {logs.map((log, index) => (
            <div
              key={`${log.timestamp}-${index}`}
              className="flex flex-wrap gap-2 terminal-line"
              data-testid={`terminal-log-line-${index}`}
            >
              <span className="timestamp">{log.timestamp}</span>
              <span className={`${getStatusClass(log.status)} font-bold`}>
                [{getStatusLabel(log.status)}]
              </span>
              <span className="text-slate-300">{log.message}</span>
            </div>
          ))}
          <div ref={logsEndRef} />
        </div>

        {/* Interactive Prompt */}
        <div className="flex items-center gap-2 group">
          <span className="text-[#0df20d] font-bold">$</span>
          <span className="text-[#00f2ff] font-medium">portfolio</span>
          <span className="text-slate-100">init</span>
          <span className="terminal-cursor" />
        </div>
      </main>

      {/* Terminal Footer/Status Bar */}
      <footer className="bg-[#111] px-4 py-2 border-t border-[#0df20d]/10 flex justify-between items-center text-[10px] uppercase tracking-widest text-slate-500 font-bold shrink-0">
        <div className="flex gap-4">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#0df20d] shadow-[0_0_5px_#0df20d]" />
            CONNECTED
          </div>
          <div>UTF-8</div>
        </div>
        <div className="flex gap-4">
          <div>MAIN.PY</div>
          <div className="text-[#0df20d]">LN 42, COL 18</div>
        </div>
      </footer>
    </div>
  );
}

export default Terminal;
