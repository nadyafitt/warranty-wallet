import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#070b14]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/20 transition-transform group-hover:scale-105">
            <span className="text-lg">🛡️</span>
          </div>

          <div>
            <p className="text-sm font-bold tracking-tight text-white">
              Warranty
              <span className="text-blue-400">Wallet</span>
            </p>

            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
              Protect what you own
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-1 rounded-full border border-white/5 bg-white/[0.03] p-1 md:flex">
          <Link
            href="/dashboard"
            className="rounded-full px-4 py-2 text-sm text-slate-400 hover:bg-white/5 hover:text-white"
          >
            Dashboard
          </Link>

          <Link
            href="/warranties"
            className="rounded-full px-4 py-2 text-sm text-slate-400 hover:bg-white/5 hover:text-white"
          >
            My Warranties
          </Link>
        </div>

        {/* Add button */}
        <Link
          href="/warranties/new"
          className="group flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-blue-500/30"
        >
          <span className="text-lg leading-none">+</span>
          <span className="hidden sm:inline">
            Add Warranty
          </span>
        </Link>
      </div>
    </nav>
  );
}