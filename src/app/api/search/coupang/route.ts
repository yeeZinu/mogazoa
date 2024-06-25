import { NextResponse, NextRequest } from "next/server";
import coupangScraper from "@/app/product/utils/coupangScraper";
import { CoupangProduct } from "@/app/product/utils/types";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const keyword = searchParams.get("keyword") || "";

  if (!keyword) {
    return NextResponse.json({ items: [] }, { status: 400, statusText: "Bad Request: keyword is missing" });
  }

  try {
    const response = await fetch(`https://www.coupang.com/np/search/?component=&q=${encodeURIComponent(keyword)}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const htmlText = await response.text();
    const items: CoupangProduct[] = coupangScraper(htmlText).slice(0, 5);

    return NextResponse.json({ items });
  } catch (error) {
    console.error("Data scrapping error:", error);
    return NextResponse.json({ items: [] }, { status: 500, statusText: "Internal Server Error" });
  }
}
