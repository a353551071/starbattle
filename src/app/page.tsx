'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import StarBattleBoard from '@/components/StarBattleBoard';
import puzzleData from '@/data/puzzles.json';

function getClientDateString(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function resolvePuzzleForDate(dateStr: string, dailyMap: Record<string, any>) {
  if (dailyMap[dateStr]) {
    return dailyMap[dateStr];
  }
  const keys = Object.keys(dailyMap).sort();
  if (keys.length === 0) return null;
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = (hash * 31 + dateStr.charCodeAt(i)) >>> 0;
  }
  const picked = dailyMap[keys[hash % keys.length]];
  return {
    ...picked,
    date: dateStr,
  };
}

export default function HomePage() {
  const [todayStr, setTodayStr] = useState<string>('2026-09-09');

  useEffect(() => {
    setTodayStr(getClientDateString());
  }, []);

  const dailyPuzzles = (puzzleData as any).daily || {};
  const todayPuzzle = useMemo(() => {
    return resolvePuzzleForDate(todayStr, dailyPuzzles);
  }, [todayStr, dailyPuzzles]);

  const practice8x8List = (puzzleData as any).practice8x8 || [];
  const practice10x10List = (puzzleData as any).practice10x10 || [];

  const [mode, setMode] = useState<'daily' | 'practice8' | 'practice10'>('daily');
  const [practiceIdx, setPracticeIdx] = useState(0);

  // Active puzzle based on mode
  let activePuzzle = todayPuzzle;
  if (mode === 'practice8' && practice8x8List.length > 0) {
    activePuzzle = practice8x8List[practiceIdx % practice8x8List.length];
  } else if (mode === 'practice10' && practice10x10List.length > 0) {
    activePuzzle = practice10x10List[practiceIdx % practice10x10List.length];
  }

  return (
    <div className="flex flex-col items-center">
      {/* Title & Mode Switcher */}
      <div className="text-center mb-7 max-w-xl">
        {/* Animated Pill Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 mb-3 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span>Daily Logic Challenge &bull; {todayStr}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-2">
          Star Battle <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent">Online</span>
        </h1>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-md mx-auto leading-relaxed">
          Place stars so every row, column, and outlined region has the required count. <strong className="text-zinc-900 dark:text-zinc-200">No two stars may touch</strong>, not even diagonally!
        </p>

        {/* Mode Selector Tabs (Segmented Console Feel) */}
        <div className="flex items-center justify-center gap-1 mt-5 bg-zinc-200/60 dark:bg-zinc-800/80 p-1.5 rounded-2xl w-fit mx-auto border border-zinc-300/60 dark:border-zinc-700/60 shadow-inner">
          <button
            onClick={() => setMode('daily')}
            className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
              mode === 'daily'
                ? 'bg-white dark:bg-zinc-900 text-amber-600 dark:text-amber-400 shadow-md ring-1 ring-black/5 dark:ring-white/10 scale-100'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            <span>⭐</span>
            <span>Daily 10x10</span>
          </button>
          <button
            onClick={() => {
              setMode('practice8');
              setPracticeIdx(0);
            }}
            className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
              mode === 'practice8'
                ? 'bg-white dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 shadow-md ring-1 ring-black/5 dark:ring-white/10 scale-100'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            <span>🟢</span>
            <span>Easy 8x8 (1★)</span>
          </button>
          <button
            onClick={() => {
              setMode('practice10');
              setPracticeIdx(0);
            }}
            className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
              mode === 'practice10'
                ? 'bg-white dark:bg-zinc-900 text-purple-600 dark:text-purple-400 shadow-md ring-1 ring-black/5 dark:ring-white/10 scale-100'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            <span>👑</span>
            <span>Classic (2★)</span>
          </button>
        </div>
      </div>

      {/* Main Board Component */}
      {activePuzzle && (
        <StarBattleBoard
          key={activePuzzle.date || activePuzzle.id || mode}
          size={activePuzzle.size}
          starsRequired={activePuzzle.stars}
          regions={activePuzzle.regions}
          solution={activePuzzle.solution}
          puzzleId={activePuzzle.id || activePuzzle.date}
          puzzleDate={activePuzzle.date}
          onSolved={() => {
            if (mode !== 'daily') {
              setPracticeIdx((i) => i + 1);
            }
          }}
        />
      )}

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
          <div className="text-xs text-zinc-500 dark:text-zinc-400">Stuck on a puzzle? Instant solver for any grid</div>
        </Link>

        <Link
          href="/how-to-play"
          className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-amber-500/50 hover:shadow-lg transition-all group"
        >
          <div className="text-xl mb-1 group-hover:scale-110 transition-transform w-fit">📖</div>
          <div className="font-bold text-sm text-zinc-900 dark:text-white">Rules & Strategies</div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400">Learn 2-star logic tricks, traps, and deductions</div>
        </Link>
      </div>

      {/* SEO Educational & Strategic Content (E-E-A-T Foundation) */}
      <section className="w-full max-w-3xl border-t border-zinc-200 dark:border-zinc-800 pt-12 space-y-8 text-zinc-700 dark:text-zinc-300">
        <div>
          <h2 className="text-2xl font-black text-zinc-900 dark:text-white mb-3 tracking-tight">
            What is Star Battle (Two Not Touch)?
          </h2>
          <p className="text-sm leading-relaxed mb-3">
            <strong>Star Battle</strong> (frequently referred to in the United States as <em>Two Not Touch</em>, and sharing mechanics with games like <em>LinkedIn Queens</em>) is a pure deduction logic puzzle. Unlike Sudoku, which relies on numbers from 1 to 9, Star Battle is visual and spatial.
          </p>
          <p className="text-sm leading-relaxed">
            Every puzzle consists of an $N \times N$ grid divided into $N$ distinct contiguous geometric regions. Your goal is to place a predetermined number of stars (usually 1 star for 8x8 grids, or 2 stars for classic 10x10 grids) in every row, column, and marked region.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3 tracking-tight">
            The Three Golden Rules of Star Battle
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-amber-500 font-bold">1.</span>
              <span><strong>Row & Column Quota:</strong> Exactly $K$ stars must be placed in each horizontal row and each vertical column (e.g. 2 stars in 10x10).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500 font-bold">2.</span>
              <span><strong>Region Quota:</strong> Exactly $K$ stars must be located within every bold bordered shape/region.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500 font-bold">3.</span>
              <span><strong>The &ldquo;Two Not Touch&rdquo; Adjacency Rule:</strong> Stars can never touch each other—horizontally, vertically, or <strong>diagonally</strong>. When you place a star, all 8 surrounding neighbor cells are immediately eliminated and must be marked with a cross (✕).</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3 tracking-tight">
            Essential Solving Strategy for Beginners
          </h3>
          <div className="bg-zinc-50 dark:bg-zinc-900/60 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-sm space-y-2.5">
            <div className="font-semibold text-zinc-900 dark:text-white">Tip #1: Look at 1-cell and 2-cell thick regions</div>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
              In a 2-star puzzle, a region spanning only 2 adjacent rows can absorb at most 2 stars. If multiple regions align along the grid borders, you can eliminate entire rows by counting total region stars (the pigeonhole deduction).
            </p>
            <div className="font-semibold text-zinc-900 dark:text-white pt-2">Tip #2: Mark crosses liberally</div>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
              Star Battle is won by elimination. When a cell cannot possibly contain a star, mark it with ✕ immediately. As cells are crossed off, remaining empty cells in rows and regions become forced star placements.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
