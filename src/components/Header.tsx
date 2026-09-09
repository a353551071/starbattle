'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header() {
  const [streak, setStreak] = useState(0);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('sb_streak');
      if (saved) setStreak(parseInt(saved, 10) || 0);

      const isDarkSaved = localStorage.getItem('theme') === 'dark' ||
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
      setIsDark(isDarkSaved);
      if (isDarkSaved) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch {}
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center text-white text-xl font-black shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
            ★
          </div>
          <div>
            <div className="font-extrabold text-base sm:text-lg tracking-tight text-zinc-900 dark:text-white flex items-center gap-1.5">
              Star Battle <span className="text-amber-500">Online</span>
            </div>
            <div className="text-[10px] sm:text-xs text-zinc-500 dark:text-zinc-400 -mt-1 font-medium">
              Also known as Two Not Touch
            </div>
          </div>
        </Link>

        {/* Nav Links */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/"
            className="px-2.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            Daily
          </Link>
          <Link
            href="/daily/archive"
            className="px-2.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            Archive
          </Link>
          <Link
            href="/solver"
            className="px-2.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 hover:bg-amber-100 transition-colors"
          >
            Solver
          </Link>
          <Link
            href="/two-not-touch"
            className="hidden sm:inline-block px-2.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            Two Not Touch
          </Link>
          <Link
            href="/how-to-play"
            className="hidden sm:inline-block px-2.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            Rules
          </Link>
          <Link
            href="/printable"
            className="hidden md:inline-block px-2.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            Printable
          </Link>

          {/* Streak Badge */}
          <div className="ml-1 flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-50 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-800/60 text-orange-600 dark:text-orange-400 text-xs font-bold" title="Daily Streak">
            <span>🔥</span>
            <span>{streak}</span>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="ml-1 p-2 rounded-xl text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-all text-xs"
          >
            {isDark ? '☀️' : '🌙'}
          </button>
        </nav>
      </div>
    </header>
  );
}
