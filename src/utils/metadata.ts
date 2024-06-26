import { Metadata } from "next";
import { OPENGRAPH_IMAGE } from "@/utils/constant";

type GenerateMetadataProps = {
  title: string;
  description: string;
  asPath?: string;
};

export const META = {
  title: "Mogazoa",
  siteName: "MOGAZOA | 모가조아",
  description:
    "다양한 카테고리의 상품 리뷰를 살펴보고 비교하세요! 음악, 식당, 영화, 강의, 여행지, 전자기기, 호텔, 의류, 앱까지!",
  keyword: ["모가조아", "mogazoa", "상품비교", "상품리뷰", "리뷰"],
  url: "https://mogazoa4-20.vercel.app",
  ogImage: OPENGRAPH_IMAGE,
} as const;

export const getMetadata = (metadataProps?: GenerateMetadataProps) => {
  const { title, description, asPath } = metadataProps || {};

  const TITLE = title ? `${title} - Mogazoa` : META.title;
  const DESCRIPTION = description || META.description;
  const PAGE_URL = asPath || "";
  const OG_IMAGE = META.ogImage;

  const metadata: Metadata = {
    metadataBase: new URL(META.url),
    alternates: {
      canonical: PAGE_URL,
    },
    title: TITLE,
    description: DESCRIPTION,
    keywords: [...META.keyword],
    openGraph: {
      title: TITLE,
      description: DESCRIPTION,
      siteName: TITLE,
      locale: "ko_KR",
      type: "website",
      url: PAGE_URL,
      images: {
        url: OG_IMAGE,
      },
    },
    twitter: {
      title: TITLE,
      description: DESCRIPTION,
      images: {
        url: OG_IMAGE,
      },
    },
  };

  return metadata;
};
