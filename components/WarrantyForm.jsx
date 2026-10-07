"use client";

import { useState } from "react";

export default function WarrantyForm({
  initialData = {},
  onSubmit,
  submitLabel = "Save Warranty",
}) {
  const [productName, setProductName] = useState(
    initialData.productName || ""
  );

  const [brand, setBrand] = useState(
    initialData.brand || ""
  );

  const [category, setCategory] = useState(
    initialData.category || ""
  );

  const [purchaseDate, setPurchaseDate] = useState(
    initialData.purchaseDate || ""
  );

  const [warrantyEndDate, setWarrantyEndDate] =
    useState(initialData.warrantyEndDate || "");

  const [purchasePrice, setPurchasePrice] = useState(
    initialData.purchasePrice || ""
  );

  const [store, setStore] = useState(
    initialData.store || ""
  );

  const [notes, setNotes] = useState(
    initialData.notes || ""
  );

  function handleSubmit(event) {
    event.preventDefault();

    const warrantyData = {
      productName,
      brand,
      category,
      purchaseDate,
      warrantyEndDate,
      purchasePrice,
      store,
      notes,
    };

    onSubmit(warrantyData);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-xl border border-slate-800 bg-slate-900 p-6"
    >
      {/* Product Name */}
      <div>
        <label className="mb-2 block text-sm font-medium text-white">
          Product Name
        </label>

        <input
          type="text"
          value={productName}
          onChange={(event) =>
            setProductName(event.target.value)
          }
          placeholder="e.g. iPhone 14"
          required
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
        />
      </div>

      {/* Brand */}
      <div>
        <label className="mb-2 block text-sm font-medium text-white">
          Brand
        </label>

        <input
          type="text"
          value={brand}
          onChange={(event) =>
            setBrand(event.target.value)
          }
          placeholder="e.g. Apple"
          required
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
        />
      </div>

      {/* Category */}
      <div>
        <label className="mb-2 block text-sm font-medium text-white">
          Category
        </label>

        <select
          value={category}
          onChange={(event) =>
            setCategory(event.target.value)
          }
          required
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
        >
          <option value="">
            Select category
          </option>

          <option value="Electronics">
            Electronics
          </option>

          <option value="Appliances">
            Appliances
          </option>

          <option value="Furniture">
            Furniture
          </option>

          <option value="Others">
            Others
          </option>
        </select>
      </div>

      {/* Purchase Date */}
      <div>
        <label className="mb-2 block text-sm font-medium text-white">
          Purchase Date
        </label>

        <input
          type="date"
          value={purchaseDate}
          onChange={(event) =>
            setPurchaseDate(event.target.value)
          }
          required
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
        />
      </div>

      {/* Warranty End Date */}
      <div>
        <label className="mb-2 block text-sm font-medium text-white">
          Warranty End Date
        </label>

        <input
          type="date"
          value={warrantyEndDate}
          onChange={(event) =>
            setWarrantyEndDate(event.target.value)
          }
          required
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
        />
      </div>

      {/* Purchase Price */}
      <div>
        <label className="mb-2 block text-sm font-medium text-white">
          Purchase Price (RM)
        </label>

        <input
          type="number"
          min="0"
          step="0.01"
          value={purchasePrice}
          onChange={(event) =>
            setPurchasePrice(event.target.value)
          }
          placeholder="e.g. 3499.00"
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
        />
      </div>

      {/* Store */}
      <div>
        <label className="mb-2 block text-sm font-medium text-white">
          Store
        </label>

        <input
          type="text"
          value={store}
          onChange={(event) =>
            setStore(event.target.value)
          }
          placeholder="e.g. Apple Store"
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
        />
      </div>

      {/* Notes */}
      <div>
        <label className="mb-2 block text-sm font-medium text-white">
          Notes
        </label>

        <textarea
          value={notes}
          onChange={(event) =>
            setNotes(event.target.value)
          }
          placeholder="Add any additional information..."
          rows={4}
          className="w-full resize-none rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-500"
      >
        {submitLabel}
      </button>
    </form>
  );
}