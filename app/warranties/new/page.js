"use client";

import { useRouter } from "next/navigation";
import WarrantyForm from "@/components/WarrantyForm";

export default function NewWarrantyPage() {
  const router = useRouter();

  function handleSubmit(warrantyData) {
    console.log("Warranty submitted:", warrantyData);

    // Later:
    // POST warrantyData to our API/database

    router.push("/warranties");
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