
"use client";

import { useState } from "react";

function mapCategory(apiCategory) {
  const category = String(apiCategory || "").toLowerCase();

  if (
    category.includes("furniture") ||
    category.includes("home-decoration")
  ) {
    return "Furniture";
  }

  if (
    category.includes("appliance") ||
    category.includes("kitchen")
  ) {
    return "Appliances";
  }

  if (
    category.includes("mobile") ||
    category.includes("laptop") ||
    category.includes("computer") ||
    category.includes("smartphone") ||
    category.includes("electronics") ||
    category.includes("tablet")
  ) {
    return "Electronics";
  }

  return "Others";
}

export default function WarrantyForm({
  initialData = {},
  onSubmit,
  submitLabel = "Save Warranty",
}) {
  const [productName, setProductName] = useState(
    initialData.productName || ""
  );
  const [brand, setBrand] = useState(initialData.brand || "");
  const [category, setCategory] = useState(initialData.category || "");
  const [purchaseDate, setPurchaseDate] = useState(
    initialData.purchaseDate || ""
  );
  const [warrantyEndDate, setWarrantyEndDate] = useState(
    initialData.warrantyEndDate || ""
  );
  const [purchasePrice, setPurchasePrice] = useState(
    initialData.purchasePrice || ""
  );
  const [store, setStore] = useState(initialData.store || "");
  const [notes, setNotes] = useState(initialData.notes || "");

  // Product API search state
  const [productQuery, setProductQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState("");

  async function searchProducts(event) {
    event.preventDefault();

    const query = productQuery.trim();

    if (query.length < 2) {
      setProducts([]);
      setSearchError("Enter at least 2 characters.");
      return;
    }

    setSearching(true);
    setProducts([]);
    setSearchError("");

    try {
      const response = await fetch(
        `/api/products?q=${encodeURIComponent(query)}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to search products."
        );
      }

      setProducts(data.products || []);

      if (!data.products?.length) {
        setSearchError(
          "No matching products found. You can enter the details manually."
        );
      }
    } catch (error) {
      setSearchError(
        error.message || "Product search failed. Try again."
      );
    } finally {
      setSearching(false);
    }
  }

  function selectProduct(product) {
    setProductName(product.name || "");
    setBrand(product.brand || "");
    setCategory(mapCategory(product.category));
    setProductQuery(product.name || "");
    setProducts([]);
    setSearchError("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    onSubmit({
      productName,
      brand,
      category,
      purchaseDate,
      warrantyEndDate,
      purchasePrice,
      store,
      notes,
    });
  }

  const inputClass =
    "w-full rounded-xl border border-white/5 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-slate-700 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10";

  const labelClass =
    "mb-2 block text-sm font-medium text-slate-300";

  return (
    <form
      onSubmit={handleSubmit}
      className="overflow-hidden rounded-2xl border border-white/5 bg-white/[0.025] shadow-2xl shadow-black/20"
    >
      {/* Form header */}
      <div className="border-b border-white/5 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
            🛡️
          </div>

          <div>
            <h2 className="font-semibold text-white">
              Product Information
            </h2>

            <p className="text-xs text-slate-500">
              Keep your warranty details organized.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6 p-6">
        {/* Product + Brand */}
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className={labelClass}>
              Product Name
            </label>

            <input
              type="text"
              value={productName}
              onChange={(e) =>
                setProductName(e.target.value)
              }
              placeholder="e.g. iPhone 14"
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              Brand
            </label>

            <input
              type="text"
              value={brand}
              onChange={(e) =>
                setBrand(e.target.value)
              }
              placeholder="e.g. Apple"
              required
              className={inputClass}
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className={labelClass}>
            Category
          </label>

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            required
            className={inputClass}
          >
            <option value="">
              Select a category
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

        {/* Dates */}
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className={labelClass}>
              Purchase Date
            </label>

            <input
              type="date"
              value={purchaseDate}
              onChange={(e) =>
                setPurchaseDate(e.target.value)
              }
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              Warranty End Date
            </label>

            <input
              type="date"
              value={warrantyEndDate}
              onChange={(e) =>
                setWarrantyEndDate(e.target.value)
              }
              required
              className={inputClass}
            />
          </div>
        </div>

        {/* Price + Store */}
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className={labelClass}>
              Purchase Price
            </label>

            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-600">
                RM
              </span>

              <input
                type="number"
                min="0"
                step="0.01"
                value={purchasePrice}
                onChange={(e) =>
                  setPurchasePrice(e.target.value)
                }
                placeholder="0.00"
                className={`${inputClass} pl-12`}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>
              Store
            </label>

            <input
              type="text"
              value={store}
              onChange={(e) =>
                setStore(e.target.value)
              }
              placeholder="e.g. Apple Store"
              className={inputClass}
            />
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className={labelClass}>
            Notes
          </label>

          <textarea
            value={notes}
            onChange={(e) =>
              setNotes(e.target.value)
            }
            placeholder="Anything else worth remembering..."
            rows={4}
            className={`${inputClass} resize-none`}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 hover:-translate-y-0.5 hover:shadow-blue-600/30"
        >
          <span className="relative z-10">
            {submitLabel}
          </span>

          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        </button>
      </div>
    </form>
  );
}