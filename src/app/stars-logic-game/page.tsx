import type { Metadata } from 'next';
import Link from 'next/link';
import StarBattleBoard from '@/components/StarBattleBoard';
import HouseAdBanner from '@/components/HouseAdBanner';
import puzzleData from '@/data/puzzles.json';

export const metadata: Metadata = {
  title: 'Stars Logic Game Online - Play Free Grid Puzzles | Star Battle',
  description:
    'Play the original Stars logic game free online. Place stars into grid regions with zero touching. Daily 8x8 & 10x10 puzzles, interactive solver, rules & tips.',
  alternates: {
    canonical: 'https://starbattleonline.com/stars-logic-game',
  },
  openGraph: {
    title: 'Stars Logic Game Online - Play Free Grid Puzzles | Star Battle',
    description:
      'Play the original Stars logic game free online. Place stars into grid regions with zero touching. Daily 8x8 & 10x10 puzzles, interactive solver, rules & tips.',
    url: 'https://starbattleonline.com/stars-logic-game',
    siteName: 'Star Battle Online',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Stars Logic Game Free Online',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stars Logic Game Online - Play Free Grid Puzzles | Star Battle',
    description:
      'Play the original Stars logic game free online. Place stars into grid regions with zero touching. Daily 8x8 & 10x10 puzzles, interactive solver, rules & tips.',
    images: ['/og-image.png'],
  },
};

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: 'What is the Stars logic game?',
    answer:
      'The Stars logic game (also universally known as Star Battle or Two Not Touch) is a deductive grid puzzle. Players must place a specified number of stars (usually 1 or 2) into each row, column, and outlined region without any two stars touching each other horizontally, vertically, or diagonally.',
  },
  {
    question: 'How do you solve a star logic puzzle without guessing?',
    answer:
      'Star logic puzzles are 100% solvable by pure logical deduction. The primary strategies involve identifying narrow regions confined to 1 or 2 rows/columns, applying the 2x2 pigeonhole rule (at most one star can fit in any 2x2 area), and immediately crossing out all 8 surrounding cells whenever a star position is confirmed.',
  },
  {
    question: 'Can stars touch diagonally or corner-to-corner?',
    answer:
      'No. The fundamental non-touching rule applies to all eight surrounding neighbors: orthogonally (up, down, left, right) and diagonally across corners. Placing a star always invalidates all adjacent corner cells.',
  },
  {
    question: 'Is the Stars game identical to LinkedIn Queens or Star Battle?',
    answer:
      'Yes, they are in the same puzzle family. Star Battle was invented in 2003 by Hans Eendebak. Queens is a 1-star variation using colored blocks. In standard 2-star puzzles (Two Not Touch), you place two stars per row, column, and outlined zone on 10x10 grids.',
  },
  {
    question: 'Can I play the Stars logic game on phone or tablet?',
    answer:
      'Yes! Star Battle Online is fully optimized for touchscreens and mobile web browsers. Simply tap once to place an elimination cross (✕), tap again to place a star (★), and tap a third time to clear. No app download or registration is required.',
  },
];

export default function StarsLogicGamePage() {
  const practice8x8List = (puzzleData as any).practice8x8 || [];
  const samplePuzzle = practice8x8List[0] || {
    id: 'stars-game-sample',
    size: 8,
    stars: 1,
    regions: [
      [0, 0, 0, 0, 0, 0, 1, 1],
      [2, 0, 0, 0, 0, 1, 1, 3],
      [2, 2, 0, 0, 1, 1, 3, 3],
      [2, 2, 4, 4, 1, 3, 3, 3],
      [4, 4, 4, 4, 5, 5, 3, 3],
      [6, 4, 4, 5, 5, 5, 5, 7],
      [6, 6, 6, 5, 5, 7, 7, 7],
      [6, 6, 6, 6, 7, 7, 7, 7],
    ],
    solution: [
      { r: 0, c: 5 },
      { r: 1, c: 1 },
      { r: 2, c: 7 },
      { r: 3, c: 3 },
      { r: 4, c: 0 },
      { r: 5, c: 6 },
      { r: 6, c: 2 },
      { r: 7, c: 4 },
    ],
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Star Battle Online',
            item: 'https://starbattleonline.com/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Stars Logic Game',
            item: 'https://starbattleonline.com/stars-logic-game',
          },
        ],
      },
      {
        '@type': 'Game',
        name: 'Stars Logic Game - Free Online Grid Puzzles',
        alternateName: [
          'Stars Puzzle',
          'Star Battle Logic Game',
          'Stars Grid Game',
          'Two Not Touch',
        ],
        description:
          'Play the Stars logic game online free. Place stars into rows, columns, and custom regions with zero contact between stars. Daily puzzles with verified unique solutions.',
        url: 'https://starbattleonline.com/stars-logic-game',
        genre: 'Logic puzzle',
        operatingSystem: 'Any (web browser)',
        applicationCategory: 'GameApplication',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <div className="max-w-3xl mx-auto py-4 sm:py-6 flex flex-col items-center">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Header Section */}
      <div className="text-center mb-8 max-w-2xl px-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 mb-3 shadow-xs">
          <span>★ Pure Spatial Logic &bull; Verified Zero-Guess Puzzles</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-zinc-900 dark:text-white tracking-tight mt-1 mb-4">
          Stars Logic Game
        </h1>
        <div className="space-y-2 text-zinc-700 dark:text-zinc-300">
          <p className="text-base sm:text-lg font-bold text-amber-600 dark:text-amber-400">
            Place the stars. Leave no touches. Solve with pure logic.
          </p>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-xl mx-auto">
            Looking for the clean, ad-free <strong>stars logic game</strong>? Solve interactive grid puzzles right in your browser. Choose between starter 8&times;8 boards (1 star) or tournament-grade 10&times;10 layouts (2 stars) with instant error checking.
          </p>
        </div>

        {/* Quick Grid Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-5">
          <Link
            href="/8x8"
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors shadow-xs"
          >
            8&times;8 Starter (1★)
          </Link>
          <Link
            href="/10x10"
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors shadow-xs"
          >
            10&times;10 Classic (2★)
          </Link>
          <Link
            href="/two-not-touch"
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors shadow-xs"
          >
            Two Not Touch
          </Link>
          <Link
            href="/"
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-amber-500 text-white shadow-sm shadow-amber-500/20"
          >
            Daily Puzzle ⭐
          </Link>
        </div>
      </div>

      {/* Embedded Playable Puzzle Board */}
      {samplePuzzle && (
        <div className="w-full flex flex-col items-center mb-12">
          <div className="mb-2 text-xs text-zinc-500 dark:text-zinc-400">
            Interactive Warm-Up Board (8&times;8 &bull; 1 Star Per Row, Col & Region)
          </div>
          <StarBattleBoard
            key="stars-logic-game-demo"
            size={samplePuzzle.size}
            starsRequired={samplePuzzle.stars}
            regions={samplePuzzle.regions}
            solution={samplePuzzle.solution}
            puzzleId="stars-logic-game-demo"
          />
        </div>
      )}

      {/* Educational & Strategy Article Section */}
      <section className="w-full border-t border-zinc-200 dark:border-zinc-800 pt-10 space-y-10 text-zinc-700 dark:text-zinc-300">
        {/* Section 1 */}
        <article className="space-y-3">
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
            How the Stars Logic Game Works
          </h2>
          <p className="text-sm sm:text-base leading-relaxed">
            The <strong>Stars Logic Game</strong> is one of the most elegant grid deduction challenges in recreational mathematics. Unlike number puzzles such as Sudoku or Kakuro, there is no arithmetic, summing, or mental math required. Every cell on the board has only two possible states: it either contains a <strong>Star (★)</strong> or an <strong>Elimination Cross (✕)</strong>.
          </p>
          <p className="text-sm sm:text-base leading-relaxed">
            The board is partitioned into distinct boldly outlined geometric regions. Your objective is to place the specified quota of stars into each row, column, and outlined shape while obeying the universal non-touching rule.
          </p>
        </article>

        {/* Section 2 */}
        <article className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
            The Three Golden Rules
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
              <span className="text-xl">1️⃣</span>
              <h3 className="font-bold text-zinc-900 dark:text-white text-base mt-2 mb-1">
                Line Quotas
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Every horizontal row and vertical column must contain exactly the target number of stars (1 for 8&times;8, 2 for 10&times;10).
              </p>
            </div>
            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
              <span className="text-xl">2️⃣</span>
              <h3 className="font-bold text-zinc-900 dark:text-white text-base mt-2 mb-1">
                Region Quotas
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Every outlined region contains the exact same star quota, regardless of whether the region is compact or elongated.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
              <span className="text-xl">3️⃣</span>
              <h3 className="font-bold text-zinc-900 dark:text-white text-base mt-2 mb-1">
                Zero Touch
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                No two stars may touch each other in any direction — orthogonally (up/down/left/right) or diagonally across corner points.
              </p>
            </div>
          </div>
        </article>

        {/* Section 3: Essential Solving Techniques */}
        <article className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
            Key Deduction Strategies for Solvers
          </h2>
          <div className="space-y-3">
            <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 dark:bg-amber-500/10">
              <h3 className="font-bold text-amber-800 dark:text-amber-300 text-sm mb-1">
                The 2&times;2 Pigeonhole Principle
              </h3>
              <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                Because no two stars may touch even diagonally, any 2&times;2 subgrid can hold at most <strong>one single star</strong>. If an outlined region is completely confined within a 2&times;2 quadrant on a 2-star board, you instantly know the puzzle is impossible or that region can never hold more than 1 star.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40">
              <h3 className="font-bold text-zinc-900 dark:text-white text-sm mb-1">
                Narrow Island Traps
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                When a region forms a single row of cells (e.g. 1&times;3 or 1&times;4), placing a star in an interior cell burns both of its neighbors. Look for constrained ends to lock in mandatory stars or eliminate impossible candidates.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40">
              <h3 className="font-bold text-zinc-900 dark:text-white text-sm mb-1">
                Row-Region Counting Overlaps
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                If two rows collectively need 4 stars, and two full regions lie entirely inside those same two rows, then those two regions claim all 4 stars. All other cells in those two rows can be crossed out immediately.
              </p>
            </div>
          </div>
        </article>

        {/* House Cross-Promotion Banner */}
        <HouseAdBanner className="my-8" />

        {/* Section 4: FAQ Accordion */}
        <article className="space-y-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tight mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {FAQS.map((faq, index) => (
              <details
                key={index}
                className="group rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 p-4 sm:p-5 transition-all open:bg-zinc-50 dark:open:bg-zinc-900"
              >
                <summary className="font-bold text-sm sm:text-base text-zinc-900 dark:text-white cursor-pointer list-none flex items-center justify-between">
                  <span>{faq.question}</span>
                  <span className="text-amber-500 transition-transform group-open:rotate-180">▼</span>
                </summary>
                <div className="mt-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-200 dark:border-zinc-800 pt-3">
                  <p>{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </article>

        {/* Bottom CTA Block */}
        <div className="flex flex-wrap gap-4 not-prose pt-4 pb-8">
          <Link
            href="/"
            className="px-6 py-3 rounded-xl bg-amber-500 text-white font-bold text-sm hover:bg-amber-600 transition-colors shadow-md shadow-amber-500/20"
          >
            Play Today&apos;s Daily Challenge →
          </Link>
          <Link
            href="/solver"
            className="px-6 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-bold text-sm hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
          >
            Open Interactive Solver
          </Link>
          <Link
            href="/printable"
            className="px-6 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-bold text-sm hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
          >
            Print A4 Worksheets
          </Link>
        </div>
      </section>
    </div>
  );
}
