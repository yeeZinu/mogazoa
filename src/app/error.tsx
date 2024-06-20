"use client";

import { useEffect } from "react";
import "./commonErrorStyle.scss";
import Button from "@/components/Button/Button";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {}, [error]);

  return (
    <div className='errorContainer'>
      <h2 className='errorTitleBox'>
        <span className='errorTitle'>에러가 발생했어요!</span>
      </h2>
      <div className='errorDescription'>
        <p>페이지를 불러오는 과정에서 에러가 발생했어요.</p>
        <p>다시 한 번 시도해 주세요</p>
      </div>
      <Button
        className='errorButton'
        styleType='secondary'
        type='button'
        onClick={() => reset()}
      >
        재요청하기
      </Button>
    </div>
  );
}
