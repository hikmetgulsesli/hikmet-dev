import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import IntroductionPage from './page';

// Mock the data modules
vi.mock('@/data/social', () => ({
  socialLinks: [
    {
      id: 'github',
      name: 'GitHub',
      handle: '@hikmetgulsesli',
      url: 'https://github.com/hikmetgulsesli',
      icon: 'github',
      description: 'Açık kaynak projeler ve kod örnekleri',
    },
    {
      id: 'discord',
      name: 'Discord',
      handle: 'SetroxHQ',
      url: 'https://discord.gg/setrox',
      icon: 'discord',
      description: 'Topluluk sohbeti ve destek kanalı',
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      handle: 'Hikmet Gulsesli',
      url: 'https://linkedin.com/in/hikmetgulsesli',
      icon: 'linkedin',
      description: 'Profesyonel profil ve bağlantılar',
    },
  ],
  contactInfo: {
    email: 'hikmet@setrox.com.tr',
    domain: 'setrox.com.tr',
    location: 'İstanbul, Türkiye',
    timezone: 'UTC+3 (Europe/Istanbul)',
    availability: 'Pazartesi - Cuma, 09:00 - 18:00',
  },
}));

vi.mock('@/data/site', () => ({
  siteMetadata: {
    title: 'Hikmet Gulsesli — Developer Portal',
    description: 'OpenClaw automation system kurucusu.',
    author: 'Hikmet Gulsesli',
    authorTitle: 'Founder of OpenClaw',
    domain: 'setrox.com.tr',
    language: 'tr',
    theme: 'dark',
  },
  siteStats: {
    agents: 10,
    webApps: 24,
    workflows: 5,
    uptime: '99.9%',
    lastUpdated: '2026-01-01T00:00:00.000Z',
  },
}));

describe('IntroductionPage', () => {
  it('renders the hero section with name and title', () => {
    render(<IntroductionPage />);
    
    expect(screen.getByTestId('hero-name')).toHaveTextContent('Hikmet Gulsesli');
    expect(screen.getByTestId('hero-title')).toHaveTextContent('Developer Portal / OpenClaw Builder');
  });

  it('renders the bio text', () => {
    render(<IntroductionPage />);
    
    const bio = screen.getByTestId('hero-bio');
    expect(bio).toBeInTheDocument();
    expect(bio.textContent).toContain('OpenClaw');
  });

  it('renders the stats section with correct values', () => {
    render(<IntroductionPage />);
    
    const statsSection = screen.getByTestId('stats-section');
    expect(statsSection).toBeInTheDocument();
    
    // Check for stat values in the page
    expect(screen.getByText('10+')).toBeInTheDocument();
    expect(screen.getByText('24')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('renders the mission section', () => {
    render(<IntroductionPage />);
    
    const missionSection = screen.getByTestId('mission-section');
    expect(missionSection).toBeInTheDocument();
    expect(screen.getByText('Misyon')).toBeInTheDocument();
  });

  it('renders three competency columns', () => {
    render(<IntroductionPage />);
    
    const expertiseSection = screen.getByTestId('expertise-section');
    expect(expertiseSection).toBeInTheDocument();
    
    // Check for all three competency cards
    expect(screen.getByTestId('competency-ai')).toBeInTheDocument();
    expect(screen.getByTestId('competency-devops')).toBeInTheDocument();
    expect(screen.getByTestId('competency-automation')).toBeInTheDocument();
    
    // Check for titles
    expect(screen.getByText('AI Engineering')).toBeInTheDocument();
    expect(screen.getByText('DevOps Excellence')).toBeInTheDocument();
    expect(screen.getByText('Otomasyon')).toBeInTheDocument();
  });

  it('renders the tech stack grid', () => {
    render(<IntroductionPage />);
    
    const techStackSection = screen.getByTestId('techstack-section');
    expect(techStackSection).toBeInTheDocument();
    
    const techGrid = screen.getByTestId('tech-grid');
    expect(techGrid).toBeInTheDocument();
    
    // Check for some tech items
    expect(screen.getByTestId('tech-Python')).toBeInTheDocument();
    expect(screen.getByTestId('tech-Next.js')).toBeInTheDocument();
    expect(screen.getByTestId('tech-Docker')).toBeInTheDocument();
  });

  it('renders functional social links', () => {
    render(<IntroductionPage />);
    
    const githubLink = screen.getByTestId('link-github');
    expect(githubLink).toHaveAttribute('href', 'https://github.com/hikmetgulsesli');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
    
    const linkedinLink = screen.getByTestId('link-linkedin');
    expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/hikmetgulsesli');
    
    const discordLink = screen.getByTestId('link-discord');
    expect(discordLink).toHaveAttribute('href', 'https://discord.gg/setrox');
  });

  it('renders contact information', () => {
    render(<IntroductionPage />);
    
    const contactInfo = screen.getByTestId('contact-info');
    expect(contactInfo).toBeInTheDocument();
    
    // Check for email
    expect(screen.getByText('hikmet@setrox.com.tr')).toBeInTheDocument();
    
    // Check for location
    expect(screen.getByText('İstanbul, Türkiye')).toBeInTheDocument();
  });

  it('renders CTA buttons with correct links', () => {
    render(<IntroductionPage />);
    
    const exploreLink = screen.getByText('Projeleri Keşfet').closest('a');
    expect(exploreLink).toHaveAttribute('href', '/projects');
    
    const expertiseLink = screen.getByText('Yetkinliklerim').closest('a');
    expect(expertiseLink).toHaveAttribute('href', '#expertise');
  });
});
