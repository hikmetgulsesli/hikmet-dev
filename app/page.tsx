import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProjectsGrid } from "@/components/ProjectsGrid";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ProjectsGrid />
      </main>
      <Footer />
    </div>
  );
}
