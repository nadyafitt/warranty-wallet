
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/[0.07] bg-[#070b14]/90 backdrop-blur-xl">
      <div className="mx-auto flex min-h-[76px] max-w-7xl items-center justify-between gap-4 px-5 sm:px-6 lg:px-8">

        {/* Brand */}
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-3"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10 text-xl shadow-lg shadow-blue-500/[0.06] transition duration-300 group-hover:border-blue-400/40 group-hover:bg-blue-500/15">
            🛡️
          </span>

          <span className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-white sm:text-lg">
              Warranty <span className="text-blue-400">Wallet</span>
            </span>

            <span className="hidden text-[9px] font-medium uppercase tracking-[0.2em] text-slate-500 sm:block">
              Your personal warranty manager
            </span>
          </span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-2 sm:gap-5">
          <Link
            href="/dashboard"
            className="rounded-lg px-2 py-2 text-xs font-medium text-slate-400 transition duration-200 hover:bg-white/[0.04] hover:text-white sm:px-3 sm:text-sm"
          >
            Dashboard
          </Link>

          <Link
            href="/warranties"
            className="rounded-lg px-2 py-2 text-xs font-medium text-slate-400 transition duration-200 hover:bg-white/[0.04] hover:text-white sm:px-3 sm:text-sm"
          >
            <span className="sm:hidden">Warranties</span>
            <span className="hidden sm:inline">My Warranties</span>
          </Link>

          <Link
            href="/warranties/new"
            className="group inline-flex min-h-10 items-center justify-center gap-1.5 rounded-xl border border-blue-400/20 bg-blue-600 px-3 py-2 text-xs font-semibold text-white shadow-lg shadow-blue-600/15 transition duration-200 hover:-translate-y-0.5 hover:border-blue-300/40 hover:bg-blue-500 hover:shadow-blue-500/20 sm:gap-2 sm:px-4 sm:text-sm"
          >
            <span className="text-base transition-transform duration-200 group-hover:rotate-90">
              +
            </span>
            <span>Add Warranty</span>
          </Link>
        </div>

      </div>
    </nav>
  );
}