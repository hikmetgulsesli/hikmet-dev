"use client";

import { Card, CardContent } from "@/components/ui/Card";
import { Code, ArrowRight, Star, GitFork } from "lucide-react";

export type ProjectStatus = "shipped" | "in-progress" | "archived";

export interface ProjectCardProps {
  title: string;
  description: string;
  status: ProjectStatus;
  year: number;
  tags: string[];
  starCount?: number;
  forkCount?: number;
  liveUrl?: string;
  sourceUrl?: string;
  featured?: boolean;
  imageUrl?: string;
}

const statusConfig: Record<ProjectStatus, { label: string; classes: string }> = {
  shipped: {
    label: "Shipped",
    classes: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  },
  "in-progress": {
    label: "In Progress",
    classes: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  },
  archived: {
    label: "Archived",
    classes: "bg-slate-500/20 text-slate-400 border-slate-500/30",
  },
};

export function ProjectCard({
  title,
  description,
  status,
  year,
  tags,
  starCount,
  forkCount,
  liveUrl,
  sourceUrl,
  featured = false,
  imageUrl,
}: ProjectCardProps) {
  const statusStyle = statusConfig[status];
  const displayTags = tags.slice(0, 5);

  return (
    <Card className="group flex flex-col overflow-hidden hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5 transition-all">
      {imageUrl && (
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent z-10" />
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-4 right-4 z-20 flex gap-2">
            {featured && (
              <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-tighter bg-primary/20 text-primary border border-primary/30 rounded backdrop-blur-md">
                Featured
              </span>
            )}
            <span
              className={`px-2 py-1 text-[10px] font-bold uppercase tracking-tighter border rounded backdrop-blur-md ${statusStyle.classes}`}
            >
              {statusStyle.label}
            </span>
          </div>
          <div className="absolute bottom-4 left-4 z-20">
            <span className="text-xs text-white/80 font-medium">{year}</span>
          </div>
        </div>
      )}
      {!imageUrl && (
        <div className="relative h-12 bg-gradient-to-r from-primary/10 to-primary/5 flex items-center justify-between px-4">
          <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">{year}</span>
          <div className="flex gap-2">
            {featured && (
              <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-tighter bg-primary/20 text-primary border border-primary/30 rounded backdrop-blur-md">
                Featured
              </span>
            )}
            <span
              className={`px-2 py-1 text-[10px] font-bold uppercase tracking-tighter border rounded backdrop-blur-md ${statusStyle.classes}`}
            >
              {statusStyle.label}
            </span>
          </div>
        </div>
      )}
      <CardContent className="p-5 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {displayTags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100 dark:border-primary/10">
          <div className="flex items-center gap-4">
            {starCount !== undefined && (
              <div className="flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-400">
                <Star className="w-3.5 h-3.5" />
                <span>{starCount}</span>
              </div>
            )}
            {forkCount !== undefined && (
              <div className="flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-400">
                <GitFork className="w-3.5 h-3.5" />
                <span>{forkCount}</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
            {sourceUrl && (
              <a
                href={sourceUrl}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-primary transition-colors"
              >
                <Code className="w-3.5 h-3.5" /> GitHub
              </a>
            )}
            {liveUrl ? (
              <a
                href={liveUrl}
                className="flex items-center gap-1.5 text-xs font-bold text-primary group/link"
              >
                Live Demo{" "}
                <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
              </a>
            ) : status === "archived" ? (
              <span className="text-xs text-slate-500 italic">Project Retired</span>
            ) : null}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
