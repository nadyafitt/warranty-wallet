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
    <div className="min-h-screen bg-[#080d17] text-slate-100">
      <Navbar />
      <main className="ww-home-main">
        <section className="ww-home-hero">
          <div className="ww-home-copy">
            <p className="ww-home-eyebrow">Warranty management, made simple</p>
            <h1 className="ww-home-title">Keep every purchase covered.</h1>
            <p className="ww-home-description">Store your product details and warranty dates in one clear place. Know what is covered and when it ends.</p>
            <div className="ww-home-actions">
              <Link href="/dashboard" className="ww-home-primary">Open dashboard <span aria-hidden="true">→</span></Link>
              <Link href="/warranties/new" className="ww-home-secondary">Add a warranty</Link>
            </div>
            <div className="ww-home-proof">
              <span>Product details</span><span>Purchase records</span><span>Coverage dates</span>
            </div>
          </div>

          <section aria-labelledby="preview-heading" className="ww-home-preview">
            <div className="ww-home-preview-header">
              <div>
                <p className="ww-home-overline">YOUR WARRANTY WALLET</p>
                <h2 id="preview-heading" className="ww-home-preview-title">Coverage overview</h2>
                <p className="ww-home-preview-subtitle">A quick look at your latest records</p>
              </div>
              <Link href="/warranties" className="ww-home-viewall">View all <span aria-hidden="true">→</span></Link>
            </div>
            {warranties.length ? (
              <div className="ww-home-rows">
                {warranties.map((warranty) => <PreviewRow key={warranty.id} warranty={warranty} current={calculateStatus(warranty.warranty_end_date)} />)}
              </div>
            ) : (
              <div className="ww-home-empty">
                <p className="ww-home-empty-title">Your wallet is ready</p>
                <p className="ww-home-empty-description">Add a product to keep its purchase details and warranty dates together.</p>
                <Link href="/warranties/new" className="ww-home-primary">Add your first warranty</Link>
              </div>
            )}
            <div className="ww-home-caption">Clear records. Timely reminders. More confidence in every purchase.</div>
          </section>
        </section>

        <section className="ww-home-features" aria-label="How Warranty Wallet helps">
          <div><p>Everything in one place</p><span>Keep product, brand, and purchase information together.</span></div>
          <div><p>Know your coverage</p><span>See warranty status and key dates without searching through receipts.</span></div>
          <div><p>Stay organized</p><span>Review your warranties from a single, focused dashboard.</span></div>
        </section>
      </main>
    </div>
  );
}

function PreviewRow({ warranty, current }) {
  const statusColor = {
    active: "text-emerald-400",
    expiring: "text-amber-400",
    expired: "text-red-400",
    unknown: "text-slate-400",
  }[current.type];

  return (
    <div className="ww-home-row">
      <div className="ww-home-row-product">
        <p>{warranty.product_name || "Unnamed product"}</p>
        <span>{[warranty.brand, warranty.category].filter(Boolean).join(" · ") || "Product details unavailable"}</span>
      </div>
      <div className="ww-home-row-status">
        <p className={statusColor}>{current.status}</p>
        <span>Warranty status</span>
      </div>
    </div>
  );
}
