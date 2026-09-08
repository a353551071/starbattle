import time
import math
import random
from collections import deque

class FastSolver:
    def __init__(self, size=10, stars=2):
        self.N = size
        self.K = stars
        self.combos = self.generate_row_combos(self.N, self.K)

    def generate_row_combos(self, n, k):
        res = []
        def gen(start, chosen):
            if len(chosen) == k:
                res.append(tuple(chosen))
                return
            for c in range(start, n):
                if chosen and c <= chosen[-1] + 1:
                    continue
                chosen.append(c)
                gen(c + 2, chosen)
                chosen.pop()
        gen(0, [])
        return res

    def voronoi(self, seeds):
        N = self.N
        grid = [[0]*N for _ in range(N)]
        for r in range(N):
            for c in range(N):
                best_d = float('inf')
                best_s = 0
                for s, (sr, sc) in enumerate(seeds):
                    d = math.hypot(r - sr, c - sc)
                    if d < best_d:
                        best_d = d
                        best_s = s
                grid[r][c] = best_s
        return grid

    def is_connected(self, regions):
        N = self.N
        for reg in range(N):
            cells = [(r, c) for r in range(N) for c in range(N) if regions[r][c] == reg]
            if not cells:
                return False
            start = cells[0]
            visited = {start}
            queue = deque([start])
            while queue:
                r, c = queue.popleft()
                for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                    nr, nc = r + dr, c + dc
                    if 0 <= nr < N and 0 <= nc < N and regions[nr][nc] == reg and (nr, nc) not in visited:
                        visited.add((nr, nc))
                        queue.append((nr, nc))
            if len(visited) != len(cells):
                return False
        return True

    def solve(self, regions, max_solutions=2):
        N, K = self.N, self.K
        solutions = []
        combos = self.combos

        # Precalculate remaining cells per region from row r downwards
        # rem_region_cells[r][reg] = count of cells in region reg with row >= r
        rem_region_cells = [[0]*N for _ in range(N + 1)]
        for r in range(N - 1, -1, -1):
            for reg in range(N):
                rem_region_cells[r][reg] = rem_region_cells[r + 1][reg]
            for c in range(N):
                rem_region_cells[r][regions[r][c]] += 1

        col_counts = [0] * N
        reg_counts = [0] * N

        def backtrack(row, chosen_stars):
            if len(solutions) >= max_solutions:
                return
            if row == N:
                if all(c == K for c in reg_counts):
                    solutions.append(list(chosen_stars))
                return

            rem_rows = N - row # includes this row

            # Pigeonhole check 1: Can any column still reach K?
            for c in range(N):
                if col_counts[c] + rem_rows < K:
                    return

            # Pigeonhole check 2: Can any region still reach K?
            for reg in range(N):
                if reg_counts[reg] + rem_region_cells[row][reg] < K:
                    return

            # Try combos for this row
            for cols in combos:
                # Col capacity check
                if any(col_counts[c] >= K for c in cols):
                    continue

                # Diagonal adjacency check with previous row
                if row > 0:
                    prev_cols = [c for r, c in chosen_stars if r == row - 1]
                    if any(abs(c - pc) <= 1 for c in cols for pc in prev_cols):
                        continue

                # Region capacity check
                regs = [regions[row][c] for c in cols]
                reg_add = {}
                for reg in regs:
                    reg_add[reg] = reg_add.get(reg, 0) + 1
                if any(reg_counts[reg] + cnt > K for reg, cnt in reg_add.items()):
                    continue

                # Apply
                for c in cols:
                    col_counts[c] += 1
                    reg_counts[regions[row][c]] += 1
                new_stars = chosen_stars + [(row, c) for c in cols]

                backtrack(row + 1, new_stars)

                # Backtrack
                for c in cols:
                    col_counts[c] -= 1
                    reg_counts[regions[row][c]] -= 1

        backtrack(0, [])
        return solutions

if __name__ == '__main__':
    fs = FastSolver(10, 2)
    print("Testing pruned solver on 10x10...", flush=True)
    seeds = [(random.uniform(0, 9), random.uniform(0, 9)) for _ in range(10)]
    regs = fs.voronoi(seeds)
    t0 = time.time()
    sols = fs.solve(regs, 2)
    print(f"Solved in {time.time()-t0:.4f}s! Solutions found: {len(sols)}", flush=True)
