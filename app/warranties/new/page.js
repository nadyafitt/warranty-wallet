"use client";

import { useRouter } from "next/navigation";
import WarrantyForm from "@/components/WarrantyForm";

export default function NewWarrantyPage() {
  const router = useRouter();

  async function handleSubmit(warrantyData) {
    try {
      console.log("Warranty submitted:", warrantyData);

      const response = await fetch("/api/warranties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(warrantyData),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Failed to save warranty:", data);

        alert(
          data.error || "Failed to save warranty. Please try again."
        );

        return;
      }

      console.log("Warranty saved:", data);

      alert("Warranty saved successfully!");

      router.push("/warranties");
      router.refresh();
    } catch (error) {
      console.error("Save warranty error:", error);

      alert(
        "Something went wrong while saving the warranty."
      );
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold">
          Add Warranty
        </h1>

        <p className="mt-2 text-slate-400">
          Add a product to your Warranty Wallet.
        </p>

        <div className="mt-8">
          <WarrantyForm
            onSubmit={handleSubmit}
            submitLabel="Save Warranty"
          />
        </div>
      </div>
    </main>
  );
}