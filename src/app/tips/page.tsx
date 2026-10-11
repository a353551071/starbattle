import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Star Battle Tips & Techniques | Solve Two Not Touch Without Guessing',
  description:
    'Eight field-tested Star Battle techniques — the 2×2 rule, L-triomino corner trap, pigeonhole counting, region scarcity and more. Solve any Two Not Touch puzzle with pure logic, zero guessing.',
  alternates: {
    canonical: 'https://starbattleonline.com/tips',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Are Star Battle puzzles always solvable without guessing?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — every puzzle on StarBattleOnline is verified by a computer solver to have exactly one solution, which guarantees a pure logic path from the first move to the last. If you ever feel forced to guess, re-check the techniques on this page: there is always a deduction you have missed.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the hardest Star Battle technique?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most players find pigeonhole counting the hardest to apply mentally, because it requires tracking star counts across two rows or columns at once. Practice it on 10x10 two-star puzzles, where the accounting is richest and the payoff is largest.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I get better at Two Not Touch fast?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Do two things on every puzzle: mark all eight neighbors of every star the moment you place it, and run a quick pigeonhole audit on adjacent row pairs after each placement. Turning both into reflexes removes the two most common sources of error.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do these techniques work for LinkedIn Queens too?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. LinkedIn Queens follows the same rule family as Star Battle — one queen per row, column and region, with no touching. The neighborhood, scarcity and pigeonhole techniques here transfer directly.',
      },
    },
  ],
};

export default function TipsPage() {
  return (
    <article className="max-w-3xl mx-auto py-6 prose dark:prose-invert prose-amber text-zinc-800 dark:text-zinc-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="mb-8 not-prose">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-500">Strategy Deep Dive</span>
        <h1 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white tracking-tight mt-1 mb-3">
          Star Battle Tips &amp; Techniques
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          The complete toolbox for solving <strong>Star Battle</strong> / <strong>Two Not Touch</strong> puzzles with pure logic. Every technique below is a
          deduction — no guessing required. Master them in order: the first three solve most 8x8 puzzles on their own, and the rest crack the harder 10x10
          two-star grids. New to the puzzle? Start with the{' '}
          <Link href="/how-to-play" className="text-amber-500 font-semibold hover:underline">
            rules guide
          </Link>{' '}
          first.
        </p>
      </div>

      <hr className="border-zinc-200 dark:border-zinc-800 my-8" />

      <section className="space-y-4">
        <h2 className="text-2xl font-black text-zinc-900 dark:text-white">1. Mark Every Neighbor the Moment You Place a Star</h2>
        <p>
          This is not a tip — it is the discipline that everything else depends on. The moment a star goes down, all eight surrounding cells (including the
          diagonals) are dead. Cross them out immediately. Nearly every wrong answer in Star Battle traces back to a forgotten diagonal neighbor, not to a
          failed deep deduction.
        </p>
        <p>
          Do the same in reverse: whenever you cross a cell out for an unrelated reason, glance at its region. A region whose usable cells are dropping toward
          its star quota is about to give you free information.
        </p>
      </section>

      <section className="space-y-4 pt-6">
        <h2 className="text-2xl font-black text-zinc-900 dark:text-white">2. The 2×2 Rule: At Most One Star in Any 2×2 Block</h2>
        <p>
          Any 2×2 block of cells can hold at most one star — two stars inside a 2×2 would always touch. This single observation powers two workhorse
          deductions:
        </p>
        <ul>
          <li>
            <strong>One star placed, three cells die.</strong> If a star sits anywhere in a 2×2 block, the other three cells of that block can never hold a
            star. In corners and along edges this cascades fast.
          </li>
          <li>
            <strong>Corner shrinkage.</strong> A star in a corner cell only eliminates three cells — the cheapest placement on the board. When a region hugs a
            corner, enumerate its options there first; corner-forced stars are the easiest to prove.
          </li>
        </ul>
      </section>

      <section className="space-y-4 pt-6">
        <h2 className="text-2xl font-black text-zinc-900 dark:text-white">3. The L-Triomino Trap: The Outer Corner Is Always Empty</h2>
        <p>
          An L-shaped region of exactly three cells is the most famous shape in Star Battle. Take the three cells of the L, plus the fourth cell that would
          complete the 2×2 square (the &ldquo;outer corner&rdquo;). Wherever the region&apos;s star goes inside the L, that outer corner cell is always
          eliminated:
        </p>
        <ul>
          <li>Star on either arm of the L → the outer corner touches it diagonally or orthogonally → dead.</li>
          <li>Star on the elbow of the L → the outer corner touches it diagonally → dead.</li>
        </ul>
        <p>
          So the outer corner of every L-triomino can be crossed out for free, before you know anything else. On dense 8x8 boards, finding two or three of
          these in the opening minute is common — free eliminations that often crack a region wide open.
        </p>
      </section>

      <section className="space-y-4 pt-6">
        <h2 className="text-2xl font-black text-zinc-900 dark:text-white">4. Region Scarcity: Count the Surviving Cells</h2>
        <p>
          After your opening eliminations, audit every region against its quota (one star on 8x8, two on 10x10):
        </p>
        <ul>
          <li>
            <strong>Survivors equal the quota?</strong> Every surviving cell in that region is a star. Place them, then kill all their neighbors — this is the
            single most profitable trigger in the game.
          </li>
          <li>
            <strong>Straight triomino (three cells in a line, one-star rules)?</strong> The star must be the middle cell: an end placement would eliminate the
            other end <em>and</em> the middle, leaving the region with nowhere to spend its star.
          </li>
          <li>
            <strong>Two survivors, one star?</strong> Both cells&apos; common neighbors die — the star will sit on one of them, and anything touching both
            options is eliminated regardless.
          </li>
        </ul>
      </section>

      <section className="space-y-4 pt-6">
        <h2 className="text-2xl font-black text-zinc-900 dark:text-white">5. Pigeonhole Counting: The Two-Row Ledger</h2>
        <p>
          The signature technique of two-star (10x10) puzzles. Pick any two adjacent rows: together they must contain exactly four stars. Now ask where those
          four stars can live:
        </p>
        <ul>
          <li>
            <strong>Two full regions inside the pair of rows?</strong> Those two regions already account for all four stars. Every other cell in the two rows
            — regardless of region — can be crossed out instantly.
          </li>
          <li>
            <strong>One full region inside, plus most of a second?</strong> The partial region must place its remaining stars inside the pair. If that leaves
            exactly one candidate cell per remaining star, those cells are forced.
          </li>
          <li>
            <strong>Run it on columns too.</strong> The ledger works identically on adjacent column pairs, and the two directions cross-check each other.
          </li>
        </ul>
        <p>
          Do a pigeonhole audit after every star you place. It costs seconds and routinely uncovers eliminations that cell-by-cell scanning will never find.
        </p>
      </section>

      <section className="space-y-4 pt-6">
        <h2 className="text-2xl font-black text-zinc-900 dark:text-white">6. Boundary Tracing: Follow the Thick Lines</h2>
        <p>
          Cells on both sides of a region border often share eliminations. When a star lands near a border, trace the border outward: neighboring regions lose
          the mirrored cells on their side. Long straight borders between two regions are especially productive — a star anywhere along one side eliminates a
          whole stripe of candidates on the other, and vice versa. When two regions interlock like puzzle pieces, their remaining options constrain each other
          so tightly that one forced star usually resolves the entire pair.
        </p>
      </section>

      <section className="space-y-4 pt-6">
        <h2 className="text-2xl font-black text-zinc-900 dark:text-white">7. The Quota-Arithmetic Sanity Check</h2>
        <p>
          Stuck boards usually hide an arithmetic error. Quick audit: count the stars you have placed per row, per column, and per region. In a two-star
          puzzle, a row with two stars already placed should have every remaining cell crossed out — if you find a live cell there, either your marks are stale
          or one of those stars is wrong. The same check catches regions that are accidentally holding more stars than their quota. Thirty seconds of
          bookkeeping, done twice per puzzle, prevents almost all late-game dead ends.
        </p>
      </section>

      <section className="space-y-4 pt-6">
        <h2 className="text-2xl font-black text-zinc-900 dark:text-white">8. When You Feel Forced to Guess, Don&apos;t</h2>
        <p>
          Every puzzle on this site is <Link href="/puzzle-quality" className="text-amber-500 font-semibold hover:underline">computer-verified to have exactly one solution</Link>,
          which means a complete logic path always exists. If the board looks exhausted, the deduction you are missing is almost always one of:
        </p>
        <ul>
          <li>a stale elimination — a cell that should be crossed out after your last star but wasn&apos;t (Technique 1);</li>
          <li>an un-audited row/column pair with hidden pigeonhole value (Technique 5);</li>
          <li>a two-survivor region whose common neighbors you haven&apos;t killed (Technique 4).</li>
        </ul>
        <p>
          Guessing on a unique-solution puzzle is always a habit problem, never a necessity. If you want to verify a finished or stubborn board, the{' '}
          <Link href="/solver" className="text-amber-500 font-semibold hover:underline">
            solver
          </Link>{' '}
          will compute the solution and confirm it matches.
        </p>
      </section>

      <section className="space-y-4 pt-6" id="faq">
        <h2 className="text-2xl font-black text-zinc-900 dark:text-white">Frequently Asked Questions</h2>
        <div className="space-y-4 not-prose">
          {faqSchema.mainEntity.map((item) => (
            <details
              key={item.name}
              className="group bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-5 py-4"
            >
              <summary className="font-bold text-zinc-900 dark:text-white cursor-pointer list-none flex items-center justify-between gap-3">
                {item.name}
                <span className="text-amber-500 transition-transform group-open:rotate-45 text-xl leading-none">+</span>
              </summary>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-3 leading-relaxed">{item.acceptedAnswer.text}</p>
            </details>
          ))}
        </div>
      </section>

      <hr className="border-zinc-200 dark:border-zinc-800 my-8" />

      <section className="not-prose bg-gradient-to-br from-amber-50 to-orange-50 dark:from-zinc-900 dark:to-zinc-800 border border-amber-200/60 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 text-center">
        <h2 className="text-2xl font-black text-zinc-900 dark:text-white">Put the Techniques to Work</h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-5">
          Fresh puzzle every day, plus unlimited practice grids and a printable archive for offline drilling.
        </p>
        <div className="flex flex-wrap justify-center gap-3 text-sm font-bold">
          <Link href="/daily/archive" className="bg-amber-500 hover:bg-amber-400 text-white px-5 py-2.5 rounded-xl transition-colors">
            Today&apos;s Puzzle
          </Link>
          <Link href="/8x8" className="bg-white/80 dark:bg-zinc-800 hover:bg-white dark:hover:bg-zinc-700 text-zinc-900 dark:text-white px-5 py-2.5 rounded-xl transition-colors border border-zinc-200 dark:border-zinc-700">
            Practice 8×8
          </Link>
          <Link href="/printable" className="bg-white/80 dark:bg-zinc-800 hover:bg-white dark:hover:bg-zinc-700 text-zinc-900 dark:text-white px-5 py-2.5 rounded-xl transition-colors border border-zinc-200 dark:border-zinc-700">
            Printable PDFs
          </Link>
        </div>
      </section>
    </article>
  );
}
