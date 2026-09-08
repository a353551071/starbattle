'use client';

import puzzleData from '@/data/puzzles.json';

export default function PrintablePage() {
  const daily = (puzzleData as any).daily || {};
  const puzzles = Object.values(daily).slice(0, 4) as any[];

  return (
    <div className="max-w-4xl mx-auto py-6">
      {/* Screen Controls (Hidden during print) */}
      <div className="print:hidden mb-8 bg-zinc-50 dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-center">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-500">Offline & Printables</span>
        <h1 className="text-3xl font-black text-zinc-900 dark:text-white tracking-tight mt-1 mb-2">
          Printable Star Battle Puzzles (PDF)
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-lg mx-auto mb-4">
          Enjoy solving on paper? Use your browser&apos;s print feature (Ctrl+P or Cmd+P) to print high-contrast, clean puzzle worksheets with zero screen clutter.
        </p>
        <button
          onClick={() => window.print()}
          className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-amber-500/25 transition-all"
        >
          🖨️ Print This Worksheet (PDF)
        </button>
      </div>

      {/* Printable Grid Worksheets (2x2 Layout on A4) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 print:grid-cols-2 print:gap-8">
        {puzzles.map((p, idx) => (
          <div
            key={p.date || idx}
            className="p-4 bg-white dark:bg-zinc-950 border-2 border-zinc-900 dark:border-zinc-700 rounded-2xl print:border-2 print:border-black print:rounded-none flex flex-col items-center"
          >
            <div className="w-full flex items-center justify-between mb-3 text-xs font-bold text-zinc-800 dark:text-zinc-200 print:text-black">
              <span>Puzzle #{idx + 1} ({p.date || 'Practice'})</span>
              <span>{p.size}x{p.size} &bull; {p.stars}★ per region</span>
            </div>

            {/* Static Printable Grid */}
            <div
              className="w-full aspect-square max-w-[280px] grid border-2 border-black bg-white"
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
                    isTop ? 'border-t-2 border-t-black' : 'border-t border-t-zinc-300',
                    isBottom ? 'border-b-2 border-b-black' : 'border-b border-b-zinc-300',
                    isLeft ? 'border-l-2 border-l-black' : 'border-l border-l-zinc-300',
                    isRight ? 'border-r-2 border-r-black' : 'border-r border-r-zinc-300',
                  ].join(' ');

                  // Subtle checker shading for alternate regions in print
                  const bgShade = regId % 2 === 0 ? 'bg-zinc-100/60 print:bg-zinc-100/50' : 'bg-white';

                  return (
                    <div
                      key={`${r}-${c}`}
                      className={`relative aspect-square ${bgShade} ${borders}`}
                    />
                  );
                })
              )}
            </div>

            <div className="w-full text-center mt-3 text-[10px] text-zinc-400 print:text-black">
              Rules: {p.stars} stars per row, column, & region. Stars cannot touch, not even diagonally.
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
