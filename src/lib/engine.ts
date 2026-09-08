// Star Battle Core Engine (TypeScript)
// Handles solving, constraint validation, uniqueness checking, and puzzle generation.

export interface PuzzleData {
  id: string;
  date?: string; // YYYY-MM-DD for daily puzzles
  size: number;  // 8 for 8x8, 10 for 10x10
  stars: number; // 1 for 8x8, 2 for 10x10
  regions: number[][]; // 2D array [row][col] -> regionId (0..size-1)
  solution: [number, number][]; // list of [row, col] coords
  difficulty?: 'Easy' | 'Medium' | 'Hard';
}

export class StarBattleEngine {
  size: number;
  stars: number;
  relaxed: boolean;

  constructor(size = 10, stars = 2, relaxed = false) {
    this.size = size;
    this.stars = stars;
    this.relaxed = relaxed;
  }

  // Generate all valid k-combinations of column indices in a row where no two adjacent columns touch
  combosK(N: number, K: number): number[][] {
    const result: number[][] = [];
    function gen(start: number, depth: number, chosen: number[]) {
      if (depth === K) {
        result.push([...chosen]);
        return;
      }
      for (let c = start; c < N; c++) {
        if (depth > 0 && c <= chosen[depth - 1] + 1) continue;
        chosen.push(c);
        gen(c + 2, depth + 1, chosen);
        chosen.pop();
      }
    }
    gen(0, 0, []);
    return result;
  }

  // Shuffle utility
  shuffle<T>(arr: T[]): T[] {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // Solve a puzzle given its region configuration
  solve(regions: number[][], maxSolutions = 2): [number, number][][] {
    const N = this.size;
    const K = this.stars;
    const relaxed = this.relaxed;
    const solutions: [number, number][][] = [];

    // Precalculate remaining cells per region from row r downwards
    const remRegionCells: number[][] = Array.from({ length: N + 1 }, () => new Array(N).fill(0));
    for (let r = N - 1; r >= 0; r--) {
      for (let reg = 0; reg < N; reg++) {
        remRegionCells[r][reg] = remRegionCells[r + 1][reg];
      }
      for (let c = 0; c < N; c++) {
        const reg = regions[r][c];
        if (reg >= 0 && reg < N) {
          remRegionCells[r][reg]++;
        }
      }
    }

    const colCounts = new Array(N).fill(0);
    const regCounts = new Array(N).fill(0);
    const allCombos = this.combosK(N, K);

    function backtrack(row: number, stars: [number, number][]) {
      if (solutions.length >= maxSolutions) return;
      if (row === N) {
        if (regCounts.every((cnt) => cnt === K)) {
          solutions.push(stars.map((s) => [s[0], s[1]]));
        }
        return;
      }

      const remRows = N - row;

      // Pigeonhole check 1: Can every column still reach K?
      for (let c = 0; c < N; c++) {
        if (colCounts[c] + remRows < K) return;
      }

      // Pigeonhole check 2: Can every region still reach K?
      for (let reg = 0; reg < N; reg++) {
        if (regCounts[reg] + remRegionCells[row][reg] < K) return;
      }

      for (const cols of allCombos) {
        let ok = true;
        // Check column capacity
        for (const c of cols) {
          if (colCounts[c] >= K) {
            ok = false;
            break;
          }
          // Check diagonal adjacency with previous row
          if (!relaxed && row > 0) {
            for (let i = stars.length - 1; i >= 0 && stars[i][0] === row - 1; i--) {
              if (Math.abs(stars[i][1] - c) <= 1) {
                ok = false;
                break;
              }
            }
            if (!ok) break;
          }
        }
        if (!ok) continue;

        // Check region counts and multi-star-in-same-region capacity
        const regAdd: Record<number, number> = {};
        for (const c of cols) {
          const reg = regions[row][c];
          regAdd[reg] = (regAdd[reg] || 0) + 1;
        }
        for (const regKey in regAdd) {
          const reg = Number(regKey);
          if (regCounts[reg] + regAdd[reg] > K) {
            ok = false;
            break;
          }
        }
        if (!ok) continue;

        // Apply placement
        for (const c of cols) {
          colCounts[c]++;
          regCounts[regions[row][c]]++;
        }
        const newStars = stars.concat(cols.map((c) => [row, c]));

        backtrack(row + 1, newStars);

        // Backtrack
        for (const c of cols) {
          colCounts[c]--;
          regCounts[regions[row][c]]--;
        }
      }
    }

    backtrack(0, []);
    return solutions;
  }

  // Check if all regions in grid are orthogonally connected
  allConnected(regions: number[][]): boolean {
    const N = this.size;
    for (let reg = 0; reg < N; reg++) {
      let start: [number, number] | null = null;
      let count = 0;
      for (let r = 0; r < N; r++) {
        for (let c = 0; c < N; c++) {
          if (regions[r][c] === reg) {
            count++;
            if (!start) start = [r, c];
          }
        }
      }
      if (count === 0 || !start) return false;

      // BFS to check connectivity
      const visited = new Set<string>();
      const queue: [number, number][] = [start];
      visited.add(`${start[0]},${start[1]}`);

      while (queue.length > 0) {
        const [r, c] = queue.shift()!;
        for (const [dr, dc] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
          const nr = r + dr;
          const nc = c + dc;
          const key = `${nr},${nc}`;
          if (nr >= 0 && nr < N && nc >= 0 && nc < N && regions[nr][nc] === reg && !visited.has(key)) {
            visited.add(key);
            queue.push([nr, nc]);
          }
        }
      }

      if (visited.size !== count) return false;
    }
    return true;
  }

  // Voronoi partition of grid into N contiguous regions
  voronoi(seeds: [number, number][]): number[][] {
    const N = this.size;
    const grid: number[][] = Array.from({ length: N }, () => new Array(N).fill(0));
    for (let r = 0; r < N; r++) {
      for (let c = 0; c < N; c++) {
        let bestDist = Infinity;
        let bestSeed = 0;
        for (let s = 0; s < seeds.length; s++) {
          const [sr, sc] = seeds[s];
          const dist = Math.hypot(r - sr, c - sc);
          if (dist < bestDist) {
            bestDist = dist;
            bestSeed = s;
          }
        }
        grid[r][c] = bestSeed;
      }
    }
    return grid;
  }

  // Find valid star placements without region constraint
  findStarPlacements(poolSize = 40): [number, number][][] {
    const N = this.size;
    const K = this.stars;
    const relaxed = this.relaxed;
    const result: [number, number][][] = [];
    const colCounts = new Array(N).fill(0);
    const combos = this.combosK(N, K);
    const self = this;

    function backtrack(row: number, stars: [number, number][]) {
      if (result.length >= poolSize) return;
      if (row === N) {
        result.push(stars.map((s) => [s[0], s[1]]));
        return;
      }
      const shuffledCombos = self.shuffle([...combos]);
      for (const cols of shuffledCombos) {
        let ok = true;
        for (const c of cols) {
          if (colCounts[c] >= K) {
            ok = false;
            break;
          }
          if (!relaxed && row > 0) {
            for (let i = stars.length - 1; i >= 0 && stars[i][0] === row - 1; i--) {
              if (Math.abs(stars[i][1] - c) <= 1) {
                ok = false;
                break;
              }
            }
            if (!ok) break;
          }
        }
        if (!ok) continue;

        for (const c of cols) colCounts[c]++;
        backtrack(row + 1, stars.concat(cols.map((c) => [row, c])));
        for (const c of cols) colCounts[c]--;
      }
    }

    backtrack(0, []);
    return result;
  }

  // Generate a strictly unique puzzle
  generateStrictlyUnique(maxTries = 30): PuzzleData | null {
    const N = this.size;
    const K = this.stars;

    for (let tryIdx = 0; tryIdx < maxTries; tryIdx++) {
      const pool = this.findStarPlacements(20);
      if (!pool.length) continue;
      this.shuffle(pool);

      for (const stars of pool) {
        let seeds: [number, number][] = [];
        if (K === 1) {
          seeds = stars.map((s) => s);
        } else {
          const sh = this.shuffle([...stars]);
          for (let i = 0; i < N; i++) {
            let sr = 0;
            let sc = 0;
            for (let k = 0; k < K; k++) {
              const s = sh[i * K + k];
              sr += s[0];
              sc += s[1];
            }
            seeds.push([sr / K, sc / K]);
          }
        }

        const regions = this.voronoi(seeds);
        if (!this.allConnected(regions)) continue;

        const sols = this.solve(regions, 2);
        if (sols.length === 1) {
          return {
            id: `sb-${N}x${N}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
            size: N,
            stars: K,
            regions,
            solution: sols[0],
            difficulty: K === 1 ? 'Easy' : 'Medium',
          };
        }
      }
    }

    return null;
  }
}
