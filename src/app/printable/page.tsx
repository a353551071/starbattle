import type { Metadata } from 'next';
import Link from 'next/link';
import PrintableWorksheetClient from '@/components/PrintableWorksheetClient';
import puzzleData from '@/data/puzzles.json';

export const metadata: Metadata = {
  title: 'Printable Star Battle Puzzles (PDF) | Free Two Not Touch Worksheets with Answer Key',
  description:
    'Download and print free Star Battle (Two Not Touch) logic puzzle worksheets in PDF. High-contrast 8x8 & 10x10 grids with verified unique solutions & answer keys. Ideal for classrooms, travel, and screen-free focus training.',
  keywords: [
    'printable star battle',
    'printable logic puzzles',
    'two not touch printable',
    'star battle pdf',
    'printable star battle with answers',
    'logic puzzle worksheets',
    'two not touch puzzle pdf',
    'printable brain teasers',
    'classroom logic worksheets',
  ],
  alternates: {
    canonical: 'https://starbattleonline.com/printable',
  },
  openGraph: {
    title: 'Printable Star Battle Puzzles (PDF) | Free Two Not Touch Worksheets with Answer Key',
    description:
      'Download and print free Star Battle (Two Not Touch) logic puzzle worksheets in PDF. High-contrast 8x8 & 10x10 grids with verified unique solutions & answer keys.',
    url: 'https://starbattleonline.com/printable',
    siteName: 'Star Battle Online',
    images: [
      {
        url: 'https://starbattleonline.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Printable Star Battle Logic Puzzle Worksheets',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Printable Star Battle Puzzles (PDF) | Free Two Not Touch Worksheets',
    description:
      'Free printable Star Battle and Two Not Touch logic puzzle worksheets with verified solutions and answer keys.',
    images: ['https://starbattleonline.com/og-image.png'],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can I print these Star Battle puzzles for classroom or group use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, completely free. All worksheets on this page are openly licensed for personal, educational, classroom, library, and non-commercial community use. Teachers and educators are welcome to photocopy and distribute them to students without restriction.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I save these worksheets as a PDF file?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Click the "Print Worksheet (PDF)" button or press Ctrl+P (Cmd+P on Mac). In the browser print dialog that opens, change your printer Destination to "Save as PDF", select your preferred paper size (Letter or A4), and click Save.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are solutions and answer keys included with the printables?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. By keeping the "Include Answer Key" switch toggled on, an automated solution page showing the exact star placements (★) verified by our computer solver will be appended on a separate page after the puzzles.',
      },
    },
    {
      '@type': 'Question',
      name: 'What grid sizes and difficulty levels are available to print?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We provide 8x8 grids with 1 star per region (ideal for beginners, elementary/middle school students, and LinkedIn Queens players), 10x10 grids with 2 stars per region (the international championship tournament standard), and a Mixed Pack containing both levels.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why solve logic puzzles on paper instead of on a screen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Paper solving provides tactile sensory feedback that strengthens working memory, eliminates notification distractions, and reduces digital eye fatigue. Physical pencil notation also allows solvers to develop deliberate handwriting annotations like dot marking and region counting.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are all printed puzzles guaranteed to have a unique solution?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Every puzzle board in our database is mathematically verified by our SAT solver engine to ensure exactly one unique solution exists. No puzzle requires guessing (bifurcation); every star can be deduced through pure logic.',
      },
    },
  ],
};

const educationalSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalMaterial',
  name: 'Star Battle Printable Logic Puzzle Worksheets',
  description:
    'Printable deductive logic worksheets teaching spatial reasoning, the pigeonhole principle, and constraint satisfaction through Star Battle (Two Not Touch) puzzles.',
  educationalLevel: 'Beginner to Advanced',
  learningResourceType: 'Worksheet',
  inLanguage: 'en',
  isAccessibleForFree: true,
  url: 'https://starbattleonline.com/printable',
};

export default function PrintablePage() {
  const pData = puzzleData as any;
  const practice8x8 = pData.practice8x8 || [];
  const practice10x10 = pData.practice10x10 || [];
  const dailyPuzzles = Object.values(pData.daily || {}) as any[];

  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-8">
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(educationalSchema) }}
      />

      {/* Screen Header Badge */}
      <div className="print:hidden mb-6 text-center">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-500">
          Classroom &bull; Travel &bull; Screen-Free Focus
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white tracking-tight mt-1 mb-2">
          Printable Star Battle Puzzles (PDF)
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
          High-contrast, zero-ink-waste physical worksheets with verified unique solutions. Perfect for classrooms, flights, senior mental fitness, and screen-free evenings.
        </p>
      </div>

      {/* Interactive Client Worksheet & Print Controller */}
      <PrintableWorksheetClient
        puzzles8x8={practice8x8}
        puzzles10x10={practice10x10}
        dailyPuzzles={dailyPuzzles}
      />

      {/* ── Screen-only Educational & Strategy Pillar Content (Hidden in Print) ── */}
      <article className="print:hidden mt-20 pt-12 border-t border-zinc-200 dark:border-zinc-800 prose dark:prose-invert prose-amber max-w-none text-zinc-700 dark:text-zinc-300">
        <div className="text-center not-prose mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-500">
            Comprehensive Educator &amp; Solver Guide
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tight mt-1">
            Why Physical Paper Logic Still Trumps Digital Screens
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto mt-2">
            The cognitive science of tactile pencil marks, classroom implementation, and professional solving notation for Star Battle (Two Not Touch).
          </p>
        </div>

        {/* Pillar Section 1 */}
        <section className="mb-12">
          <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
            1. The Cognitive Benefits of Screen-Free Pencil &amp; Paper Solving
          </h3>
          <p>
            In an era dominated by rapid notifications, infinite feeds, and flickering blue-light displays, sitting down with a printed puzzle worksheet offers more than nostalgic charm—it delivers proven neurological benefits.
          </p>
          <p>
            When you solve a <strong>Star Battle</strong> puzzle on paper with a pencil or pen, your brain activates kinesthetic and spatial cognitive loops that touchscreen tapping cannot replicate:
          </p>
          <ul>
            <li>
              <strong>Sensory Motor Reinforcement:</strong> Physically drawing an &ldquo;X&rdquo; to eliminate a row or shading a region boundary engages the motor cortex, reinforcing working memory pathways that track spatial constraints across the board.
            </li>
            <li>
              <strong>Elimination of Digital Distraction:</strong> On a computer or smartphone, a notification or tab switch breaks the solver&apos;s train of thought. A physical paper sheet provides a self-contained cognitive arena where sustained focus can stretch uninterrupted for 15 to 45 minutes.
            </li>
            <li>
              <strong>Eye Comfort &amp; Melatonin Preservation:</strong> Solving on matte paper creates zero glare or blue light, making it the gold standard for evening mental relaxation, bedtime winding down, and classroom concentration without screen fatigue.
            </li>
            <li>
              <strong>Senior Brain Health &amp; Neuroplasticity:</strong> Geriatric research consistently emphasizes non-digital brain games for supporting executive cognitive function. Physical paper grids allow seniors to mark notes at their own pace without struggling against sensitive touchscreen gestures or tiny UI buttons.
            </li>
          </ul>
        </section>

        {/* Pillar Section 2 */}
        <section className="mb-12">
          <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
            2. Using Star Battle Worksheets in Classrooms &amp; STEM Circles
          </h3>
          <p>
            Star Battle (internationally recognized as <em>Two Not Touch</em>) has become a staple of middle school math clubs, gifted education curriculums, and STEM logic workshops. Unlike arithmetic drills that test mechanical memorization, Star Battle directly teaches formal mathematical proof methods:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose my-6">
            <div className="p-5 rounded-2xl bg-zinc-100/80 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800">
              <div className="text-amber-500 font-extrabold text-sm mb-1">Teaching The Pigeonhole Principle</div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                If a 2×3 region spanning two columns can hold at most 2 stars due to the no-touch rule, students immediately see why the remaining cells in those columns must absorb the leftover star budget. It transforms an abstract combinatorics theorem into an intuitive visual revelation.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-zinc-100/80 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800">
              <div className="text-amber-500 font-extrabold text-sm mb-1">Deductive Proof vs. Random Guessing</div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Many students begin by guessing where stars go. Because all puzzles on StarBattleOnline have verified unique solutions, teachers can show students that every correct placement is backed by a definitive logical reason—teaching disciplined scientific deduction.
              </p>
            </div>
          </div>
          <p>
            For classroom pacing, we recommend starting younger students on our <strong>8×8 (1-star) Starter Pack</strong>. Once students master the single-star neighborhood exclusion rule (identical to the viral <Link href="/queens" className="font-semibold text-amber-500 hover:underline">LinkedIn Queens game</Link>), they can advance to the <strong>10×10 (2-star) Championship Pack</strong> to explore double-star interactions and multi-row bounding boxes.
          </p>
        </section>

        {/* Pillar Section 3 */}
        <section className="mb-12">
          <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
            3. Professional Pencil Notation Guide: How to Mark Paper Grids
          </h3>
          <p>
            When transitioning from automated computer screens to printed paper, adopting clean notation habits is essential to keep your worksheet readable:
          </p>
          <ol>
            <li>
              <strong>The Bold Star (★):</strong> Draw a clear five-pointed star or filled circle in cells where a star is mathematically proven to reside. Avoid light pencil sketches for confirmed stars.
            </li>
            <li>
              <strong>The Small Dot or &ldquo;X&rdquo; (Empty Cell):</strong> The instant a star is placed, immediately place small &ldquo;X&rdquo; marks in all <strong>eight neighboring cells</strong> (including the four diagonal corners). This visual aura prevents accidental touching violations later.
            </li>
            <li>
              <strong>Corner Traps &amp; Island Slits:</strong> In an <em>L-shaped</em> corner region of 3 cells, two stars can never fit, and placing one in the bend often eliminates adjacent rows. Use light margin notes to record region star counts.
            </li>
            <li>
              <strong>Margin Budget Tally:</strong> Write the target number (e.g., &ldquo;2&rdquo;) above each column and beside each row. Cross off one tally each time a star is committed, keeping your mental accounting error-free.
            </li>
          </ol>
          <p>
            For a deep breakdown of advanced deduction patterns—including the 2×2 constraint box, row-pair pigeonhole accounting, and perimeter squeeze—explore our full <Link href="/tips" className="font-semibold text-amber-500 hover:underline">Star Battle Tips &amp; Techniques Guide</Link>.
          </p>
        </section>

        {/* Pillar Section 4 */}
        <section className="mb-12">
          <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
            4. The Computer-Verified Unique Solution Guarantee
          </h3>
          <p>
            There is nothing more frustrating than spending 30 minutes on a printed logic puzzle only to discover that the creator made a typographic error or that the board permits multiple ambiguous solutions.
          </p>
          <p>
            Every printable puzzle generated on <strong>StarBattleOnline</strong> is run through our exhaustive SAT constraint solver engine before publishing. Our solver rigorously proves two vital mathematical properties:
          </p>
          <ul>
            <li><strong>Solution Existence:</strong> At least one complete assignment of stars satisfies all row, column, region, and diagonal non-touching constraints.</li>
            <li><strong>Solution Uniqueness:</strong> No secondary or alternate solution exists anywhere in the search tree. Every single puzzle is 100% logic-solvable from start to finish without guessing.</li>
          </ul>
          <p>
            Learn more about our algorithmic standards and automated verification pipeline in our <Link href="/puzzle-quality" className="font-semibold text-amber-500 hover:underline">Puzzle Quality &amp; Verification Manifesto</Link>, or test your own custom designs using our interactive <Link href="/solver" className="font-semibold text-amber-500 hover:underline">Star Battle Solver</Link>.
          </p>
        </section>

        {/* FAQ Visual Accordion / Cards */}
        <section className="mb-12 not-prose">
          <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white tracking-tight mb-6">
            Frequently Asked Questions about Printable Worksheets
          </h3>
          <div className="space-y-4">
            {faqSchema.mainEntity.map((item, idx) => (
              <div
                key={`faq-${idx}`}
                className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800"
              >
                <div className="font-bold text-sm sm:text-base text-zinc-900 dark:text-white mb-1.5 flex items-start gap-2">
                  <span className="text-amber-500 font-extrabold">Q:</span>
                  <span>{item.name}</span>
                </div>
                <div className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 pl-6 leading-relaxed">
                  {item.acceptedAnswer.text}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Cross-links Banner */}
        <div className="not-prose mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">
              Prefer solving interactively on your device?
            </h4>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-0.5">
              Play today&apos;s daily tournament puzzle online with real-time error checking and streak tracking.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm transition-colors whitespace-nowrap shadow-md shadow-amber-500/20"
            >
              Play Today&apos;s Daily &rarr;
            </Link>
            <Link
              href="/two-not-touch"
              className="px-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-bold text-xs sm:text-sm hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors whitespace-nowrap"
            >
              Two Not Touch &rarr;
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
