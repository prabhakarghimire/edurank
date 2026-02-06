import Hero from "@/components/features/Hero";

export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <Hero />
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4 text-white">Top Rated Institutions</h2>
        <p className="text-zinc-500 mb-8">Data driven rankings coming soon...</p>
      </section>
    </main>
  );
}
