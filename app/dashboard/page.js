import Navbar from "@/components/Navbar";
import DashboardStats from "@/components/DashboardStats";
import Link from "next/link";
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
    };
  }

  if (daysRemaining <= 30) {
    return {
      status: "Expiring Soon",
      daysRemaining,
    };
  }

  return {
    status: "Active",
    daysRemaining,
  };
}

export default async function DashboardPage() {
  const pool = getPool();

  let warranties = [];

  try {
    const [rows] = await pool.query(`
      SELECT
        id,
        product_name,
        brand,
        category,
        purchase_date,
        warranty_end_date,
        purchase_price,
        store
      FROM warranties
      ORDER BY warranty_end_date ASC
    `);

    warranties = rows;
  } catch (error) {
    console.error(
      "Failed to load dashboard warranties:",
      error
    );
  }

  // Calculate warranty statuses
  const warrantyData = warranties.map((warranty) => {
    const { status, daysRemaining } =
      calculateStatus(warranty.warranty_end_date);

    return {
      ...warranty,
      status,
      daysRemaining,
    };
  });

  // Statistics
  const activeCount = warrantyData.filter(
    (warranty) => warranty.status === "Active"
  ).length;

  const expiringSoonCount = warrantyData.filter(
    (warranty) => warranty.status === "Expiring Soon"
  ).length;

  const expiredCount = warrantyData.filter(
    (warranty) => warranty.status === "Expired"
  ).length;

  const totalCount = warrantyData.length;

  // Protection percentage
  const protectedPercentage =
    totalCount > 0
      ? Math.round((activeCount / totalCount) * 100)
      : 0;

  // Products needing attention
  const attentionWarranties = warrantyData
    .filter(
      (warranty) =>
        warranty.status === "Expiring Soon" ||
        warranty.status === "Expired"
    )
    .slice(0, 3);

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
            active={activeCount}
            expiringSoon={expiringSoonCount}
            expired={expiredCount}
          />

          {/* Needs Attention */}
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

            {attentionWarranties.length === 0 ? (
              <div className="rounded-2xl border border-emerald-500/10 bg-emerald-500/[0.03] p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                    ✓
                  </div>

                  <div>
                    <p className="font-medium text-slate-200">
                      Everything looks good
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      None of your warranties need attention
                      right now.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {attentionWarranties.map((warranty) => (
                  <div
                    key={warranty.id}
                    className={`rounded-2xl border p-5 ${
                      warranty.status === "Expired"
                        ? "border-red-500/10 bg-red-500/[0.03]"
                        : "border-amber-500/10 bg-amber-500/[0.03]"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                            warranty.status === "Expired"
                              ? "bg-red-500/10 text-red-400"
                              : "bg-amber-500/10 text-amber-400"
                          }`}
                        >
                          {warranty.status === "Expired"
                            ? "×"
                            : "!"}
                        </div>

                        <div>
                          <p className="font-medium text-slate-200">
                            {warranty.product_name}
                          </p>

                          <p className="mt-1 text-sm text-slate-500">
                            {warranty.brand} ·{" "}
                            {warranty.category}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p
                          className={`text-sm font-semibold ${
                            warranty.status === "Expired"
                              ? "text-red-400"
                              : "text-amber-400"
                          }`}
                        >
                          {warranty.status}
                        </p>

                        <p className="mt-1 text-xs text-slate-600">
                          {warranty.daysRemaining < 0
                            ? `${Math.abs(
                                warranty.daysRemaining
                              )} days ago`
                            : warranty.daysRemaining === 0
                            ? "Expires today"
                            : `${warranty.daysRemaining} days left`}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Overview */}
          <section className="mt-10 grid gap-6 lg:grid-cols-3">

            {/* Protection Overview */}
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

                <span className="text-2xl">
                  🛡️
                </span>
              </div>

              <div className="mt-8">
                <div className="mb-2 flex justify-between text-xs">
                  <span className="text-slate-500">
                    Protected products
                  </span>

                  <span className="font-medium text-slate-300">
                    {activeCount} / {totalCount}
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-700"
                    style={{
                      width: `${protectedPercentage}%`,
                    }}
                  />
                </div>

                <div className="mt-3 flex justify-between">
                  <p className="text-xs text-slate-600">
                    {protectedPercentage}% currently protected
                  </p>

                  <p className="text-xs text-slate-600">
                    {totalCount} total products
                  </p>
                </div>
              </div>
            </div>

            {/* Wallet Card */}
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

          {/* Empty Database Message */}
          {totalCount === 0 && (
            <div className="mt-8 rounded-2xl border border-blue-500/10 bg-blue-500/[0.03] p-6 text-center">
              <p className="text-sm text-slate-400">
                Your warranty wallet is empty.
              </p>

              <Link
                href="/warranties/new"
                className="mt-3 inline-block text-sm font-medium text-blue-400 hover:text-blue-300"
              >
                Add your first warranty →
              </Link>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}