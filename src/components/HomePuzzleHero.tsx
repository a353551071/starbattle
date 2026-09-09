'use client';

import { useState, useEffect, useMemo } from 'react';
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

export default function HomePuzzleHero() {
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
    <div className="flex flex-col items-center w-full">
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

        {/* Mode Selector Tabs */}
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
    </div>
  );
}
