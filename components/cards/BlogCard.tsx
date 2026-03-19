"use client";

import { Card, CardContent } from "@/components/ui/Card";
import { ArrowRight, Calendar } from "lucide-react";

export interface BlogCardProps {
  title: string;
  summary: string;
  category: string;
  date: string;
  imageUrl?: string;
  slug?: string;
}

export function BlogCard({
  title,
  summary,
  category,
  date,
  imageUrl,
  slug = "#",
}: BlogCardProps) {
  const formattedDate = new Date(date).toISOString().split("T")[0];

  return (
    <Card className="group flex flex-col overflow-hidden hover:border-primary/50 transition-all duration-300">
      {imageUrl && (
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      <CardContent className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-4">
          <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-primary/20 text-primary uppercase">
            {category}
          </span>
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs">
            <Calendar className="w-3.5 h-3.5" />
            <span>{formattedDate}</span>
          </div>
        </div>
        <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-primary transition-colors leading-tight">
          {title}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 line-clamp-3 leading-relaxed">
          {summary}
        </p>
        <div className="mt-auto">
          <a
            href={slug}
            className="inline-flex items-center gap-2 text-primary text-sm font-bold hover:gap-3 transition-all"
          >
            Read more
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
