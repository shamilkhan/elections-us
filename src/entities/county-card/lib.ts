import { CursorPosition } from "./model";

// Get left position
const getLeft = (cursorX: number) => {
  const left = cursorX - 30;
  const leftBound = 16;
  const rightBound = window.innerWidth - 482;
  // Left bound 16px to left card edge
  if (left < leftBound)
    return {
      card: leftBound,
      pin: 26,
    };
  // Right bound 16px to right card edge
  else if (left > rightBound)
    return {
      card: rightBound,
      pin: Math.min(26 + left - window.innerWidth + 482, 433),
    };
  else
    return {
      card: left,
      pin: 26,
    };
};

// Get top position
const getTop = (cursorY: number) => {
  const top = cursorY + 30;
  if (top < window.innerHeight - 230)
    return {
      card: top,
      pin: "up",
    };
  else
    return {
      card: top - 255,
      pin: "down",
    };
};

// Get card's position on the display by cursor position
export const getPosition = (cursorPosition: CursorPosition) => {
  const left = getLeft(cursorPosition.left);
  const top = getTop(cursorPosition.top);

  return {
    left: left.card,
    top: top.card,
    pin: {
      direction: top.pin,
      left: left.pin,
    },
  };
};
