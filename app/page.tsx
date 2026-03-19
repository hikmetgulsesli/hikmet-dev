import { Terminal } from "@/components/Terminal";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black items-center justify-center p-4 md:p-10">
      <main className="w-full max-w-5xl">
        <h1 className="text-3xl md:text-5xl font-bold text-white text-center mb-8">
          Terminal Widget Demo
        </h1>
        <div className="flex justify-center">
          <Terminal />
        </div>
      </main>
    </div>
  );
}
