import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Star Battle Online',
  description: 'Terms of Service for Star Battle Online. Rules, permissions, and intellectual property terms.',
};

export default function TermsPage() {
  return (
    <article className="max-w-3xl mx-auto py-8 prose dark:prose-invert text-zinc-700 dark:text-zinc-300">
      <h1>Terms of Service</h1>
      <p className="text-xs text-zinc-400">Last updated: September 9, 2026</p>

      <h2>1. Agreement to Terms</h2>
      <p>
        By accessing or using Star Battle Online (https://starbattleonline.com), you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access the service.
      </p>

      <h2>2. Free Use License</h2>
      <p>
        Permission is granted to freely play and print puzzles from Star Battle Online for personal, non-commercial, and educational use. You may print individual worksheets or PDF challenges for classrooms, puzzle clubs, and home leisure.
      </p>

      <h2>3. Intellectual Property</h2>
      <p>
        All puzzle layouts, algorithms, visual design, custom solvers, and software code on Star Battle Online are the intellectual property of the site operators. You may not scrape, mirror, or bulk redistribute our verified puzzles commercially without prior written consent.
      </p>

      <h2>4. Disclaimer</h2>
      <p>
        The materials and services on Star Battle Online are provided on an &apos;as is&apos; basis. We make no warranties, expressed or implied, regarding uninterrupted service or merchantability.
      </p>

      <h2>5. Contact Us</h2>
      <p>
        For inquiries regarding these Terms, please contact us at{' '}
        <a href="mailto:support@starbattleonline.com">support@starbattleonline.com</a>.
      </p>
    </article>
  );
}
