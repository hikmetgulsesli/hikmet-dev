import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import WorkbenchPage from './page';
import { docsCards, repoCards } from '@/data/resources';

describe('WorkbenchPage', () => {
  describe('Page Rendering', () => {
    it('renders page with heading "Developer Resources & APIs"', () => {
      render(<WorkbenchPage />);
      
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading.textContent).toBe('Developer Resources & APIs');
    });

    it('renders the workbench header section', () => {
      render(<WorkbenchPage />);
      
      expect(screen.getByTestId('workbench-header')).toBeInTheDocument();
    });

    it('renders subtitle text', () => {
      render(<WorkbenchPage />);
      
      expect(screen.getByText(/Uygulama geliştirmek için/i)).toBeInTheDocument();
    });
  });

  describe('Docs Cards', () => {
    it('renders docs section', () => {
      render(<WorkbenchPage />);
      
      expect(screen.getByTestId('docs-section')).toBeInTheDocument();
    });

    it('renders 4 docs cards', () => {
      render(<WorkbenchPage />);
      
      const docsGrid = screen.getByTestId('docs-grid');
      expect(docsGrid.children).toHaveLength(4);
    });

    it('renders all doc cards with correct titles', () => {
      render(<WorkbenchPage />);
      
      docsCards.forEach((card) => {
        expect(screen.getByText(card.title)).toBeInTheDocument();
      });
    });

    it('renders OpenClaw Documentation card', () => {
      render(<WorkbenchPage />);
      
      expect(screen.getByTestId('doc-card-openclaw-docs')).toBeInTheDocument();
      expect(screen.getByText('OpenClaw Documentation')).toBeInTheDocument();
    });

    it('renders Setfarm Guide card', () => {
      render(<WorkbenchPage />);
      
      expect(screen.getByTestId('doc-card-setfarm-guide')).toBeInTheDocument();
      expect(screen.getByText('Setfarm Guide')).toBeInTheDocument();
    });

    it('renders API Reference card', () => {
      render(<WorkbenchPage />);
      
      expect(screen.getByTestId('doc-card-api-reference')).toBeInTheDocument();
      expect(screen.getByText('API Reference')).toBeInTheDocument();
    });

    it('renders Community Docs card', () => {
      render(<WorkbenchPage />);
      
      expect(screen.getByTestId('doc-card-community-docs')).toBeInTheDocument();
      expect(screen.getByText('Community Docs')).toBeInTheDocument();
    });

    it('doc cards have functional links', () => {
      render(<WorkbenchPage />);
      
      docsCards.forEach((card) => {
        const link = screen.getByTestId(`doc-card-${card.id}`);
        expect(link.tagName).toBe('A');
        expect(link).toHaveAttribute('href', card.link);
      });
    });
  });

  describe('Repository Cards', () => {
    it('renders repos section', () => {
      render(<WorkbenchPage />);
      
      expect(screen.getByTestId('repos-section')).toBeInTheDocument();
    });

    it('renders 4 GitHub repo cards', () => {
      render(<WorkbenchPage />);
      
      const reposGrid = screen.getByTestId('repos-grid');
      expect(reposGrid.children).toHaveLength(4);
    });

    it('renders all repo cards with correct names', () => {
      render(<WorkbenchPage />);
      
      repoCards.forEach((repo) => {
        expect(screen.getByText(repo.name)).toBeInTheDocument();
      });
    });

    it('renders openclaw-core repo card', () => {
      render(<WorkbenchPage />);
      
      expect(screen.getByTestId('repo-card-openclaw-core')).toBeInTheDocument();
    });

    it('renders setfarm repo card', () => {
      render(<WorkbenchPage />);
      
      expect(screen.getByTestId('repo-card-setfarm')).toBeInTheDocument();
    });

    it('renders hikmet-dev repo card', () => {
      render(<WorkbenchPage />);
      
      expect(screen.getByTestId('repo-card-hikmet-dev')).toBeInTheDocument();
    });

    it('renders templates repo card', () => {
      render(<WorkbenchPage />);
      
      expect(screen.getByTestId('repo-card-templates')).toBeInTheDocument();
    });

    it('repo cards have progress bars', () => {
      render(<WorkbenchPage />);
      
      repoCards.forEach((repo) => {
        expect(screen.getByText(`${repo.progress}%`)).toBeInTheDocument();
      });
    });

    it('repo cards display last activity timestamps', () => {
      render(<WorkbenchPage />);
      
      repoCards.forEach((repo) => {
        expect(screen.getByText(repo.lastActivity)).toBeInTheDocument();
      });
    });

    it('repo cards have functional links', () => {
      render(<WorkbenchPage />);
      
      repoCards.forEach((repo) => {
        const link = screen.getByTestId(`repo-card-${repo.id}`);
        expect(link.tagName).toBe('A');
        expect(link).toHaveAttribute('href', repo.url);
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      });
    });
  });

  describe('Terminal Widget', () => {
    it('renders terminal section', () => {
      render(<WorkbenchPage />);
      
      expect(screen.getByTestId('terminal-section')).toBeInTheDocument();
    });

    it('renders terminal widget heading', () => {
      render(<WorkbenchPage />);
      
      expect(screen.getByText('Sistem Terminali')).toBeInTheDocument();
    });
  });

  describe('Quick Links', () => {
    it('renders quick links section', () => {
      render(<WorkbenchPage />);
      
      expect(screen.getByTestId('quick-links')).toBeInTheDocument();
    });

    it('renders 4 quick link cards', () => {
      render(<WorkbenchPage />);
      
      const quickLinks = screen.getByTestId('quick-links');
      expect(quickLinks.children).toHaveLength(4);
    });
  });

  describe('Resource Card Count', () => {
    it('renders exactly 8 total resource cards (4 docs + 4 repos)', () => {
      render(<WorkbenchPage />);
      
      const docsGrid = screen.getByTestId('docs-grid');
      const reposGrid = screen.getByTestId('repos-grid');
      
      const totalCards = docsGrid.children.length + reposGrid.children.length;
      expect(totalCards).toBe(8);
    });
  });

  describe('Section Headings', () => {
    it('renders Dokümantasyon section heading', () => {
      render(<WorkbenchPage />);
      
      expect(screen.getByText('Dokümantasyon')).toBeInTheDocument();
    });

    it('renders GitHub Repositories section heading', () => {
      render(<WorkbenchPage />);
      
      expect(screen.getByText('GitHub Repositories')).toBeInTheDocument();
    });
  });

  describe('External Links', () => {
    it('renders GitHub profile link', () => {
      render(<WorkbenchPage />);
      
      const githubLink = screen.getByText("GitHub'da Gör");
      expect(githubLink).toBeInTheDocument();
    });
  });
});
