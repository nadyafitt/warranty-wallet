import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#070b14] text-white">
      <Navbar />

      <main className="grid-background relative">
        {/* Background glow */}
        <div className="hero-glow left-1/2 top-20 -translate-x-1/2" />

        <section className="relative mx-auto flex min-h-[calc(100vh-72px)] max-w-7xl flex-col items-center justify-center px-6 py-20 text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-500/10 bg-blue-500/5 px-4 py-2 text-xs font-medium text-blue-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400" />
            Your personal warranty manager
          </div>

          {/* Heading */}
          <h1 className="max-w-4xl text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
            Know what you own.
            <br />

            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Know when you're covered.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-7 max-w-2xl text-base leading-7 text-slate-500 md:text-lg">
            Warranty Wallet keeps your products, purchase
            details, and warranty dates organized in one
            simple place. No more searching through emails
            and receipts.
          </p>

          {/* Buttons */}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/dashboard"
              className="rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-blue-600/20 hover:-translate-y-1 hover:bg-blue-500 hover:shadow-blue-500/30"
            >
              Open Dashboard →
            </Link>

            <Link
              href="/warranties/new"
              className="rounded-xl border border-white/10 bg-white/[0.03] px-7 py-3.5 text-sm font-semibold text-slate-300 hover:-translate-y-1 hover:bg-white/[0.06] hover:text-white"
            >
              Add a Warranty
            </Link>
          </div>

          {/* Mini product preview */}
          <div className="mt-20 w-full max-w-3xl">
            <div className="relative rounded-2xl border border-white/10 bg-slate-900/70 p-2 shadow-2xl shadow-blue-950/30 backdrop-blur-xl">
              <div className="rounded-xl border border-white/5 bg-[#0b1120] p-6 text-left">
                {/* Fake dashboard header */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-600">
                      WARRANTY WALLET
                    </p>

                    <p className="mt-1 text-lg font-semibold">
                      My Products
                    </p>
                  </div>

                  <div className="rounded-lg bg-blue-500/10 px-3 py-2 text-xs text-blue-400">
                    + Add
                  </div>
                </div>

                {/* Fake products */}
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <PreviewCard
                    icon="💻"
                    name="MacBook Air"
                    status="Active"
                    statusClass="text-emerald-400"
                  />

                  <PreviewCard
                    icon="🎧"
                    name="AirPods Pro"
                    status="12 days left"
                    statusClass="text-amber-400"
                  />

                  <PreviewCard
                    icon="📱"
                    name="iPhone 14"
                    status="Active"
                    statusClass="text-emerald-400"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function PreviewCard({
  icon,
  name,
  status,
  statusClass,
}) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.025] p-4">
      <div className="text-2xl">{icon}</div>

      <p className="mt-4 text-sm font-medium text-slate-200">
        {name}
      </p>

      <p className={`mt-1 text-xs ${statusClass}`}>
        ● {status}
      </p>
    </div>
  );
}