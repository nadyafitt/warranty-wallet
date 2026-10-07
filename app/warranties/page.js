import Link from "next/link";

export default function WarrantiesPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              My Warranties
            </h1>

            <p className="mt-2 text-slate-400">
              Manage all your products and warranties.
            </p>
          </div>

          <Link
            href="/warranties/new"
            className="rounded-lg bg-blue-600 px-5 py-3 font-medium hover:bg-blue-500"
          >
            + Add Warranty
          </Link>
        </div>

        <div className="mt-10 rounded-xl border border-slate-800 bg-slate-900 p-10 text-center">
          <p className="text-lg text-slate-300">
            No warranties yet.
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Add your first product warranty to get started.
          </p>
        </div>
      </div>
    </main>
  );
}