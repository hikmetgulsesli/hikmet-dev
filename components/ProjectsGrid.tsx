"use client";

import { useState, useMemo } from "react";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { projects, ProjectStatus } from "@/data/projects";

const filterTabs = [
  { id: "all", label: "All" },
  { id: "shipped", label: "Shipped" },
  { id: "in-progress", label: "In Progress" },
  { id: "archived", label: "Archived" },
] as const;

type FilterTabId = (typeof filterTabs)[number]["id"];

export function ProjectsGrid() {
  const [activeFilter, setActiveFilter] = useState<FilterTabId>("all");

  const filteredProjects = useMemo(() => {
    let result = [...projects];
    
    // Sort featured projects first
    result.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });

    // Apply status filter
    if (activeFilter !== "all") {
      result = result.filter((project) => project.status === activeFilter);
    }

    return result;
  }, [activeFilter]);

  return (
    <section className="w-full">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
          Projects and Open Source
        </h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
          A collection of my work — shipped products, ongoing experiments, and archived experiments.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center p-1 bg-slate-100 dark:bg-primary/5 rounded-xl border border-slate-200 dark:border-primary/10 w-fit mb-10">
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id)}
            className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all ${
              activeFilter === tab.id
                ? "bg-white dark:bg-primary text-slate-900 dark:text-background-dark shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
            aria-pressed={activeFilter === tab.id}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            description={project.description}
            status={project.status}
            year={project.year}
            tags={project.tags}
            starCount={project.stars}
            forkCount={project.forks}
            liveUrl={project.liveUrl}
            sourceUrl={project.sourceUrl}
            featured={project.featured}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-16">
          <p className="text-slate-500 dark:text-slate-400">
            No projects found in this category.
          </p>
        </div>
      )}
    </section>
  );
}
