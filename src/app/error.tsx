"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {}, [error]);

  return (
    <div>
      <h2>에러가 발생하였습니다. 다시 시도해 주세요</h2>
      <button
        type='button'
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
