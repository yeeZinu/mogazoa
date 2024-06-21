import * as cheerio from "cheerio";
import { CoupangProduct } from "./types";

const coupangScraper = (data: string) => {
  const $ = cheerio.load(data);
  const items: CoupangProduct[] = [];

  $(".search-product").each((_, element) => {
    const title = $(element).find(".name").text().trim();
    const price = $(element).find(".price-value").text().trim().replace(/[^\d]/g, "");
    const link = `https://www.coupang.com${$(element).find("a").attr("href")}`;
    const image = `https:${$(element).find(".search-product-wrap-img").attr("src")}`;
    const rocketShippingImage = $(element).find(".badge.rocket img").attr("src") || null; // 로켓배송 이미지
    const rocketGlobalImage = $(element).find(".badge.globale img").attr("src") || null; // 로켓직구 이미지
    items.push({
      title,
      price: new Intl.NumberFormat("ko-KR").format(parseInt(price, 10)),
      link,
      image,
      rocketShippingImage,
      rocketGlobalImage,
    });
  });
  return items;
};

export default coupangScraper;
