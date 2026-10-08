import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";

export async function GET() {
  try {
    const pool = getPool();

    const [rows] = await pool.query("SELECT 1 AS connected");

    return NextResponse.json({
      success: true,
      message: "Database connected successfully!",
      result: rows,
    });
  } catch (error) {
    console.error("DATABASE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
        code: error.code,
      },
      {
        status: 500,
      }
    );
  }
}