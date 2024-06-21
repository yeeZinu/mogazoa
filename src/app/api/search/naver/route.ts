import { NextResponse, NextRequest } from "next/server";
import { NaverProduct } from "@/app/product/utils/types";
import HttpClient from "@/utils/httpClient";

const httpClient = new HttpClient("https://openapi.naver.com/v1/search/shop.json");

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const keyword = searchParams.get("keyword") || "";
  const clientId = process.env.NAVER_CLIENT_ID || "";
  const clientSecret = process.env.NAVER_CLIENT_SECRET || "";

  try {
    const { items } = await httpClient.get<{ items: (Omit<NaverProduct, "price"> & { lprice: number })[] }>(
      `?query=${encodeURIComponent(keyword)}&display=5`,
      {
        headers: {
          "X-Naver-Client-Id": clientId,
          "X-Naver-Client-Secret": clientSecret,
        },
      },
    );
    const products = items.map((item) => {
      const { title, image, link, lprice } = item;
      return {
        title: title.replace(/<\/?[^>]+(>|$)/g, ""),
        image,
        link,
        price: new Intl.NumberFormat("ko-KR").format(lprice),
      };
    });

    return NextResponse.json({ items: products });
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json({ items: [] });
}
