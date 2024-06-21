import { NextResponse, NextRequest } from "next/server";
import coupangScraper from "@/app/product/utils/coupangScraper";
import { CoupangProduct } from "@/app/product/utils/types";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const keyword = searchParams.get("keyword") || "";
  const response = await fetch(`https://www.coupang.com/np/search/?component=&q=${encodeURIComponent(keyword)}`);
  const items: CoupangProduct[] = coupangScraper(await response.text()).slice(0, 5);

  return NextResponse.json({ items });
}
