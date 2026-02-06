import Hero from "@/components/features/Hero";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import LiveRankings from "@/components/features/LiveRankings";
import { mockInstitutions } from "@/lib/data";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const topSchools = mockInstitutions
    .filter(i => i.type === 'SCHOOL')
    .sort((a, b) => (b.eduRankScore || 0) - (a.eduRankScore || 0))
    .slice(0, 10);

  const topPreschools = mockInstitutions
    .filter(i => i.type === 'PRESCHOOL')
    .sort((a, b) => (b.eduRankScore || 0) - (a.eduRankScore || 0))
    .slice(0, 10);

  const topColleges = mockInstitutions
    .filter(i => i.type === 'COLLEGE')
    .sort((a, b) => (b.eduRankScore || 0) - (a.eduRankScore || 0))
    .slice(0, 10);

  const topConsultancies = mockInstitutions
    .filter(i => i.type === 'CONSULTANCY')
    .sort((a, b) => (b.eduRankScore || 0) - (a.eduRankScore || 0))
    .slice(0, 10);

  const topTrainingCenters = mockInstitutions
    .filter(i => i.type === 'TRAINING_CENTER')
    .sort((a, b) => (b.eduRankScore || 0) - (a.eduRankScore || 0))
    .slice(0, 10);

  return (
    <main className="bg-black min-h-screen">
      <Hero />
      <LiveRankings
        schools={topSchools}
        preschools={topPreschools}
        colleges={topColleges}
        consultancies={topConsultancies}
        trainingCenters={topTrainingCenters}
      />
    </main>
  );
}
