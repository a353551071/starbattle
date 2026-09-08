import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center text-3xl font-black mb-4 shadow-sm">
        ★
      </div>
      <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-white mb-2">
        404 - Puzzle Not Found
      </h1>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-md mb-8 leading-relaxed">
        The puzzle or date you requested does not exist or has not been released yet. Don&apos;t worry—today&apos;s challenge is waiting for you!
      </p>

      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md shadow-amber-500/25 transition-all"
        >
          Play Today&apos;s Puzzle
        </Link>
        <Link
          href="/daily/archive"
          className="px-5 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-bold text-sm transition-all"
        >
          Browse Archive
        </Link>
      </div>
    </div>
  );
}
