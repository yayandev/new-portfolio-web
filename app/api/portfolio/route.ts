import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://api-yayandev.vercel.app/api/portfolio", {
      next: { revalidate: 300 }, // cache for 5 minutes
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch portfolio: ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error fetching portfolio API:", error);
    return NextResponse.json(
      { status: "error", message: error.message || "Failed to load portfolio data" },
      { status: 500 }
    );
  }
}
