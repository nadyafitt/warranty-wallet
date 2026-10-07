import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center">
        <div className="mb-6 rounded-full bg-blue-500/10 px-4 py-2 text-sm text-blue-400">
          Warranty Wallet
        </div>

        <h1 className="max-w-3xl text-5xl font-bold tracking-tight md:text-6xl">
          Never lose track of your warranties again.
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-slate-400">
          Keep all your product warranties in one place and know exactly when
          your coverage expires.
        </p>

        <div className="mt-8 flex gap-4">
          <Link
            href="/dashboard"
            className="rounded-lg bg-blue-600 px-6 py-3 font-medium hover:bg-blue-500"
          >
            Go to Dashboard
          </Link>

          <Link
            href="/warranties"
            className="rounded-lg border border-slate-700 px-6 py-3 font-medium hover:bg-slate-800"
          >
            View Warranties
          </Link>
        </div>
      </section>
    </main>
  );
}