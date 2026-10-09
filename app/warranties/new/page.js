"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import WarrantyForm from "@/components/WarrantyForm";

export default function NewWarrantyPage() {
  const router = useRouter();

  async function handleSubmit(warrantyData) {
    try {
      const response = await fetch("/api/warranties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(warrantyData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.error ||
            "Failed to save warranty. Please try again."
        );

        return;
      }

      alert("Warranty saved successfully!");

      router.push("/warranties");
      router.refresh();
    } catch (error) {
      console.error(
        "Save warranty error:",
        error
      );

      alert(
        "Something went wrong while saving the warranty."
      );
    }
  }

  return (
    <main className="ww-add-page">

      {/* Background */}
      <div className="grid-background ww-add-background" />

      <div className="hero-glow ww-add-glow" />

      <div className="ww-add-container">

        {/* =================================================
            BACK TO DASHBOARD
            ================================================= */}

        <div className="ww-add-back-wrapper">

          <Link
            href="/dashboard"
            className="ww-add-back-button"
          >
            <span>←</span>

            Back to Dashboard
          </Link>

        </div>


        {/* =================================================
            HEADER
            ================================================= */}

        <div className="ww-add-header">

          <div className="ww-add-icon">
            🛡️
          </div>

          <p className="ww-add-label">
            WARRANTY WALLET
          </p>

          <h1 className="ww-add-title">
            Add a Warranty
          </h1>

          <p className="ww-add-description">
            Keep your product and warranty details organized
            so you always know when you're covered.
          </p>

        </div>


        {/* =================================================
            FORM CARD
            ================================================= */}

        <div className="ww-add-form-area">

          <div className="ww-add-card">

            <div className="ww-add-card-inner">

              <WarrantyForm
                onSubmit={handleSubmit}
                submitLabel="Save Warranty"
              />

            </div>

          </div>

        </div>


        {/* =================================================
            FOOTER
            ================================================= */}

        <p className="ww-add-footer">
          Your warranty information is stored in your
          Warranty Wallet.
        </p>

      </div>

    </main>
  );
}