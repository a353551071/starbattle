import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 py-12 mt-20 text-zinc-600 dark:text-zinc-400">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1 */}
          <div>
            <div className="font-bold text-zinc-900 dark:text-white mb-3 text-sm tracking-wide uppercase">
              Play & Practice
            </div>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/" className="hover:text-amber-500 transition-colors">
                  Daily Star Battle (10x10)
                </Link>
              </li>
              <li>
                <Link href="/daily/archive" className="hover:text-amber-500 transition-colors">
                  Daily Puzzles Archive
                </Link>
              </li>
              <li>
                <Link href="/solver" className="hover:text-amber-500 transition-colors">
                  Star Battle Solver
                </Link>
              </li>
              <li>
                <Link href="/printable" className="hover:text-amber-500 transition-colors">
                  Free Printable PDF Puzzles
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2 */}
          <div>
            <div className="font-bold text-zinc-900 dark:text-white mb-3 text-sm tracking-wide uppercase">
              Guides & Rules
            </div>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/how-to-play" className="hover:text-amber-500 transition-colors">
                  How to Play Star Battle
                </Link>
              </li>
              <li>
                <Link href="/how-to-play#strategy" className="hover:text-amber-500 transition-colors">
                  2-Star Solving Strategies
                </Link>
              </li>
              <li>
                <Link href="/two-not-touch" className="hover:text-amber-500 transition-colors">
                  What is Two Not Touch?
                </Link>
              </li>
              <li>
                <Link href="/how-to-play#faq" className="hover:text-amber-500 transition-colors">
                  Logic Tips & FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <div className="font-bold text-zinc-900 dark:text-white mb-3 text-sm tracking-wide uppercase">
              Legal & Trust
            </div>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/about" className="hover:text-amber-500 transition-colors">
                  About Us & Engine
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-500 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-amber-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-amber-500 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/sitemap.xml" className="hover:text-amber-500 transition-colors">
                  XML Sitemap
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <div className="font-bold text-zinc-900 dark:text-white mb-3 text-sm tracking-wide uppercase">
              About Star Battle
            </div>
            <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400 mb-3">
              Star Battle (Two Not Touch) is a logic grid puzzle originally invented by Hans Eendebak in 2003. 100% free to play, zero registration required.
            </p>
            <div className="text-[11px] text-zinc-400">
              © {new Date().getFullYear()} StarBattleOnline.com. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
