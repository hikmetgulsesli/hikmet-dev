'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { projects, Project, ProjectStatus } from '@/data/projects';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Github, ArrowRight, Star, GitFork } from 'lucide-react';

const statusFilters: { value: ProjectStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'archived', label: 'Archived' },
];

// Extract all unique tags from projects
const allTags = Array.from(
  new Set(projects.flatMap((project) => project.tags))
).sort();

// Status badge colors
const statusColors: Record<ProjectStatus, string> = {
  shipped: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  'in-progress': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  archived: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
};

// Status labels in Turkish
const statusLabels: Record<ProjectStatus, string> = {
  shipped: 'Shipped',
  'in-progress': 'In Progress',
  archived: 'Archived',
};

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group flex flex-col bg-white dark:bg-primary/5 border border-slate-200 dark:border-primary/10 rounded-xl overflow-hidden hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5 transition-all">
      {/* Card Image Placeholder with Gradient */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent z-10" />
        
        {/* Status Badge */}
        <div className="absolute top-4 right-4 z-20">
          <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-tighter border rounded backdrop-blur-md ${statusColors[project.status]}`}>
            {statusLabels[project.status]}
          </span>
        </div>

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 left-4 z-20">
            <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-tighter bg-primary/20 text-primary border border-primary/30 rounded backdrop-blur-md">
              Featured
            </span>
          </div>
        )}

        {/* Project Icon/Initial */}
        <div className="absolute inset-0 flex items-center justify-center z-0">
          <span className="text-6xl font-bold text-slate-700 dark:text-slate-600">
            {project.title.charAt(0)}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">{project.title}</h3>
          <span className="text-xs text-slate-500">{project.year}</span>
        </div>
        
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="text-[10px] font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
              +{project.tags.length - 3}
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 mb-4 text-xs text-slate-500">
          {project.stars !== undefined && (
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5" />
              <span>{project.stars}</span>
            </div>
          )}
          {project.forks !== undefined && (
            <div className="flex items-center gap-1">
              <GitFork className="h-3.5 w-3.5" />
              <span>{project.forks}</span>
            </div>
          )}
        </div>

        {/* Footer Links */}
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100 dark:border-primary/10">
          {project.sourceUrl ? (
            <a
              href={project.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-primary transition-colors"
            >
              <Github className="h-3.5 w-3.5" />
              GitHub
            </a>
          ) : (
            <span className="text-xs text-slate-500 italic">Source Private</span>
          )}
          
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-bold text-primary group/link"
            >
              Live Demo
              <ArrowRight className="h-3.5 w-3.5 group-hover/link:translate-x-1 transition-transform" />
            </a>
          ) : project.status === 'archived' ? (
            <span className="text-xs text-slate-500 italic">Project Retired</span>
          ) : (
            <span className="text-xs text-slate-500 italic">Coming Soon</span>
          )}
        </div>
      </div>
    </div>
  );
}

export function ProjectsContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize state from URL params
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [activeStatus, setActiveStatus] = useState<ProjectStatus | 'all'>(
    (searchParams.get('status') as ProjectStatus | 'all') || 'all'
  );
  const [selectedTags, setSelectedTags] = useState<string[]>(
    searchParams.get('tags')?.split(',').filter(Boolean) || []
  );

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (searchQuery) {
      params.set('search', searchQuery);
    }
    if (activeStatus !== 'all') {
      params.set('status', activeStatus);
    }
    if (selectedTags.length > 0) {
      params.set('tags', selectedTags.join(','));
    }

    const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.replace(newUrl, { scroll: false });
  }, [searchQuery, activeStatus, selectedTags, pathname, router]);

  // Filter projects based on search, status, and tags
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Search filter (title and description)
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        searchQuery === '' ||
        project.title.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower) ||
        project.tags.some((tag) => tag.toLowerCase().includes(searchLower));

      // Status filter
      const matchesStatus =
        activeStatus === 'all' || project.status === activeStatus;

      // Tag filter (multi-select - intersection logic)
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every((tag) => project.tags.includes(tag));

      return matchesSearch && matchesStatus && matchesTags;
    });
  }, [searchQuery, activeStatus, selectedTags]);

  // Handle tag toggle
  const toggleTag = useCallback((tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  }, []);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setActiveStatus('all');
    setSelectedTags([]);
  }, []);

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-2">
            Projects
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
            Manage and monitor your software engineering portfolio. Track progress, status, and technology stacks across all active and archived repositories.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="space-y-6 mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
              <Input
                type="text"
                placeholder="Search projects by name, tech or status..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-primary/5 border-slate-200 dark:border-primary/10 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all dark:text-white"
                data-testid="project-search"
              />
            </div>

            {/* Status Tabs */}
            <div className="flex items-center p-1 bg-slate-100 dark:bg-primary/5 rounded-xl border border-slate-200 dark:border-primary/10">
              {statusFilters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setActiveStatus(filter.value)}
                  className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all ${
                    activeStatus === filter.value
                      ? 'bg-white dark:bg-primary text-slate-900 dark:text-background-dark shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  data-testid={`status-filter-${filter.value}`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tag Chips */}
          <div className="flex flex-wrap gap-2" data-testid="tag-filters">
            {allTags.map((tag) => {
              const isSelected = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 text-xs font-bold uppercase tracking-wider border rounded-full cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-primary/10 text-primary border-primary/20 hover:bg-primary/20'
                      : 'bg-slate-100 dark:bg-primary/5 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-primary/10 hover:border-primary/40'
                  }`}
                  data-testid={`tag-filter-${tag.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {tag}
                </button>
              );
            })}
          </div>

          {/* Active Filters Summary */}
          {(searchQuery || activeStatus !== 'all' || selectedTags.length > 0) && (
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <span>Active filters:</span>
              {searchQuery && (
                <Badge variant="secondary" className="text-xs">
                  Search: &quot;{searchQuery}&quot;
                </Badge>
              )}
              {activeStatus !== 'all' && (
                <Badge variant="secondary" className="text-xs">
                  Status: {statusLabels[activeStatus]}
                </Badge>
              )}
              {selectedTags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              <button
                onClick={clearFilters}
                className="text-xs text-primary hover:underline ml-2"
                data-testid="clear-filters"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Project Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="projects-grid">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-slate-200 dark:border-primary/20 rounded-xl" data-testid="empty-state">
            <div className="h-16 w-16 rounded-full bg-slate-100 dark:bg-primary/10 flex items-center justify-center text-slate-400 dark:text-primary mb-4">
              <Search className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              No projects found
            </h3>
            <p className="text-sm text-slate-500 text-center max-w-md mb-4">
              No projects match your current filters. Try adjusting your search query, status filter, or selected tags.
            </p>
            <Button onClick={clearFilters} variant="outline" data-testid="clear-filters-btn">
              Clear all filters
            </Button>
          </div>
        )}

        {/* Results count */}
        <div className="mt-8 text-sm text-slate-500 dark:text-slate-400">
          Showing {filteredProjects.length} of {projects.length} projects
        </div>
      </div>
    </div>
  );
}
