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

  const [warrantyEndDate, setWarrantyEndDate] = useState(
    initialData.warrantyEndDate || ""
  );

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

  const inputClass =
    "mt-2 h-12 w-full rounded-xl border border-white/[0.08] bg-[#070b14] px-4 text-sm text-slate-100 shadow-inner shadow-black/20 outline-none transition-all duration-200 placeholder:text-slate-700 hover:border-white/[0.14] focus:border-blue-500/70 focus:bg-[#090f1c] focus:ring-4 focus:ring-blue-500/[0.08]";

  const labelClass =
    "text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8"
    >

      {/* =================================================
          PRODUCT INFORMATION
          ================================================= */}

      <section>

        <div className="mb-5">

          <p className="text-sm font-semibold text-slate-200">
            Product Information
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-600">
            Tell us about the product you're protecting.
          </p>

        </div>

        <div className="grid gap-5 sm:grid-cols-2">

          {/* Product Name */}

          <div className="sm:col-span-2">

            <label
              htmlFor="productName"
              className={labelClass}
            >
              Product Name
              <span className="ml-1 text-blue-400">
                *
              </span>
            </label>

            <input
              id="productName"
              type="text"
              value={productName}
              onChange={(event) =>
                setProductName(event.target.value)
              }
              placeholder="e.g. MacBook Air M4"
              className={inputClass}
              required
            />

          </div>


          {/* Brand */}

          <div>

            <label
              htmlFor="brand"
              className={labelClass}
            >
              Brand
              <span className="ml-1 text-blue-400">
                *
              </span>
            </label>

            <input
              id="brand"
              type="text"
              value={brand}
              onChange={(event) =>
                setBrand(event.target.value)
              }
              placeholder="e.g. Apple"
              className={inputClass}
              required
            />

          </div>


          {/* Category */}

          <div>

            <label
              htmlFor="category"
              className={labelClass}
            >
              Category
              <span className="ml-1 text-blue-400">
                *
              </span>
            </label>

            <select
              id="category"
              value={category}
              onChange={(event) =>
                setCategory(event.target.value)
              }
              className={`${inputClass} cursor-pointer`}
              required
            >
              <option value="">
                Select category
              </option>

              <option value="Electronics">
                Electronics
              </option>

              <option value="Computer">
                Computer
              </option>

              <option value="Phone">
                Phone
              </option>

              <option value="Audio">
                Audio
              </option>

              <option value="Home Appliance">
                Home Appliance
              </option>

              <option value="Camera">
                Camera
              </option>

              <option value="Watch">
                Watch
              </option>

              <option value="Other">
                Other
              </option>
            </select>

          </div>

        </div>

      </section>


      {/* =================================================
          WARRANTY PERIOD
          ================================================= */}

      <section>

        <div className="mb-5">

          <p className="text-sm font-semibold text-slate-200">
            Warranty Period
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-600">
            Enter the dates shown on your warranty or receipt.
          </p>

        </div>

        <div className="grid gap-5 sm:grid-cols-2">

          {/* Purchase Date */}

          <div>

            <label
              htmlFor="purchaseDate"
              className={labelClass}
            >
              Purchase Date
              <span className="ml-1 text-blue-400">
                *
              </span>
            </label>

            <input
              id="purchaseDate"
              type="date"
              value={purchaseDate}
              onChange={(event) =>
                setPurchaseDate(event.target.value)
              }
              className={inputClass}
              required
            />

          </div>


          {/* Warranty End Date */}

          <div>

            <label
              htmlFor="warrantyEndDate"
              className={labelClass}
            >
              Warranty End Date
              <span className="ml-1 text-blue-400">
                *
              </span>
            </label>

            <input
              id="warrantyEndDate"
              type="date"
              value={warrantyEndDate}
              min={purchaseDate || undefined}
              onChange={(event) =>
                setWarrantyEndDate(event.target.value)
              }
              className={inputClass}
              required
            />

          </div>

        </div>

      </section>


      {/* =================================================
          PURCHASE DETAILS
          ================================================= */}

      <section>

        <div className="mb-5">

          <p className="text-sm font-semibold text-slate-200">
            Purchase Details
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-600">
            Optional information to help you remember where
            and when you bought it.
          </p>

        </div>

        <div className="grid gap-5 sm:grid-cols-2">

          {/* Purchase Price */}

          <div>

            <label
              htmlFor="purchasePrice"
              className={labelClass}
            >
              Purchase Price
            </label>

            <div className="relative">

              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-600">
                $
              </span>

              <input
                id="purchasePrice"
                type="number"
                min="0"
                step="0.01"
                value={purchasePrice}
                onChange={(event) =>
                  setPurchasePrice(event.target.value)
                }
                placeholder="0.00"
                className={`${inputClass} pl-8`}
              />

            </div>

          </div>


          {/* Store */}

          <div>

            <label
              htmlFor="store"
              className={labelClass}
            >
              Store
            </label>

            <input
              id="store"
              type="text"
              value={store}
              onChange={(event) =>
                setStore(event.target.value)
              }
              placeholder="e.g. Apple Store"
              className={inputClass}
            />

          </div>

        </div>

      </section>


      {/* =================================================
          NOTES
          ================================================= */}

      <section>

        <div className="mb-5">

          <p className="text-sm font-semibold text-slate-200">
            Notes
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-600">
            Add anything you may want to remember later.
          </p>

        </div>

        <textarea
          id="notes"
          value={notes}
          onChange={(event) =>
            setNotes(event.target.value)
          }
          placeholder="Serial number, receipt details, special coverage..."
          rows={4}
          className="w-full resize-none rounded-xl border border-white/[0.08] bg-[#070b14] px-4 py-3 text-sm text-slate-100 shadow-inner shadow-black/20 outline-none transition-all duration-200 placeholder:text-slate-700 hover:border-white/[0.14] focus:border-blue-500/70 focus:bg-[#090f1c] focus:ring-4 focus:ring-blue-500/[0.08]"
        />

      </section>


      {/* =================================================
          SUBMIT
          ================================================= */}

      <div className="border-t border-white/[0.06] pt-6">

        <button
          type="submit"
          className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition duration-200 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-blue-500/25"
        >
          {submitLabel}

          <span className="transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </button>

        <p className="mt-3 text-center text-[11px] text-slate-700">
          Fields marked with * are required.
        </p>

      </div>

    </form>
  );
}