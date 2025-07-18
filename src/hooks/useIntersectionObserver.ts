import { useEffect, useRef } from "react";

export const useIntersectionObserver = ((callback: () => void) => {
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        callback();
      };
    }, {threshold: 1});

    if (observerRef.current) {
      observer.observe(observerRef.current);
    };

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      };
    };
  }, [callback]);

  return observerRef;
});