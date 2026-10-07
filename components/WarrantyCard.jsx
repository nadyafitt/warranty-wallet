import Link from "next/link";

const statusStyles = {
  Active: {
    badge: "bg-emerald-500/10 text-emerald-400 ring-emerald-500/20",
    dot: "bg-emerald-400",
  },
  "Expiring Soon": {
    badge: "bg-amber-500/10 text-amber-400 ring-amber-500/20",
    dot: "bg-amber-400",
  },
  Expired: {
    badge: "bg-rose-500/10 text-rose-400 ring-rose-500/20",
    dot: "bg-rose-400",
  },
};

export default function WarrantyCard({
  id,
  productName,
  brand,
  category,
  purchaseDate,
  warrantyEndDate,
  status,
  daysRemaining,
}) {
  const styles =
    statusStyles[status] || statusStyles.Active;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.025] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/20 hover:bg-white/[0.04] hover:shadow-2xl hover:shadow-blue-950/20">
      {/* Top glow */}
      <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-blue-500/5 blur-3xl transition-opacity group-hover:bg-blue-500/10" />

      {/* Header */}
      <div className="relative flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Product icon */}
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/5 bg-slate-900 text-xl shadow-inner">
            {category === "Electronics"
              ? "💻"
              : category === "Appliances"
                ? "🏠"
                : category === "Furniture"
                  ? "🪑"
                  : "📦"}
          </div>

          <div>
            <h3 className="font-semibold text-white">
              {productName}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              {brand}
            </p>
          </div>
        </div>

        {/* Status */}
        <span
          className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium ring-1 ${styles.badge}`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${styles.dot}`}
          />

          {status}
        </span>
      </div>

      {/* Information */}
      <div className="relative mt-6 grid grid-cols-2 gap-4">
        <div className="rounded-xl bg-black/10 p-3">
          <p className="text-[10px] font-medium uppercase tracking-wider text-slate-600">
            Category
          </p>

          <p className="mt-1 text-sm text-slate-300">
            {category}
          </p>
        </div>

        <div className="rounded-xl bg-black/10 p-3">
          <p className="text-[10px] font-medium uppercase tracking-wider text-slate-600">
            Purchased
          </p>

          <p className="mt-1 text-sm text-slate-300">
            {purchaseDate}
          </p>
        </div>

        <div className="rounded-xl bg-black/10 p-3">
          <p className="text-[10px] font-medium uppercase tracking-wider text-slate-600">
            Warranty Ends
          </p>

          <p className="mt-1 text-sm text-slate-300">
            {warrantyEndDate}
          </p>
        </div>

        <div className="rounded-xl bg-black/10 p-3">
          <p className="text-[10px] font-medium uppercase tracking-wider text-slate-600">
            Coverage
          </p>

          <p
            className={`mt-1 text-sm font-medium ${
              daysRemaining > 0
                ? "text-slate-300"
                : "text-rose-400"
            }`}
          >
            {daysRemaining > 0
              ? `${daysRemaining} days left`
              : `${Math.abs(daysRemaining)} days overdue`}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="relative mt-5 flex gap-3 border-t border-white/5 pt-5">
        <Link
          href={`/warranties/${id}`}
          className="flex-1 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-2.5 text-center text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white"
        >
          View Details
        </Link>

        <Link
          href={`/warranties/${id}/edit`}
          className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-500"
        >
          Edit
        </Link>
      </div>
    </div>
  );
}