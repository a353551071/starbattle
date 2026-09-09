import Link from 'next/link';
import HomePuzzleHero from '@/components/HomePuzzleHero';

export default function HomePage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the difference between Star Battle and Two Not Touch?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Star Battle and Two Not Touch refer to the exact same logic puzzle. The name "Star Battle" was coined by Dutch puzzle designer Hans Eendebak when the puzzle debuted at the 2003 World Puzzle Championship. In North America and various puzzle publications, it is commonly titled "Two Not Touch" to emphasize the primary constraint: no two stars may touch horizontally, vertically, or diagonally.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can stars touch diagonally in Star Battle?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. The non-touching rule in Star Battle applies to all eight surrounding neighboring cells. Placing a star in any cell immediately eliminates the four orthogonally adjacent cells (top, bottom, left, right) and all four diagonally adjacent corner cells.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does every daily puzzle have a unique verified solution?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Every puzzle featured on Star Battle Online is mathematically verified using constraint propagation and lookahead pruning to ensure exactly one unique solution exists. Guessing or trial-and-error is never required.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is guessing ever required in Star Battle?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. All properly constructed Star Battle puzzles can be solved entirely through deductive logic. If you find yourself guessing (bifurcating), you have likely overlooked a row-region counting deduction, a pigeonhole overlap, or an adjacent exclusion trap.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the best starting move in a 10x10 2-star puzzle?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The best opening strategy is to inspect narrow regions that span only one or two rows or columns. In a 2-star puzzle, any region constrained within two rows can absorb at most two stars. If two distinct regions both lie entirely inside the same two rows, all other cells in those two rows can be crossed out immediately.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does Star Battle compare to Sudoku and Queens?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'While Sudoku is based on placing numbers 1 through 9 into subgrids without duplicates, Star Battle is a purely spatial, binary deduction puzzle (each cell either contains a star or an elimination cross). LinkedIn Queens is a 1-star variation where each row, column, and colored region contains exactly one queen with no diagonal touching.',
        },
      },
    ],
  };

  return (
    <div className="flex flex-col items-center">
      {/* FAQ Schema for Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Interactive Puzzle Hero (Client Component) */}
      <HomePuzzleHero />

      {/* Quick Navigation Cards Below Board */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl mt-12 mb-16">
        <Link
          href="/daily/archive"
          className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-amber-500/50 hover:shadow-lg transition-all group"
        >
          <div className="text-xl mb-1 group-hover:scale-110 transition-transform w-fit">📅</div>
          <div className="font-bold text-sm text-zinc-900 dark:text-white">Daily Archive</div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400">Play past daily challenges from earlier dates</div>
        </Link>

        <Link
          href="/solver"
          className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-amber-500/50 hover:shadow-lg transition-all group"
        >
          <div className="text-xl mb-1 group-hover:scale-110 transition-transform w-fit">⚡</div>
          <div className="font-bold text-sm text-zinc-900 dark:text-white">Interactive Solver</div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400">Instant step-by-step solver for any grid</div>
        </Link>

        <Link
          href="/how-to-play"
          className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-amber-500/50 hover:shadow-lg transition-all group"
        >
          <div className="text-xl mb-1 group-hover:scale-110 transition-transform w-fit">📖</div>
          <div className="font-bold text-sm text-zinc-900 dark:text-white">Rules & Strategies</div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400">Master 2-star logic tricks, traps, and deductions</div>
        </Link>
      </div>

      {/* Deep Educational & Strategic Content (1,400+ Words SEO Text Stream) */}
      <section className="w-full max-w-3xl border-t border-zinc-200 dark:border-zinc-800 pt-12 space-y-12 text-zinc-700 dark:text-zinc-300">
        {/* Section 1: Introduction & Origin */}
        <article className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
            What is Star Battle (Two Not Touch)?
          </h2>
          <p className="text-sm sm:text-base leading-relaxed">
            <strong>Star Battle</strong>—widely recognized across the United States as <Link href="/two-not-touch" className="font-bold text-amber-600 dark:text-amber-400 underline underline-offset-2 hover:text-amber-500 transition-colors">Two Not Touch</Link>—is an internationally acclaimed pencil-and-paper logic puzzle celebrated for its elegant simplicity and profound mathematical depth. Unlike number-placement puzzles such as Sudoku or Kakuro, Star Battle is a purely spatial, binary constraint-satisfaction challenge. There are no arithmetic calculations, no numerical sequences, and no arbitrary guesswork. Every deduction is rooted in geometry, counting parity, and non-touching spatial exclusions.
          </p>
          <p className="text-sm sm:text-base leading-relaxed">
            The puzzle was originally conceived in 2003 by the legendary Dutch puzzle architect <strong>Hans Eendebak</strong> for the 12th World Puzzle Championship (WPC) held in Arnhem, Netherlands. Since its international tournament debut, Star Battle has grown into one of the core competitive events administered by the World Puzzle Federation (WPF). Over the past two decades, its popularity has exploded worldwide, inspiring newspaper puzzle columns, educational math competitions, and digital adaptations like <em>LinkedIn Queens</em> and mobile variants.
          </p>
          <p className="text-sm sm:text-base leading-relaxed">
            A standard Star Battle grid consists of an N &times; N square matrix partitioned into exactly N distinct, contiguous geometric shapes termed &ldquo;regions&rdquo; or &ldquo;rooms&rdquo;. Your objective is deceptively straightforward: strategically place a designated number of stars (K stars per unit, where typically K = 1 for beginner 8 &times; 8 boards and K = 2 for classic 10 &times; 10 tournament boards) such that every row, every column, and every bordered region contains the exact required star quota.
          </p>
        </article>

        {/* Section 2: Complete Rules & The "Two Not Touch" Adjacency Principle */}
        <article className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
            The Fundamental Rules of Star Battle
          </h2>
          <p className="text-sm sm:text-base leading-relaxed">
            To solve any Star Battle puzzle successfully, you only need to master three interrelated, immutable constraints:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
            <div className="p-5 rounded-2xl bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800">
              <div className="text-amber-500 font-black text-lg mb-2">1. Row Quota</div>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Every horizontal row must contain exactly K stars (e.g., exactly 2 stars in classic 10x10). No row may have fewer or more stars.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800">
              <div className="text-amber-500 font-black text-lg mb-2">2. Column Quota</div>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Every vertical column must contain exactly K stars. Star distribution is balanced across the entire width of the grid.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800">
              <div className="text-amber-500 font-black text-lg mb-2">3. Region Quota</div>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Each boldly outlined polyomino region must contain exactly K stars, regardless of its shape, size, or orientation.
              </p>
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-sm leading-relaxed">
            <h3 className="font-black text-base mb-1 text-amber-700 dark:text-amber-300">The Core Adjacency Rule: No Two Stars May Touch</h3>
            <p>
              This is the defining rule that gives the puzzle its name, <Link href="/two-not-touch" className="font-bold underline underline-offset-2 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Two Not Touch</Link>. Stars cannot be placed in adjacent cells in any direction: horizontally, vertically, or <strong>diagonally</strong>. When you confirm a star in a cell at coordinate $(r, c)$, all eight surrounding cells $(r \pm 1, c \pm 1)$ are instantly invalidated and must be marked with a cross (✕). This diagonal restriction is crucial—it turns simple line packing into an intricate web of geometric blockades.
            </p>
          </div>
        </article>

        {/* Section 3: Essential Solving Techniques & Mathematical Deductions */}
        <article className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
            Master Solving Strategies & Deductive Techniques
          </h2>
          <p className="text-sm sm:text-base leading-relaxed">
            Novice players often struggle because they attempt to randomly guess placements. Experienced tournament solvers never guess. They use rigorous constraint propagation techniques to eliminate impossible cells. Here are the four master techniques used by champion solvers:
          </p>

          <div className="space-y-5">
            <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
              <h3 className="font-bold text-base text-zinc-900 dark:text-white flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-amber-500 text-zinc-950 text-xs font-black">Technique 1</span>
                <span>The Pigeonhole Overlap Deduction (Line-Region Reduction)</span>
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Consider a 2-star puzzle on a 10 &times; 10 board. Because stars cannot touch, any region confined within two adjacent rows (for example, rows 1 and 2) can hold at most 2 stars. If you identify two distinct regions that are both completely contained within rows 1 and 2, those two regions together require 2 + 2 = 4 stars. Since rows 1 and 2 collectively require exactly 4 stars (2 stars/row &times; 2 rows = 4 stars total), all 4 stars for those two rows must reside inside those two regions! Consequently, every other cell in rows 1 and 2 outside those two regions can be immediately eliminated with a cross (✕).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
              <h3 className="font-bold text-base text-zinc-900 dark:text-white flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-amber-500 text-zinc-950 text-xs font-black">Technique 2</span>
                <span>The 1-Cell Thickness Barrier & Squeeze Logic</span>
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                If a region or a subset of a region forms a straight corridor of 3 cells (for example cells at col 1, col 2, col 3 on row r), notice what happens if you place a star in the middle cell (r, 2). The middle star eliminates both adjacent neighbors (r, 1) and (r, 3). Thus, a 3-cell linear strip can contain at most one star. More generally, a linear strip of length L can contain at most ⌈L / 2⌉ stars. If a 2-star region has only 4 available cells in a line, you know the stars must occupy alternating positions.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
              <h3 className="font-bold text-base text-zinc-900 dark:text-white flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-amber-500 text-zinc-950 text-xs font-black">Technique 3</span>
                <span>Corner Traps & Diagonal Star Formations</span>
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                In a 2 &times; 2 square block of four cells, you can place at most one star. If you placed two stars in a 2 &times; 2 block, they would either be in the same row, the same column, or touch diagonally—all of which are illegal. If a region has a 2 &times; 2 block that must contain a star, any cell outside that block that touches all four cells diagonally or orthogonally cannot contain a star.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
              <h3 className="font-bold text-base text-zinc-900 dark:text-white flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-amber-500 text-zinc-950 text-xs font-black">Technique 4</span>
                <span>Global Parity Counting (Row-Column Alignment)</span>
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                When isolated deductions stall, step back and examine the top 3 rows or the leftmost 3 columns. The top 3 rows of a 10 &times; 10 board require exactly 3 &times; 2 = 6 stars. Count how many regions intersect those 3 rows. If 3 regions are fully enclosed within those rows, and a 4th region has only 2 cells peeking into row 4, counting the total star capacity immediately tells you whether stars must be inside or outside the overflow cells.
              </p>
            </div>
          </div>
        </article>

        {/* Section 4: Star Battle vs Other Logic Puzzles */}
        <article className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
            How Star Battle Compares to Sudoku and Queens
          </h2>
          <p className="text-sm sm:text-base leading-relaxed">
            Many puzzle enthusiasts discover Star Battle after seeking alternatives to classical number games. While both share grid-based constraints, their cognitive demands differ significantly:
          </p>
          <div className="overflow-x-auto my-4">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900">
                  <th className="p-3 font-bold text-zinc-900 dark:text-white">Puzzle Type</th>
                  <th className="p-3 font-bold text-zinc-900 dark:text-white">Core Elements</th>
                  <th className="p-3 font-bold text-zinc-900 dark:text-white">Primary Constraint</th>
                  <th className="p-3 font-bold text-zinc-900 dark:text-white">Thinking Style</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                <tr>
                  <td className="p-3 font-semibold text-amber-600 dark:text-amber-400">Star Battle (Two Not Touch)</td>
                  <td className="p-3">Stars & Eliminations (Binary)</td>
                  <td className="p-3">Quota per line/room + <strong>No diagonal contact</strong></td>
                  <td className="p-3">Pure spatial deduction & region overlap counting</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-zinc-900 dark:text-zinc-200">Classic Sudoku</td>
                  <td className="p-3">Digits 1 through 9</td>
                  <td className="p-3">No duplicate numbers in row, column, or 3 &times; 3 box</td>
                  <td className="p-3">Set elimination & numerical candidate tracking</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-zinc-900 dark:text-zinc-200">LinkedIn Queens</td>
                  <td className="p-3">Crowns/Queens (1 per unit)</td>
                  <td className="p-3">1 Queen per row, col, color + no diagonal touch</td>
                  <td className="p-3">Simplified 1-star variation with colored shapes</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-zinc-900 dark:text-zinc-200">Nonograms / Picross</td>
                  <td className="p-3">Filled Blocks vs Crosses</td>
                  <td className="p-3">Run-length clues on row and column headers</td>
                  <td className="p-3">Line-by-line overlap shading and pixel art reveal</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Because Star Battle requires zero numerical calculation, it is universally accessible across language barriers and age groups, making it a favorite tool among mathematics educators for cultivating deductive reasoning in students.
          </p>
        </article>

        {/* Section 5: Built-in Features & Free Tools */}
        <article className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
            Play Online or Solve on Paper: Our Free Platform Features
          </h2>
          <p className="text-sm sm:text-base leading-relaxed">
            Star Battle Online is engineered from the ground up for serious puzzle lovers who value speed, clean design, and complete freedom from intrusive advertisements:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40">
              <h3 className="font-bold text-zinc-900 dark:text-white text-sm mb-1">⭐ Fresh Daily Challenges</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                A brand-new handcrafted 10x10 puzzle released every midnight with full streak tracking and historical archive access.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40">
              <h3 className="font-bold text-zinc-900 dark:text-white text-sm mb-1">⚡ 15ms Interactive Solver</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Input custom grid configurations into our <Link href="/solver" className="text-amber-500 hover:underline">online solver</Link> to inspect step-by-step logic proofs.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40">
              <h3 className="font-bold text-zinc-900 dark:text-white text-sm mb-1">🎯 Multiple Size Formats</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Progress smoothly from gentle <Link href="/8x8" className="text-amber-500 hover:underline">8x8 1-star grids</Link> to championship-grade <Link href="/10x10" className="text-amber-500 hover:underline">10x10 2-star puzzles</Link>.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40">
              <h3 className="font-bold text-zinc-900 dark:text-white text-sm mb-1">🖨️ Clean Printable Worksheets</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Export crisp, ad-free A4 PDF sheets via our <Link href="/printable" className="text-amber-500 hover:underline">printable generator</Link> for offline puzzle tournaments or classroom sessions.
              </p>
            </div>
          </div>
        </article>

        {/* Section 6: Comprehensive FAQ */}
        <article className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4 text-sm">
            {faqSchema.mainEntity.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800"
              >
                <h3 className="font-bold text-zinc-900 dark:text-white text-base mb-2">
                  {item.name}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {item.acceptedAnswer.text}
                </p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
