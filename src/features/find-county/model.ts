import { createEvent, createStore } from "effector";

const setInputOpen = createEvent();
export const $inputOpen = createStore(false).on(setInputOpen, (open) => !open);

const setInputFocus = createEvent<boolean>();
export const $inputFocus = createStore(false).on(
  setInputFocus,
  (_, payload) => payload
);

export const events = {
  setInputOpen,
  setInputFocus,
};
