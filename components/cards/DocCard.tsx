"use client";

import { Card } from "@/components/ui/Card";
import { Key, FileCode, Lock, CloudSync, LucideIcon } from "lucide-react";

export interface DocCardProps {
  title: string;
  description: string;
  icon: string;
  progress?: number;
  lastActivity?: string;
  link?: string;
}

const iconMap: Record<string, LucideIcon> = {
  api: Key,
  code_blocks: FileCode,
  security: Lock,
  cloud_sync: CloudSync,
};

export function DocCard({
  title,
  description,
  icon,
  progress,
  lastActivity,
  link = "#",
}: DocCardProps) {
  const IconComponent = iconMap[icon] || FileCode;

  return (
    <a href={link} className="block h-full">
    <Card className="group bg-primary/5 border-primary/10 hover:border-primary/40 transition-all p-5 h-full flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-primary/10 rounded-lg text-primary">
          <IconComponent className="w-5 h-5" />
        </div>
        {lastActivity && (
          <span className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold">
            {lastActivity}
          </span>
        )}
      </div>
      <h4 className="text-slate-900 dark:text-slate-100 font-semibold mb-2 group-hover:text-primary transition-colors">
        {title}
      </h4>
      <p className="text-slate-400 dark:text-slate-400 text-sm mb-4 leading-relaxed line-clamp-2">{description}</p>
      {progress !== undefined && (
        <div className="space-y-2 mt-auto">
          <div className="flex justify-between text-xs">
            <span className="text-slate-500 dark:text-slate-400">Progress</span>
            <span className="text-primary font-bold">{progress}%</span>
          </div>
          <div className="w-full bg-slate-800 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-primary h-full rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </Card>
    </a>
  );
}
