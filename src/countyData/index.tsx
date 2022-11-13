// @ts-ignore
import React from "react";
import { CursorPosition } from "../App";
import { CountyDataCard } from "./ui";

// Get card's position on the display by cursor position
const getPosition = (cursorPosition: CursorPosition) => {
  const left = cursorPosition.x - 30 > 16 ? cursorPosition.x - 30 : 16;
  const top = cursorPosition.y + 40;

  return {
    left: left < window.innerWidth - 482 ? left : window.innerWidth - 482,
    top: top < window.innerHeight - 210 ? top : top - 235,
    pin: {
      direction: top < window.innerHeight - 210 ? "up" : "down",
      left:
        left < window.innerWidth - 482
          ? 26
          : 26 + left - window.innerWidth + 482 < 433
          ? 26 + left - window.innerWidth + 482
          : 433,
    },
  };
};

type Props = {
  data: any;
  cursorPosition: CursorPosition | null;
};

export const CountyData = ({ data, cursorPosition }: Props) => {
  if (!data.total_h || !cursorPosition) return null;
  const { left, top, pin } = getPosition(cursorPosition);

  return left && top ? (
    <CountyDataCard x={left} y={top} pin={pin} data={data} />
  ) : (
    ""
  );
};
