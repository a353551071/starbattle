import type { Metadata } from 'next';
import DailyArchiveList from '@/components/DailyArchiveList';
import puzzleData from '@/data/puzzles.json';

export const metadata: Metadata = {
  title: 'Daily Star Battle Puzzles Archive | Past Puzzles & Solutions',
  description:
    'Browse and play past Star Battle daily puzzles. Catch up on previous dates, track your solving history, and master 10x10 two-star logic challenges.',
  alternates: {
    canonical: 'https://starbattleonline.com/daily/archive',
  },
};

export default function DailyArchivePage() {
  const daily = (puzzleData as any).daily || {};
  const serverToday = new Date().toISOString().split('T')[0];

  return (
    <div className="max-w-3xl mx-auto py-4">
      <div className="mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-500">History & Calendar</span>
        <h1 className="text-3xl font-black text-zinc-900 dark:text-white tracking-tight mt-1">
          Daily Star Battle Archive
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
          Missed a puzzle? Jump into any past date below. Every daily puzzle features an independently verified unique solution.
        </p>
      </div>

      {/* Dynamic Filtered Date List */}
      <DailyArchiveList daily={daily} serverToday={serverToday} />
    </div>
  );
}
