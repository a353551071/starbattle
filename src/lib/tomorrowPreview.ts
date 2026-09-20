// Tomorrow's daily puzzle preview — text-only teaser for the win screen.
// Derives everything from puzzles.json (no invented behavioral data):
// board number = day of month, difficulty = stored difficulty label,
// estimated solve time = transparent heuristic from grid size and star count.

'use client';

import puzzleData from '@/data/puzzles.json';

interface DailyPuzzleEntry {
  size: number;
  stars: number;
  difficulty?: string;
}

export interface TomorrowPreview {
  date: string; // YYYY-MM-DD
  labelDate: string; // e.g. "Sep 21"
  boardNumber: number; // day-of-month board number
  difficulty: string; // raw difficulty label, e.g. "Classic 2-Star"
  difficultyStars: number; // star count parsed from the label
  estimateSeconds: number; // heuristic estimate, see ESTIMATE_SECONDS_PER_CELL_STAR
}

// Heuristic: ~24 seconds per (cell-unit x star) of board complexity.
// A 10x10 2-star board therefore estimates 10 * 2 * 24 = 480s (8 min).
// TODO: replace with real median solve time once on-site analytics exist.
const ESTIMATE_SECONDS_PER_CELL_STAR = 24;

const MONTH_LABELS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

// Shift a YYYY-MM-DD string by n days, keeping local time.
function shiftDate(date: string, n: number): string {
  const [y, m, d] = date.split('-').map(Number);
  const dt = new Date(y, m - 1, d + n);
  const year = dt.getFullYear();
  const month = String(dt.getMonth() + 1).padStart(2, '0');
  const day = String(dt.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function parseDifficultyStars(difficulty: string | undefined, fallback: number): number {
  const match = difficulty?.match(/(\d+)\s*-?\s*star/i);
  return match ? Number(match[1]) : fallback;
}

export function getTomorrowPreview(puzzleDate?: string): TomorrowPreview | null {
  if (!puzzleDate) return null;
  const daily = ((puzzleData as { daily?: Record<string, DailyPuzzleEntry> }).daily) || {};
  const tomorrow = shiftDate(puzzleDate, 1);
  const puzzle = daily[tomorrow];
  if (!puzzle) return null;

  const [, m, d] = tomorrow.split('-').map(Number);
  return {
    date: tomorrow,
    labelDate: `${MONTH_LABELS[m - 1]} ${d}`,
    boardNumber: d,
    difficulty: puzzle.difficulty || 'Classic',
    difficultyStars: parseDifficultyStars(puzzle.difficulty, puzzle.stars),
    estimateSeconds: puzzle.size * puzzle.stars * ESTIMATE_SECONDS_PER_CELL_STAR,
  };
}
