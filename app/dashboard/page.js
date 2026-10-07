import Navbar from "@/components/Navbar";
import DashboardStats from "@/components/DashboardStats";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#070b14] text-white">
      <Navbar />

      <main className="grid-background min-h-[calc(100vh-72px)] px-6 py-10">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 text-sm font-medium text-blue-400">
                GOOD TO SEE YOU
              </p>

              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                Your Warranty
                <span className="text-slate-500">
                  {" "}
                  Dashboard
                </span>
              </h1>

              <p className="mt-3 max-w-xl text-sm text-slate-500">
                Keep an eye on your products and make sure
                you're covered when it matters.
              </p>
            </div>

            <Link
              href="/warranties/new"
              className="w-fit rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 hover:-translate-y-0.5 hover:bg-blue-500"
            >
              + Add Product
            </Link>
          </div>

          {/* Stats */}
          <DashboardStats
            active={8}
            expiringSoon={2}
            expired={3}
          />

          {/* Expiring Soon */}
          <section className="mt-10">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">
                  Needs Attention
                </h2>

                <p className="mt-1 text-xs text-slate-600">
                  Warranties that may need your attention
                </p>
              </div>

              <Link
                href="/warranties"
                className="text-sm text-blue-400 hover:text-blue-300"
              >
                View all →
              </Link>
            </div>

            <div className="rounded-2xl border border-amber-500/10 bg-amber-500/[0.03] p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                  !
                </div>

                <div>
                  <p className="font-medium text-slate-200">
                    2 warranties are expiring soon
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Check your products before their coverage
                    ends.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Overview */}
          <section className="mt-10 grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl border border-white/5 bg-white/[0.025] p-6 lg:col-span-2">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-semibold">
                    Protection Overview
                  </h2>

                  <p className="mt-1 text-xs text-slate-600">
                    Your current warranty coverage
                  </p>
                </div>

                <span className="text-2xl">🛡️</span>
              </div>

              <div className="mt-8">
                <div className="mb-2 flex justify-between text-xs">
                  <span className="text-slate-500">
                    Protected products
                  </span>

                  <span className="font-medium text-slate-300">
                    8 / 13
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                  <div className="h-full w-[61%] rounded-full bg-gradient-to-r from-blue-500 to-indigo-500" />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/5 bg-gradient-to-br from-blue-500/10 to-indigo-500/5 p-6">
              <p className="text-xs font-medium uppercase tracking-wider text-blue-400">
                Warranty Wallet
              </p>

              <p className="mt-5 text-2xl font-bold">
                Stay covered.
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Keep your purchase information organized so
                you never forget when your coverage ends.
              </p>

              <div className="mt-6 text-3xl">
                🛡️ 📦 🔒
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}