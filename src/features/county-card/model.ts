import { createStore, createEvent } from "effector";

// Type of feature / county info
type CountyCardData = {
  id: string;
  name: string;
  state: string;
  trump: number;
  biden: number;
  other: number;
  total: number;
  trump_percent: number;
  biden_percent: number;
  winner: string;
} | null;

export type CursorPosition = {
  left: number;
  top: number;
};

type CountyCardPosition = {
  left: number;
  top: number;
  pin: {
    direction: string;
    left: number;
  };
} | null;

export const updateData = createEvent<any>();
export const updateCardPosition = createEvent<CursorPosition>();

// Hovered county data
export const $countyCardData = createStore<CountyCardData>(null);

$countyCardData.on(updateData, (state, data) => {
  if (!data) return null;
  if (data.id === state?.id) return undefined;
  return data;
});

export const updateCursorPosition = createEvent<CursorPosition | null>();

// Cursor position
export const $cursorPosition = createStore<CursorPosition | null>(null);

// Update cursor position state
$cursorPosition.on(updateCursorPosition, (_, cursorPosition) => {
  return cursorPosition;
});

export const $countyCardPosition = createStore<CountyCardPosition>(null);

$countyCardPosition.on(updateCardPosition, (_, cursorPosition) => {
  return getPosition(cursorPosition);
});

// on $cursorPosition state change
$countyCardPosition.on($cursorPosition, (state, cursorPosition) => {
  if (!cursorPosition) return null;
  return getPosition(cursorPosition);
});

export const events = {
  updateCursorPosition,
  updateData,
  updateCardPosition,
};

export const $votesData = $countyCardData.map((state) => {
  if (!state) return;
  return {
    biden: state.biden,
    trump: state.trump,
    trump_percent: state.trump_percent,
    biden_percent: state.biden_percent,
    winner: state.winner,
  };
});

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
