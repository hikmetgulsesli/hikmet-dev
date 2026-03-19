import {
  ProjectCard,
  BlogCard,
  DocCard,
  RepoCard,
  StatsCard,
} from "@/components/cards";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { TerminalWidget } from "@/components/TerminalWidget";
import { getRecentPosts } from "@/data/blog";
import { docsCards, repoCards, terminalLogs } from "@/data/resources";
import { BookOpen, GitBranch, TerminalSquare } from "lucide-react";

export default function Home() {
  const recentPosts = getRecentPosts(3);

  return (
    <div className="flex-1 w-full">
      {/* Hero Section - Stats Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatsCard iconName="Bot" value="10+" label="Agents" />
          <StatsCard iconName="Globe" value="24" label="Web Apps" />
          <StatsCard iconName="GitBranch" value="5" label="Workflows" />
        </div>
      </section>

      {/* Projects Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
          Projects and Open Source
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProjectCard
            title="Mission Control"
            description="Centralized dashboard for managing AI agents and automated workflows."
            status="shipped"
            year={2024}
            tags={["Next.js", "React", "TypeScript"]}
            starCount={128}
            forkCount={24}
            liveUrl="#"
            sourceUrl="#"
            featured
          />
          <ProjectCard
            title="Setfarm"
            description="Pipeline engine for automated development workflows."
            status="in-progress"
            year={2024}
            tags={["Node.js", "TypeScript", "CLI"]}
            starCount={85}
            forkCount={12}
            liveUrl="#"
            sourceUrl="#"
          />
          <ProjectCard
            title="Hizli Okuma"
            description="Speed reading application with RSVP technique."
            status="shipped"
            year={2024}
            tags={["React", "TypeScript", "PWA"]}
            starCount={64}
            forkCount={8}
            liveUrl="#"
            sourceUrl="#"
          />
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-cyan-600 to-teal-600 py-16 md:py-20">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-black/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Bültenimize Katılın
            </h2>
            <p className="text-lg text-white/90 max-w-xl mb-8">
              En yeni teknoloji haberleri, tasarım trendleri ve özel içerikler doğrudan gelen kutunuza gelsin.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </section>

      {/* Latest Blog Posts Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center gap-2 mb-8">
          <BookOpen className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Latest Blog Posts
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentPosts.map((post) => (
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
      </section>

      {/* Resources & APIs Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center gap-2 mb-8">
          <TerminalSquare className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Resources & APIs
          </h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Documentation and Repos */}
          <div className="lg:col-span-8 space-y-12">
            {/* Documentation Section */}
            <section>
              <div className="flex items-center gap-2 mb-6">
                <BookOpen className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Documentation</h3>
                <a
                  href="/docs"
                  className="text-sm text-primary hover:underline ml-auto"
                >
                  View all
                </a>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {docsCards.map((doc) => (
                  <DocCard
                    key={doc.id}
                    title={doc.title}
                    description={doc.description}
                    icon={doc.icon}
                    progress={doc.progress}
                    lastActivity={doc.lastActivity}
                    link={doc.link}
                  />
                ))}
              </div>
            </section>

            {/* GitHub Repositories Section */}
            <section>
              <div className="flex items-center gap-2 mb-6">
                <GitBranch className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Repositories</h3>
                <a
                  href="https://github.com/hikmetgulsesli"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline ml-auto"
                >
                  Connect GitHub
                </a>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {repoCards.map((repo) => (
                  <RepoCard
                    key={repo.id}
                    name={repo.name}
                    description={repo.description}
                    language={repo.language}
                    stars={repo.stars}
                    forks={repo.forks}
                    lastActivity={repo.lastActivity}
                    url={repo.url}
                  />
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Terminal Widget */}
          <div className="lg:col-span-4 h-full">
            <TerminalWidget logs={terminalLogs} title="OpenClaw_Terminal" />
          </div>
        </div>
      </section>
    </div>
  );
}
