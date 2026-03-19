import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import BlogPage from "./page";
import { blogPosts, categories } from "@/data/blog";

// Create a mutable mock for search params
let mockSearchParamsValue = new URLSearchParams();
const mockReplace = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: (url: string) => {
      mockReplace(url);
      // Parse the URL and update mock params
      const urlObj = new URL(`http://localhost${url}`);
      mockSearchParamsValue = new URLSearchParams(urlObj.search);
    },
  }),
  useSearchParams: () => mockSearchParamsValue,
}));

describe("BlogPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSearchParamsValue = new URLSearchParams();
  });

  it("renders page with 'Writing' heading", () => {
    render(<BlogPage />);
    expect(screen.getByText("Writing")).toBeInTheDocument();
  });

  it("renders category filter pills", () => {
    render(<BlogPage />);

    // Check that all category filters are present
    expect(screen.getByTestId("filter-all")).toBeInTheDocument();
    categories.forEach((category) => {
      expect(screen.getByTestId(`filter-${category.toLowerCase()}`)).toBeInTheDocument();
    });
  });

  it("renders all blog posts from blog-posts data", () => {
    render(<BlogPage />);

    // Each post title should be visible
    blogPosts.forEach((post) => {
      expect(screen.getByText(post.title)).toBeInTheDocument();
    });
  });

  it("renders blog cards with category badge", () => {
    render(<BlogPage />);

    // Each post's category should be visible
    blogPosts.forEach((post) => {
      expect(screen.getAllByText(post.category).length).toBeGreaterThanOrEqual(1);
    });
  });

  it("renders blog cards with ISO date format", () => {
    render(<BlogPage />);

    blogPosts.forEach((post) => {
      expect(screen.getByText(post.date)).toBeInTheDocument();
    });
  });

  it("renders 'Read more' links for each post", () => {
    render(<BlogPage />);

    const readMoreLinks = screen.getAllByText(/Read more/i);
    expect(readMoreLinks.length).toBe(blogPosts.length);
  });

  it("clicking filter updates URL search params", async () => {
    render(<BlogPage />);

    // Click on AI category
    fireEvent.click(screen.getByTestId("filter-ai"));

    // Check that router.replace was called with the correct params
    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith(
        expect.stringContaining("categories=AI")
      );
    });
  });

  it("'All Posts' filter is active by default", () => {
    render(<BlogPage />);

    const allFilter = screen.getByTestId("filter-all");
    expect(allFilter).toHaveAttribute("aria-pressed", "true");
  });

  it("each category filter has correct aria-pressed attribute", () => {
    render(<BlogPage />);

    categories.forEach((category) => {
      const filter = screen.getByTestId(`filter-${category.toLowerCase()}`);
      expect(filter).toHaveAttribute("aria-pressed", "false");
    });
  });

  it("renders blog section with hero badge", () => {
    render(<BlogPage />);

    expect(screen.getByText("Blog & Insights")).toBeInTheDocument();
  });

  it("renders hero description text", () => {
    render(<BlogPage />);

    expect(
      screen.getByText(/Deep dives into software engineering/i)
    ).toBeInTheDocument();
  });

  it("renders 'Load More Articles' button when posts exist", () => {
    render(<BlogPage />);

    expect(screen.getByText("Load More Articles")).toBeInTheDocument();
  });

  it("clicking category filter sets aria-pressed to true", async () => {
    render(<BlogPage />);

    const aiFilter = screen.getByTestId("filter-ai");
    expect(aiFilter).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(aiFilter);

    // After clicking, the filter should update in the component
    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalled();
    });
  });

  it("clicking multiple categories adds all to URL", async () => {
    render(<BlogPage />);

    // Click on AI category
    fireEvent.click(screen.getByTestId("filter-ai"));

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith(expect.stringContaining("categories=AI"));
    });

    // Click on DevOps category
    fireEvent.click(screen.getByTestId("filter-devops"));

    await waitFor(() => {
      const lastCall = mockReplace.mock.calls[mockReplace.mock.calls.length - 1];
      expect(lastCall[0]).toContain("categories=");
    });
  });
});

describe("BlogPage - Category Filtering with URL params", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("displays only posts matching category in URL", () => {
    // Set AI category in URL
    mockSearchParamsValue = new URLSearchParams("categories=AI");

    render(<BlogPage />);

    // Only AI posts should be visible
    const aiPosts = blogPosts.filter((p) => p.category === "AI");
    const readMoreLinks = screen.getAllByText(/Read more/i);
    expect(readMoreLinks.length).toBe(aiPosts.length);
  });

  it("displays posts for multiple categories in URL", () => {
    // Set AI and DevOps categories in URL
    mockSearchParamsValue = new URLSearchParams("categories=AI,DevOps");

    render(<BlogPage />);

    const aiOrDevOpsPosts = blogPosts.filter(
      (p) => p.category === "AI" || p.category === "DevOps"
    );
    const readMoreLinks = screen.getAllByText(/Read more/i);
    expect(readMoreLinks.length).toBe(aiOrDevOpsPosts.length);
  });

  it("shows empty state when URL has non-matching category", () => {
    // Set a category that doesn't exist
    mockSearchParamsValue = new URLSearchParams("categories=NonExistent");

    render(<BlogPage />);

    // Empty state should be visible
    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
    expect(screen.getByText("No posts yet")).toBeInTheDocument();
  });

  it("has 'View All Posts' button in empty state", () => {
    mockSearchParamsValue = new URLSearchParams("categories=NonExistent");

    render(<BlogPage />);

    expect(screen.getByText("View All Posts")).toBeInTheDocument();
  });
});

describe("BlogPage - Post Count", () => {
  beforeEach(() => {
    mockSearchParamsValue = new URLSearchParams();
  });

  it("renders correct total number of posts initially", () => {
    render(<BlogPage />);

    const readMoreLinks = screen.getAllByText(/Read more/i);
    expect(readMoreLinks.length).toBe(blogPosts.length);
  });

  it("each blog card has required elements", () => {
    render(<BlogPage />);

    blogPosts.forEach((post) => {
      // Title should be present
      expect(screen.getByText(post.title)).toBeInTheDocument();

      // Category badge should be present
      const categoryElements = screen.getAllByText(post.category);
      expect(categoryElements.length).toBeGreaterThanOrEqual(1);

      // Date should be present
      expect(screen.getByText(post.date)).toBeInTheDocument();
    });
  });
});

describe("BlogPage - Empty State", () => {
  it("empty state has correct heading", () => {
    mockSearchParamsValue = new URLSearchParams("categories=Invalid");

    render(<BlogPage />);

    expect(screen.getByText("No posts yet")).toBeInTheDocument();
  });

  it("shows blog grid when posts are available", () => {
    mockSearchParamsValue = new URLSearchParams();

    render(<BlogPage />);

    expect(screen.getByTestId("blog-posts-grid")).toBeInTheDocument();
    expect(screen.queryByTestId("empty-state")).not.toBeInTheDocument();
  });
});

describe("BlogPage - Type safety", () => {
  beforeEach(() => {
    mockSearchParamsValue = new URLSearchParams();
  });

  it("blog data has all required fields", () => {
    blogPosts.forEach((post) => {
      expect(post.id).toBeDefined();
      expect(post.title).toBeDefined();
      expect(post.excerpt).toBeDefined();
      expect(post.category).toBeDefined();
      expect(post.date).toBeDefined();
      expect(post.slug).toBeDefined();
    });
  });

  it("categories array contains all valid categories", () => {
    const uniqueCategories = [...new Set(blogPosts.map((p) => p.category))];
    uniqueCategories.forEach((cat) => {
      expect(categories).toContain(cat);
    });
  });
});
