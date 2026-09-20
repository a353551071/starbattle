'use client';

import { useMemo, useSyncExternalStore } from 'react';
import {
  computeStreak,
  getLocalDateString,
  getSolvedDatesSnapshot,
  subscribeSolvedDates,
} from '@/lib/dailyStats';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

// Restrained streak badge + monthly progress grid for the daily challenge.
// Pure localStorage (no accounts), stays in sync via useSyncExternalStore,
// and never blocks or interrupts the player (no popups, no overlays).
export default function DailyStreakBadge() {
  const rawSnapshot = useSyncExternalStore(
    subscribeSolvedDates,
    getSolvedDatesSnapshot,
    () => '[]'
  );

  const solvedDates = useMemo<string[]>(() => {
    try {
      const parsed = JSON.parse(rawSnapshot);
      return Array.isArray(parsed) ? parsed.filter((x) => typeof x === 'string') : [];
    } catch {
      return [];
    }
  }, [rawSnapshot]);

  const today = getLocalDateString();
  const streak = computeStreak(solvedDates, today);

  const [yearStr, monthStr] = today.split('-');
  const monthPrefix = `${yearStr}-${monthStr}`;
  const daysInMonth = new Date(Number(yearStr), Number(monthStr), 0).getDate();
  const solvedInMonth = solvedDates.filter((d) => d.startsWith(monthPrefix));
  const solvedSet = new Set(solvedInMonth);
  const monthDay = Number(today.split('-')[2]);

  return (
    <div className="flex flex-col items-center gap-1.5 mb-5 text-xs text-zinc-500 dark:text-zinc-400">
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg font-bold bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20">
          <span>🔥</span>
          <span>{streak}-Day Streak</span>
        </span>
        <span className="font-semibold">
          {MONTH_NAMES[Number(monthStr) - 1]}: {solvedInMonth.length}/{daysInMonth}
        </span>
      </div>
      <div
        className="flex flex-wrap justify-center gap-1 max-w-xs"
        aria-label={`Daily progress: ${solvedInMonth.length} of ${daysInMonth} solved this month`}
      >
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
          const dateStr = `${monthPrefix}-${String(day).padStart(2, '0')}`;
          const isSolved = solvedSet.has(dateStr);
          const isFuture = day > monthDay;
          return (
            <span
              key={day}
              title={dateStr}
              className={`w-2.5 h-2.5 rounded-[4px] ${
                isSolved
                  ? 'bg-amber-500'
                  : isFuture
                    ? 'bg-zinc-100 dark:bg-zinc-800/50'
                    : 'bg-zinc-300 dark:bg-zinc-700'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
