import { createStore, createEvent } from "effector";
import { getPosition } from "./lib";

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
