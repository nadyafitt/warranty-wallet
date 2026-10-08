import Link from "next/link";
import Navbar from "@/components/Navbar";
import { getPool } from "@/lib/db";

function calculateStatus(warrantyEndDate) {
  const today = new Date();
  const endDate = new Date(warrantyEndDate);

  const difference = endDate.getTime() - today.getTime();

  const daysRemaining = Math.ceil(
    difference / (1000 * 60 * 60 * 24)
  );

  if (daysRemaining < 0) {
    return {
      status: "Expired",
      daysRemaining,
      statusClass: "text-red-400",
    };
  }

  if (daysRemaining <= 30) {
    return {
      status:
        daysRemaining === 0
          ? "Expires today"
          : `${daysRemaining} days left`,
      daysRemaining,
      statusClass: "text-amber-400",
    };
  }

  return {
    status: "Active",
    daysRemaining,
    statusClass: "text-emerald-400",
  };
}

function getProductIcon(category) {
  const categoryName = String(category || "").toLowerCase();

  if (
    categoryName.includes("phone") ||
    categoryName.includes("mobile") ||
    categoryName.includes("electronics")
  ) {
    return "📱";
  }

  if (
    categoryName.includes("computer") ||
    categoryName.includes("laptop")
  ) {
    return "💻";
  }

  if (
    categoryName.includes("audio") ||
    categoryName.includes("headphone")
  ) {
    return "🎧";
  }

  if (
    categoryName.includes("home") ||
    categoryName.includes("appliance")
  ) {
    return "🏠";
  }

  if (categoryName.includes("camera")) {
    return "📷";
  }

  if (categoryName.includes("watch")) {
    return "⌚";
  }

  return "📦";
}

export default async function Home() {
  const pool = getPool();

  let warranties = [];

  try {
    const [rows] = await pool.query(`
      SELECT
        id,
        product_name,
        brand,
        category,
        warranty_end_date
      FROM warranties
      ORDER BY warranty_end_date ASC
      LIMIT 3
    `);

    warranties = rows;
  } catch (error) {
    console.error(
      "Failed to load landing page warranties:",
      error
    );
  }

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
              className="rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-blue-600/20 transition hover:-translate-y-1 hover:bg-blue-500 hover:shadow-blue-500/30"
            >
              Open Dashboard →
            </Link>

            <Link
              href="/warranties/new"
              className="rounded-xl border border-white/10 bg-white/[0.03] px-7 py-3.5 text-sm font-semibold text-slate-300 transition hover:-translate-y-1 hover:bg-white/[0.06] hover:text-white"
            >
              Add a Warranty
            </Link>
          </div>

          {/* Product Preview */}
          <div className="mt-20 w-full max-w-3xl">
            <div className="relative rounded-2xl border border-white/10 bg-slate-900/70 p-2 shadow-2xl shadow-blue-950/30 backdrop-blur-xl">

              <div className="rounded-xl border border-white/5 bg-[#0b1120] p-6 text-left">

                {/* Dashboard preview header */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium tracking-wider text-slate-600">
                      WARRANTY WALLET
                    </p>

                    <p className="mt-1 text-lg font-semibold">
                      My Products
                    </p>
                  </div>

                  <Link
                    href="/warranties/new"
                    className="rounded-lg bg-blue-500/10 px-3 py-2 text-xs text-blue-400 transition hover:bg-blue-500/20"
                  >
                    + Add
                  </Link>
                </div>

                {/* Database products */}
                {warranties.length > 0 ? (
                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    {warranties.map((warranty) => {
                      const {
                        status,
                        statusClass,
                      } = calculateStatus(
                        warranty.warranty_end_date
                      );

                      return (
                        <PreviewCard
                          key={warranty.id}
                          icon={getProductIcon(
                            warranty.category
                          )}
                          name={warranty.product_name}
                          brand={warranty.brand}
                          status={status}
                          statusClass={statusClass}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <div className="mt-6 rounded-xl border border-dashed border-white/10 bg-white/[0.02] p-8 text-center">
                    <div className="text-3xl">
                      📦
                    </div>

                    <p className="mt-3 text-sm font-medium text-slate-300">
                      Your wallet is empty
                    </p>

                    <p className="mt-1 text-xs text-slate-600">
                      Add your first warranty to see it here.
                    </p>

                    <Link
                      href="/warranties/new"
                      className="mt-4 inline-block text-xs font-medium text-blue-400 hover:text-blue-300"
                    >
                      Add your first warranty →
                    </Link>
                  </div>
                )}

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
  brand,
  status,
  statusClass,
}) {
  return (
    <div className="group rounded-xl border border-white/5 bg-white/[0.025] p-4 transition duration-200 hover:-translate-y-1 hover:border-white/10 hover:bg-white/[0.04]">
      <div className="flex items-center justify-between">
        <div className="text-2xl">
          {icon}
        </div>

        <span className="text-[10px] uppercase tracking-wider text-slate-600">
          Warranty
        </span>
      </div>

      <p className="mt-4 truncate text-sm font-medium text-slate-200">
        {name}
      </p>

      {brand && (
        <p className="mt-1 truncate text-xs text-slate-600">
          {brand}
        </p>
      )}

      <p className={`mt-3 text-xs font-medium ${statusClass}`}>
        ● {status}
      </p>
    </div>
  );
}