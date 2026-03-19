import {
  ProjectCard,
  BlogCard,
  ResourceCard,
  StatsCard,
} from "@/components/cards";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

export default function Home() {
  return (
    <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Stats Cards Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Stats Cards</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatsCard iconName="Bot" value="10+" label="Agents" />
          <StatsCard iconName="Globe" value="24" label="Web Apps" />
          <StatsCard iconName="GitBranch" value="5" label="Workflows" />
        </div>
      </section>

      {/* Project Cards Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Project Cards</h2>
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
            title="Legacy Analytics"
            description="Legacy log management system. Replaced by newer tools."
            status="archived"
            year={2023}
            tags={["Python", "Redis"]}
            starCount={45}
            forkCount={8}
            sourceUrl="#"
          />
        </div>
      </section>

      {/* Blog Cards Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Blog Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <BlogCard
            title="Building Autonomous Interfaces"
            summary="Explore how large language models are redefining user experience through dynamic, intent-based UI components."
            category="AI"
            date="2024-05-20"
            slug="#"
          />
          <BlogCard
            title="Optimizing CI/CD Pipelines"
            summary="Learn how we reduced our build times by 40% using custom GitHub Action runners."
            category="DevOps"
            date="2024-05-15"
            slug="#"
          />
          <BlogCard
            title="Vector Databases Explained"
            summary="A developer's guide to semantic search and how vector stores enable RAG applications."
            category="Tutorial"
            date="2024-03-28"
            slug="#"
          />
        </div>
      </section>

      {/* Resource Cards Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Resource Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ResourceCard
            title="Core API Reference"
            description="Detailed technical specifications for all REST endpoints and WebSocket protocols."
            progress={85}
            lastActivity="2h ago"
          />
          <ResourceCard
            title="Auth Integration"
            description="Implementing secure OAuth2 workflows and JWT management for enterprise apps."
            progress={42}
            lastActivity="5m ago"
          />
          <ResourceCard
            title="Deployment Guides"
            description="Configuring automated CI/CD pipelines with GitHub Actions and Docker."
            progress={65}
            lastActivity="Yesterday"
          />
          <ResourceCard
            title="Schema Design"
            description="Best practices for relational database modeling and indexing."
            progress={12}
            lastActivity="3d ago"
          />
        </div>
      </section>

      {/* Newsletter Form Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Newsletter Form</h2>
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary via-cyan-600 to-teal-600 p-8 md:p-12 shadow-2xl">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-black/10 rounded-full blur-3xl" />
          <div className="relative z-10 flex flex-col items-center text-center">
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
    </main>
  );
}
