'use client';

import { useState } from 'react';
import { StarBattleEngine } from '@/lib/engine';

const REGION_COLORS = [
  'bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200',
  'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200',
  'bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200',
  'bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-200',
  'bg-rose-100 dark:bg-rose-900/40 text-rose-800 dark:text-rose-200',
  'bg-cyan-100 dark:bg-cyan-900/40 text-cyan-800 dark:text-cyan-200',
  'bg-orange-100 dark:bg-orange-900/40 text-orange-800 dark:text-orange-200',
  'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-200',
  'bg-teal-100 dark:bg-teal-900/40 text-teal-800 dark:text-teal-200',
  'bg-pink-100 dark:bg-pink-900/40 text-pink-800 dark:text-pink-200',
];

export default function SolverPage() {
  const [size, setSize] = useState<number>(8);
  const [stars, setStars] = useState<number>(1);
  const [currentRegion, setCurrentRegion] = useState<number>(0);

  // Region grid: cell -> region index 0..size-1
  const [regions, setRegions] = useState<number[][]>(() =>
    Array.from({ length: 8 }, (_, r) => Array.from({ length: 8 }, () => r))
  );

  // Solved stars: [r, c][]
  const [solutionStars, setSolutionStars] = useState<[number, number][] | null>(null);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [solveTime, setSolveTime] = useState<number | null>(null);

  const handleSizeChange = (newSize: number) => {
    setSize(newSize);
    setStars(newSize === 8 ? 1 : 2);
    setRegions(
      Array.from({ length: newSize }, (_, r) =>
        Array.from({ length: newSize }, () => r)
      )
    );
    setSolutionStars(null);
    setStatusMsg(null);
    setCurrentRegion(0);
  };

  const handleCellPaint = (r: number, c: number) => {
    setRegions((prev) => {
      const next = prev.map((row, ri) =>
        ri === r ? row.map((val, ci) => (ci === c ? currentRegion : val)) : row
      );
      return next;
    });
    setSolutionStars(null);
  };

  const handleSolve = () => {
    setStatusMsg('Solving...');
    setSolutionStars(null);

    setTimeout(() => {
      const t0 = performance.now();
      const engine = new StarBattleEngine(size, stars, false);
      const sols = engine.solve(regions, 2);
      const elapsed = Math.round(performance.now() - t0);
      setSolveTime(elapsed);

      if (sols.length === 0) {
        setStatusMsg('No valid solution exists for this region layout.');
      } else if (sols.length === 1) {
        setSolutionStars(sols[0]);
        setStatusMsg(`Unique solution found in ${elapsed} ms!`);
      } else {
        setSolutionStars(sols[0]);
        setStatusMsg(`Multiple solutions exist (found 2+). Showing first valid solution (${elapsed} ms).`);
      }
    }, 50);
  };

  const isStar = (r: number, c: number) => {
    return solutionStars?.some(([sr, sc]) => sr === r && sc === c);
  };

  return (
    <div className="max-w-2xl mx-auto py-4 flex flex-col items-center">
      {/* Title */}
      <div className="text-center mb-6">
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 inline-block mb-2">
          Interactive Tool
        </span>
        <h1 className="text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
          Star Battle <span className="text-amber-500">Solver</span>
        </h1>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1 max-w-md">
          Draw your puzzle regions below and click <strong>Solve</strong> to instantly compute the valid star placements.
        </p>
      </div>

      {/* Grid Settings Bar */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-6 bg-zinc-50 dark:bg-zinc-900 p-2.5 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-xs font-semibold">
        <div className="flex items-center gap-1.5">
          <span className="text-zinc-500">Grid Size:</span>
          <button
            onClick={() => handleSizeChange(8)}
            className={`px-3 py-1 rounded-lg transition-colors ${
              size === 8 ? 'bg-amber-500 text-white font-bold' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
            }`}
          >
            8x8 (1★)
          </button>
          <button
            onClick={() => handleSizeChange(10)}
            className={`px-3 py-1 rounded-lg transition-colors ${
              size === 10 ? 'bg-amber-500 text-white font-bold' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
            }`}
          >
            10x10 (2★)
          </button>
        </div>
      </div>

      {/* Palette Picker */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 mb-4 max-w-md">
        <span className="text-xs text-zinc-500 font-bold mr-1">Paint Region:</span>
        {Array.from({ length: size }).map((_, regIdx) => (
          <button
            key={regIdx}
            onClick={() => setCurrentRegion(regIdx)}
            className={`w-7 h-7 rounded-lg text-xs font-bold transition-all border-2 ${
              REGION_COLORS[regIdx % REGION_COLORS.length]
            } ${
              currentRegion === regIdx
                ? 'border-zinc-900 dark:border-white scale-110 shadow-sm'
                : 'border-transparent opacity-70 hover:opacity-100'
            }`}
          >
            {regIdx + 1}
          </button>
        ))}
      </div>

      {/* Solver Board */}
      <div
        className="relative bg-zinc-900 dark:bg-black p-1 sm:p-1.5 rounded-2xl shadow-xl border-2 border-zinc-800 select-none"
        style={{ width: 'min(92vw, 400px)', height: 'min(92vw, 400px)' }}
      >
        <div
          className="w-full h-full grid bg-zinc-300 dark:bg-zinc-800 overflow-hidden rounded-xl"
          style={{
            gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${size}, minmax(0, 1fr))`,
          }}
        >
          {Array.from({ length: size }).map((_, r) =>
            Array.from({ length: size }).map((_, c) => {
              const reg = regions[r][c];
              const starPlaced = isStar(r, c);

              const isTop = r === 0 || regions[r - 1][c] !== reg;
              const isBottom = r === size - 1 || regions[r + 1][c] !== reg;
              const isLeft = c === 0 || regions[r][c - 1] !== reg;
              const isRight = c === size - 1 || regions[r][c + 1] !== reg;

              const borders = [
                isTop ? 'border-t-2 border-t-zinc-900 dark:border-t-zinc-100' : 'border-t border-t-zinc-400/40',
                isBottom ? 'border-b-2 border-b-zinc-900 dark:border-b-zinc-100' : 'border-b border-b-zinc-400/40',
                isLeft ? 'border-l-2 border-l-zinc-900 dark:border-l-zinc-100' : 'border-l border-l-zinc-400/40',
                isRight ? 'border-r-2 border-r-zinc-900 dark:border-r-zinc-100' : 'border-r border-r-zinc-400/40',
              ].join(' ');

              return (
                <div
                  key={`${r}-${c}`}
                  onClick={() => handleCellPaint(r, c)}
                  className={`relative flex items-center justify-center cursor-pointer ${
                    REGION_COLORS[reg % REGION_COLORS.length]
                  } ${borders}`}
                >
                  {starPlaced ? (
                    <span className="text-amber-500 text-lg sm:text-2xl font-black drop-shadow-md">
                      ★
                    </span>
                  ) : (
                    <span className="text-[10px] text-zinc-400/50 font-mono">
                      {reg + 1}
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-6 flex flex-col items-center gap-3">
        <button
          onClick={handleSolve}
          className="px-8 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-lg shadow-amber-500/25 active:scale-95 transition-all flex items-center gap-2"
        >
          <span>⚡ Solve Star Battle</span>
        </button>

        {statusMsg && (
          <div
            className={`text-xs font-semibold px-4 py-2 rounded-xl text-center max-w-sm ${
              statusMsg.includes('Unique')
                ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                : statusMsg.includes('Multiple')
                ? 'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                : 'bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
            }`}
          >
            {statusMsg}
          </div>
        )}
      </div>
    </div>
  );
}
