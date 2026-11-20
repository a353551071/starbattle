'use client';

import React from 'react';
import Link from 'next/link';

interface HouseAdBannerProps {
  placement?: 'sidebar' | 'inline' | 'footer';
  className?: string;
}

export default function HouseAdBanner({ placement = 'inline', className = '' }: HouseAdBannerProps) {
  // If AdSense is officially enabled and approved, AdSense script in layout handles auto ads / specific slots.
  // Before AdSense approval, strictly display verified self-owned tools (NO Adsterra or shady ad networks).
  return (
    <div
      className={`my-6 rounded-xl border border-amber-200/60 dark:border-amber-900/40 bg-gradient-to-r from-amber-50/50 via-orange-50/30 to-amber-50/50 dark:from-zinc-900/60 dark:via-zinc-900/40 dark:to-zinc-900/60 p-4 transition-all shadow-sm ${className}`}
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-lg shrink-0">
            📊
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-semibold tracking-wider text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/80 px-2 py-0.5 rounded uppercase">
                Featured Tool
              </span>
              <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Dividend Snowball Calculator
              </h4>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">
              Plan your financial freedom with our interactive compound dividend reinvestment visualizer.
            </p>
          </div>
        </div>
        <a
          href="https://dividendpayoutcalculator.com"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-xs font-semibold px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white transition-colors shadow-sm text-center"
        >
          Calculate Growth &rarr;
        </a>
      </div>
    </div>
  );
}
