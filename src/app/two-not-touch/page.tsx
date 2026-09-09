import type { Metadata } from 'next';
import Link from 'next/link';
import StarBattleBoard from '@/components/StarBattleBoard';
import puzzleData from '@/data/puzzles.json';

export const metadata: Metadata = {
  title: 'Two Not Touch - Play Free Online Logic Puzzles | Star Battle',
  description:
    'Play Two Not Touch online free - the Star Battle logic puzzle where no two stars may touch. Daily 10x10 & 8x8 grids. No app, no download, no ads.',
  alternates: {
    canonical: 'https://starbattleonline.com/two-not-touch',
  },
  openGraph: {
    title: 'Two Not Touch - Play Free Online Logic Puzzles | Star Battle',
    description:
      'Play Two Not Touch online free - the Star Battle logic puzzle where no two stars may touch. Daily 10x10 & 8x8 grids. No app, no download, no ads.',
    url: 'https://starbattleonline.com/two-not-touch',
    siteName: 'Star Battle Online',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Two Not Touch Online Logic Puzzle',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Two Not Touch - Play Free Online Logic Puzzles | Star Battle',
    description:
      'Play Two Not Touch online free - the Star Battle logic puzzle where no two stars may touch. Daily 10x10 & 8x8 grids. No app, no download, no ads.',
    images: ['/og-image.png'],
  },
};

export default function TwoNotTouchPage() {
  const practice10x10List = (puzzleData as any).practice10x10 || [];
  const samplePuzzle = practice10x10List[0] || Object.values((puzzleData as any).daily || {})[0];

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
            name: 'Two Not Touch',
            item: 'https://starbattleonline.com/two-not-touch',
          },
        ],
      },
      {
        '@type': 'Game',
        name: 'Two Not Touch - Free Online Logic Puzzle',
        alternateName: 'Star Battle Online',
        description:
          'Play Two Not Touch (Star Battle) free online. Place stars so every row, column and region has the required count — no two stars may touch, not even diagonally. Daily 10x10 and 8x8 puzzles, no app and no download.',
        url: 'https://starbattleonline.com/two-not-touch',
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
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Can stars touch diagonally in Two Not Touch?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. The no-touch rule applies to all eight surrounding cells — orthogonally and diagonally. Placing a star immediately invalidates all eight neighbours: the four cells above, below, left and right, plus the four corner cells.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is Two Not Touch the same as Star Battle?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes — same puzzle, two names. Star Battle is the name Hans Eendebak gave the puzzle when it debuted at the 2003 World Puzzle Championship. Two Not Touch is the descriptive North American title that emphasises the rule that no two stars may touch.',
            },
          },
          {
            '@type': 'Question',
            name: 'How many stars per row in a 10x10 Two Not Touch puzzle?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'A classic 10x10 board uses two stars per row, column and region — the format used at the World Puzzle Championship. The gentler 8x8 format uses one star per row and is the standard entry point for new solvers.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I play Two Not Touch for free without an app?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes — you can play Two Not Touch online right in your browser: no app store, no account, no download, no ad breaks. The 8x8 and 10x10 boards are fully interactive, the daily puzzle resets every midnight, and the archive lets you replay any past date.',
            },
          },
          {
            '@type': 'Question',
            name: 'Where can I print Two Not Touch puzzles?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'This site has a dedicated printable generator that exports clean A4 worksheets at 8x8 and 10x10, with an optional solution page — the closest thing to a free Two Not Touch puzzles PDF collection. Perfect for classrooms, road trips, and puzzle clubs.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is Two Not Touch in the New York Times?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The New York Times does not currently publish a game called Two Not Touch. The puzzle you will find in NYT games is Queens, a simplified 1-star cousin where you place one queen per row, column and coloured region with the same no-touching rule.',
            },
          },
        ],
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
          <span>★ Free Online Logic Puzzle &bull; Verified Unique Solutions</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-zinc-900 dark:text-white tracking-tight mt-1 mb-4">
          Two Not Touch
        </h1>
        <div className="space-y-2 text-zinc-700 dark:text-zinc-300">
          <p className="text-base sm:text-lg font-bold text-amber-600 dark:text-amber-400">
            No app. No download. Play right here.
          </p>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-xl mx-auto">
            If you searched for <strong>Two Not Touch</strong> because the app store wanted a download — this page puts the logic puzzle in front of you. Pick an 8&times;8 (one star per row) or 10&times;10 (two stars per row) grid and start solving free online instantly.
          </p>
        </div>

        {/* Quick Grid Selector Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-5">
          <Link
            href="/8x8"
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors shadow-xs"
          >
            8&times;8 Beginner (1★)
          </Link>
          <span className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-amber-500 text-white shadow-sm shadow-amber-500/20">
            10&times;10 Classic (2★)
          </span>
          <Link
            href="/"
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors shadow-xs"
          >
            Daily Challenge ⭐
          </Link>
        </div>
      </div>

      {/* Embedded Playable 10x10 Two Not Touch Puzzle Board */}
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

      {/* Main Educational & Strategic Content Stream */}
      <section className="w-full border-t border-zinc-200 dark:border-zinc-800 pt-10 space-y-10 text-zinc-700 dark:text-zinc-300">
        {/* Section 1: What Is Two Not Touch? */}
        <article className="space-y-3">
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
            What Is Two Not Touch?
          </h2>
          <p className="text-sm sm:text-base leading-relaxed">
            <strong>Two Not Touch</strong> is the name many North American puzzle fans use for the game officially called <strong>Star Battle</strong>. The goal is simple: place stars on a square grid so that every row, every column, and every outlined region contains the same required number of stars. The catch is in the name — <strong>no two stars may touch</strong>, not even diagonally.
          </p>
          <p className="text-sm sm:text-base leading-relaxed">
            A standard Two Not Touch puzzle gives you an 8&times;8 or 10&times;10 grid divided into bold-outlined regions. In a 10&times;10 puzzle you place 2 stars in every row, column, and region; in an 8&times;8 starter puzzle you place just 1. Every puzzle on this site is computer-verified to have exactly one logical solution — guessing is never required.
          </p>
        </article>

        {/* Section 2: How to Play Two Not Touch */}
        <article className="space-y-3">
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
            How to Play Two Not Touch
          </h2>
          <p className="text-sm sm:text-base leading-relaxed">
            The rules fit in three concise principles:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-sm sm:text-base pl-2">
            <li>
              <strong>Row quota</strong> — every row must contain exactly the target number of stars.
            </li>
            <li>
              <strong>Column quota</strong> — every column must contain exactly the same number of stars.
            </li>
            <li>
              <strong>Region quota</strong> — every boldly outlined region must contain that number too.
            </li>
          </ol>
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200 text-sm leading-relaxed mt-4">
            <p>
              Then the rule that gives the puzzle its name: <strong>stars may not touch each other in any direction</strong> — not horizontally, not vertically, and not diagonally. When you place a star, every one of the eight cells around it can be marked with an ✕ immediately. You solve by alternating between placing stars and crossing out impossible cells until the grid is full.
            </p>
          </div>
        </article>

        {/* Section 3: Why Is It Called Two Not Touch? */}
        <article className="space-y-3">
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
            Why Is It Called Two Not Touch?
          </h2>
          <p className="text-sm sm:text-base leading-relaxed">
            The puzzle was invented in 2003 by Dutch puzzle designer <strong>Hans Eendebak</strong> for the World Puzzle Championship. He called it Star Battle, and that name is still the headline title at the WPC.
          </p>
          <p className="text-sm sm:text-base leading-relaxed">
            American puzzle books and apps, however, adopted a more descriptive title: <strong>Two Not Touch</strong> — because the single most important constraint is that no two stars touch. If you learned it as Star Battle, you already know exactly how to play Two Not Touch. It is the same grid, the same regions, the same non-touching rule — the relationship is worth knowing because many online searchers will use the two names interchangeably.
          </p>
          <p className="text-sm sm:text-base leading-relaxed">
            Wait — there is one more sibling worth knowing: <strong>Queens</strong> (including <em>LinkedIn Queens</em>). Queens is a simpler 1-star cousin of this game: place one queen/crown per row, column, and colored region, with the same no-touching restriction. Two Not Touch with one star per row on an 8&times;8 board is effectively the same logic with geometric shapes instead of colors.
          </p>
        </article>

        {/* Section 4: Play Today's Two Not Touch Puzzle Online */}
        <article className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
            Play Today&apos;s Two Not Touch Puzzle Online
          </h2>
          <p className="text-sm sm:text-base leading-relaxed">
            Prefer paper? The printable generator exports clean A4 worksheets (8&times;8 and 10&times;10) with the solution grid on a separate page — great for road trips and classrooms. <strong>There is no Two Not Touch puzzle PDF sticker sheet here — you make your own, and you can print as many as you like, free.</strong>
          </p>
          <p className="text-sm sm:text-base leading-relaxed">
            Just solved it and want another? Visit the{' '}
            <Link href="/daily/archive" className="text-amber-600 dark:text-amber-400 font-bold underline underline-offset-2 hover:text-amber-500">
              Daily Archive
            </Link>{' '}
            for every past challenge, or drop to a gentler{' '}
            <Link href="/8x8" className="text-amber-600 dark:text-amber-400 font-bold underline underline-offset-2 hover:text-amber-500">
              8&times;8 (1★)
            </Link>{' '}
            grid to warm up before tackling the{' '}
            <Link href="/10x10" className="text-amber-600 dark:text-amber-400 font-bold underline underline-offset-2 hover:text-amber-500">
              10&times;10 Classic (2★)
            </Link>
            . For stuck moments, open the built-in{' '}
            <Link href="/solver" className="text-amber-600 dark:text-amber-400 font-bold underline underline-offset-2 hover:text-amber-500">
              Interactive Solver
            </Link>{' '}
            in a separate tab and feed it the current grid — it shows the next logical step, not just the answer.
          </p>
        </article>

        {/* Section 5: Two Not Touch Printables */}
        <article className="space-y-3">
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
            Two Not Touch Printables
          </h2>
          <p className="text-sm sm:text-base leading-relaxed">
            Prefer solving on paper? Our{' '}
            <Link href="/printable" className="text-amber-600 dark:text-amber-400 font-bold underline underline-offset-2 hover:text-amber-500">
              printable generator
            </Link>{' '}
            exports clean, ad-free A4 worksheets in 8&times;8 and 10&times;10 — perfect for road trips, classroom warm-ups, or tournament practice. Each sheet prints with or without the solution on the back page.
          </p>
        </article>

        {/* Section 6: Two Not Touch vs. Queens vs. Star Battle */}
        <article className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
            Two Not Touch vs. Queens vs. Star Battle
          </h2>
          <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-zinc-100 dark:bg-zinc-900/80 font-bold text-zinc-900 dark:text-zinc-100 border-b border-zinc-200 dark:border-zinc-800">
                <tr>
                  <th className="p-3">Puzzle</th>
                  <th className="p-3">Grid size</th>
                  <th className="p-3">Stars per row</th>
                  <th className="p-3">Key difference</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                <tr className="bg-amber-50/50 dark:bg-amber-950/20">
                  <td className="p-3 font-bold text-amber-600 dark:text-amber-400">Two Not Touch (this game)</td>
                  <td className="p-3">8&times;8, 10&times;10</td>
                  <td className="p-3">1 or 2</td>
                  <td className="p-3">Shape regions, no-touch rule</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-zinc-900 dark:text-white">Star Battle</td>
                  <td className="p-3">8&times;8, 10&times;10, bigger</td>
                  <td className="p-3">1–3</td>
                  <td className="p-3">Same puzzle — different regional branding</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-zinc-900 dark:text-white">Queens</td>
                  <td className="p-3">Depends (often 8x8)</td>
                  <td className="p-3">1</td>
                  <td className="p-3">Colored regions instead of outlined shapes</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            That comparison is deliberately short — the full technique library (pigeonhole counting, 1-cell barriers, corner traps) lives on our{' '}
            <Link href="/how-to-play" className="text-amber-600 dark:text-amber-400 font-bold underline underline-offset-2 hover:text-amber-500">
              Rules & Strategies
            </Link>{' '}
            page. This page is for players who want to <strong>play, not study</strong>.
          </p>
        </article>

        {/* Section 7: FAQ Accordion Section */}
        <article className="space-y-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tight mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            <details className="group rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 p-4 sm:p-5 transition-all open:bg-zinc-50 dark:open:bg-zinc-900">
              <summary className="font-bold text-sm sm:text-base text-zinc-900 dark:text-white cursor-pointer list-none flex items-center justify-between">
                <span>Can stars touch diagonally in Two Not Touch?</span>
                <span className="text-amber-500 transition-transform group-open:rotate-180">▼</span>
              </summary>
              <div className="mt-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed space-y-2 border-t border-zinc-200 dark:border-zinc-800 pt-3">
                <p>
                  No. The no-touch rule applies to all eight surrounding cells — orthogonally and diagonally. Placing a star immediately invalidates <strong>all eight neighbours</strong>: the four cells above, below, left and right, plus the four corner cells.
                </p>
                <p>
                  When you place a star on this site the five strikes are placed for you — but when you solve on paper, get into the habit of crossing out those eight cells yourself. It is the difference between solving a Two Not Touch puzzle in ten minutes and fighting the same 8&times;8 grid for an hour.
                </p>
              </div>
            </details>

            <details className="group rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 p-4 sm:p-5 transition-all open:bg-zinc-50 dark:open:bg-zinc-900">
              <summary className="font-bold text-sm sm:text-base text-zinc-900 dark:text-white cursor-pointer list-none flex items-center justify-between">
                <span>Is Two Not Touch the same as Star Battle?</span>
                <span className="text-amber-500 transition-transform group-open:rotate-180">▼</span>
              </summary>
              <div className="mt-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-200 dark:border-zinc-800 pt-3">
                <p>
                  Yes — same puzzle, two names. &ldquo;Star Battle&rdquo; is the name Hans Eendebak gave the puzzle when it debuted at the 2003 World Puzzle Championship. &ldquo;Two Not Touch&rdquo; is the descriptive North American title that emphasises the rule that gives the puzzle its character: no two stars may touch. If a book, app, or website offers a grid of shaped regions where you place one or two stars per row, column and region with no adjacent stars, you are looking at the same Two Not Touch puzzle regardless of the title on the cover.
                </p>
              </div>
            </details>

            <details className="group rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 p-4 sm:p-5 transition-all open:bg-zinc-50 dark:open:bg-zinc-900">
              <summary className="font-bold text-sm sm:text-base text-zinc-900 dark:text-white cursor-pointer list-none flex items-center justify-between">
                <span>How many stars per row in a 10x10 Two Not Touch puzzle?</span>
                <span className="text-amber-500 transition-transform group-open:rotate-180">▼</span>
              </summary>
              <div className="mt-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-200 dark:border-zinc-800 pt-3">
                <p>
                  A classic 10&times;10 board uses <strong>two stars per row, column and region</strong> — the format used at the World Puzzle Championship. The gentler 8&times;8 format uses <strong>one star per row</strong> and is the standard entry point for new solvers. On this site you will find both: the 🟢 Easy 8&times;8 (1★) sets are labelled clearly, and the 👑 Classic 10&times;10 (2★) challenges publish fresh every day in the Daily Archive.
                </p>
              </div>
            </details>

            <details className="group rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 p-4 sm:p-5 transition-all open:bg-zinc-50 dark:open:bg-zinc-900">
              <summary className="font-bold text-sm sm:text-base text-zinc-900 dark:text-white cursor-pointer list-none flex items-center justify-between">
                <span>Can I play Two Not Touch for free without an app?</span>
                <span className="text-amber-500 transition-transform group-open:rotate-180">▼</span>
              </summary>
              <div className="mt-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-200 dark:border-zinc-800 pt-3">
                <p>
                  Yes — that is exactly what this page is for. You can <strong>play Two Not Touch online</strong> right here in your browser: no app store, no account, no download, no ad breaks. The 8&times;8 and 10&times;10 boards above are fully interactive, the daily puzzle resets every midnight, and the archive lets you replay any past date. If you came here from an app store listing, you have already found the faster option.
                </p>
              </div>
            </details>

            <details className="group rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 p-4 sm:p-5 transition-all open:bg-zinc-50 dark:open:bg-zinc-900">
              <summary className="font-bold text-sm sm:text-base text-zinc-900 dark:text-white cursor-pointer list-none flex items-center justify-between">
                <span>Where can I print Two Not Touch puzzles?</span>
                <span className="text-amber-500 transition-transform group-open:rotate-180">▼</span>
              </summary>
              <div className="mt-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-200 dark:border-zinc-800 pt-3">
                <p>
                  This site has a dedicated <strong>printable generator</strong> that exports clean A4 worksheets at 8&times;8 and 10&times;10, with an optional solution page — the closest thing to a free Two Not Touch puzzles PDF collection. You choose the grid size, the number of puzzles per sheet, and whether solutions print on the back. Perfect for classrooms, road trips, and puzzle clubs that still believe in paper. There is a preview button on the print page, so you can check the sheet before you commit ink.
                </p>
              </div>
            </details>

            <details className="group rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 p-4 sm:p-5 transition-all open:bg-zinc-50 dark:open:bg-zinc-900">
              <summary className="font-bold text-sm sm:text-base text-zinc-900 dark:text-white cursor-pointer list-none flex items-center justify-between">
                <span>Is Two Not Touch in the New York Times?</span>
                <span className="text-amber-500 transition-transform group-open:rotate-180">▼</span>
              </summary>
              <div className="mt-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-200 dark:border-zinc-800 pt-3">
                <p>
                  The New York Times does not currently publish a game called Two Not Touch. The puzzle you will find in NYT games is <strong>Queens</strong>, a simplified 1-star cousin released in 2024, in which you place one queen per row, column and coloured region, with the same no-touching rule. If you enjoy Queens, Two Not Touch is a natural next step — the same logic with fewer hints, because the regions on a Two Not Touch board are uncoloured shapes and the quota can be two stars per line, which makes the deductions deeper.
                </p>
              </div>
            </details>
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
