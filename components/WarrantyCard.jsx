import Link from "next/link";

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
  const statusStyles = {
    Active: "bg-green-500/10 text-green-400",
    "Expiring Soon": "bg-yellow-500/10 text-yellow-400",
    Expired: "bg-red-500/10 text-red-400",
  };

  const statusStyle =
    statusStyles[status] ||
    "bg-slate-500/10 text-slate-400";

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xl font-semibold text-white">
            {productName}
          </p>

          <p className="mt-1 text-sm text-slate-400">
            {brand}
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyle}`}
        >
          {status}
        </span>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <p className="text-xs text-slate-500">
            Category
          </p>

          <p className="mt-1 text-sm text-slate-300">
            {category}
          </p>
        </div>

        <div>
          <p className="text-xs text-slate-500">
            Purchase Date
          </p>

          <p className="mt-1 text-sm text-slate-300">
            {purchaseDate}
          </p>
        </div>

        <div>
          <p className="text-xs text-slate-500">
            Warranty Ends
          </p>

          <p className="mt-1 text-sm text-slate-300">
            {warrantyEndDate}
          </p>
        </div>

        <div>
          <p className="text-xs text-slate-500">
            Warranty Status
          </p>

          <p className="mt-1 text-sm font-medium text-slate-300">
            {daysRemaining > 0
              ? `${daysRemaining} days remaining`
              : `${Math.abs(daysRemaining)} days overdue`}
          </p>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <Link
          href={`/warranties/${id}`}
          className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800"
        >
          View Details
        </Link>

        <Link
          href={`/warranties/${id}/edit`}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
        >
          Edit
        </Link>
      </div>
    </div>
  );
}