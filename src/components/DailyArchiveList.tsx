'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface DailyArchiveListProps {
  daily: Record<string, any>;
  serverToday: string;
}

export default function DailyArchiveList({ daily, serverToday }: DailyArchiveListProps) {
  const [clientToday, setClientToday] = useState<string>(serverToday);

  useEffect(() => {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    setClientToday(`${y}-${m}-${day}`);
  }, []);

  const allDates = Object.keys(daily).sort().reverse();
  const unlockedDates = allDates.filter((d) => d <= clientToday);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {unlockedDates.map((d) => {
        const p = daily[d];
        const isToday = d === clientToday;

        return (
          <Link
            key={d}
            href={`/daily/${d}`}
            className="flex items-center justify-between p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 hover:border-amber-500/50 hover:bg-white dark:hover:bg-zinc-800/80 transition-all group shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                  isToday
                    ? 'bg-amber-500 text-white shadow-md shadow-amber-500/25'
                    : 'bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400'
                }`}
              >
                ★
              </div>
              <div>
                <div className="flex items-center gap-2 font-bold text-sm text-zinc-900 dark:text-white group-hover:text-amber-500 transition-colors">
                  <span>{d}</span>
                  {isToday && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                      Today
                    </span>
                  )}
                </div>
                <div className="text-xs text-zinc-400">
                  {p.size}x{p.size} &bull; {p.stars} Stars &bull; {p.difficulty || 'Classic'}
                </div>
              </div>
            </div>

            <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 px-3 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/40 group-hover:bg-amber-500 group-hover:text-white transition-all">
              Play →
            </span>
          </Link>
        );
      })}
    </div>
  );
}
