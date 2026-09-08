import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'How to Play Star Battle (Two Not Touch) | Complete Strategy & Rules Guide',
  description:
    'Master Star Battle logic puzzles with our beginner to advanced guide. Learn 1-star and 2-star rules, pigeonhole counting tricks, trapping deductions, and avoid common traps.',
  alternates: {
    canonical: 'https://starbattleonline.com/how-to-play',
  },
};

export default function HowToPlayPage() {
  return (
    <article className="max-w-3xl mx-auto py-6 prose dark:prose-invert prose-amber text-zinc-800 dark:text-zinc-200">
      <div className="mb-8 not-prose">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-500">Official Tutorial</span>
        <h1 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white tracking-tight mt-1 mb-3">
          How to Play Star Battle (Two Not Touch)
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Whether you call it <strong>Star Battle</strong>, <strong>Two Not Touch</strong>, or know it from games like <strong>LinkedIn Queens</strong>, this classic Japanese-style logic grid puzzle tests spatial deduction and elimination. Here is the definitive guide to mastering it from day one.
        </p>
      </div>

      <hr className="border-zinc-200 dark:border-zinc-800 my-8" />

      <section className="space-y-4">
        <h2 className="text-2xl font-black text-zinc-900 dark:text-white">1. The Basic Rules</h2>
        <p>
          Every Star Battle puzzle consists of a square grid of size $N \times N$ (typically 8x8 or 10x10) divided into $N$ distinct contiguous regions surrounded by thick borders.
        </p>

        <div className="bg-zinc-50 dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 my-4 not-prose space-y-3">
          <div className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-amber-500 text-white font-bold flex items-center justify-center text-xs flex-shrink-0 mt-0.5">1</span>
            <div>
              <strong className="text-zinc-900 dark:text-white text-sm">Row and Column Constraint:</strong>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-0.5">
                Every row and every column must contain exactly $K$ stars (1 star for 8x8, 2 stars for 10x10).
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-amber-500 text-white font-bold flex items-center justify-center text-xs flex-shrink-0 mt-0.5">2</span>
            <div>
              <strong className="text-zinc-900 dark:text-white text-sm">Region Constraint:</strong>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-0.5">
                Every bold outlined region must contain exactly $K$ stars.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-amber-500 text-white font-bold flex items-center justify-center text-xs flex-shrink-0 mt-0.5">3</span>
            <div>
              <strong className="text-zinc-900 dark:text-white text-sm">The &ldquo;Two Not Touch&rdquo; Rule:</strong>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-0.5">
                Stars cannot touch each other, even diagonally. Once a star is placed, all 8 neighboring cells are instantly eliminated and can be marked with a cross (✕).
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4 pt-6">
        <h2 className="text-2xl font-black text-zinc-900 dark:text-white">2. Essential Solving Strategies</h2>

        <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Strategy 1: Corner and Edge Shrinkage</h3>
        <p>
          In 10x10 (2-star) puzzles, look closely at 2x2 corner blocks. A 2x2 block can contain <strong>at most 1 star</strong> because placing two stars in any 2x2 area would force them to touch horizontally, vertically, or diagonally.
        </p>

        <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Strategy 2: Row/Column Pigeonhole Counting</h3>
        <p>
          Consider two adjacent rows or columns. In a 2-star puzzle, those two rows require a combined total of exactly <strong>4 stars</strong>.
        </p>
        <p>
          Now examine the regions that overlap these two rows: if 2 full regions lie completely inside these two rows, those 2 regions will account for $2 \times 2 = 4$ stars. That means <em>every other cell in those two rows outside those regions cannot have any stars</em>! You can immediately mark them with crosses (✕).
        </p>

        <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Strategy 3: 1-Cell and Narrow Regions</h3>
        <p>
          If a region consists of only 2 or 3 cells, its placements are heavily restricted. For instance, in a 1-star puzzle, if a region has only 2 cells in the same row, any cells in neighboring rows that touch both cells must be crosses!
        </p>
      </section>

      <section className="space-y-4 pt-6">
        <h2 className="text-2xl font-black text-zinc-900 dark:text-white">3. Ready to Practice?</h2>
        <p>
          The best way to develop logic intuition is by solving daily puzzles. Start with an 8x8 (1-star) grid to warm up, then tackle the classic 10x10 daily challenge!
        </p>
        <div className="flex gap-3 not-prose mt-4">
          <Link
            href="/"
            className="px-5 py-2.5 rounded-xl bg-amber-500 text-white font-bold text-sm hover:bg-amber-600 transition-colors"
          >
            Play Today&apos;s Daily →
          </Link>
          <Link
            href="/solver"
            className="px-5 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-bold text-sm hover:bg-zinc-200 transition-colors"
          >
            Open Solver Tool
          </Link>
        </div>
      </section>
    </article>
  );
}
