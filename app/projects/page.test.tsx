import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ProjectsContent } from './ProjectsContent';

// Mock next/navigation
const mockReplace = vi.fn();
const mockUseSearchParams = vi.fn();
const mockUsePathname = vi.fn();
const mockUseRouter = vi.fn();

vi.mock('next/navigation', () => ({
  useSearchParams: () => mockUseSearchParams(),
  usePathname: () => mockUsePathname(),
  useRouter: () => mockUseRouter(),
}));

describe('ProjectsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUsePathname.mockReturnValue('/projects');
    mockUseRouter.mockReturnValue({ replace: mockReplace });
  });

  describe('Search Filtering', () => {
    it('renders search input', () => {
      mockUseSearchParams.mockReturnValue(new URLSearchParams());
      render(<ProjectsContent />);
      
      expect(screen.getByTestId('project-search')).toBeInTheDocument();
    });

    it('filters projects by title when typing in search', async () => {
      mockUseSearchParams.mockReturnValue(new URLSearchParams());
      render(<ProjectsContent />);
      
      const searchInput = screen.getByTestId('project-search');
      fireEvent.change(searchInput, { target: { value: 'Mission Control' } });
      
      await waitFor(() => {
        expect(screen.getByText('Mission Control')).toBeInTheDocument();
      });
      
      // Should not show other projects
      expect(screen.queryByText('Setfarm')).not.toBeInTheDocument();
    });

    it('filters projects by description when typing in search', async () => {
      mockUseSearchParams.mockReturnValue(new URLSearchParams());
      render(<ProjectsContent />);
      
      const searchInput = screen.getByTestId('project-search');
      fireEvent.change(searchInput, { target: { value: 'pomodoro' } });
      
      await waitFor(() => {
        expect(screen.getByText('Pomodoro Timer')).toBeInTheDocument();
      });
    });

    it('updates URL when search query changes', async () => {
      mockUseSearchParams.mockReturnValue(new URLSearchParams());
      render(<ProjectsContent />);
      
      const searchInput = screen.getByTestId('project-search');
      fireEvent.change(searchInput, { target: { value: 'test query' } });
      
      await waitFor(() => {
        expect(mockReplace).toHaveBeenCalledWith('/projects?search=test+query', { scroll: false });
      });
    });

    it('initializes search from URL params', () => {
      mockUseSearchParams.mockReturnValue(new URLSearchParams('search=initial'));
      render(<ProjectsContent />);
      
      const searchInput = screen.getByTestId('project-search') as HTMLInputElement;
      expect(searchInput.value).toBe('initial');
    });
  });

  describe('Status Filter', () => {
    it('renders all status filter buttons', () => {
      mockUseSearchParams.mockReturnValue(new URLSearchParams());
      render(<ProjectsContent />);
      
      expect(screen.getByTestId('status-filter-all')).toBeInTheDocument();
      expect(screen.getByTestId('status-filter-shipped')).toBeInTheDocument();
      expect(screen.getByTestId('status-filter-in-progress')).toBeInTheDocument();
      expect(screen.getByTestId('status-filter-archived')).toBeInTheDocument();
    });

    it('highlights active status filter', () => {
      mockUseSearchParams.mockReturnValue(new URLSearchParams());
      render(<ProjectsContent />);
      
      const allButton = screen.getByTestId('status-filter-all');
      expect(allButton.className).toContain('bg-white');
    });

    it('filters projects by status when clicking status button', async () => {
      mockUseSearchParams.mockReturnValue(new URLSearchParams());
      render(<ProjectsContent />);
      
      const shippedButton = screen.getByTestId('status-filter-shipped');
      fireEvent.click(shippedButton);
      
      await waitFor(() => {
        expect(mockReplace).toHaveBeenCalledWith('/projects?status=shipped', { scroll: false });
      });
    });

    it('updates URL when status filter changes', async () => {
      mockUseSearchParams.mockReturnValue(new URLSearchParams());
      render(<ProjectsContent />);
      
      const inProgressButton = screen.getByTestId('status-filter-in-progress');
      fireEvent.click(inProgressButton);
      
      await waitFor(() => {
        expect(mockReplace).toHaveBeenCalledWith('/projects?status=in-progress', { scroll: false });
      });
    });

    it('initializes status from URL params', () => {
      mockUseSearchParams.mockReturnValue(new URLSearchParams('status=shipped'));
      render(<ProjectsContent />);
      
      const shippedButton = screen.getByTestId('status-filter-shipped');
      expect(shippedButton.className).toContain('bg-white');
    });
  });

  describe('Tag Filter', () => {
    it('renders tag filter buttons', () => {
      mockUseSearchParams.mockReturnValue(new URLSearchParams());
      render(<ProjectsContent />);
      
      expect(screen.getByTestId('tag-filters')).toBeInTheDocument();
    });

    it('allows multiple tag selection', async () => {
      mockUseSearchParams.mockReturnValue(new URLSearchParams());
      render(<ProjectsContent />);
      
      // Click on React tag
      const reactTag = screen.getByTestId('tag-filter-react');
      fireEvent.click(reactTag);
      
      await waitFor(() => {
        expect(mockReplace).toHaveBeenCalledWith('/projects?tags=React', { scroll: false });
      });
    });

    it('toggles tag selection on click', async () => {
      mockUseSearchParams.mockReturnValue(new URLSearchParams('tags=React'));
      render(<ProjectsContent />);
      
      const reactTag = screen.getByTestId('tag-filter-react');
      fireEvent.click(reactTag);
      
      await waitFor(() => {
        expect(mockReplace).toHaveBeenCalledWith('/projects', { scroll: false });
      });
    });

    it('updates URL with multiple tags', async () => {
      mockUseSearchParams.mockReturnValue(new URLSearchParams('tags=React'));
      render(<ProjectsContent />);
      
      // Find and click another tag
      const typescriptTag = screen.getByTestId('tag-filter-typescript');
      fireEvent.click(typescriptTag);
      
      await waitFor(() => {
        expect(mockReplace).toHaveBeenCalledWith('/projects?tags=React%2CTypeScript', { scroll: false });
      });
    });

    it('initializes tags from URL params', () => {
      mockUseSearchParams.mockReturnValue(new URLSearchParams('tags=React,Next.js'));
      render(<ProjectsContent />);
      
      // Tags should be visually selected
      const reactTag = screen.getByTestId('tag-filter-react');
      expect(reactTag.className).toContain('bg-primary/10');
    });
  });

  describe('Filter Combinations', () => {
    it('combines search and status filters in URL', async () => {
      mockUseSearchParams.mockReturnValue(new URLSearchParams());
      render(<ProjectsContent />);
      
      const searchInput = screen.getByTestId('project-search');
      fireEvent.change(searchInput, { target: { value: 'test' } });
      
      const shippedButton = screen.getByTestId('status-filter-shipped');
      fireEvent.click(shippedButton);
      
      await waitFor(() => {
        expect(mockReplace).toHaveBeenCalledWith('/projects?search=test&status=shipped', { scroll: false });
      });
    });

    it('combines all filters in URL', async () => {
      mockUseSearchParams.mockReturnValue(new URLSearchParams());
      render(<ProjectsContent />);
      
      const searchInput = screen.getByTestId('project-search');
      fireEvent.change(searchInput, { target: { value: 'test' } });
      
      const shippedButton = screen.getByTestId('status-filter-shipped');
      fireEvent.click(shippedButton);
      
      const reactTag = screen.getByTestId('tag-filter-react');
      fireEvent.click(reactTag);
      
      await waitFor(() => {
        expect(mockReplace).toHaveBeenCalledWith(
          expect.stringContaining('search=test'),
          { scroll: false }
        );
        expect(mockReplace).toHaveBeenCalledWith(
          expect.stringContaining('status=shipped'),
          { scroll: false }
        );
        expect(mockReplace).toHaveBeenCalledWith(
          expect.stringContaining('tags=React'),
          { scroll: false }
        );
      });
    });
  });

  describe('Empty State', () => {
    it('shows empty state when no projects match filters', async () => {
      mockUseSearchParams.mockReturnValue(new URLSearchParams());
      render(<ProjectsContent />);
      
      const searchInput = screen.getByTestId('project-search');
      fireEvent.change(searchInput, { target: { value: 'nonexistent project xyz' } });
      
      await waitFor(() => {
        expect(screen.getByTestId('empty-state')).toBeInTheDocument();
      });
      
      expect(screen.getByText('No projects found')).toBeInTheDocument();
    });

    it('shows clear filters button in empty state', async () => {
      mockUseSearchParams.mockReturnValue(new URLSearchParams());
      render(<ProjectsContent />);
      
      const searchInput = screen.getByTestId('project-search');
      fireEvent.change(searchInput, { target: { value: 'nonexistent' } });
      
      await waitFor(() => {
        expect(screen.getByTestId('clear-filters-btn')).toBeInTheDocument();
      });
    });

    it('clears filters when clicking clear button in empty state', async () => {
      mockUseSearchParams.mockReturnValue(new URLSearchParams('search=test&status=shipped'));
      render(<ProjectsContent />);
      
      const searchInput = screen.getByTestId('project-search');
      fireEvent.change(searchInput, { target: { value: 'nonexistent xyz abc' } });
      
      await waitFor(() => {
        expect(screen.getByTestId('clear-filters-btn')).toBeInTheDocument();
      });
      
      const clearButton = screen.getByTestId('clear-filters-btn');
      fireEvent.click(clearButton);
      
      await waitFor(() => {
        expect(mockReplace).toHaveBeenCalledWith('/projects', { scroll: false });
      });
    });
  });

  describe('Projects Grid', () => {
    it('renders all 10 projects when no filters applied', () => {
      mockUseSearchParams.mockReturnValue(new URLSearchParams());
      render(<ProjectsContent />);
      
      const projectsGrid = screen.getByTestId('projects-grid');
      expect(projectsGrid.children).toHaveLength(10);
    });

    it('displays project title, description, and tags', () => {
      mockUseSearchParams.mockReturnValue(new URLSearchParams());
      render(<ProjectsContent />);
      
      expect(screen.getByText('Mission Control')).toBeInTheDocument();
      expect(screen.getByText('Setfarm')).toBeInTheDocument();
    });
  });

  describe('Page Heading', () => {
    it('displays page heading as "Projects"', () => {
      mockUseSearchParams.mockReturnValue(new URLSearchParams());
      render(<ProjectsContent />);
      
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading.textContent).toBe('Projects');
    });
  });

  describe('Clear Filters', () => {
    it('shows clear filters link when filters are active', () => {
      mockUseSearchParams.mockReturnValue(new URLSearchParams('search=test'));
      render(<ProjectsContent />);
      
      expect(screen.getByTestId('clear-filters')).toBeInTheDocument();
    });

    it('does not show clear filters link when no filters active', () => {
      mockUseSearchParams.mockReturnValue(new URLSearchParams());
      render(<ProjectsContent />);
      
      expect(screen.queryByTestId('clear-filters')).not.toBeInTheDocument();
    });

    it('clears all filters when clicking clear link', async () => {
      mockUseSearchParams.mockReturnValue(new URLSearchParams('search=test&status=shipped&tags=React'));
      render(<ProjectsContent />);
      
      const clearLink = screen.getByTestId('clear-filters');
      fireEvent.click(clearLink);
      
      await waitFor(() => {
        expect(mockReplace).toHaveBeenCalledWith('/projects', { scroll: false });
      });
    });
  });
});
