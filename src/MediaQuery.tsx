import React, { ReactNode } from "react";
import { useMediaQuery } from "./useMediaQuery";

interface MediaQueryPropsInterface {
  children?: ReactNode | ((matches: boolean) => ReactNode);
  orientation?: "portrait" | "landscape";
  minResolution?: number | `${number}dppx`;
  maxResolution?: number | `${number}dppx`;
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
}

const MediaQuery = (props: MediaQueryPropsInterface) => {
  const mediaQueryArray: string[] = [];

  Object.entries(props).map(([key, value]) => {
    if (key !== "children") {
      const oneQueryArray = [
        "(",
        key.replace(/[A-Z]/g, "-$&").toLowerCase(),
        ": ",
        value,
      ];

      if (key === "minResolution" || key === "maxResolution") {
        if (typeof value === "number") oneQueryArray.push("dppx");
      } else if (key !== "orientation") {
        oneQueryArray.push("px");
      }

      oneQueryArray.push(")");

      mediaQueryArray.push(oneQueryArray.join(""));
    }
  });

  const result = useMediaQuery({ query: mediaQueryArray.join(" and ") });

  if (typeof props.children === "function")
    return <>{props.children(result)}</>;
  else if (result) return <>{props.children}</>;
  else return null;
};

export default MediaQuery;
