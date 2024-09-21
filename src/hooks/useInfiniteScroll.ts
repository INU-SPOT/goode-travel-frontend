import { useEffect, useState } from "react";

interface UseInfiniteScrollProps {
  callback: () => void;
  hasMore: boolean;
  loading: boolean;
}

export const useInfiniteScroll = ({
  callback,
  hasMore,
  loading,
}: UseInfiniteScrollProps) => {
  const [element, setElement] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (loading || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          callback();
        }
      },
      { threshold: 1.0 }
    );

    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [callback, hasMore, loading, element]);

  return [setElement];
};
