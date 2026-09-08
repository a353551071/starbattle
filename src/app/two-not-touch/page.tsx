import type { Metadata } from 'next';
import Link from 'next/link';
import StarBattleBoard from '@/components/StarBattleBoard';
import puzzleData from '@/data/puzzles.json';

export const metadata: Metadata = {
  title: 'Two Not Touch Puzzle Online - Play Free (Star Battle)',
  description:
    'Play Two Not Touch puzzles online free. Learn why Star Battle and Two Not Touch are the exact same game, understand the rules, and solve daily 10x10 boards.',
  alternates: {
    canonical: 'https://starbattleonline.com/two-not-touch',
  },
};

export default function TwoNotTouchPage() {
  const practice10x10List = (puzzleData as any).practice10x10 || [];
  const samplePuzzle = practice10x10List[0] || Object.values((puzzleData as any).daily || {})[0];

  return (
    <div className="max-w-3xl mx-auto py-6 flex flex-col items-center">
      <div className="text-center mb-8 max-w-xl">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-500">Alias & Guide</span>
        <h1 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white tracking-tight mt-1 mb-3">
          Two Not Touch Online
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Looking for <strong>Two Not Touch</strong>? You&apos;re in the right place! Two Not Touch is the popular American name for the international logic puzzle <strong>Star Battle</strong>.
        </p>
      </div>

      {/* Embedded 10x10 Two Not Touch Puzzle Board */}
      {samplePuzzle && (
        <div className="w-full flex flex-col items-center mb-12">
          <StarBattleBoard
            key="two-not-touch-demo"
            size={samplePuzzle.size}
            starsRequired={samplePuzzle.stars}
            regions={samplePuzzle.regions}
            solution={samplePuzzle.solution}
            puzzleId="two-not-touch-demo"
          />
        </div>
      )}

      {/* Educational Comparison Content */}
      <div className="w-full border-t border-zinc-200 dark:border-zinc-800 pt-8 space-y-6 text-sm text-zinc-700 dark:text-zinc-300">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
            Why is it Called Two Not Touch?
          </h2>
          <p className="leading-relaxed">
            In standard 10x10 Star Battle, every row, column, and region must contain exactly <strong>two stars</strong>. The most critical constraint—and the one that players frequently trip over—is that <strong>no two stars may touch</strong>, not even diagonally.
          </p>
          <p className="leading-relaxed mt-2">
            U.S. newspapers and puzzle syndicates began calling it &ldquo;Two Not Touch&rdquo; as a descriptive name to make the rules immediately obvious to casual solvers.
          </p>
        </div>

        <div className="flex gap-4 not-prose pt-4">
          <Link
            href="/"
            className="px-5 py-2.5 rounded-xl bg-amber-500 text-white font-bold text-sm hover:bg-amber-600 transition-colors"
          >
            Play Daily Challenges →
          </Link>
          <Link
            href="/how-to-play"
            className="px-5 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-bold text-sm hover:bg-zinc-200 transition-colors"
          >
            Read Complete Strategy Guide
          </Link>
        </div>
      </div>
    </div>
  );
}
