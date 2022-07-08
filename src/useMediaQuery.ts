import { useEffect, useState } from "react";

export const useMediaQuery = (media: { query: string }) => {
  const mediaQuery = window.matchMedia(media.query);
  const [isConditionTrue, setIsConditionTrue] = useState(mediaQuery.matches);

  useEffect(() => {
    const listener = (e: { matches: boolean }) => {
      setIsConditionTrue(e.matches);
    };

    mediaQuery.addEventListener("change", listener);

    return () => {
      mediaQuery.removeEventListener("change", listener);
    };
  }, []);

  return media.query ? isConditionTrue : true;
};
