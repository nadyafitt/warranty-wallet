import Link from "next/link";
import Navbar from "@/components/Navbar";
import { getPool } from "@/lib/db";

function calculateStatus(endDate) {
  if (!endDate) {
    return {
      status: "Date unavailable",
      statusClass: "text-slate-400",
      type: "unknown",
    };
  }

  // Handle MySQL DATE values without timezone shifting.
  const dateString =
    endDate instanceof Date
      ? [
          endDate.getFullYear(),
          String(endDate.getMonth() + 1).padStart(2, "0"),
          String(endDate.getDate()).padStart(2, "0"),
        ].join("-")
      : String(endDate).slice(0, 10);

  const [year, month, day] = dateString.split("-").map(Number);

  if (!year || !month || !day) {
    return {
      status: "Date unavailable",
      statusClass: "text-slate-400",
      type: "unknown",
    };
  }

  const today = new Date();
  const todayUTC = Date.UTC(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const expiryUTC = Date.UTC(year, month - 1, day);
  const daysLeft = Math.round(
    (expiryUTC - todayUTC) / (1000 * 60 * 60 * 24)
  );

  if (daysLeft < 0) {
    return {
      status: "Expired",
      statusClass: "text-red-400",
      type: "expired",
    };
  }

  if (daysLeft <= 30) {
    return {
      status: `${daysLeft} day${daysLeft === 1 ? "" : "s"} left`,
      statusClass: "text-amber-400",
      type: "expiring",
    };
  }

  return {
    status: "Active",
    statusClass: "text-emerald-400",
    type: "active",
  };
}

function getProductIcon(category) {
  const normalized = String(category || "").toLowerCase();

  if (
    normalized.includes("electronics") ||
    normalized.includes("computer") ||
    normalized.includes("laptop")
  ) {
    return "💻";
  }

  if (
    normalized.includes("audio") ||
    normalized.includes("headphone") ||
    normalized.includes("accessor")
  ) {
    return "🎧";
  }

  if (
    normalized.includes("phone") ||
    normalized.includes("mobile")
  ) {
    return "📱";
  }

  if (
    normalized.includes("appliance") ||
    normalized.includes("home")
  ) {
    return "🏠";
  }

  if (normalized.includes("furniture")) {
    return "🪑";
  }

  if (normalized.includes("cloth")) {
    return "👕";
  }

  return "📦";
}

async function getWarrantyPreview() {
  try {
    const pool = getPool();

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

    return rows;
  } catch (error) {
    console.error("Failed to load landing page warranties:", error);
    return [];
  }
}

export default async function Home() {
  const warranties = await getWarrantyPreview();

  return (
    <div className="min-h-screen overflow-hidden bg-[#070b14] text-white">
      <Navbar />

      <main className="grid-background relative isolate">
        {/* Background glow */}
        <div className="hero-glow left-1/2 top-20 -translate-x-1/2" />

        <div className="pointer-events-none absolute left-0 top-1/3 -z-10 h-72 w-72 rounded-full bg-indigo-600/[0.07] blur-[120px]" />
        <div className="pointer-events-none absolute right-0 top-2/3 -z-10 h-72 w-72 rounded-full bg-blue-500/[0.07] blur-[120px]" />

        <section className="relative mx-auto flex min-h-[calc(100vh-72px)] max-w-7xl flex-col items-center justify-center px-5 py-16 text-center sm:px-6 sm:py-20">
          {/* Badge */}
          <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-blue-400/15 bg-blue-400/[0.06] px-4 py-2 text-xs font-medium tracking-wide text-blue-300 shadow-sm shadow-blue-950/20 transition-colors duration-300 hover:border-blue-400/25 hover:bg-blue-400/[0.09] sm:mb-8 sm:text-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-400" />
            </span>
            Your personal warranty manager
          </div>

          {/* Heading */}
          <h1 className="max-w-4xl text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Know what you own.
            <br />
            <span className="mt-2 inline-block bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Know when you're covered.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-400 sm:mt-7 sm:text-base md:text-lg md:leading-8">
            Warranty Wallet keeps your products, purchase
            details, and warranty dates organized in one
            simple place. No more searching through emails
            and receipts.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:mt-9 sm:w-auto sm:flex-row sm:gap-4">
            <Link
              href="/dashboard"
              className="group inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-blue-400/20 bg-gradient-to-r from-blue-600 to-indigo-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all duration-300 hover:-translate-y-1 hover:border-blue-300/30 hover:from-blue-500 hover:to-indigo-500 hover:shadow-xl hover:shadow-blue-500/25 active:translate-y-0 sm:min-w-[190px] sm:text-base"
            >
              Open Dashboard
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>

            <Link
              href="/warranties/new"
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.035] px-7 py-3.5 text-sm font-semibold text-slate-300 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.07] hover:text-white active:translate-y-0 sm:min-w-[190px] sm:text-base"
            >
              <span className="text-base text-blue-400">+</span>
              Add a Warranty
            </Link>
          </div>
&emsp;
          {/* Real database product preview */}
          <div className="relative mt-[180px] w-full max-w-3xl sm:mt-[200px] lg:mt-[220px]">
            <div className="group relative rounded-2xl border border-white/10 bg-slate-900/70 p-2 shadow-2xl shadow-blue-950/30 backdrop-blur-xl transition-colors duration-300 hover:border-white/[0.15] sm:p-3">
              {/* Subtle top highlight */}
              <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />

              <div className="rounded-xl border border-white/[0.055] bg-[#0b1120] p-4 text-left sm:p-6">
                {/* Dashboard header */}
                <div className="flex items-center justify-between gap-4 border-b border-white/[0.06] pb-5">
                  <div>
                    <p className="text-[10px] font-semibold tracking-[0.2em] text-blue-400/70 sm:text-xs">
                      WARRANTY WALLET
                    </p>

                    <p className="mt-1.5 text-lg font-semibold tracking-tight text-white sm:text-xl">
                      My Products
                    </p>

                    <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                      Your latest warranty records
                    </p>
                  </div>

                  <Link
                    href="/warranties/new"
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-blue-400/15 bg-blue-500/10 px-3 py-2 text-xs font-medium text-blue-300 transition-all duration-200 hover:border-blue-400/30 hover:bg-blue-500/15 sm:px-4 sm:text-sm"
                  >
                    <span className="text-base">+</span>
                    Add
                  </Link>
                </div>

                {/* Database products */}
                {warranties.length > 0 ? (
                  <div className="mt-4 grid gap-3 sm:mt-5 sm:grid-cols-3">
                    {warranties.map((warranty) => {
                      const warrantyStatus = calculateStatus(
                        warranty.warranty_end_date
                      );

                      return (
                        <PreviewCard
                          key={warranty.id}
                          icon={getProductIcon(warranty.category)}
                          name={warranty.product_name}
                          brand={warranty.brand}
                          category={warranty.category}
                          status={warrantyStatus.status}
                          statusClass={warrantyStatus.statusClass}
                          statusType={warrantyStatus.type}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <div className="mt-4 flex flex-col items-center rounded-xl border border-dashed border-white/10 px-5 py-9 text-center sm:mt-5 sm:py-10">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-400/10 bg-blue-500/[0.06] text-2xl">
                      📦
                    </div>

                    <p className="mt-4 text-sm font-semibold text-slate-200">
                      No warranties to preview yet
                    </p>

                    <p className="mt-2 max-w-sm text-xs leading-5 text-slate-500">
                      Add your first product warranty and it will
                      appear here automatically.
                    </p>

                    <Link
                      href="/warranties/new"
                      className="mt-4 inline-flex items-center gap-2 rounded-lg border border-blue-400/15 bg-blue-500/10 px-4 py-2.5 text-xs font-semibold text-blue-300 transition hover:bg-blue-500/15"
                    >
                      Add your first warranty →
                    </Link>
                  </div>
                )}

                {/* Preview footer */}
                <div className="mt-5 flex flex-col gap-2 border-t border-white/[0.06] pt-4 text-[10px] text-slate-600 sm:flex-row sm:items-center sm:justify-between sm:text-xs">
                  <span>YOUR PRODUCTS, ALL IN ONE PLACE</span>
                  <span>Never miss a warranty deadline.</span>
                </div>
              </div>
            </div>

            <p className="mt-4 text-[10px] tracking-[0.18em] text-slate-600 sm:text-xs">
              SIMPLE · ORGANIZED · PEACE OF MIND
            </p>
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
  category,
  status,
  statusClass,
  statusType,
}) {
  const statusColors = {
    active: {
      badge: "border-emerald-400/15 bg-emerald-400/[0.07]",
      dot: "bg-emerald-400",
      glow: "bg-blue-500/[0.07]",
    },
    expiring: {
      badge: "border-amber-400/15 bg-amber-400/[0.07]",
      dot: "bg-amber-400",
      glow: "bg-amber-500/[0.07]",
    },
    expired: {
      badge: "border-red-400/15 bg-red-400/[0.07]",
      dot: "bg-red-400",
      glow: "bg-red-500/[0.07]",
    },
    unknown: {
      badge: "border-slate-400/15 bg-slate-400/[0.07]",
      dot: "bg-slate-400",
      glow: "bg-slate-500/[0.07]",
    },
  };

  const colors = statusColors[statusType] || statusColors.unknown;

  return (
    <div className="group relative flex min-h-[175px] flex-col overflow-hidden rounded-xl border border-white/[0.07] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/20 hover:shadow-lg hover:shadow-blue-950/20 sm:p-5">
      {/* Card glow */}
      <div
        className={`pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full blur-2xl transition-opacity duration-300 group-hover:opacity-100 ${colors.glow}`}
      />

      {/* Icon and label */}
      <div className="relative flex items-start justify-between gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.035] text-2xl transition-transform duration-300 group-hover:scale-105">
          {icon}
        </div>

        <span className="rounded-md border border-white/[0.06] bg-white/[0.025] px-2 py-1 text-[9px] font-medium uppercase tracking-wider text-slate-500">
          {category || "Warranty"}
        </span>
      </div>

      {/* Product information */}
      <div className="relative mt-5 min-w-0">
        <p
          title={name || ""}
          className="truncate text-sm font-semibold text-slate-200 transition-colors duration-200 group-hover:text-white sm:text-base"
        >
          {name || "Unnamed product"}
        </p>

        <p
          title={brand || ""}
          className="mt-1 truncate text-xs text-slate-500"
        >
          {brand || "Brand not specified"}
        </p>
      </div>

      {/* Status */}
      <div className="relative mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.06] pt-4 mt-4">
        <span className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
          Status
        </span>

        <span
          className={`inline-flex max-w-full items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold ${colors.badge} ${statusClass}`}
        >
          <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${colors.dot}`} />
          <span className="truncate">{status}</span>
        </span>
      </div>
    </div>
  );
}
