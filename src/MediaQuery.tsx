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

  if (props.minResolution) {
    let minResolutionArray = ["(min-resolution: ", props.minResolution];
    if (typeof props.minResolution === "string") {
      minResolutionArray = [...minResolutionArray, ")"];
    } else if (typeof props.minResolution === "number") {
      minResolutionArray = [...minResolutionArray, "dppx)"];
    }
    mediaQueryArray.push(minResolutionArray.join(""));
  }

  if (props.maxResolution) {
    let maxResolutionArray = ["(max-resolution: ", props.maxResolution];
    if (typeof props.maxResolution === "string") {
      maxResolutionArray = [...maxResolutionArray, ")"];
    } else if (typeof props.minResolution === "number") {
      maxResolutionArray = [...maxResolutionArray, "dppx)"];
    }
    mediaQueryArray.push(maxResolutionArray.join(""));
  }

  if (props.minWidth)
    mediaQueryArray.push(["(min-width: ", props.minWidth, "px)"].join(""));

  if (props.maxWidth)
    mediaQueryArray.push(["(max-width: ", props.maxWidth, "px)"].join(""));

  if (props.minHeight)
    mediaQueryArray.push(["(min-height: ", props.minHeight, "px)"].join(""));

  if (props.maxHeight)
    mediaQueryArray.push(["(max-height: ", props.maxHeight, "px)"].join(""));

  if (props.orientation)
    mediaQueryArray.push(["(orientation: ", props.orientation, ")"].join(""));

  const result = useMediaQuery({ query: mediaQueryArray.join(" and ") });

  if (typeof props.children === "function")
    return <>{props.children(result)}</>;
  else if (result) return <>{props.children}</>;
  else return null;
};

export default MediaQuery;
