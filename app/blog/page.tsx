"use client";

import { useMemo, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { BlogCard } from "@/components/cards";
import { blogPosts, categories, BlogCategory } from "@/data/blog";
import { FileText } from "lucide-react";

// Separate component for the search params logic to allow Suspense boundary
function BlogPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Parse selected categories from URL
  const selectedCategories = useMemo(() => {
    const cats = searchParams.get("categories");
    if (!cats) return [];
    return cats.split(",").filter((c): c is BlogCategory =>
      categories.includes(c as BlogCategory)
    );
  }, [searchParams]);

  // Check if URL had invalid categories (to show empty state)
  const hasInvalidCategories = useMemo(() => {
    const cats = searchParams.get("categories");
    if (!cats) return false;
    const parsedCats = cats.split(",");
    // If categories param exists but none are valid, it's invalid
    return parsedCats.length > 0 && selectedCategories.length === 0;
  }, [searchParams, selectedCategories]);

  // Update URL when categories change
  const updateCategories = useCallback(
    (newCategories: BlogCategory[]) => {
      const params = new URLSearchParams(searchParams.toString());
      if (newCategories.length === 0) {
        params.delete("categories");
      } else {
        params.set("categories", newCategories.join(","));
      }
      router.replace(`/blog?${params.toString()}`, { scroll: false });
    },
    [searchParams, router]
  );

  // Toggle category selection
  const toggleCategory = useCallback(
    (category: BlogCategory) => {
      const newCategories = selectedCategories.includes(category)
        ? selectedCategories.filter((c) => c !== category)
        : [...selectedCategories, category];
      updateCategories(newCategories);
    },
    [selectedCategories, updateCategories]
  );

  // Filter posts based on selected categories
  const filteredPosts = useMemo(() => {
    if (hasInvalidCategories) return [];
    if (selectedCategories.length === 0) return blogPosts;
    return blogPosts.filter((post) =>
      selectedCategories.includes(post.category)
    );
  }, [selectedCategories, hasInvalidCategories]);

  // Check if all posts selected
  const isAllSelected = selectedCategories.length === 0;

  // Select all posts
  const selectAll = useCallback(() => {
    updateCategories([]);
  }, [updateCategories]);

  return (
    <>
      {/* Hero Section */}
      <section className="mb-16 text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-6">
          <span className="size-2 rounded-full bg-primary animate-pulse"></span>
          Blog &amp; Insights
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight text-slate-900 dark:text-slate-100">
          Writing
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
          Deep dives into software engineering, artificial intelligence, and the
          tools that power the modern web. From CI/CD optimization to LLM
          orchestration.
        </p>
      </section>

      {/* Category Filters */}
      <section className="mb-12" data-testid="category-filters">
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={selectAll}
            className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
              isAllSelected
                ? "bg-primary text-background-dark shadow-lg shadow-primary/20"
                : "bg-slate-200 dark:bg-slate-800 hover:bg-primary/20 hover:text-primary text-slate-700 dark:text-slate-300"
            }`}
            data-testid="filter-all"
            aria-pressed={isAllSelected}
          >
            All Posts
          </button>
          {categories.map((category) => {
            const isSelected = selectedCategories.includes(category);
            return (
              <button
                key={category}
                onClick={() => toggleCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  isSelected
                    ? "bg-primary text-background-dark shadow-lg shadow-primary/20"
                    : "bg-slate-200 dark:bg-slate-800 hover:bg-primary/20 hover:text-primary text-slate-700 dark:text-slate-300"
                }`}
                data-testid={`filter-${category.toLowerCase()}`}
                aria-pressed={isSelected}
              >
                {category}
              </button>
            );
          })}
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section data-testid="blog-posts-grid">
        {filteredPosts.length === 0 ? (
          /* Empty State */
          <div
            className="flex flex-col items-center justify-center py-20 text-center"
            data-testid="empty-state"
          >
            <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
              No posts yet
            </h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-md">
              There are no blog posts in the selected categories. Try selecting
              different categories or view all posts.
            </p>
            <button
              onClick={selectAll}
              className="mt-6 px-6 py-2 rounded-lg bg-primary text-background-dark font-semibold hover:bg-primary/90 transition-colors"
            >
              View All Posts
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <BlogCard
                key={post.id}
                title={post.title}
                summary={post.excerpt}
                category={post.category}
                date={post.date}
                slug={`/blog/${post.slug}`}
              />
            ))}
          </div>
        )}
      </section>

      {/* Load More Button - shown when posts exist */}
      {filteredPosts.length > 0 && (
        <div className="mt-16 flex justify-center">
          <button className="px-8 py-3 rounded-lg border border-slate-200 dark:border-slate-800 font-bold hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300">
            Load More Articles
          </button>
        </div>
      )}
    </>
  );
}

// Loading fallback for Suspense
function BlogPageLoading() {
  return (
    <div className="animate-pulse">
      <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded mb-6"></div>
      <div className="h-16 w-64 bg-slate-200 dark:bg-slate-800 rounded mb-6"></div>
      <div className="h-6 w-96 bg-slate-200 dark:bg-slate-800 rounded mb-12"></div>
      <div className="flex gap-3 mb-12">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-10 w-24 bg-slate-200 dark:bg-slate-800 rounded-full"
          ></div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-80 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
        ))}
      </div>
    </div>
  );
}

export default function BlogPage() {
  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Suspense fallback={<BlogPageLoading />}>
        <BlogPageContent />
      </Suspense>
    </div>
  );
}
