import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact Us | Star Battle Online',
  description:
    'Contact the Star Battle Online team for support, feature suggestions, bug reports, and educational inquiries.',
  alternates: {
    canonical: 'https://starbattleonline.com/contact',
  },
};

export default function ContactPage() {
  return (
    <article className="max-w-3xl mx-auto py-8 text-zinc-700 dark:text-zinc-300">
      <div className="mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-500">Get in Touch</span>
        <h1 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white tracking-tight mt-1 mb-3">
          Contact Us
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Have feedback, spotted a display glitch, or want to suggest a new grid size? We would love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800">
          <div className="text-2xl mb-2">✉️</div>
          <h2 className="text-base font-bold text-zinc-900 dark:text-white mb-1">Direct Email</h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3">
            For general questions, business inquiries, and technical support:
          </p>
          <a
            href="mailto:support@starbattleonline.com"
            className="text-sm font-bold text-amber-600 dark:text-amber-400 hover:underline break-all"
          >
            support@starbattleonline.com
          </a>
          <div className="text-[11px] text-zinc-400 mt-2">
            Average response time: within 24–48 hours.
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800">
          <div className="text-2xl mb-2">🏫</div>
          <h2 className="text-base font-bold text-zinc-900 dark:text-white mb-1">Classroom &amp; Printables</h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3">
            Teachers, math club coaches, and event organizers:
          </p>
          <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
            You have full permission to print and photocopy worksheets from our{' '}
            <Link href="/printable" className="text-amber-500 font-semibold underline">
              Printable Worksheets
            </Link>{' '}
            page for student use.
          </p>
        </div>
      </div>

      <div className="border-t border-zinc-200 dark:border-zinc-800 pt-8 space-y-4 text-xs text-zinc-500 leading-relaxed">
        <p>
          <strong>Operating Entity:</strong> Star Battle Online Logic Platform
        </p>
        <p>
          <strong>Website:</strong>{' '}
          <a href="https://starbattleonline.com" className="text-amber-500 underline">
            https://starbattleonline.com
          </a>
        </p>
        <p>
          Before reaching out regarding puzzle rules, please check our comprehensive{' '}
          <Link href="/how-to-play" className="text-amber-500 underline font-semibold">
            How to Play Guide
          </Link>{' '}
          and FAQ section.
        </p>
      </div>
    </article>
  );
}
