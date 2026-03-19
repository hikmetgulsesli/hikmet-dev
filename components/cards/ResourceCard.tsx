"use client";

import { Card, CardContent } from "@/components/ui/Card";
import { LucideIcon } from "lucide-react";

export interface ResourceCardProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  progress?: number;
  lastActivity: string;
}

export function ResourceCard({
  title,
  description,
  icon: Icon,
  progress,
  lastActivity,
}: ResourceCardProps) {
  return (
    <Card className="group bg-primary/5 border-primary/10 hover:border-primary/40 transition-all p-5">
      <div className="flex justify-between items-start mb-4">
        {Icon && (
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
          {lastActivity}
        </span>
      </div>
      <h4 className="text-slate-100 font-semibold mb-2 group-hover:text-primary transition-colors">
        {title}
      </h4>
      <p className="text-slate-400 text-sm mb-4 leading-relaxed">{description}</p>
      {progress !== undefined && (
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-slate-500">Progress</span>
            <span className="text-primary font-bold">{progress}%</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-primary h-full rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </Card>
  );
}
