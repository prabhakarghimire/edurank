import Hero from "@/components/features/Hero";
import LiveRankings from "@/components/features/LiveRankings";

export default function Home() {
  return (
    <main className="bg-background min-h-screen">
      <Hero />
      <LiveRankings />
    </main>
  );
}
