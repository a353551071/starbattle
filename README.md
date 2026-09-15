# Star Battle Online

Free, no-signup web player for the classic World Puzzle Championship logic puzzle **Star Battle** (a.k.a. *Two Not Touch*, first cousin of LinkedIn's *Queens*), with daily puzzles, a printable archive, and an interactive step-by-step solver.

▶ Live site: **[starbattleonline.com](https://starbattleonline.com/)**

The defining engineering constraint of this project: **every published board must be machine-verified to have exactly one solution** — no multi-solution grids, no puzzles that force bifurcation (guess-and-backtrack). This README documents how the engine guarantees that.

## The constraint engine (`src/lib/engine.ts`)

A dependency-free TypeScript solver/generator (~300 lines). The rules of Star Battle map to:

- `rowCount[r] == K`, `colCount[c] == K`, `regionCount[g] == K` (K = 1 star for 8×8, 2 stars for 10×10)
- no two stars touch, **including diagonals**: `max(|Δrow|, |Δcol|) > 1`

### Solve: row-combination backtracking + pigeonhole pruning

Instead of placing stars cell by cell, each row is drawn from a precomputed set of non-touching K-subsets of columns (`combosK`). The search backtracks over rows against running column/region tallies, pruned by two pigeonhole bounds made O(1) with a suffix-sum table (`remRegionCells`):

```ts
// dead branch: a column/region can no longer reach K stars in the rows left
if (colCounts[c] + remRows < K) return;
if (regCounts[reg] + remRegionCells[row][reg] < K) return;
```

The diagonal-touch check only ever inspects the previous row (O(K)), never the full placement history. On typical 10×10 boards the solver verifies a grid in **~10–15 ms**.

### Uniqueness as a search bound

`solve(regions, maxSolutions = 2)` stops at the *second* solution. `solutions.length === 1` therefore certifies strict uniqueness — and because a second solution usually sits near the first in the search tree, proving uniqueness costs barely more than solving once. This is the oracle every generated board must pass.

### Generate: sample stars → Voronoi regions → verify

1. `findStarPlacements` samples a valid star layout (rows × precomputed combos, shuffled for variety), ignoring regions.
2. A **Voronoi partition** seeded from shuffled star-group centroids produces organic-looking regions.
3. `allConnected` (per-region BFS) rejects non-contiguous partitions — classic Star Battle regions must be orthogonally connected.
4. The uniqueness oracle decides: exactly one solution ships the board; anything else is resampled (`generateStrictlyUnique`, up to 30 tries).

Seeding the geometry from the solution itself keeps regions "fair" (each holds roughly the mass its K stars need), biasing generation toward constraint-dense, non-degenerate puzzles. A deeper writeup of these techniques: [Designing a Zero-Guess Puzzle Generator for Star Battle Using Constraint Logic](https://dev.to/a353551071/designing-a-zero-guess-puzzle-generator-for-star-battle-two-not-touch-using-constraint-logic-1ghj).

## Puzzle supply & CI

- `src/data/puzzles.json` holds the puzzle pool, including a `daily` map keyed by date (`/daily/YYYY-MM-DD` pages are statically generated).
- `scripts/auto_generate_puzzles.py` extends the pool with an independent Python implementation of the same uniqueness oracle (`solver.py`'s `FastSolver`, also `solve(regs, 2)` → exactly-one acceptance); a GitHub Actions workflow regenerates next month's stock on the 20th of each month (02:00 UTC) and commits the change to `main`, so daily boards never run dry.

## Site architecture

- **Next.js (App Router) with full SSG** — every puzzle page, the daily archive, `/two-not-touch` and `/queens` variant pages, `/solver`, and printable sheets are pre-rendered static HTML.
- **Pure SVG + DOM interaction** (`StarBattleBoard.tsx`) — no canvas, no tracking scripts, keyboard (Q/S/X) and touch support.
- Structured data: `GameApplication`, `BreadcrumbList`, `FAQPage` JSON-LD across key pages.
- Deployed on Vercel.

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # SSG build; verifies all puzzle pages statically
```

To add puzzles locally: `python scripts/auto_generate_puzzles.py --help`.

## License

Site code © 2026. The puzzle format itself is a classic public-domain pencil-puzzle style; puzzle data in `src/data/puzzles.json` is free to use with attribution.
