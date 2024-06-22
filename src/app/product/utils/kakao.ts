"use client";

export const shareKakao = () => {
  if (!window) return;
  const { Kakao } = window;
  const url = window.location.href;

  if (!Kakao.isInitialized()) {
    Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
  }

  Kakao.Share.sendDefault({
    objectType: "feed",
    content: {
      title: "모가조아",
      description: "제품을 비교하고 리뷰를 남겨보세요!",
      imageUrl:
        "https://images.unsplash.com/photo-1593526492327-b071f3d5333e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      link: {
        mobileWebUrl: url,
        webUrl: url,
      },
    },
    buttons: [
      {
        title: "구경하러 가기",
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      },
    ],
  });
};
