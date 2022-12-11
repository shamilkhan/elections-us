import { createEvent, createStore } from "effector";

export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type ViewState = typeof viewInitialState & {
  transitionDuration?: number;
};

export const zoom = createEvent<number>();
export const flyTo = createEvent<Coordinates>();
export const updateViewState = createEvent<ViewState>();

// Map view initial state
export const viewInitialState = {
  longitude: -102.497923,
  latitude: 39.510819,
  zoom: 3.5,
  pitch: 0,
  bearing: 0,
};

// View state store
export const $viewState = createStore<ViewState>(viewInitialState);

// Set map zoom
$viewState.on(zoom, (state, zoomScale) => {
  return {
    ...state,
    zoom: state.zoom + zoomScale,
    transitionDuration: 150,
  };
});

// Fly to lng, lat coordinates
$viewState.on(flyTo, (state, { longitude, latitude }) => {
  return {
    ...state,
    latitude,
    longitude,
    zoom: 8,
    transitionDuration: 300,
  };
});

// Set new view state on change
$viewState.on(updateViewState, (_, newState) => {
  return newState;
});

const setMapLoad = createEvent();
export const $mapLoad = createStore(false).on(setMapLoad, () => true);

export const events = {
  updateViewState,
  zoom,
  flyTo,
  setMapLoad,
};
