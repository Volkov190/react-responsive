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

type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

const MediaQuery = (
  props: RequireAtLeastOne<
    MediaQueryPropsInterface,
    | "children"
    | "orientation"
    | "minResolution"
    | "maxResolution"
    | "minWidth"
    | "maxWidth"
    | "minHeight"
    | "maxHeight"
  >
) => {
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
