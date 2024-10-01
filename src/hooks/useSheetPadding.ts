import { useEffect } from "react";

export const useSheetPadding = (isOpen: boolean) => {
  useEffect(() => {
    if (isOpen) {
      // html에 padding-right: 0px 추가
      document.body.style.overflow = "hidden";
      document.documentElement.style.paddingRight = "0px";
    } else {
      // 원래대로 복원
      document.body.style.overflow = "";
      document.documentElement.style.paddingRight = "";
    }

    // 컴포넌트가 언마운트될 때 원래대로 복원
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.paddingRight = "";
    };
  }, [isOpen]);
};
