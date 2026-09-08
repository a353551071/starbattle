'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import WinModal from './WinModal';

export interface BoardProps {
  size: number;
  starsRequired: number;
  regions: number[][];
  solution?: [number, number][];
  puzzleId?: string;
  puzzleDate?: string;
  onSolved?: () => void;
}

// 14 rich, harmonious pastel region colors
const REGION_CLASSES = [
  'bg-sky-100/85 dark:bg-sky-950/40',
  'bg-amber-100/85 dark:bg-amber-950/40',
  'bg-emerald-100/85 dark:bg-emerald-950/40',
  'bg-purple-100/85 dark:bg-purple-950/40',
  'bg-rose-100/85 dark:bg-rose-950/40',
  'bg-teal-100/85 dark:bg-teal-950/40',
  'bg-orange-100/85 dark:bg-orange-950/40',
  'bg-indigo-100/85 dark:bg-indigo-950/40',
  'bg-pink-100/85 dark:bg-pink-950/40',
  'bg-lime-100/85 dark:bg-lime-950/40',
  'bg-fuchsia-100/85 dark:bg-fuchsia-950/40',
  'bg-yellow-100/85 dark:bg-yellow-950/40',
  'bg-violet-100/85 dark:bg-violet-950/40',
  'bg-slate-200/80 dark:bg-slate-800/40',
];

// Cell state: 0 = empty, 1 = cross (✕), 2 = star (★)
type CellState = 0 | 1 | 2;

// Lightweight Web Audio Sound Synthesizer (Zero asset dependencies)
class SoundFX {
  private ctx: AudioContext | null = null;
  public enabled = true;

  private getContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  playStar() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch {}
  }

  playCross() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(260, ctx.currentTime);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } catch {}
  }

  playWin() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);
        gain.gain.setValueAtTime(0.15, ctx.currentTime + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.12 + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.12);
        osc.stop(ctx.currentTime + idx * 0.12 + 0.38);
      });
    } catch {}
  }
}

const sfx = new SoundFX();

// SVG Star Icon Component
function StarIcon({ isConflict }: { isConflict?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`w-6 h-6 sm:w-7 sm:h-7 pointer-events-none transition-all duration-150 transform scale-100 ${
        isConflict
          ? 'text-rose-600 dark:text-rose-400 drop-shadow-[0_0_8px_rgba(225,29,72,0.8)] animate-pulse'
          : 'text-amber-400 drop-shadow-[0_2px_8px_rgba(245,158,11,0.55)]'
      }`}
      fill="currentColor"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

// SVG Cross Icon Component
function CrossIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-zinc-500/80 dark:text-zinc-400/80 pointer-events-none"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <line x1="3.5" y1="3.5" x2="12.5" y2="12.5" />
      <line x1="12.5" y1="3.5" x2="3.5" y2="12.5" />
    </svg>
  );
}

export default function StarBattleBoard({
  size,
  starsRequired,
  regions,
  puzzleId,
  puzzleDate,
  onSolved,
}: BoardProps) {
  // Grid state
  const [grid, setGrid] = useState<CellState[][]>(() =>
    Array.from({ length: size }, () => new Array(size).fill(0))
  );

  // History for Undo/Redo
  const [history, setHistory] = useState<CellState[][][]>([]);
  const [redoList, setRedoList] = useState<CellState[][][]>([]);

  // Active placement tool: 'star' | 'cross'
  const [activeTool, setActiveTool] = useState<'star' | 'cross'>('star');

  // Sound toggle
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Dragging state for mobile swipe-to-cross
  const [isDragging, setIsDragging] = useState(false);
  const dragTargetVal = useRef<CellState>(1);

  // Game status & Timer
  const [seconds, setSeconds] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const [showWinModal, setShowWinModal] = useState(false);
  const [streak, setStreak] = useState(1);

  // Sync sound settings
  useEffect(() => {
    sfx.enabled = soundEnabled;
  }, [soundEnabled]);

  // Reset grid when puzzle changes
  useEffect(() => {
    setGrid(Array.from({ length: size }, () => new Array(size).fill(0)));
    setHistory([]);
    setRedoList([]);
    setSeconds(0);
    setIsWon(false);
    setShowWinModal(false);
  }, [puzzleId, size]);

  // Timer tick
  useEffect(() => {
    if (isWon) return;
    const interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, [isWon]);

  // Format time
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Conflict Detection
  const conflicts = useMemo(() => {
    const conflictSet = new Set<string>();

    // 1. Touch adjacency (no two stars touch, even diagonally)
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (grid[r][c] === 2) {
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              if (dr === 0 && dc === 0) continue;
              const nr = r + dr;
              const nc = c + dc;
              if (nr >= 0 && nr < size && nc >= 0 && nc < size && grid[nr][nc] === 2) {
                conflictSet.add(`${r},${c}`);
                conflictSet.add(`${nr},${nc}`);
              }
            }
          }
        }
      }
    }

    // 2. Row overflow (> starsRequired)
    for (let r = 0; r < size; r++) {
      const starCols: number[] = [];
      for (let c = 0; c < size; c++) {
        if (grid[r][c] === 2) starCols.push(c);
      }
      if (starCols.length > starsRequired) {
        starCols.forEach((c) => conflictSet.add(`${r},${c}`));
      }
    }

    // 3. Col overflow (> starsRequired)
    for (let c = 0; c < size; c++) {
      const starRows: number[] = [];
      for (let r = 0; r < size; r++) {
        if (grid[r][c] === 2) starRows.push(r);
      }
      if (starRows.length > starsRequired) {
        starRows.forEach((r) => conflictSet.add(`${r},${c}`));
      }
    }

    // 4. Region overflow (> starsRequired)
    const regStars: Record<number, [number, number][]> = {};
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (grid[r][c] === 2) {
          const reg = regions[r][c];
          if (!regStars[reg]) regStars[reg] = [];
          regStars[reg].push([r, c]);
        }
      }
    }
    for (const reg in regStars) {
      if (regStars[reg].length > starsRequired) {
        regStars[reg].forEach(([r, c]) => conflictSet.add(`${r},${c}`));
      }
    }

    return conflictSet;
  }, [grid, regions, size, starsRequired]);

  // Overall Board Statistics
  const totalStarsPlaced = useMemo(() => {
    let count = 0;
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (grid[r][c] === 2) count++;
      }
    }
    return count;
  }, [grid, size]);

  const targetTotalStars = size * starsRequired;

  // Check board state & win condition
  const checkWinCondition = useCallback(
    (currentGrid: CellState[][]) => {
      // 1. Check star counts per row & col
      for (let r = 0; r < size; r++) {
        let starsInRow = 0;
        for (let c = 0; c < size; c++) {
          if (currentGrid[r][c] === 2) starsInRow++;
        }
        if (starsInRow !== starsRequired) return false;
      }

      for (let c = 0; c < size; c++) {
        let starsInCol = 0;
        for (let r = 0; r < size; r++) {
          if (currentGrid[r][c] === 2) starsInCol++;
        }
        if (starsInCol !== starsRequired) return false;
      }

      // 2. Check star counts per region
      const regionStars = new Array(size).fill(0);
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          if (currentGrid[r][c] === 2) {
            regionStars[regions[r][c]]++;
          }
        }
      }
      if (!regionStars.every((cnt) => cnt === starsRequired)) return false;

      // 3. Check adjacency (no two stars touch, even diagonally)
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          if (currentGrid[r][c] === 2) {
            for (let dr = -1; dr <= 1; dr++) {
              for (let dc = -1; dc <= 1; dc++) {
                if (dr === 0 && dc === 0) continue;
                const nr = r + dr;
                const nc = c + dc;
                if (nr >= 0 && nr < size && nc >= 0 && nc < size) {
                  if (currentGrid[nr][nc] === 2) return false;
                }
              }
            }
          }
        }
      }

      return true;
    },
    [size, starsRequired, regions]
  );

  // Apply cell update with history
  const updateCell = (r: number, c: number, newVal: CellState) => {
    if (isWon) return;
    setGrid((prev) => {
      if (prev[r][c] === newVal) return prev;
      setHistory((h) => [...h, prev]);
      setRedoList([]);
      const next = prev.map((row, ri) =>
        ri === r ? row.map((val, ci) => (ci === c ? newVal : val)) : row
      );

      // Play sound and haptics
      if (newVal === 2) {
        sfx.playStar();
        if (typeof window !== 'undefined' && 'vibrate' in navigator) navigator.vibrate(10);
      } else if (newVal === 1) {
        sfx.playCross();
        if (typeof window !== 'undefined' && 'vibrate' in navigator) navigator.vibrate(6);
      }

      // Check win
      if (checkWinCondition(next)) {
        setIsWon(true);
        setShowWinModal(true);
        sfx.playWin();
        if (typeof window !== 'undefined' && 'vibrate' in navigator) {
          navigator.vibrate([40, 60, 80]);
        }
        try {
          const currentStreak = parseInt(localStorage.getItem('sb_streak') || '0', 10) + 1;
          localStorage.setItem('sb_streak', currentStreak.toString());
          setStreak(currentStreak);
        } catch {}
        if (onSolved) onSolved();
      }

      return next;
    });
  };

  // Click handler
  const handleCellClick = (r: number, c: number, isRightClick = false) => {
    if (isWon) return;
    const current = grid[r][c];

    if (isRightClick) {
      updateCell(r, c, current === 1 ? 0 : 1);
      return;
    }

    if (activeTool === 'star') {
      updateCell(r, c, current === 2 ? 0 : 2);
    } else {
      updateCell(r, c, current === 1 ? 0 : 1);
    }
  };

  // Touch drag handlers for mobile swipe-to-cross
  const handleTouchStart = (r: number, c: number) => {
    if (isWon) return;
    setIsDragging(true);
    dragTargetVal.current = grid[r][c] === 1 ? 0 : 1;
    handleCellClick(r, c);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || isWon) return;
    const touch = e.touches[0];
    const elem = document.elementFromPoint(touch.clientX, touch.clientY);
    if (elem) {
      const rStr = elem.getAttribute('data-row');
      const cStr = elem.getAttribute('data-col');
      if (rStr !== null && cStr !== null) {
        const r = parseInt(rStr, 10);
        const c = parseInt(cStr, 10);
        if (!isNaN(r) && !isNaN(c)) {
          if (activeTool === 'cross' && grid[r][c] !== dragTargetVal.current) {
            updateCell(r, c, dragTargetVal.current);
          }
        }
      }
    }
  };

  const handleTouchEnd = () => setIsDragging(false);

  // Undo / Redo / Reset / Clear Crosses
  const handleUndo = () => {
    if (history.length === 0 || isWon) return;
    const prev = history[history.length - 1];
    setRedoList((r) => [...r, grid]);
    setHistory((h) => h.slice(0, -1));
    setGrid(prev);
  };

  const handleRedo = () => {
    if (redoList.length === 0 || isWon) return;
    const next = redoList[redoList.length - 1];
    setHistory((h) => [...h, grid]);
    setRedoList((r) => r.slice(0, -1));
    setGrid(next);
  };

  const handleReset = () => {
    if (isWon) return;
    setHistory((h) => [...h, grid]);
    setRedoList([]);
    setGrid(Array.from({ length: size }, () => new Array(size).fill(0)));
  };

  const handleClearCrosses = () => {
    if (isWon) return;
    setHistory((h) => [...h, grid]);
    setRedoList([]);
    setGrid((prev) => prev.map((row) => row.map((v) => (v === 1 ? 0 : v))));
  };

  // Keyboard Shortcuts (Desktop Accessibility)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 's' || e.key === 'S' || e.key === '1') {
        setActiveTool('star');
      } else if (e.key === 'x' || e.key === 'X' || e.key === '2') {
        setActiveTool('cross');
      } else if (e.key === ' ') {
        e.preventDefault();
        setActiveTool((t) => (t === 'star' ? 'cross' : 'star'));
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        if (e.shiftKey) handleRedo();
        else handleUndo();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="flex flex-col items-center select-none w-full max-w-xl mx-auto">
      {/* Top Status Bar: Badges, Progress & Controls */}
      <div className="w-full flex items-center justify-between mb-3 px-1 sm:px-2 text-xs font-semibold text-zinc-600 dark:text-zinc-400">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            {starsRequired}★ per Row/Col/Region
          </span>
          <span className="hidden sm:inline-flex items-center px-2 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800/60 text-zinc-500 text-xs">
            {size}x{size}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled((v) => !v)}
            title={soundEnabled ? 'Mute sound' : 'Unmute sound'}
            className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
          >
            {soundEnabled ? '🔊' : '🔇'}
          </button>

          {/* Timer Pill */}
          <div className="flex items-center gap-1.5 font-mono text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-lg border border-zinc-200 dark:border-zinc-700">
            <span>⏱️</span>
            <span>{formatTime(seconds)}</span>
          </div>
        </div>
      </div>

      {/* Progress & Conflict Pill */}
      <div className="w-full flex items-center justify-between px-2 mb-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-zinc-500">Stars:</span>
          <span className="font-mono font-bold text-zinc-800 dark:text-zinc-200">
            {totalStarsPlaced} / {targetTotalStars}
          </span>
        </div>

        {conflicts.size > 0 ? (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded-full border border-rose-200 dark:border-rose-900/60 animate-pulse">
            ⚠️ {conflicts.size} conflicting star{conflicts.size > 1 ? 's' : ''}
          </span>
        ) : totalStarsPlaced === targetTotalStars ? (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-900/60">
            ✓ Ready to check
          </span>
        ) : (
          <span className="text-[11px] text-zinc-400">
            {targetTotalStars - totalStarsPlaced} remaining
          </span>
        )}
      </div>

      {/* Main Grid Container (Responsive & Touch-Friendly) */}
      <div
        className="relative bg-zinc-900 dark:bg-zinc-950 p-1.5 rounded-2xl shadow-2xl shadow-zinc-300/40 dark:shadow-black/80 border-2 border-zinc-800 dark:border-zinc-700/80 touch-none transition-all"
        style={{
          width: 'min(92vw, 440px)',
          height: 'min(92vw, 440px)',
        }}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
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
              const regId = regions[r][c];
              const cellVal = grid[r][c];
              const isConflict = conflicts.has(`${r},${c}`);

              const isTopBorder = r === 0 || regions[r - 1][c] !== regId;
              const isBottomBorder = r === size - 1 || regions[r + 1][c] !== regId;
              const isLeftBorder = c === 0 || regions[r][c - 1] !== regId;
              const isRightBorder = c === size - 1 || regions[r][c + 1] !== regId;

              const borderClasses = [
                isTopBorder
                  ? 'border-t-[2.5px] border-t-zinc-900 dark:border-t-zinc-100'
                  : 'border-t border-t-zinc-400/30 dark:border-t-zinc-700/30',
                isBottomBorder
                  ? 'border-b-[2.5px] border-b-zinc-900 dark:border-b-zinc-100'
                  : 'border-b border-b-zinc-400/30 dark:border-b-zinc-700/30',
                isLeftBorder
                  ? 'border-l-[2.5px] border-l-zinc-900 dark:border-l-zinc-100'
                  : 'border-l border-l-zinc-400/30 dark:border-l-zinc-700/30',
                isRightBorder
                  ? 'border-r-[2.5px] border-r-zinc-900 dark:border-r-zinc-100'
                  : 'border-r border-r-zinc-400/30 dark:border-r-zinc-700/30',
              ].join(' ');

              return (
                <div
                  key={`${r}-${c}`}
                  data-row={r}
                  data-col={c}
                  onClick={() => handleCellClick(r, c)}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    handleCellClick(r, c, true);
                  }}
                  onTouchStart={() => handleTouchStart(r, c)}
                  className={`
                    relative flex items-center justify-center cursor-pointer transition-colors duration-100
                    ${isConflict ? 'bg-rose-200/90 dark:bg-rose-950/70' : REGION_CLASSES[regId % REGION_CLASSES.length]}
                    ${borderClasses}
                    hover:brightness-95 dark:hover:brightness-110 active:scale-95
                  `}
                >
                  {cellVal === 2 && <StarIcon isConflict={isConflict} />}
                  {cellVal === 1 && <CrossIcon />}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Touch Ergonomic Bottom Toolbar */}
      <div className="w-full flex items-center justify-between gap-2 mt-4 px-1 sm:px-2">
        {/* Tool Mode Switchers */}
        <div className="flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-800/90 p-1 rounded-2xl border border-zinc-200 dark:border-zinc-700/80 shadow-sm">
          <button
            onClick={() => setActiveTool('star')}
            title="Star placement tool (Shortcut: S or 1)"
            className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTool === 'star'
                ? 'bg-amber-500 text-white shadow-md shadow-amber-500/30 scale-100'
                : 'text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            <span className="text-sm">★</span>
            <span>Star</span>
          </button>
          <button
            onClick={() => setActiveTool('cross')}
            title="Cross elimination tool (Shortcut: X or 2)"
            className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTool === 'cross'
                ? 'bg-zinc-800 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-md scale-100'
                : 'text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            <span className="text-sm">✕</span>
            <span>Cross</span>
          </button>
        </div>

        {/* Action Buttons: Undo / Redo / Clear / Reset */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          <button
            onClick={handleUndo}
            disabled={history.length === 0}
            title="Undo last move (Ctrl+Z)"
            className="p-2 sm:px-3 sm:py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 font-bold hover:bg-zinc-50 dark:hover:bg-zinc-700 disabled:opacity-35 transition-all text-xs flex items-center gap-1 shadow-sm"
          >
            <span>↩</span>
            <span className="hidden sm:inline">Undo</span>
          </button>
          <button
            onClick={handleRedo}
            disabled={redoList.length === 0}
            title="Redo move (Ctrl+Shift+Z)"
            className="p-2 sm:px-3 sm:py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 font-bold hover:bg-zinc-50 dark:hover:bg-zinc-700 disabled:opacity-35 transition-all text-xs flex items-center gap-1 shadow-sm"
          >
            <span>↪</span>
            <span className="hidden sm:inline">Redo</span>
          </button>
          <button
            onClick={handleClearCrosses}
            title="Clear all crosses while keeping stars"
            className="p-2 sm:px-2.5 sm:py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-bold hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-all text-xs"
          >
            Clear ✕
          </button>
          <button
            onClick={handleReset}
            title="Clear entire board"
            className="p-2 sm:px-2.5 sm:py-2 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 font-bold hover:bg-rose-100 transition-all text-xs"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Helpful Hint / Tip Bar */}
      <div className="w-full flex items-center justify-center gap-3 mt-3 text-[11px] text-zinc-400 dark:text-zinc-500">
        <span className="hidden sm:inline">💡 Shortcuts: [Space] toggle tool &bull; [S] Star &bull; [X] Cross</span>
        <span className="sm:hidden">💡 Swipe across cells in Cross mode to multi-fill</span>
      </div>

      {/* Win Modal */}
      <WinModal
        isOpen={showWinModal}
        timeSeconds={seconds}
        streak={streak}
        puzzleDate={puzzleDate}
        size={size}
        stars={starsRequired}
        onClose={() => setShowWinModal(false)}
      />
    </div>
  );
}
