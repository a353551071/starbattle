import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import StarBattleBoard from '@/components/StarBattleBoard';
import puzzleData from '@/data/puzzles.json';

interface PageProps {
  params: Promise<{
    date: string;
  }>;
}

export async function generateStaticParams() {
  const daily = (puzzleData as any).daily || {};
  return Object.keys(daily).map((date) => ({
    date,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { date } = await params;
  return {
    title: `Daily Star Battle - ${date} | Two Not Touch Logic Puzzle`,
    description: `Play the daily Star Battle logic puzzle for ${date}. 10x10 grid with 2 stars per row, column, and region. Free online play, verified unique solution.`,
    alternates: {
      canonical: `https://starbattleonline.com/daily/${date}`,
    },
  };
}

export default async function DailyDatePage({ params }: PageProps) {
  const { date } = await params;
  const daily = (puzzleData as any).daily || {};
  const puzzle = daily[date];

  if (!puzzle) {
    notFound();
  }

  // Calculate previous and next dates (guard against future dates)
  const serverToday = new Date().toISOString().split('T')[0];
  const allDates = Object.keys(daily).sort();
  const currentIdx = allDates.indexOf(date);
  const prevDate = currentIdx > 0 ? allDates[currentIdx - 1] : null;
  const nextDate =
    currentIdx < allDates.length - 1 && allDates[currentIdx + 1] <= serverToday
      ? allDates[currentIdx + 1]
      : null;

  return (
    <div className="flex flex-col items-center">
      {/* Breadcrumb & Navigation */}
      <div className="w-full max-w-xl flex items-center justify-between mb-4 text-xs font-semibold text-zinc-500">
        <div className="flex items-center gap-1.5">
          <Link href="/" className="hover:text-amber-500 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/daily/archive" className="hover:text-amber-500 transition-colors">Daily Archive</Link>
          <span>/</span>
          <span className="text-zinc-800 dark:text-zinc-200">{date}</span>
        </div>

        <div className="flex items-center gap-2">
          {prevDate && (
            <Link
              href={`/daily/${prevDate}`}
              className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 transition-colors"
            >
              ← Prev
            </Link>
          )}
          {nextDate && (
            <Link
              href={`/daily/${nextDate}`}
              className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 transition-colors"
            >
              Next →
            </Link>
          )}
        </div>
      </div>

      {/* Date Header */}
      <div className="text-center mb-6">
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 mb-2 inline-block">
          Daily Challenge
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
          Star Battle &bull; {date}
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 mt-1">
          Classic 10x10 Grid &bull; 2 Stars per Row, Col, and Region
        </p>
      </div>

      {/* Board */}
      <StarBattleBoard
        key={puzzle.date}
        size={puzzle.size}
        starsRequired={puzzle.stars}
        regions={puzzle.regions}
        solution={puzzle.solution}
        puzzleDate={puzzle.date}
        puzzleId={puzzle.date}
      />

      {/* SEO Archive Link Block */}
      <div className="mt-12 text-center text-xs text-zinc-400">
        Looking for other dates? Browse the{' '}
        <Link href="/daily/archive" className="text-amber-500 underline hover:text-amber-600 font-semibold">
          Complete Daily Star Battle Archive
        </Link>.
      </div>
    </div>
  );
}
