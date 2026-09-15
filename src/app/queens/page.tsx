import type { Metadata } from 'next';
import Link from 'next/link';
import StarBattleBoard from '@/components/StarBattleBoard';
import puzzleData from '@/data/puzzles.json';

export const metadata: Metadata = {
  title: 'Queens Game Online - Play Free Logic Puzzle (LinkedIn Queens Alternative)',
  description:
    'Play the Queens logic game free online. Place queens so each row, column, and color region contains exactly one queen without touching. Daily boards, solver & hints.',
  alternates: {
    canonical: 'https://starbattleonline.com/queens',
  },
  openGraph: {
    title: 'Queens Game Online - Play Free Logic Puzzle (LinkedIn Queens Alternative)',
    description:
      'Play the Queens logic game free online. Place queens so each row, column, and color region contains exactly one queen without touching. Daily boards, solver & hints.',
    url: 'https://starbattleonline.com/queens',
    siteName: 'Star Battle Online',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Queens Game Online Logic Puzzle',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Queens Game Online - Play Free Logic Puzzle (LinkedIn Queens Alternative)',
    description:
      'Play the Queens logic game free online. Place queens so each row, column, and color region contains exactly one queen without touching. Daily boards, solver & hints.',
    images: ['/og-image.png'],
  },
};

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: 'What are the rules of the Queens game?',
    answer:
      'The Queens game has 4 simple rules: 1) Exactly one queen must be placed in each row. 2) Exactly one queen must be placed in each column. 3) Exactly one queen must be placed in each colored region. 4) No two queens may touch each other horizontally, vertically, or diagonally (all 8 surrounding cells are forbidden).',
  },
  {
    question: 'Can queens touch diagonally in the Queens game?',
    answer:
      'No. Just like the classic Two Not Touch and Star Battle rules, queens cannot touch diagonally. Placing a queen immediately marks all eight adjacent cells (including the four corner diagonals) as forbidden (X).',
  },
  {
    question: 'Is the Queens game the same as Star Battle or Two Not Touch?',
    answer:
      'Yes, mathematically and logically they are identical. The Queens game popularized by LinkedIn is the 1-star variant of Star Battle (originally invented by Hans Eendebak at the 2003 World Puzzle Championship). Two Not Touch is the 2-star variant where two items are placed per row, column, and region.',
  },
  {
    question: "How do I get today's Queens game solution or answers?",
    answer:
      "If you are stuck on today's Queens puzzle, you can use our free interactive Queens Solver (/solver). Simply select your grid size, enter the region layout, and click Solve to see the computer-verified solution step-by-step without guessing.",
  },
  {
    question: 'Do Queens puzzles require guessing (bifurcation)?',
    answer:
      'On Star Battle Online, every single puzzle is computer-verified to possess exactly one unique solution solvable strictly through human logical deduction. Unlike inferior random generators that force players into bifurcation or trial-and-error, zero guessing is required.',
  },
  {
    question: 'Is the Queens game free to play without an account?',
    answer:
      'Yes. You can play unlimited Queens and Star Battle puzzles directly in your web browser with no account creation, no app download, and no invasive video interruptions. It works smoothly on desktop, tablet, and mobile touchscreens.',
  },
];

export default function QueensPage() {
  const practice8x8List = (puzzleData as any).practice8x8 || [];
  const samplePuzzle = practice8x8List[0] || {
    id: 'queens-default',
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
            name: 'Queens Game',
            item: 'https://starbattleonline.com/queens',
          },
        ],
      },
      {
        '@type': 'Game',
        name: 'Queens Game Online - Free Daily Logic Puzzle',
        alternateName: ['LinkedIn Queens Alternative', 'Star Battle 1-Star', 'Crowns Logic Game'],
        description:
          'Play the Queens logic game online free. Place queens so each row, column, and color region has exactly one queen with no two queens touching, not even diagonally. Zero ads, instant in-browser play, and step-by-step solver.',
        url: 'https://starbattleonline.com/queens',
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="text-xs text-zinc-500 dark:text-zinc-400 mb-6">
          <ol className="flex items-center gap-1.5 flex-wrap">
            <li>
              <Link href="/" className="hover:text-amber-500 transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="text-zinc-800 dark:text-zinc-200 font-medium" aria-current="page">
              Queens Game
            </li>
          </ol>
        </nav>

        {/* Hero Section */}
        <header className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/70 border border-amber-300 dark:border-amber-800/80 text-amber-800 dark:text-amber-300 text-xs font-bold mb-3 shadow-sm">
            <span>👑</span>
            <span>Daily Logic Puzzle • 100% Free Web Version</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            Queens Game Online
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            The addictive daily grid puzzle where you place crowns across colorful kingdoms. Exactly{' '}
            <strong className="text-zinc-900 dark:text-white font-semibold">one queen per row, column, and color region</strong>—with zero touching, not even diagonally.
          </p>

          {/* Feature Highlights Pills */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 mt-4 flex-wrap text-xs text-zinc-500 dark:text-zinc-400">
            <span className="flex items-center gap-1">
              <span className="text-emerald-500 font-bold">✓</span> No LinkedIn Login
            </span>
            <span className="flex items-center gap-1">
              <span className="text-emerald-500 font-bold">✓</span> Zero Guessing Guaranteed
            </span>
            <span className="flex items-center gap-1">
              <span className="text-emerald-500 font-bold">✓</span> Touch & Desktop Friendly
            </span>
            <span className="flex items-center gap-1">
              <span className="text-emerald-500 font-bold">✓</span> Interactive Solver Included
            </span>
          </div>
        </header>

        {/* Interactive Game Board */}
        <section className="mb-14" aria-label="Interactive Queens Game Board">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-4 sm:p-8 shadow-xl shadow-zinc-200/50 dark:shadow-black/60">
            <div className="flex items-center justify-between mb-4 border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <span>👑</span>
                  <span>Queens Practice Board (8x8)</span>
                </h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Tap or click to place a Queen (👑), right-click or drag to mark Crosses (✕).
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href="/solver"
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 transition-all"
                >
                  Need Hints? Open Solver →
                </Link>
              </div>
            </div>

            <StarBattleBoard
              size={samplePuzzle.size || 8}
              starsRequired={1}
              regions={samplePuzzle.regions}
              solution={samplePuzzle.solution}
              puzzleId={samplePuzzle.id || 'queens-practice-1'}
              markerType="queen"
            />
          </div>
        </section>

        {/* Guide & Knowledge Content (SEO Anchor Content) */}
        <article className="prose prose-zinc dark:prose-invert max-w-none space-y-12">
          {/* Section 1: Rules */}
          <section className="bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800 rounded-3xl p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2.5">
              <span>📜</span>
              <span>How to Play the Queens Game: 4 Golden Rules</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed mb-4">
              The Queens game is an elegant pencil-and-paper logic puzzle that challenges spatial reasoning and deductive logic. While the board may look like a colorful checkerboard, your objective is strictly defined:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose my-6">
              <div className="p-4 rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/80 shadow-sm">
                <div className="font-bold text-amber-600 dark:text-amber-400 mb-1 text-sm flex items-center gap-1.5">
                  <span>1.</span> One Queen per Row
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-300">
                  Every horizontal row on the board must contain exactly one queen.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/80 shadow-sm">
                <div className="font-bold text-amber-600 dark:text-amber-400 mb-1 text-sm flex items-center gap-1.5">
                  <span>2.</span> One Queen per Column
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-300">
                  Every vertical column on the board must contain exactly one queen.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/80 shadow-sm">
                <div className="font-bold text-amber-600 dark:text-amber-400 mb-1 text-sm flex items-center gap-1.5">
                  <span>3.</span> One Queen per Color Region
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-300">
                  Every irregularly shaped color region (kingdom) must contain exactly one queen.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/80 shadow-sm">
                <div className="font-bold text-rose-600 dark:text-rose-400 mb-1 text-sm flex items-center gap-1.5">
                  <span>4.</span> No Diagonal or Orthogonal Touching
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-300">
                  Queens cannot touch each other in any of the 8 surrounding cells—not even at corner diagonals.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Origin & Relationship with Star Battle */}
          <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm">
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2.5">
              <span>🏛️</span>
              <span>The History: From World Championships to LinkedIn Queens</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed mb-4">
              Many players discovered this puzzle format through LinkedIn News’ viral release of <em>Queens</em> in May 2024. However, the puzzle format has a rich competitive heritage dating back over two decades.
            </p>
            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed mb-4">
              In 2003, Dutch puzzle designer <strong>Hans Eendebak</strong> introduced the game under the name <strong>Star Battle</strong> at the World Puzzle Championship. In North America, the puzzle was popularized by legendary puzzler Jim Bumgardner (KrazyDad) as <strong>Two Not Touch</strong> (referring to the classic 2-star variant where two stars are placed per row and region).
            </p>
            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
              When LinkedIn reimagined the game for quick daily digital play, they adopted the single-star rule (1 queen per region) and renamed the stars to crowns/queens. Whether you call it <strong>Queens</strong>, <strong>Star Battle (1★)</strong>, or <strong>Two Not Touch</strong>, the underlying logic engine and deduction strategies remain 100% identical.
            </p>
          </section>

          {/* Section 3: The Zero-Guess Differentiator */}
          <section className="bg-gradient-to-br from-amber-500/10 via-zinc-50 to-zinc-50 dark:from-amber-950/30 dark:via-zinc-900 dark:to-zinc-900 border border-amber-300/40 dark:border-amber-800/40 rounded-3xl p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2.5">
              <span>🎯</span>
              <span>Why We Guarantee Zero Guessing (No Bifurcation)</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed mb-4">
              If you have played auto-generated puzzle sites like <em>puzzle-star-battle.com</em>, you have likely encountered the infuriating situation where logic runs dry and you are forced to make a random guess (bifurcation), hoping it doesn&apos;t lead to an impossible contradiction 10 steps later. Worse, unvetted generators often output boards with multiple conflicting solutions.
            </p>
            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed mb-4">
              On <strong>Star Battle Online</strong>, we take mathematical puzzle integrity seriously:
            </p>
            <ul className="list-disc pl-5 text-sm text-zinc-700 dark:text-zinc-300 space-y-2 mb-4">
              <li>
                <strong>Computer-Verified Unique Solution</strong>: Every single puzzle is tested against our constraint solver to prove mathematically that exactly one solution exists.
              </li>
              <li>
                <strong>100% Human Logical Solvability</strong>: Puzzles are checked by human heuristic emulators. If a board cannot be cracked step-by-step using region overlaps, pigeonhole bounds, and touch exclusions, it is rejected before publishing.
              </li>
              <li>
                <strong>Zero Trial-and-Error</strong>: You will never be forced to guess. Every single queen placement can be deduced with absolute logical certainty.
              </li>
            </ul>
          </section>

          {/* Section 4: Daily Answers & Interactive Solver */}
          <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm">
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2.5">
              <span>🔍</span>
              <span>Queens Answers Today: How to Solve Any Daily Board</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed mb-4">
              Searching for <em>queens answers today</em> or stuck on a tricky LinkedIn Queens puzzle? Rather than copying a static screenshot of the answer, you can use our free interactive{' '}
              <Link href="/solver" className="text-amber-600 dark:text-amber-400 font-bold hover:underline">
                Star Battle & Queens Solver (/solver)
              </Link>{' '}
              to see the step-by-step deduction path.
            </p>
            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 my-4 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 space-y-2">
              <p className="font-semibold text-zinc-900 dark:text-white">Three Pro Tips for Solving Daily Queens Puzzles:</p>
              <ol className="list-decimal pl-5 space-y-1.5">
                <li>
                  <strong>Aggressive Cross Elimination</strong>: As soon as you place a Queen, immediately mark all 8 surrounding cells with an ✕. You eliminate up to 8 cells in a single move!
                </li>
                <li>
                  <strong>Corner & Edge Bottlenecks</strong>: Regions tucked into corners (like a 2x1 or 2x2 corner block) drastically restrict where neighboring queens can sit. Start your deduction in the tightest regions.
                </li>
                <li>
                  <strong>The Pigeonhole Principle</strong>: If two entire rows are covered by only two color regions, those two regions cannot place queens anywhere outside those two rows. This instantly clears dozens of cells across neighboring columns.
                </li>
              </ol>
            </div>
            <div className="mt-6 text-center">
              <Link
                href="/solver"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-lg shadow-amber-500/25 transition-all"
              >
                <span>🚀</span>
                <span>Open Interactive Queens Solver</span>
              </Link>
            </div>
          </section>

          {/* Section 5: FAQ Section */}
          <section className="bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800 rounded-3xl p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2.5">
              <span>❓</span>
              <span>Frequently Asked Questions (FAQ)</span>
            </h2>
            <div className="space-y-4 not-prose">
              {FAQS.map((faq, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/80 shadow-sm"
                >
                  <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-2 flex items-start gap-2">
                    <span className="text-amber-500 font-extrabold">Q:</span>
                    <span>{faq.question}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed pl-6">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 6: Related Game Modes & Internal Links */}
          <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm not-prose">
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
              <span>🎮</span>
              <span>Explore More Logic Puzzle Modes</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link
                href="/"
                className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 hover:border-amber-400 dark:hover:border-amber-500 transition-all group"
              >
                <div className="text-amber-500 font-black text-lg mb-1 group-hover:scale-105 transition-transform">
                  ★ Daily Star Battle
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Play today&apos;s featured 10x10 two-star tournament puzzle.
                </p>
              </Link>
              <Link
                href="/two-not-touch"
                className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 hover:border-amber-400 dark:hover:border-amber-500 transition-all group"
              >
                <div className="text-amber-500 font-black text-lg mb-1 group-hover:scale-105 transition-transform">
                  ✌️ Two Not Touch
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Read the comprehensive 2-star guide and practice classic grids.
                </p>
              </Link>
              <Link
                href="/printable"
                className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 hover:border-amber-400 dark:hover:border-amber-500 transition-all group"
              >
                <div className="text-amber-500 font-black text-lg mb-1 group-hover:scale-105 transition-transform">
                  🖨️ Printable Puzzles
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Download free printable PDF puzzle worksheets for offline solving.
                </p>
              </Link>
            </div>
          </section>
        </article>
      </div>
    </>
  );
}
