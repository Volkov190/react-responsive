import React, { ReactNode } from "react";
import { useMediaQuery } from "./useMediaQuery";

interface MediaQueryPropertiesInterface {
  orientation?: "portrait" | "landscape";
  minResolution?: number | `${number}dppx`;
  maxResolution?: number | `${number}dppx`;
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
}

interface MediaQueryChildrenInterface {
  children: ReactNode | ((matches: boolean) => ReactNode);
}

type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

type MediaQueryProps = RequireAtLeastOne<MediaQueryPropertiesInterface> &
  MediaQueryChildrenInterface;

const MediaQuery = ({ children, ...props }: MediaQueryProps) => {
  const mediaQueryArray = Object.entries(props).map(([key, value]) => {
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

    return oneQueryArray.join("");
  });

  const result = useMediaQuery({ query: mediaQueryArray.join(" and ") });

  if (typeof children === "function") return <>{children(result)}</>;
  else if (result) return <>{children}</>;
  else return null;
};

export default MediaQuery;
