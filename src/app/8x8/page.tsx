import type { Metadata } from 'next';
import Link from 'next/link';
import StarBattleBoard from '@/components/StarBattleBoard';
import puzzleData from '@/data/puzzles.json';

export const metadata: Metadata = {
  title: 'Star Battle 8x8 - Play Free 1-Star Logic Puzzles Online (Easy Mode)',
  description:
    'Play 8x8 Star Battle puzzles online for free. Featuring 1 star per row, column, and region. The perfect entry point for beginners learning Two Not Touch logic rules.',
  keywords: [
    'star battle 8x8',
    '8x8 star battle',
    'easy star battle',
    '1 star battle',
    'star battle 1 star',
    'beginner star battle puzzle',
  ],
  alternates: {
    canonical: 'https://starbattleonline.com/8x8',
  },
};

export default function StarBattle8x8Page() {
  const practice8x8List = (puzzleData as any).practice8x8 || [];
  const puzzle = practice8x8List[0];

  return (
    <div className="flex flex-col items-center">
      {/* Title & Introduction */}
      <div className="text-center mb-7 max-w-xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-3 shadow-xs">
          <span>🟢 Beginner Friendly &bull; 1 Star per Region</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-2 text-zinc-900 dark:text-white">
          Star Battle <span className="text-emerald-600 dark:text-emerald-400">8x8</span>
        </h1>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-md mx-auto leading-relaxed">
          Place exactly <strong className="text-zinc-900 dark:text-zinc-200">1 star</strong> in every row, column, and outlined region. Stars may not touch, even diagonally. Ideal for warming up!
        </p>

        {/* Quick Mode Links */}
        <div className="flex items-center justify-center gap-2 mt-4 text-xs">
          <span className="px-3 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 font-bold text-emerald-700 dark:text-emerald-300">
            8x8 (1★)
          </span>
          <Link
            href="/10x10"
            className="px-3 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            Switch to 10x10 (2★) →
          </Link>
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
          size={8}
          starsRequired={1}
          regions={puzzle.regions}
          solution={puzzle.solution}
          puzzleId={puzzle.id}
        />
      )}

      {/* SEO Strategic Content for 8x8 Keywords */}
      <section className="w-full max-w-3xl border-t border-zinc-200 dark:border-zinc-800 pt-12 mt-12 space-y-6 text-zinc-700 dark:text-zinc-300 text-sm">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
            Why Start with 8x8 Star Battle?
          </h2>
          <p className="leading-relaxed">
            Standard Star Battle is played on a 10x10 grid with 2 stars per section. However, the <strong>8x8 1-star grid</strong> (also known as <em>Queens game</em> or mini Star Battle) is the gold standard for beginners. With only 8 stars to place, elimination rules can be visualized immediately without complex multi-row counting.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800">
            <h3 className="font-bold text-zinc-900 dark:text-white mb-1">1. 8-Neighbor Elimination</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              In 8x8, placing 1 star eliminates all 8 surrounding cells with crosses (✕). In tight corners, placing one star often completely solves an adjacent 2-cell region.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800">
            <h3 className="font-bold text-zinc-900 dark:text-white mb-1">2. Single-Cell Regions</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              If an outlined territory only has a single legal square left, the star MUST be placed there. Always scan for 1-cell forced moves first!
            </p>
          </div>
        </div>

        <div className="pt-4 flex items-center justify-between text-xs text-zinc-500">
          <span>Ready for a bigger challenge?</span>
          <Link href="/10x10" className="text-amber-500 font-bold hover:underline">
            Play Classic 10x10 (2-Star) Puzzles →
          </Link>
        </div>
      </section>
    </div>
  );
}
