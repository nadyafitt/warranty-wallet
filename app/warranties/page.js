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

function formatDate(date) {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default async function WarrantiesPage() {
  let warranties = [];

  try {
    const pool = getPool();

    const [rows] = await pool.query(`
      SELECT
        id,
        product_name,
        brand,
        category,
        purchase_date,
        warranty_end_date,
        purchase_price,
        store,
        notes,
        created_at
      FROM warranties
      ORDER BY created_at DESC
    `);

    warranties = rows;
  } catch (error) {
    console.error("Failed to load warranties:", error);
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-blue-400">
              WARRANTY WALLET
            </p>

            <h1 className="mt-1 text-3xl font-bold">
              My Warranties
            </h1>

            <p className="mt-2 text-slate-400">
              Manage all your products and warranties.
            </p>
          </div>

          <Link
            href="/warranties/new"
            className="w-fit rounded-lg bg-blue-600 px-5 py-3 font-medium transition hover:bg-blue-500"
          >
            + Add Warranty
          </Link>
        </div>

        {/* Warranty List */}
        <div className="mt-10">

          {warranties.length === 0 ? (
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-10 text-center">
              <div className="text-4xl">
                🛡️
              </div>

              <p className="mt-4 text-lg text-slate-300">
                No warranties yet.
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Add your first product warranty to get started.
              </p>

              <Link
                href="/warranties/new"
                className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 font-medium hover:bg-blue-500"
              >
                Add Warranty
              </Link>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">

              {warranties.map((warranty) => {
                const { status, daysRemaining } =
                  calculateStatus(
                    warranty.warranty_end_date
                  );

                return (
                  <div
                    key={warranty.id}
                    className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg transition hover:-translate-y-1 hover:border-blue-500/40"
                  >

                    {/* Top */}
                    <div className="flex items-start justify-between gap-4">

                      <div>
                        <p className="text-sm text-slate-500">
                          {warranty.brand}
                        </p>

                        <h2 className="mt-1 text-xl font-bold">
                          {warranty.product_name}
                        </h2>

                        <p className="mt-1 text-sm text-slate-400">
                          {warranty.category}
                        </p>
                      </div>

                      {/* Status */}
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          status === "Active"
                            ? "bg-emerald-500/10 text-emerald-400"
                            : status === "Expiring Soon"
                            ? "bg-yellow-500/10 text-yellow-400"
                            : "bg-red-500/10 text-red-400"
                        }`}
                      >
                        {status}
                      </span>

                    </div>

                    {/* Divider */}
                    <div className="my-5 h-px bg-slate-800" />

                    {/* Details */}
                    <div className="grid grid-cols-2 gap-5">

                      <div>
                        <p className="text-xs text-slate-500">
                          Purchase Date
                        </p>

                        <p className="mt-1 text-sm text-slate-200">
                          {formatDate(
                            warranty.purchase_date
                          )}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-500">
                          Warranty Ends
                        </p>

                        <p className="mt-1 text-sm text-slate-200">
                          {formatDate(
                            warranty.warranty_end_date
                          )}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-500">
                          Store
                        </p>

                        <p className="mt-1 text-sm text-slate-200">
                          {warranty.store || "-"}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-500">
                          Price
                        </p>

                        <p className="mt-1 text-sm text-slate-200">
                          {warranty.purchase_price
                            ? `RM ${Number(
                                warranty.purchase_price
                              ).toFixed(2)}`
                            : "-"}
                        </p>
                      </div>

                    </div>

                    {/* Remaining */}
                    <div className="mt-5 rounded-lg bg-slate-950 p-4">
                      <p className="text-xs text-slate-500">
                        Warranty Status
                      </p>

                      <p className="mt-1 text-sm font-medium">
                        {daysRemaining < 0
                          ? `Expired ${Math.abs(
                              daysRemaining
                            )} days ago`
                          : daysRemaining === 0
                          ? "Expires today"
                          : `${daysRemaining} days remaining`}
                      </p>
                    </div>

                    {/* Notes */}
                    {warranty.notes && (
                      <div className="mt-5">
                        <p className="text-xs text-slate-500">
                          Notes
                        </p>

                        <p className="mt-1 text-sm text-slate-400">
                          {warranty.notes}
                        </p>
                      </div>
                    )}

                  </div>
                );
              })}

            </div>
          )}

        </div>
      </div>
    </main>
  );
}