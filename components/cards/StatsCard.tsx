"use client";

import { Card } from "@/components/ui/Card";
import { Bot, Globe, GitBranch, type LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Bot,
  Globe,
  GitBranch,
};

export interface StatsCardProps {
  iconName: string;
  value: string | number;
  label: string;
}

export function StatsCard({ iconName, value, label }: StatsCardProps) {
  const Icon = iconMap[iconName];
  
  if (!Icon) return null;

  return (
    <Card className="flex flex-col gap-1 rounded-xl p-5 border-slate-800 bg-slate-900/40 backdrop-blur-sm group hover:border-primary/50 transition-colors">
      <Icon className="w-5 h-5 text-primary mb-1" />
      <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
        {label}
      </p>
      <p className="text-white text-2xl font-bold">{value}</p>
    </Card>
  );
}
