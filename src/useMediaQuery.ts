import { useEffect, useState } from "react";

export const useMediaQuery = (media: { query: string }) => {
  const [isConditionTrue, setIsConditionTrue] = useState(
    () => window.matchMedia(media.query).matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(media.query);
    setIsConditionTrue(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => {
      setIsConditionTrue(e.matches);
    };

    mediaQuery.addEventListener("change", listener);

    return () => {
      mediaQuery.removeEventListener("change", listener);
    };
  }, [media.query]);

  return isConditionTrue;
};
