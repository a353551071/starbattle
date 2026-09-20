// Daily solve streak & monthly progress — pure localStorage, no account system.
// Records the date whenever the user solves the CURRENT day's daily puzzle
// (replays of past archive dates never count).

'use client';

const SOLVED_DATES_KEY = 'sb_daily_solved';

// Custom window event fired after a new date is recorded, so mounted badges
// can refresh without polling or prop drilling.
export const SOLVED_EVENT = 'sb-daily-solved';

// Raw serialized snapshot of the solved-dates list for useSyncExternalStore.
// Returns the stored string (referentially stable) — never a parsed copy.
export function getSolvedDatesSnapshot(): string {
  if (typeof window === 'undefined') return '[]';
  try {
    return window.localStorage.getItem(SOLVED_DATES_KEY) ?? '[]';
  } catch {
    return '[]';
  }
}

// Subscribe to both the custom in-tab solve event and cross-tab storage sync.
export function subscribeSolvedDates(onChange: () => void): () => void {
  window.addEventListener(SOLVED_EVENT, onChange);
  window.addEventListener('storage', onChange);
  return () => {
    window.removeEventListener(SOLVED_EVENT, onChange);
    window.removeEventListener('storage', onChange);
  };
}

export function getLocalDateString(d = new Date()): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getSolvedDates(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(SOLVED_DATES_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === 'string') : [];
  } catch {
    return [];
  }
}

export function recordDailySolved(date: string): string[] {
  const dates = getSolvedDates();
  if (dates.includes(date)) return dates;
  const next = [...dates, date].sort();
  try {
    window.localStorage.setItem(SOLVED_DATES_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event(SOLVED_EVENT));
  } catch {}
  return next;
}

// Shift a YYYY-MM-DD string by n days (n may be negative), keeping local time.
function shiftDate(date: string, n: number): string {
  const [y, m, d] = date.split('-').map(Number);
  const dt = new Date(y, m - 1, d + n);
  return getLocalDateString(dt);
}

// Consecutive-day streak ending today (if today is solved) or yesterday
// (streak still alive but at risk). Returns 0 when neither is solved.
export function computeStreak(solvedDates: string[], today: string): number {
  const solved = new Set(solvedDates);
  let anchor: string | null = null;
  if (solved.has(today)) {
    anchor = today;
  } else if (solved.has(shiftDate(today, -1))) {
    anchor = shiftDate(today, -1);
  }
  if (!anchor) return 0;

  let streak = 0;
  let cursor = anchor;
  while (solved.has(cursor)) {
    streak++;
    cursor = shiftDate(cursor, -1);
  }
  return streak;
}

// Solved dates within a given month prefix (e.g. '2026-09'), sorted ascending.
export function getSolvedInMonth(solvedDates: string[], monthPrefix: string): string[] {
  return solvedDates.filter((d) => d.startsWith(monthPrefix)).sort();
}
