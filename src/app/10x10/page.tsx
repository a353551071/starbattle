import type { Metadata } from 'next';
import Link from 'next/link';
import StarBattleBoard from '@/components/StarBattleBoard';
import puzzleData from '@/data/puzzles.json';

export const metadata: Metadata = {
  title: 'Star Battle 10x10 - Play Free 2-Star Logic Puzzles Online (Classic)',
  description:
    'Play classic 10x10 Star Battle puzzles online. 2 stars per row, column, and outlined region. Master the definitive tournament standard of Two Not Touch logic grids.',
  keywords: [
    'star battle 10x10',
    '10x10 star battle',
    '2 star battle',
    'two star battle',
    'star battle 2 stars',
    'classic star battle',
  ],
  alternates: {
    canonical: 'https://starbattleonline.com/10x10',
  },
};

export default function StarBattle10x10Page() {
  const practice10x10List = (puzzleData as any).practice10x10 || [];
  const puzzle = practice10x10List[0];

  return (
    <div className="flex flex-col items-center">
      {/* Title & Introduction */}
      <div className="text-center mb-7 max-w-xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 mb-3 shadow-xs">
          <span>👑 Tournament Standard &bull; 2 Stars per Region</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-2 text-zinc-900 dark:text-white">
          Star Battle <span className="text-purple-600 dark:text-purple-400">10x10</span>
        </h1>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-md mx-auto leading-relaxed">
          Place exactly <strong className="text-zinc-900 dark:text-zinc-200">2 stars</strong> in every row, column, and outlined region. No two stars may touch, not even diagonally.
        </p>

        {/* Quick Mode Links */}
        <div className="flex items-center justify-center gap-2 mt-4 text-xs">
          <Link
            href="/8x8"
            className="px-3 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            ← Try 8x8 (1★)
          </Link>
          <span className="px-3 py-1 rounded-lg bg-purple-100 dark:bg-purple-950/60 font-bold text-purple-700 dark:text-purple-300">
            10x10 (2★)
          </span>
          <Link
            href="/"
            className="px-3 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            Daily Challenge ⭐
          </Link>
        </div>
      </div>

      {/* Board */}
      {puzzle && (
        <StarBattleBoard
          key={puzzle.id}
          size={10}
          starsRequired={2}
          regions={puzzle.regions}
          solution={puzzle.solution}
          puzzleId={puzzle.id}
        />
      )}

      {/* SEO Strategic Content for 10x10 Keywords */}
      <section className="w-full max-w-3xl border-t border-zinc-200 dark:border-zinc-800 pt-12 mt-12 space-y-6 text-zinc-700 dark:text-zinc-300 text-sm">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
            Mastering the 10x10 2-Star Format
          </h2>
          <p className="leading-relaxed">
            The 10x10 grid with 2 stars is the international competitive standard of Star Battle, popularized by the World Puzzle Championship and the New York Times puzzle community. While 8x8 requires simple local deduction, 10x10 demands multi-line spatial counting and the Pigeonhole Principle.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800">
            <h3 className="font-bold text-zinc-900 dark:text-white mb-1">1. The 2-Row / 2-Column Rule</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Any 2 adjacent rows or columns must contain a combined total of exactly 4 stars. If 3 regions span entirely across those 2 rows, they must absorb all 4 stars, meaning all other squares in those rows are crosses!
            </p>
          </div>
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800">
            <h3 className="font-bold text-zinc-900 dark:text-white mb-1">2. 2x2 Cell Traps</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Because no two stars may touch diagonally, any 2x2 square of 4 cells can contain at most ONE star. Use this constraint to eliminate crowded candidate squares.
            </p>
          </div>
        </div>

        <div className="pt-4 flex items-center justify-between text-xs text-zinc-500">
          <span>Want a full strategy breakdown?</span>
          <Link href="/how-to-play" className="text-amber-500 font-bold hover:underline">
            Read our Complete Star Battle Strategy Guide →
          </Link>
        </div>
      </section>
    </div>
  );
}
