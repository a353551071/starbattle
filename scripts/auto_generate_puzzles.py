import json
import time
import math
import random
from multiprocessing import Process, Queue, cpu_count
from solver import FastSolver
import os
import calendar
import argparse

def worker_loop(worker_id, out_q, size, stars, stop_event):
    random.seed(time.time() + worker_id * 1000 + random.randint(1, 999999))
    fs = FastSolver(size, stars)
    while not stop_event.is_set():
        seeds = [(random.uniform(0, size - 1), random.uniform(0, size - 1)) for _ in range(size)]
        regs = fs.voronoi(seeds)
        if not fs.is_connected(regs):
            continue
        sols = fs.solve(regs, 2)
        if len(sols) == 1:
            out_q.put((regs, sols[0]))
            time.sleep(0.01)

def collect_puzzles(target_count, size=10, stars=2, label="10x10"):
    if target_count <= 0:
        return []
    from multiprocessing import Event
    num_workers = min(max(cpu_count(), 2), 8)
    q = Queue()
    stop_event = Event()
    workers = []
    for wid in range(num_workers):
        p = Process(target=worker_loop, args=(wid, q, size, stars, stop_event))
        p.daemon = True
        p.start()
        workers.append(p)

    results = []
    t0 = time.time()
    print(f"Generating {target_count} {label} puzzles across {num_workers} workers...", flush=True)
    while len(results) < target_count:
        item = q.get()
        results.append(item)
        print(f"  [{label}] Found #{len(results)}/{target_count} in {time.time()-t0:.2f}s", flush=True)

    stop_event.set()
    for p in workers:
        p.terminate()
    return results

def get_target_dates(month_str=None):
    if month_str:
        year, month = map(int, month_str.split('-'))
    else:
        # Default: calculate NEXT month
        import datetime
        today = datetime.date.today()
        if today.month == 12:
            year, month = today.year + 1, 1
        else:
            year, month = today.year, today.month + 1

    _, num_days = calendar.monthrange(year, month)
    return [f"{year:04d}-{month:02d}-{d:02d}" for d in range(1, num_days + 1)]

def main():
    parser = argparse.ArgumentParser(description="Auto generate Star Battle daily puzzles")
    parser.add_argument("--month", type=str, default=None, help="Target month (YYYY-MM), default=next month")
    parser.add_argument("--limit", type=int, default=None, help="Limit count to generate (for test)")
    args = parser.parse_args()

    t_start = time.time()
    script_dir = os.path.dirname(os.path.abspath(__file__))
    repo_root = os.path.dirname(script_dir)
    json_path = os.path.join(repo_root, "src", "data", "puzzles.json")

    with open(json_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    daily_map = data.get("daily", {})

    target_dates = get_target_dates(args.month)
    missing_dates = [d for d in target_dates if d not in daily_map]

    if args.limit:
        missing_dates = missing_dates[:args.limit]

    print(f"Target month: {target_dates[0][:7]} | Missing dates to generate: {len(missing_dates)}")

    if not missing_dates:
        print("All dates for target month are already generated! puzzles.json is up to date.")
        return 0

    generated = collect_puzzles(len(missing_dates), 10, 2, f"Daily 10x10 ({target_dates[0][:7]})")

    for date_str, (regs, sol) in zip(missing_dates, generated):
        daily_map[date_str] = {
            "date": date_str,
            "size": 10,
            "stars": 2,
            "regions": regs,
            "solution": sol,
            "difficulty": "Classic 2-Star"
        }

    data["daily"] = daily_map

    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)

    print(f"\nSUCCESS: Generated {len(missing_dates)} new puzzles in {time.time()-t_start:.2f}s and updated {json_path}!", flush=True)
    return 0

if __name__ == '__main__':
    main()
