export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold">
          Warranty Dashboard
        </h1>

        <p className="mt-2 text-slate-400">
          Keep track of all your product warranties.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Active</p>
            <p className="mt-2 text-4xl font-bold text-green-400">0</p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Expiring Soon</p>
            <p className="mt-2 text-4xl font-bold text-yellow-400">0</p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Expired</p>
            <p className="mt-2 text-4xl font-bold text-red-400">0</p>
          </div>
        </div>
      </div>
    </main>
  );
}