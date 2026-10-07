export default function DashboardStats({
  active = 0,
  expiringSoon = 0,
  expired = 0,
}) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
        <p className="text-sm text-slate-400">
          Active
        </p>

        <p className="mt-2 text-4xl font-bold text-green-400">
          {active}
        </p>

        <p className="mt-2 text-sm text-slate-500">
          Warranties currently active
        </p>
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
        <p className="text-sm text-slate-400">
          Expiring Soon
        </p>

        <p className="mt-2 text-4xl font-bold text-yellow-400">
          {expiringSoon}
        </p>

        <p className="mt-2 text-sm text-slate-500">
          Expiring within 30 days
        </p>
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
        <p className="text-sm text-slate-400">
          Expired
        </p>

        <p className="mt-2 text-4xl font-bold text-red-400">
          {expired}
        </p>

        <p className="mt-2 text-sm text-slate-500">
          Warranties that have expired
        </p>
      </div>
    </div>
  );
}