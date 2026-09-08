import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us | Star Battle Online',
  description:
    'Learn about Star Battle Online, our algorithmic puzzle generation technology, uniqueness proofs, and our mission to provide clean logic games.',
  alternates: {
    canonical: 'https://starbattleonline.com/about',
  },
};

export default function AboutPage() {
  return (
    <article className="max-w-3xl mx-auto py-8 prose dark:prose-invert text-zinc-700 dark:text-zinc-300">
      <div className="not-prose mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-500">About the Project</span>
        <h1 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white tracking-tight mt-1 mb-3">
          About Star Battle Online
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Dedicated to building the cleanest, most accessible, and mathematically pure Star Battle logic puzzle experience on the web.
        </p>
      </div>

      <hr className="border-zinc-200 dark:border-zinc-800 my-6" />

      <h2>1. Our Mission</h2>
      <p>
        Star Battle Online was founded by passionate logic puzzle enthusiasts and software engineers with a clear goal: to provide an ad-light, distraction-free environment for puzzle solvers of all skill levels. Unlike mobile apps clogged with paywalls, energy limits, and intrusive full-screen popups, Star Battle Online runs natively in any modern browser on desktop, tablet, or smartphone—with zero registration, zero tracking cookies, and instant playability.
      </p>

      <h2>2. What is Star Battle?</h2>
      <p>
        <strong>Star Battle</strong> (frequently referred to in North America as <strong>Two Not Touch</strong>, and related to logic variants like <em>Queens</em>) is a beloved pen-and-paper logic grid puzzle invented by Hans Eendebak in 2003 for the 1st World Puzzle Championship. Players place a set number of stars (typically 1 or 2) into each row, column, and outlined region, subject to the defining rule that <strong>no two stars may touch</strong>, even diagonally.
      </p>

      <h2>3. 100% Algorithmic Originality &amp; Mathematical Proof</h2>
      <p>
        Every single puzzle featured in our daily challenges and practice modes is algorithmically synthesized from scratch using custom computational geometry and constrained backtracking algorithms:
      </p>
      <ul>
        <li>
          <strong>Voronoi Region Partitioning:</strong> Custom seed generation creates aesthetically balanced, organically shaped contiguous puzzle territories.
        </li>
        <li>
          <strong>Strict Uniqueness Verification:</strong> Every board configuration is exhaustively solved using a high-performance lookahead pruning engine. A puzzle is published <em>only</em> if our solver proves that it possesses <strong>strictly one unique solution</strong>. There are never ambiguous guesses or multiple valid outcomes.
        </li>
        <li>
          <strong>Pure Deductive Solvability:</strong> Our puzzles are designed to be solved via step-by-step logic, row/column pigeonhole counting, and spatial elimination, requiring no blind trial-and-error guessing.
        </li>
      </ul>

      <h2>4. Independent &amp; Free</h2>
      <p>
        Star Battle Online is an independent web project. We believe high-quality logic games should be freely accessible to students, seniors, competitive solvers, and casual thinkers worldwide.
      </p>

      <h2>5. Get in Touch</h2>
      <p>
        We love hearing from our players! Whether you have feedback on board controls, found an interesting strategy, or have questions regarding educational use:
      </p>
      <ul>
        <li>
          Email: <a href="mailto:support@starbattleonline.com">support@starbattleonline.com</a>
        </li>
        <li>
          Feedback &amp; Inquiries:{' '}
          <Link href="/contact" className="text-amber-500 font-semibold">
            Visit our Contact Page
          </Link>
        </li>
      </ul>
    </article>
  );
}
