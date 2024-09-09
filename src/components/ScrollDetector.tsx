import React, { useEffect } from "react";
import { useScrollStore } from "../store/scrollStore";

export default function ScrollDetector() {
  const setHasScrollBar = useScrollStore((state) => state.setHasScrollBar);

  useEffect(() => {
    const detectScrollBar = () => {
      const hasScroll =
        document.documentElement.scrollHeight > window.innerHeight;
      setHasScrollBar(hasScroll);
    };

    // 스크롤 감지 및 창 크기 변경 시에도 감지
    window.addEventListener("scroll", detectScrollBar);
    window.addEventListener("resize", detectScrollBar);

    // 초기 한 번 호출해서 상태 업데이트
    detectScrollBar();

    // cleanup function
    return () => {
      window.removeEventListener("scroll", detectScrollBar);
      window.removeEventListener("resize", detectScrollBar);
    };
  }, [setHasScrollBar]);

  return null;
}
