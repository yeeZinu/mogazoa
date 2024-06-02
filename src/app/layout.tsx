import type { Metadata } from "next";
import localFont from "next/font/local";
import { Gnb } from "@/components/Gnb";
import Providers from "@/lib/Providers";
import "@/styles/_reset.scss";
import "@/styles/_common.scss";
import styles from "./RootLayout.module.scss";

export const metadata: Metadata = {
  title: "Mogazoa",
  description: "음악, 식당, 영화, 강의, 여행지, 전자기기, 호텔, 와인, 옷, 앱 등 다양한 분야의 상품을 리뷰하는 플랫폼",
};

const pretendard = localFont({
  src: "../../public/fonts/Pretendard-Regular.woff2",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='ko'
      className={pretendard.className}
    >
      <body className={styles.container}>
        <div id='modal' />
        <Providers>
          <Gnb />
          <main className={styles.main}>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
