
import Link from "next/link";
import { getPool } from "@/lib/db";

// Always fetch fresh data when this page is requested.
export const dynamic = "force-dynamic";

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

function getProductIcon(category) {
  const icons = {
    Electronics: "💻",
    Computer: "🖥️",
    Phone: "📱",
    Audio: "🎧",
    "Home Appliance": "🏠",
    Camera: "📷",
    Watch: "⌚",
    Other: "📦",
  };

  return icons[category] || "📦";
}

function formatDate(date) {
  if (!date) return "—";

  const parsedDate = new Date(date);

  return parsedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getStatusStyles(status) {
  if (status === "Active") {
    return {
      badge: "ww-list-status-active",
      icon: "✓",
    };
  }

  if (status === "Expiring Soon") {
    return {
      badge: "ww-list-status-warning",
      icon: "!",
    };
  }

  return {
    badge: "ww-list-status-expired",
    icon: "×",
  };
}

export default async function WarrantiesPage() {
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
        store,
        notes,
        created_at
      FROM warranties
      ORDER BY created_at DESC, id DESC
    `);

    warranties = rows;
  } catch (error) {
    console.error("Failed to load warranties:", error);
  }

  const warrantyData = warranties.map((warranty) => {
    const { status, daysRemaining } = calculateStatus(
      warranty.warranty_end_date
    );

    return {
      ...warranty,
      status,
      daysRemaining,
    };
  });

  const activeCount = warrantyData.filter(
    (warranty) => warranty.status === "Active"
  ).length;

  const expiringSoonCount = warrantyData.filter(
    (warranty) => warranty.status === "Expiring Soon"
  ).length;

  const expiredCount = warrantyData.filter(
    (warranty) => warranty.status === "Expired"
  ).length;

  return (
    <main className="ww-list-page">
      <div className="grid-background ww-list-background" />

      <div className="hero-glow ww-list-glow" />

      <div className="ww-list-container">
        {/* Back */}
        <div className="ww-list-back-wrapper">
          <Link
            href="/dashboard"
            className="ww-list-back-button"
          >
            <span>←</span>
            Back to Dashboard
          </Link>
        </div>

        {/* Header */}
        <div className="ww-list-header">
          <p className="ww-list-label">
            WARRANTY WALLET
          </p>

          <h1 className="ww-list-title">
            My Warranties
          </h1>

          <p className="ww-list-description">
            Keep track of your products, coverage periods,
            and warranty expiration dates in one place.
          </p>

          <Link
            href="/warranties/new"
            className="ww-list-add-button"
          >
            <span>+</span>
            Add Warranty
          </Link>
        </div>

        {/* Summary */}
        {warrantyData.length > 0 && (
          <div className="ww-list-summary">
            <div>
              <span>Total</span>
              <strong>{warrantyData.length}</strong>
            </div>

            <div>
              <span>Active</span>
              <strong>{activeCount}</strong>
            </div>

            <div>
              <span>Expiring Soon</span>
              <strong>{expiringSoonCount}</strong>
            </div>

            <div>
              <span>Expired</span>
              <strong>{expiredCount}</strong>
            </div>
          </div>
        )}

        {/* Warranty Cards */}
        {warrantyData.length > 0 ? (
          <div className="ww-list-grid">
            {warrantyData.map((warranty) => {
              const statusStyles = getStatusStyles(
                warranty.status
              );

              return (
                <article
                  key={warranty.id}
                  className="ww-list-card"
                >
                  {/* Card Header */}
                  <div className="ww-card-header">
                    <div className="ww-card-product">
                      <div className="ww-card-icon">
                        {getProductIcon(warranty.category)}
                      </div>

                      <div className="ww-card-heading">
                        <h2>
                          {warranty.product_name}
                        </h2>

                        <p>
                          {warranty.brand}
                        </p>
                      </div>
                    </div>

                    <div
                      className={`ww-card-status ${statusStyles.badge}`}
                    >
                      <span>
                        {statusStyles.icon}
                      </span>

                      {warranty.status}
                    </div>
                  </div>

                  {/* Warranty Information */}
                  <div className="ww-card-details">
                    <div className="ww-card-detail">
                      <span>Category</span>
                      <strong>
                        {warranty.category}
                      </strong>
                    </div>

                    <div className="ww-card-detail">
                      <span>Purchased</span>
                      <strong>
                        {formatDate(warranty.purchase_date)}
                      </strong>
                    </div>

                    <div className="ww-card-detail">
                      <span>Warranty Ends</span>
                      <strong>
                        {formatDate(warranty.warranty_end_date)}
                      </strong>
                    </div>

                    {warranty.store && (
                      <div className="ww-card-detail">
                        <span>Store</span>
                        <strong>
                          {warranty.store}
                        </strong>
                      </div>
                    )}

                    {warranty.purchase_price !== null &&
                      warranty.purchase_price !== undefined && (
                        <div className="ww-card-detail">
                          <span>Purchase Price</span>
                          <strong>
                            $
                            {Number(
                              warranty.purchase_price
                            ).toFixed(2)}
                          </strong>
                        </div>
                      )}
                  </div>

                  {/* Progress */}
                  <div className="ww-card-progress">
                    <div className="ww-card-progress-header">
                      <span>Warranty Status</span>

                      <span>
                        {warranty.daysRemaining < 0
                          ? `${Math.abs(
                              warranty.daysRemaining
                            )} days ago`
                          : warranty.daysRemaining === 0
                          ? "Ends today"
                          : `${warranty.daysRemaining} days left`}
                      </span>
                    </div>

                    <div className="ww-card-progress-track">
                      <div
                        className={`ww-card-progress-bar ${
                          warranty.status === "Expired"
                            ? "ww-card-progress-expired"
                            : warranty.status === "Expiring Soon"
                            ? "ww-card-progress-warning"
                            : "ww-card-progress-active"
                        }`}
                        style={{
                          width:
                            warranty.status === "Expired"
                              ? "100%"
                              : warranty.status === "Expiring Soon"
                              ? "75%"
                              : "45%",
                        }}
                      />
                    </div>
                  </div>

                  {/* Notes */}
                  {warranty.notes && (
                    <div className="ww-card-notes">
                      <span>Notes</span>
                      <p>{warranty.notes}</p>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="ww-list-empty">
            <div className="ww-list-empty-icon">
              🛡️
            </div>

            <h2>No warranties yet</h2>

            <p>
              Start building your Warranty Wallet by
              adding your first protected product.
            </p>

            <Link
              href="/warranties/new"
              className="ww-list-empty-button"
            >
              Add Your First Warranty
              <span>→</span>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}