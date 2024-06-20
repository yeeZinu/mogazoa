"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/Button/Button";
import "./commonErrorStyle.scss";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className='errorContainer'>
      <h2 className='errorTitleBox'>
        <span className='errorTitle'>페이지를 찾을 수 없어요!</span>
      </h2>
      <div className='errorDescription'>
        <p>요청한 페이지를 찾는 데 실패했어요.</p>
        <p>주소를 다시 한 번 확인해주세요.</p>
      </div>
      <Button
        className='errorButton'
        styleType='secondary'
        onClick={() => router.replace("/")}
      >
        돌아가기
      </Button>
    </div>
  );
}
