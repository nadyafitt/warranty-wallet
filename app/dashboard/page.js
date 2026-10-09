import Link from "next/link";
import Navbar from "@/components/Navbar";
import DashboardStats from "@/components/DashboardStats";
import { getPool } from "@/lib/db";

export const dynamic = "force-dynamic";

function calculateStatus(warrantyEndDate) {
  const today = new Date();
  const endDate = new Date(warrantyEndDate);

  const difference =
    endDate.getTime() - today.getTime();

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
  const categoryName = String(category || "").toLowerCase();

  if (
    categoryName.includes("phone") ||
    categoryName.includes("mobile") ||
    categoryName.includes("electronics")
  ) {
    return "📱";
  }

  if (
    categoryName.includes("computer") ||
    categoryName.includes("laptop")
  ) {
    return "💻";
  }

  if (
    categoryName.includes("audio") ||
    categoryName.includes("headphone")
  ) {
    return "🎧";
  }

  if (
    categoryName.includes("home") ||
    categoryName.includes("appliance")
  ) {
    return "🏠";
  }

  if (categoryName.includes("camera")) {
    return "📷";
  }

  if (categoryName.includes("watch")) {
    return "⌚";
  }

  return "📦";
}

function formatDate(date) {
  if (!date) return "—";

  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getStatusClass(status) {
  if (status === "Active") {
    return "ww-dashboard-product-status-active";
  }

  if (status === "Expiring Soon") {
    return "ww-dashboard-product-status-warning";
  }

  return "ww-dashboard-product-status-expired";
}

function getDaysText(daysRemaining) {
  if (daysRemaining < 0) {
    const days = Math.abs(daysRemaining);

    return `${days} ${days === 1 ? "day" : "days"} ago`;
  }

  if (daysRemaining === 0) {
    return "Ends today";
  }

  return `${daysRemaining} ${
    daysRemaining === 1 ? "day" : "days"
  } left`;
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
        store,
        notes
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

  const warrantyData = warranties.map((warranty) => {
    const { status, daysRemaining } =
      calculateStatus(
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

  const totalCount = warrantyData.length;

  const protectedPercentage =
    totalCount > 0
      ? Math.round(
          (activeCount / totalCount) * 100
        )
      : 0;

  const attentionWarranties = warrantyData
    .filter(
      (warranty) =>
        warranty.status === "Expiring Soon" ||
        warranty.status === "Expired"
    )
    .slice(0, 3);

  const recentWarranties = warrantyData.slice(0, 3);

  return (
    <div className="ww-dashboard-page">
      <Navbar />

      <main className="ww-dashboard-main">
        <div className="ww-dashboard-background" />

        <div className="hero-glow ww-dashboard-glow" />

        <div className="ww-dashboard-container">

          {/* =================================================
              HEADER
              ================================================= */}

          <div className="ww-dashboard-header">
            <div>
              <p className="ww-dashboard-label">
                GOOD TO SEE YOU
              </p>

              <h1 className="ww-dashboard-title">
                Your Warranty
                <span> Dashboard</span>
              </h1>

              <p className="ww-dashboard-description">
                Keep an eye on your products and make sure
                you're covered when it matters.
              </p>
            </div>

            <Link
              href="/warranties/new"
              className="ww-dashboard-add-button"
            >
              <span>+</span>
              Add Product
            </Link>
          </div>

          {/* =================================================
              STATS
              ================================================= */}

          <DashboardStats
            active={activeCount}
            expiringSoon={expiringSoonCount}
            expired={expiredCount}
          />

          {/* =================================================
              NEEDS ATTENTION
              ================================================= */}

          <section className="ww-dashboard-section">
            <div className="ww-dashboard-section-header">
              <div>
                <h2>
                  Needs Attention
                </h2>

                <p>
                  Warranties that may need your attention
                </p>
              </div>

              <Link
                href="/warranties"
                className="ww-dashboard-view-link"
              >
                View all
                <span>→</span>
              </Link>
            </div>

            {attentionWarranties.length > 0 ? (
              <div className="ww-dashboard-attention-list">
                {attentionWarranties.map(
                  (warranty) => (
                    <div
                      key={warranty.id}
                      className={`ww-dashboard-attention-card ${
                        warranty.status ===
                        "Expired"
                          ? "ww-dashboard-attention-expired"
                          : "ww-dashboard-attention-warning"
                      }`}
                    >
                      <div className="ww-dashboard-attention-icon">
                        {warranty.status ===
                        "Expired"
                          ? "×"
                          : "!"}
                      </div>

                      <div className="ww-dashboard-attention-content">
                        <div>
                          <h3>
                            {warranty.product_name}
                          </h3>

                          <p>
                            {warranty.brand}
                            {" · "}
                            {warranty.category}
                          </p>
                        </div>

                        <div className="ww-dashboard-attention-right">
                          <span
                            className={
                              warranty.status ===
                              "Expired"
                                ? "ww-dashboard-attention-status-expired"
                                : "ww-dashboard-attention-status-warning"
                            }
                          >
                            {warranty.status}
                          </span>

                          <strong>
                            {getDaysText(
                              warranty.daysRemaining
                            )}
                          </strong>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            ) : (
              <div className="ww-dashboard-no-attention">
                <div>
                  ✓
                </div>

                <div>
                  <p>
                    Everything looks good
                  </p>

                  <span>
                    You don't have any warranties
                    requiring attention.
                  </span>
                </div>
              </div>
            )}
          </section>

          {/* =================================================
              PROTECTION OVERVIEW
              ================================================= */}

          <section className="ww-dashboard-overview">

            <div className="ww-dashboard-protection-card">
              <div className="ww-dashboard-card-header">
                <div>
                  <h2>
                    Protection Overview
                  </h2>

                  <p>
                    Your current warranty coverage
                  </p>
                </div>

                <div className="ww-dashboard-card-icon">
                  🛡️
                </div>
              </div>

              <div className="ww-dashboard-protection-content">
                <div className="ww-dashboard-percentage">
                  <strong>
                    {protectedPercentage}%
                  </strong>

                  <span>
                    protected
                  </span>
                </div>

                <div className="ww-dashboard-progress-area">
                  <div className="ww-dashboard-progress-header">
                    <span>
                      Active warranties
                    </span>

                    <strong>
                      {activeCount} / {totalCount}
                    </strong>
                  </div>

                  <div className="ww-dashboard-progress-track">
                    <div
                      className="ww-dashboard-progress-bar"
                      style={{
                        width: `${protectedPercentage}%`,
                      }}
                    />
                  </div>

                  <p>
                    {totalCount === 0
                      ? "Add your first warranty to start tracking your protection."
                      : `${activeCount} of your ${totalCount} products are currently protected.`}
                  </p>
                </div>
              </div>
            </div>

            <div className="ww-dashboard-message-card">
              <span className="ww-dashboard-message-label">
                WARRANTY WALLET
              </span>

              <h2>
                Stay covered.
              </h2>

              <p>
                Keep your purchase information organized
                so you never forget when your coverage ends.
              </p>

              <div className="ww-dashboard-message-icons">
                🛡️
                <span>+</span>
                📦
                <span>+</span>
                🔒
              </div>
            </div>

          </section>

          {/* =================================================
              YOUR PRODUCTS
              ================================================= */}

          <section className="ww-dashboard-products-section">
            <div className="ww-dashboard-section-header">
              <div>
                <h2>
                  Your Products
                </h2>

                <p>
                  Recently added products in your wallet
                </p>
              </div>

              <Link
                href="/warranties"
                className="ww-dashboard-view-link"
              >
                View all
                <span>→</span>
              </Link>
            </div>

            {recentWarranties.length > 0 ? (
              <div className="ww-dashboard-products-grid">
                {recentWarranties.map(
                  (warranty) => (
                    <div
                      key={warranty.id}
                      className="ww-dashboard-product-card"
                    >
                      <div className="ww-dashboard-product-top">
                        <div className="ww-dashboard-product-icon">
                          {getProductIcon(
                            warranty.category
                          )}
                        </div>

                        <span
                          className={`ww-dashboard-product-status ${getStatusClass(
                            warranty.status
                          )}`}
                        >
                          {warranty.status}
                        </span>
                      </div>

                      <h3>
                        {warranty.product_name}
                      </h3>

                      <p className="ww-dashboard-product-brand">
                        {warranty.brand}
                      </p>

                      <div className="ww-dashboard-product-info">
                        <div>
                          <span>
                            Warranty ends
                          </span>

                          <strong>
                            {formatDate(
                              warranty.warranty_end_date
                            )}
                          </strong>
                        </div>

                        <div>
                          <span>
                            Status
                          </span>

                          <strong>
                            {getDaysText(
                              warranty.daysRemaining
                            )}
                          </strong>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            ) : (
              <div className="ww-dashboard-empty">
                <div className="ww-dashboard-empty-icon">
                  📦
                </div>

                <h3>
                  Your wallet is empty
                </h3>

                <p>
                  Add your first product to start
                  tracking your warranties.
                </p>

                <Link
                  href="/warranties/new"
                  className="ww-dashboard-empty-button"
                >
                  Add Your First Warranty
                  <span>→</span>
                </Link>
              </div>
            )}
          </section>

          {/* =================================================
              DATABASE EMPTY MESSAGE
              ================================================= */}

          {totalCount === 0 && (
            <div className="ww-dashboard-footer-note">
              <span>💡</span>

              <p>
                Your dashboard will automatically update
                when you add your first warranty.
              </p>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}