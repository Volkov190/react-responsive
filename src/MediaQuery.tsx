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
  let minResolutionString = "";
  if (typeof props.minResolution === "string") {
    minResolutionString = "(min-resolution: " + props.minResolution + ")";
  } else if (typeof props.minResolution === "number") {
    minResolutionString = "(min-resolution: " + props.minResolution + "dppx)";
  }
  let maxResolutionString = "";
  if (typeof props.maxResolution === "string") {
    maxResolutionString = "(max-resolution: " + props.maxResolution + ")";
  } else if (typeof props.minResolution === "number") {
    maxResolutionString = "(max-resolution: " + props.maxResolution + "dppx)";
  }
  const minWidthString = props.minWidth
    ? "(min-width: " + props.minWidth + "px)"
    : "";
  const maxWidthString = props.maxWidth
    ? "(max-width: " + props.maxWidth + "px)"
    : "";
  const minHeightString = props.minHeight
    ? "(min-height: " + props.minHeight + "px)"
    : "";
  const maxHeightString = props.maxHeight
    ? "(max-height: " + props.maxHeight + "px)"
    : "";
  const orientationString = props.orientation
    ? "(orientation: " + props.orientation + ")"
    : "";

  const isMinResolution = useMediaQuery({ query: minResolutionString });
  const isMaxResolution = useMediaQuery({ query: maxResolutionString });
  const isMinWidth = useMediaQuery({ query: minWidthString });
  const isMaxWidth = useMediaQuery({ query: maxWidthString });
  const isMinHeight = useMediaQuery({ query: minHeightString });
  const isMaxHeight = useMediaQuery({ query: maxHeightString });
  const isOrientationRight = useMediaQuery({ query: orientationString });

  const result =
    isMinWidth &&
    isMinResolution &&
    isMaxResolution &&
    isMaxWidth &&
    isMinHeight &&
    isMaxHeight &&
    isOrientationRight;

  if (props.children) {
    if (typeof props.children === "function")
      return <>{props.children(result)}</>;
    else if (
      (typeof props.children === "object" ||
        typeof props.children === "string") &&
      result
    )
      return <>{props.children} </>;
    else return null;
  } else return null;
};

export default MediaQuery;
