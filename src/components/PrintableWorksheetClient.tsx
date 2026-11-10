'use client';

import { useState } from 'react';

interface PuzzleItem {
  id?: string;
  date?: string;
  size: number;
  stars: number;
  regions: number[][];
  solution?: [number, number][];
  difficulty?: string;
}

interface Props {
  puzzles8x8: PuzzleItem[];
  puzzles10x10: PuzzleItem[];
  dailyPuzzles: PuzzleItem[];
}

type PackType = 'starter' | 'classic' | 'mixed';

export default function PrintableWorksheetClient({
  puzzles8x8,
  puzzles10x10,
  dailyPuzzles,
}: Props) {
  const [pack, setPack] = useState<PackType>('classic');
  const [includeAnswers, setIncludeAnswers] = useState<boolean>(true);
  const [gridDensity, setGridDensity] = useState<'compact' | 'standard'>('compact');

  // Select 4 puzzles according to chosen pack
  const getSelectedPuzzles = (): PuzzleItem[] => {
    if (pack === 'starter') {
      return (puzzles8x8.length >= 4 ? puzzles8x8.slice(0, 4) : [
        ...puzzles8x8,
        ...dailyPuzzles.filter((p) => p.size === 8),
      ]).slice(0, 4);
    }
    if (pack === 'classic') {
      return (puzzles10x10.length >= 4 ? puzzles10x10.slice(0, 4) : [
        ...puzzles10x10,
        ...dailyPuzzles.filter((p) => p.size === 10),
      ]).slice(0, 4);
    }
    // Mixed: 2 of 8x8 + 2 of 10x10
    const p8 = puzzles8x8.slice(0, 2);
    const p10 = puzzles10x10.slice(0, 2);
    return [...p8, ...p10];
  };

  const selectedPuzzles = getSelectedPuzzles();

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="w-full">
      {/* ── Screen-only Interactive Control Center ── */}
      <div className="print:hidden mb-10 bg-gradient-to-b from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950 p-6 sm:p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl shadow-zinc-950/5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-zinc-200/80 dark:border-zinc-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 mb-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span>Free High-Contrast PDF Worksheets</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white tracking-tight">
              Worksheet Customizer &amp; PDF Exporter
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1">
              Select your puzzle difficulty, toggle the answer key, and print crisp A4 / Letter worksheets.
            </p>
          </div>

          <button
            onClick={handlePrint}
            className="self-start sm:self-center px-6 py-3.5 bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-amber-500/30 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span className="text-lg">🖨️</span>
            <span>Print Worksheet (PDF)</span>
            <kbd className="hidden md:inline-block ml-1 text-[10px] bg-amber-600/60 px-1.5 py-0.5 rounded font-mono">
              Ctrl+P
            </kbd>
          </button>
        </div>

        {/* Options Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pack Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
              1. Choose Puzzle Pack
            </label>
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-zinc-100 dark:bg-zinc-800/80 rounded-xl">
              <button
                type="button"
                onClick={() => setPack('starter')}
                className={`py-2 px-2 text-xs font-bold rounded-lg transition-all ${
                  pack === 'starter'
                    ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                8×8 (1★)
              </button>
              <button
                type="button"
                onClick={() => setPack('classic')}
                className={`py-2 px-2 text-xs font-bold rounded-lg transition-all ${
                  pack === 'classic'
                    ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                10×10 (2★)
              </button>
              <button
                type="button"
                onClick={() => setPack('mixed')}
                className={`py-2 px-2 text-xs font-bold rounded-lg transition-all ${
                  pack === 'mixed'
                    ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                Mixed Pack
              </button>
            </div>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1.5">
              {pack === 'starter' && 'Four 8×8 puzzles with 1 star per region — great for classrooms and beginners.'}
              {pack === 'classic' && 'Four 10×10 tournament grids with 2 stars per region — classic Two Not Touch.'}
              {pack === 'mixed' && 'Two 8×8 warmups followed by two 10×10 challenges.'}
            </p>
          </div>

          {/* Answer Key Toggle */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
              2. Solution Sheet
            </label>
            <div className="flex items-center justify-between p-2.5 bg-zinc-100 dark:bg-zinc-800/80 rounded-xl">
              <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                Include Answer Key
              </span>
              <button
                type="button"
                onClick={() => setIncludeAnswers(!includeAnswers)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                  includeAnswers ? 'bg-amber-500 justify-end' : 'bg-zinc-300 dark:bg-zinc-700 justify-start'
                }`}
                aria-pressed={includeAnswers}
              >
                <span className="w-4 h-4 bg-white rounded-full shadow-md" />
              </button>
            </div>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1.5">
              {includeAnswers
                ? 'Appends a separate answer page with verified solutions at the end.'
                : 'Puzzles only (clean worksheet for tests or friendly competitions).'}
            </p>
          </div>

          {/* Layout density */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
              3. Page Layout
            </label>
            <div className="grid grid-cols-2 gap-1.5 p-1 bg-zinc-100 dark:bg-zinc-800/80 rounded-xl">
              <button
                type="button"
                onClick={() => setGridDensity('compact')}
                className={`py-2 px-2 text-xs font-bold rounded-lg transition-all ${
                  gridDensity === 'compact'
                    ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                4 Puzzles / Page
              </button>
              <button
                type="button"
                onClick={() => setGridDensity('standard')}
                className={`py-2 px-2 text-xs font-bold rounded-lg transition-all ${
                  gridDensity === 'standard'
                    ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                2 Puzzles / Page
              </button>
            </div>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1.5">
              {gridDensity === 'compact'
                ? '2×2 grid layout to save paper on A4 / Letter paper.'
                : 'Spacious 2-per-page layout with larger cells for pencil markings.'}
            </p>
          </div>
        </div>

        {/* Quick Printing Tip */}
        <div className="mt-6 pt-4 border-t border-zinc-200/60 dark:border-zinc-800/60 flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
          <span className="text-amber-500 font-bold">💡 How to save as PDF:</span>
          <span>Click &ldquo;Print Worksheet&rdquo; &rarr; Choose &ldquo;Save as PDF&rdquo; as your destination &rarr; Click Save.</span>
        </div>
      </div>

      {/* ── PRINTABLE SECTION: PUZZLES SHEET ── */}
      <section className="print:block">
        {/* Printable Worksheet Header (Shows in Print) */}
        <div className="hidden print:block mb-6 text-center border-b-2 border-black pb-3">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-black">
            <span>StarBattleOnline.com &bull; Free Printable Worksheets</span>
            <span>Date: ____________________</span>
          </div>
          <h1 className="text-2xl font-black text-black tracking-tight mt-1">
            Star Battle (Two Not Touch) Logic Puzzles
          </h1>
          <p className="text-[11px] text-black max-w-xl mx-auto mt-1">
            <strong>Rules:</strong> Place stars (★) so that each row, column, and bold-outlined region contains the designated number of stars. <strong>Stars must never touch</strong>, not even diagonally (all 8 adjacent cells must remain empty).
          </p>
        </div>

        {/* Grid of Puzzles */}
        <div
          className={`grid gap-8 ${
            gridDensity === 'compact'
              ? 'grid-cols-1 sm:grid-cols-2 print:grid-cols-2 print:gap-6'
              : 'grid-cols-1 print:grid-cols-1 print:gap-10'
          }`}
        >
          {selectedPuzzles.map((p, idx) => (
            <div
              key={`puzzle-${p.date || idx}`}
              className="p-5 bg-white dark:bg-zinc-950 border-2 border-zinc-900 dark:border-zinc-700 rounded-3xl print:border-2 print:border-black print:rounded-none print:p-4 flex flex-col items-center shadow-md print:shadow-none"
            >
              {/* Card Title */}
              <div className="w-full flex items-center justify-between mb-3 text-xs font-extrabold text-zinc-900 dark:text-zinc-100 print:text-black">
                <span className="text-sm">
                  Puzzle #{idx + 1}
                  <span className="font-normal text-zinc-500 dark:text-zinc-400 print:text-black ml-1.5">
                    ({p.size}×{p.size})
                  </span>
                </span>
                <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 print:bg-transparent print:text-black print:font-bold">
                  {p.stars === 1 ? '1 Star (★)' : '2 Stars (★★)'} per Region
                </span>
              </div>

              {/* Grid Canvas */}
              <div
                className={`w-full aspect-square border-2 border-black bg-white ${
                  gridDensity === 'compact' ? 'max-w-[280px] print:max-w-[270px]' : 'max-w-[340px] print:max-w-[340px]'
                } grid`}
                style={{
                  gridTemplateColumns: `repeat(${p.size}, minmax(0, 1fr))`,
                  gridTemplateRows: `repeat(${p.size}, minmax(0, 1fr))`,
                }}
              >
                {Array.from({ length: p.size }).map((_, r) =>
                  Array.from({ length: p.size }).map((_, c) => {
                    const regId = p.regions[r][c];
                    const isTop = r === 0 || p.regions[r - 1][c] !== regId;
                    const isBottom = r === p.size - 1 || p.regions[r + 1][c] !== regId;
                    const isLeft = c === 0 || p.regions[r][c - 1] !== regId;
                    const isRight = c === p.size - 1 || p.regions[r][c + 1] !== regId;

                    const borders = [
                      isTop ? 'border-t-2 border-t-black' : 'border-t border-t-zinc-300 print:border-t-zinc-400',
                      isBottom ? 'border-b-2 border-b-black' : 'border-b border-b-zinc-300 print:border-b-zinc-400',
                      isLeft ? 'border-l-2 border-l-black' : 'border-l border-l-zinc-300 print:border-l-zinc-400',
                      isRight ? 'border-r-2 border-r-black' : 'border-r border-r-zinc-300 print:border-r-zinc-400',
                    ].join(' ');

                    // Alternating subtle gray tint for distinct regions in print
                    const bgShade =
                      regId % 2 === 0
                        ? 'bg-zinc-100/70 dark:bg-zinc-900/60 print:bg-zinc-100/60'
                        : 'bg-white dark:bg-zinc-950 print:bg-white';

                    return (
                      <div
                        key={`cell-${r}-${c}`}
                        className={`relative aspect-square ${bgShade} ${borders} flex items-center justify-center`}
                      >
                        {/* Dot in center as a subtle solving aid */}
                        <span className="w-1 h-1 rounded-full bg-zinc-300/40 print:bg-zinc-400/40 pointer-events-none" />
                      </div>
                    );
                  })
                )}
              </div>

              {/* Puzzle Footer */}
              <div className="w-full flex items-center justify-between mt-3 text-[10px] text-zinc-500 dark:text-zinc-400 print:text-black">
                <span>Unique Solution Guaranteed</span>
                <span>StarBattleOnline.com</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRINTABLE SECTION: ANSWER SHEET ── */}
      {includeAnswers && (
        <section className="mt-16 print:mt-0 print:break-before-page">
          <div className="mb-6 text-center border-b-2 border-black pb-3">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-black">
              <span>Answer Key / Solutions</span>
              <span>StarBattleOnline.com</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white print:text-black tracking-tight mt-1">
              Worksheet Solutions (Answer Sheet)
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 print:text-black mt-1">
              Filled star positions (★) verified by computer solver. Check your pencil deductions below.
            </p>
          </div>

          <div
            className={`grid gap-8 ${
              gridDensity === 'compact'
                ? 'grid-cols-1 sm:grid-cols-2 print:grid-cols-2 print:gap-6'
                : 'grid-cols-1 print:grid-cols-1 print:gap-10'
            }`}
          >
            {selectedPuzzles.map((p, idx) => {
              const solSet = new Set(
                (p.solution || []).map(([r, c]) => `${r}-${c}`)
              );

              return (
                <div
                  key={`sol-${p.date || idx}`}
                  className="p-5 bg-white dark:bg-zinc-950 border-2 border-zinc-900 dark:border-zinc-700 rounded-3xl print:border-2 print:border-black print:rounded-none print:p-4 flex flex-col items-center shadow-md print:shadow-none"
                >
                  <div className="w-full flex items-center justify-between mb-3 text-xs font-extrabold text-zinc-900 dark:text-zinc-100 print:text-black">
                    <span>Solution #{idx + 1}</span>
                    <span>
                      {p.size}×{p.size} &bull; {p.stars}★ per region
                    </span>
                  </div>

                  <div
                    className={`w-full aspect-square border-2 border-black bg-white ${
                      gridDensity === 'compact' ? 'max-w-[280px] print:max-w-[270px]' : 'max-w-[340px] print:max-w-[340px]'
                    } grid`}
                    style={{
                      gridTemplateColumns: `repeat(${p.size}, minmax(0, 1fr))`,
                      gridTemplateRows: `repeat(${p.size}, minmax(0, 1fr))`,
                    }}
                  >
                    {Array.from({ length: p.size }).map((_, r) =>
                      Array.from({ length: p.size }).map((_, c) => {
                        const regId = p.regions[r][c];
                        const isTop = r === 0 || p.regions[r - 1][c] !== regId;
                        const isBottom = r === p.size - 1 || p.regions[r + 1][c] !== regId;
                        const isLeft = c === 0 || p.regions[r][c - 1] !== regId;
                        const isRight = c === p.size - 1 || p.regions[r][c + 1] !== regId;

                        const borders = [
                          isTop ? 'border-t-2 border-t-black' : 'border-t border-t-zinc-300 print:border-t-zinc-400',
                          isBottom ? 'border-b-2 border-b-black' : 'border-b border-b-zinc-300 print:border-b-zinc-400',
                          isLeft ? 'border-l-2 border-l-black' : 'border-l border-l-zinc-300 print:border-l-zinc-400',
                          isRight ? 'border-r-2 border-r-black' : 'border-r border-r-zinc-300 print:border-r-zinc-400',
                        ].join(' ');

                        const isStar = solSet.has(`${r}-${c}`);
                        const bgShade =
                          regId % 2 === 0
                            ? 'bg-zinc-100/70 dark:bg-zinc-900/60 print:bg-zinc-100/60'
                            : 'bg-white dark:bg-zinc-950 print:bg-white';

                        return (
                          <div
                            key={`sol-cell-${r}-${c}`}
                            className={`relative aspect-square ${bgShade} ${borders} flex items-center justify-center font-black text-black select-none text-sm sm:text-base print:text-black`}
                          >
                            {isStar ? (
                              <span className="text-black font-extrabold transform scale-110">★</span>
                            ) : (
                              <span className="text-zinc-300/40 print:text-zinc-300 text-[10px]">&middot;</span>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>

                  <div className="w-full text-center mt-3 text-[10px] text-zinc-400 print:text-black">
                    All stars verified logic-solvable without guessing.
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
