import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b border-slate-800 bg-slate-950">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-xl font-bold text-white"
        >
          Warranty Wallet
        </Link>

        <div className="flex items-center gap-6 text-sm">
          <Link
            href="/dashboard"
            className="text-slate-300 hover:text-white"
          >
            Dashboard
          </Link>

          <Link
            href="/warranties"
            className="text-slate-300 hover:text-white"
          >
            My Warranties
          </Link>

          <Link
            href="/warranties/new"
            className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-500"
          >
            + Add Warranty
          </Link>
        </div>
      </div>
    </nav>
  );
}