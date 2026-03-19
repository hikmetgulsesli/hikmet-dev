"use client";

import { Card } from "@/components/ui/Card";
import { Star, GitFork, Code2, Database, Terminal, Layout } from "lucide-react";

export interface RepoCardProps {
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  lastActivity: string;
  url?: string;
}

const languageIcons: Record<string, React.ReactNode> = {
  TypeScript: <Code2 className="w-5 h-5 text-primary" />,
  JavaScript: <Code2 className="w-5 h-5 text-yellow-400" />,
  Python: <Layout className="w-5 h-5 text-blue-400" />,
  Node: <Terminal className="w-5 h-5 text-green-400" />,
  "Node.js": <Terminal className="w-5 h-5 text-green-400" />,
  Rust: <Database className="w-5 h-5 text-orange-400" />,
  Go: <Code2 className="w-5 h-5 text-cyan-400" />,
  default: <Code2 className="w-5 h-5 text-primary" />,
};

const formatNumber = (num: number): string => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "k";
  }
  return num.toString();
};

export function RepoCard({
  name,
  description,
  language,
  stars,
  forks,
  lastActivity,
  url = "#",
}: RepoCardProps) {
  const icon = languageIcons[language] || languageIcons.default;

  return (
    <Card className="group bg-transparent border-primary/10 hover:bg-primary/5 transition-all p-5">
      <div className="flex items-center gap-3 mb-3">
        {icon}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-900 dark:text-slate-100 font-bold hover:text-primary transition-colors"
        >
          {name}
        </a>
      </div>
      <p className="text-slate-400 dark:text-slate-400 text-xs mb-4 line-clamp-2">{description}</p>
      <div className="flex items-center justify-between mt-auto">
        <div className="flex gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1 text-slate-400 dark:text-slate-400">
            <Star className="w-3.5 h-3.5" />
            {formatNumber(stars)}
          </div>
          <div className="flex items-center gap-1 text-slate-400 dark:text-slate-400">
            <GitFork className="w-3.5 h-3.5" />
            {formatNumber(forks)}
          </div>
        </div>
        <span className="text-[10px] text-primary/80 bg-primary/10 px-2 py-0.5 rounded">
          {lastActivity}
        </span>
      </div>
    </Card>
  );
}
