import type { Metadata } from "next";

import localFont from "next/font/local";

import StyledComponentsRegistry from "./components/StyledComponentsRegistry";
import Providers from "./Providers";
import GlobalStyle from "./styles/global";

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
      lang="ko"
      className={pretendard.className}
    >
      <StyledComponentsRegistry>
        <Providers>
          <GlobalStyle />
          <body>{children}</body>
        </Providers>
      </StyledComponentsRegistry>
    </html>
  );
}
