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

import { RGBAColor } from "deck.gl";
import { GeoJsonLayer } from "@deck.gl/layers";

const colorThemes = [
  [
    ["#B1D9EE", "#7FB8D9", "#387CA5", "#1E6995"],
    ["#FFCABA", "#FFAA8F", "#FF774C", "#E95425"],
  ],
  [
    [
      "#E6F4F9",
      "#CCEAF3",
      "#B3DFED",
      "#99D4E7",
      "#80CAE1",
      "#66BFDA",
      "#4DB4D4",
      "#33A9CE",
      "#1A9FC8",
      "#0094C2",
    ],
    [
      "#F9EAE6",
      "#F3D5CC",
      "#EDC0B3",
      "#E7AB99",
      "#E19780",
      "#DA8266",
      "#D46D4D",
      "#CE5833",
      "#C8431A",
      "#C22E00",
    ],
  ],
  [
    [
      "#E8EDF2",
      "#D1DAE5",
      "#BAC8D8",
      "#A3B6CB",
      "#8DA4BE",
      "#7691B1",
      "#5F7FA4",
      "#486D97",
      "#315A8A",
      "#1A487D",
    ],
    ["#F3D5CC", "#EDC0B3", "#E19780", "#D46D4D", "#CE5833", "#C8431A"],
  ],
];

const currentColorTheme = colorThemes[1];
const errColor = [100, 100, 100];
const firstVotesLevel = 0.5;
const lastVotesLevel = 0.9;

const convertHEXcolorToRGBA = (hexColor: string) => [
  parseInt(hexColor[1] + hexColor[2], 16),
  parseInt(hexColor[3] + hexColor[4], 16),
  parseInt(hexColor[5] + hexColor[6], 16),
];

export const getColor = (f: any) => {
  if (!f.properties.total || !f.properties.trump || !f.properties.biden) {
    return errColor as RGBAColor;
  }

  const trampVotes = Number(f.properties.trump / f.properties.total);
  const bidenVotes = Number(f.properties.biden / f.properties.total);
  const isTrump = trampVotes > bidenVotes;
  const winnerVotesNormalized = Math.min(
    Math.max(isTrump ? trampVotes : bidenVotes, firstVotesLevel),
    lastVotesLevel
  );

  const palette = currentColorTheme[isTrump ? 1 : 0];
  const step = (lastVotesLevel - firstVotesLevel) / (palette.length - 1);
  const index = Math.ceil((winnerVotesNormalized - firstVotesLevel) / step);

  return convertHEXcolorToRGBA(palette[index]) as RGBAColor;
};

// Get empty polygon for hover layer
export const getEmptyPolygon = () => {
  return {
    type: "Feature",
    properties: {},
    geometry: {
      type: "Polygon",
      coordinates: [[[0, 0]]],
    },
  };
};

export const renderLayers = (countyLayerData: any, hoveredCountyData: any) => {
  return [
    new GeoJsonLayer({
      id: "county-layer",
      data: countyLayerData,
      pickable: true,
      stroked: false,
      filled: true,
      wireframe: true,
      getFillColor: getColor,
      getElevation: 100,
      getPointRadius: 100,
    }),
    new GeoJsonLayer({
      id: "hover-layer",
      data: hoveredCountyData || getEmptyPolygon(),
      stroked: true,
      lineWidthMinPixels: 2,
      filled: false,
    }),
  ];
};
