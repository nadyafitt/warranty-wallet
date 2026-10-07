"use client";

import { useState } from "react";

export default function NewWarrantyPage() {
  const [productName, setProductName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [warrantyEndDate, setWarrantyEndDate] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    console.log({
      productName,
      brand,
      category,
      purchaseDate,
      warrantyEndDate,
    });
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

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6 rounded-xl border border-slate-800 bg-slate-900 p-6"
        >
          <div>
            <label className="mb-2 block text-sm font-medium">
              Product Name
            </label>

            <input
              type="text"
              value={productName}
              onChange={(event) => setProductName(event.target.value)}
              placeholder="e.g. iPhone 14"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Brand
            </label>

            <input
              type="text"
              value={brand}
              onChange={(event) => setBrand(event.target.value)}
              placeholder="e.g. Apple"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Category
            </label>

            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
            >
              <option value="">Select category</option>
              <option value="Electronics">Electronics</option>
              <option value="Appliances">Appliances</option>
              <option value="Furniture">Furniture</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Purchase Date
            </label>

            <input
              type="date"
              value={purchaseDate}
              onChange={(event) => setPurchaseDate(event.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Warranty End Date
            </label>

            <input
              type="date"
              value={warrantyEndDate}
              onChange={(event) => setWarrantyEndDate(event.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-5 py-3 font-medium hover:bg-blue-500"
          >
            Save Warranty
          </button>
        </form>
      </div>
    </main>
  );
}