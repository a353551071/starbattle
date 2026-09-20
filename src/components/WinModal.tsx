'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getLocalDateString } from '@/lib/dailyStats';
import { getTomorrowPreview } from '@/lib/tomorrowPreview';

interface WinModalProps {
  isOpen: boolean;
  timeSeconds: number;
  streak: number;
  puzzleDate?: string;
  size: number;
  stars: number;
  onClose: () => void;
  onPlayNext?: () => void;
}

export default function WinModal({
  isOpen,
  timeSeconds,
  streak,
  puzzleDate,
  size,
  stars,
  onClose,
  onPlayNext,
}: WinModalProps) {
  const [copied, setCopied] = useState(false);

  // Tomorrow teaser: only for the CURRENT day's daily (archive replays get
  // no preview). Text-only — never leaks tomorrow's region layout or solution.
  const preview = puzzleDate && puzzleDate === getLocalDateString() ? getTomorrowPreview(puzzleDate) : null;
  const reminderKey = preview ? `sb_remind_${preview.date}` : '';
  const [reminded, setReminded] = useState(false);

  const handleRemind = () => {
    if (!reminderKey) return;
    try {
      window.localStorage.setItem(reminderKey, '1');
    } catch {}
    setReminded(true);
  };

  if (!isOpen) return null;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const formatEstimate = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    if (m === 0) return `${s}s`;
    return s === 0 ? `${m} min` : `${m} min ${s}s`;
  };

  // Performance Star Rating (1-3 stars)
  const rating = timeSeconds < 180 ? 3 : timeSeconds < 420 ? 2 : 1;

  const handleShare = () => {
    const starsEmoji = '⭐'.repeat(rating);
    const text = [
      `⭐ Star Battle Daily ${puzzleDate || ''}`,
      `Rating: ${starsEmoji} (${formatTime(timeSeconds)})`,
      `Grid: ${size}x${size} • ${stars}-Star Mode`,
      `🔥 Current Streak: ${streak} Day${streak > 1 ? 's' : ''}`,
      `Play free at: https://starbattleonline.com`,
    ]
      .filter(Boolean)
      .join('\n');

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Confetti Particles (CSS Animated) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-amber-400 rounded-full animate-ping opacity-60" />
        <div className="absolute top-1/3 right-1/4 w-2.5 h-2.5 bg-rose-400 rounded-full animate-ping opacity-60 delay-150" />
        <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-emerald-400 rounded-full animate-ping opacity-50 delay-300" />
        <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-sky-400 rounded-full animate-ping opacity-70 delay-200" />
      </div>

      <div className="relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center shadow-2xl scale-100 animate-in zoom-in-95 duration-200">
        {/* Trophy / Ribbon Badge */}
        <div className="w-16 h-16 mx-auto mb-3 bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800/80 rounded-2xl flex items-center justify-center text-3xl shadow-lg shadow-amber-500/10 text-amber-500">
          🏆
        </div>

        <h2 className="text-2xl font-black text-zinc-900 dark:text-white mb-1">
          Puzzle Solved!
        </h2>

        {/* Rating Stars */}
        <div className="flex items-center justify-center gap-1 text-xl text-amber-400 mb-2">
          {'★'.repeat(rating)}
          {'☆'.repeat(3 - rating)}
        </div>

        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-5">
          {rating === 3
            ? 'Lightning speed! Grandmaster deduction.'
            : rating === 2
            ? 'Great logic solve! Solid performance.'
            : 'Solved! Steady and persistent.'}
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-5 bg-zinc-50 dark:bg-zinc-800/60 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800">
          <div>
            <div className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
              Time
            </div>
            <div className="text-xl font-black text-zinc-800 dark:text-zinc-100 font-mono">
              {formatTime(timeSeconds)}
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
              Streak
            </div>
            <div className="text-xl font-black text-orange-500 font-mono flex items-center justify-center gap-1">
              <span>🔥</span>
              <span>{streak}</span>
            </div>
          </div>
        </div>

        {/* Tomorrow's Puzzle Teaser (daily only, text-only) */}
        {preview && (
          <div className="mb-5 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-100 dark:border-zinc-800 text-left">
            <div className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider mb-1.5">
              Tomorrow&apos;s Puzzle
            </div>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
              Tomorrow ({preview.labelDate}): Board #{preview.boardNumber}, {preview.difficulty} ({preview.difficultyStars}
              ★), estimated {formatEstimate(preview.estimateSeconds)}.
            </p>
            <div className="flex items-center justify-between gap-2 mt-2.5 flex-wrap">
              <button
                onClick={handleRemind}
                disabled={reminded}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  reminded
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/60 cursor-default'
                    : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 active:scale-[0.98]'
                }`}
              >
                {reminded ? '✓ Saved — see you tomorrow!' : '🔔 Remind me'}
              </button>
              <Link
                href="/queens"
                className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
              >
                Can&apos;t wait? Play unlimited Queens &rarr;
              </Link>
            </div>
          </div>
        )}

        {/* Share & Actions */}
        <div className="space-y-2.5">
          <button
            onClick={handleShare}
            className="w-full py-3.5 px-4 bg-amber-500 hover:bg-amber-600 active:scale-[0.98] text-white font-bold rounded-xl shadow-lg shadow-amber-500/30 transition-all flex items-center justify-center gap-2 text-sm"
          >
            <span>{copied ? '✓ Copied to Clipboard!' : '📤 Share Results'}</span>
          </button>

          {onPlayNext && (
            <button
              onClick={onPlayNext}
              className="w-full py-3 px-4 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 active:scale-[0.98] text-zinc-800 dark:text-zinc-200 font-bold rounded-xl transition-all text-sm"
            >
              Play Another Puzzle
            </button>
          )}

          <button
            onClick={onClose}
            className="w-full py-2 text-xs font-semibold text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
          >
            Review Board
          </button>
        </div>
      </div>
    </div>
  );
}
