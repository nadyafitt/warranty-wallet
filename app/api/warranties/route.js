import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";

export async function GET() {
  try {
    const pool = getPool();

    const [rows] = await pool.query(
      `
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
        created_at,
        updated_at
      FROM warranties
      ORDER BY created_at DESC
      `
    );

    return NextResponse.json(rows);
  } catch (error) {
    console.error("GET /api/warranties error:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch warranties",
      },
      {
        status: 500,
      }
    );
  }
}
export async function POST(request) {
  try {
    const body = await request.json();

    const {
      productName,
      brand,
      category,
      purchaseDate,
      warrantyEndDate,
      purchasePrice,
      store,
      notes,
    } = body;

    if (
      !productName ||
      !brand ||
      !category ||
      !purchaseDate ||
      !warrantyEndDate
    ) {
      return NextResponse.json(
        {
          error: "Please fill in all required fields.",
        },
        {
          status: 400,
        }
      );
    }

    if (new Date(warrantyEndDate) < new Date(purchaseDate)) {
      return NextResponse.json(
        {
          error:
            "Warranty end date cannot be before purchase date.",
        },
        {
          status: 400,
        }
      );
    }

    const pool = getPool();

    const [result] = await pool.execute(
      `
      INSERT INTO warranties
      (
        product_name,
        brand,
        category,
        purchase_date,
        warranty_end_date,
        purchase_price,
        store,
        notes
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        productName,
        brand,
        category,
        purchaseDate,
        warrantyEndDate,
        purchasePrice || null,
        store || null,
        notes || null,
      ]
    );

    return NextResponse.json(
      {
        message: "Warranty created successfully.",
        id: result.insertId,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("POST /api/warranties error:", error);

    return NextResponse.json(
      {
        error: "Failed to create warranty.",
      },
      {
        status: 500,
      }
    );
  }
}
