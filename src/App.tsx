// @ts-nocheck
import React, { useState } from "react";
import DeckGL from "@deck.gl/react";
import { StaticMap } from "react-map-gl";
import { GeoJsonLayer } from "@deck.gl/layers";
import { MapCard } from "./card";
import { CountyData } from "./countyData";

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

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
const stateFillColor = [0, 0, 0];
const stateLineColor = [115, 115, 115];
const stateLineColorHovered = [200, 200, 70];
const firstVotesLevel = 0.5;
const lastVotesLevel = 0.9;

const convertHEXcolorToRGBA = (hexColor) => [
  parseInt(hexColor[1] + hexColor[2], 16),
  parseInt(hexColor[3] + hexColor[4], 16),
  parseInt(hexColor[5] + hexColor[6], 16),
];

// Viewport settings
const INITIAL_VIEW_STATE = {
  longitude: -102.497923,
  latitude: 39.510819,
  zoom: 3.5,
  pitch: 0,
  bearing: 0,
};

const getColor = (f) => {
  if (
    !f.properties.VOTES ||
    !f.properties.VOTES.percentage20_Donald_Trump ||
    !f.properties.VOTES.percentage20_Joe_Biden
  ) {
    return errColor;
  }

  const trampVotes = Number(f.properties.VOTES.percentage20_Donald_Trump);
  const bidenVotes = Number(f.properties.VOTES.percentage20_Joe_Biden);
  const isTrump = trampVotes > bidenVotes;
  const winnerVotesNormalized = Math.min(
    Math.max(isTrump ? trampVotes : bidenVotes, firstVotesLevel),
    lastVotesLevel
  );
  const palette = currentColorTheme[isTrump ? 1 : 0];
  const step = (lastVotesLevel - firstVotesLevel) / (palette.length - 1);
  const index = Math.ceil((winnerVotesNormalized - firstVotesLevel) / step);

  return convertHEXcolorToRGBA(palette[index]);
};

const useStateData = () => {
  const [data, setData] = useState();
  React.useEffect(() => {
    const loadData = async () => {
      setData(await (await fetch("/data/state.json")).json());
    };
    loadData();
  }, []);
  return data;
};

const useCountyData = () => {
  const [data, setData] = useState();
  React.useEffect(() => {
    const loadData = async () => {
      setData(await (await fetch("/data/next.json")).json());
    };
    loadData();
  }, []);
  return data;
};

function App() {
  const stateData = useStateData();
  const countyDataState = useCountyData();

  const isDark = true;
  const [countyData, setCountyData] = useState(null);

  console.log("countyDataState", countyDataState);

  const countyLayer = new GeoJsonLayer({
    id: "geojson-layer",
    data: countyDataState,
    pickable: true,
    stroked: false,
    filled: true,
    extruded: false,
    wireframe: true,
    lineWidthScale: 20,
    lineWidthMinPixels: 2,
    getFillColor: getColor,
    getLineColor: getColor,
    getElevation: 100,
    getRadius: 100,
    getLineWidth: 100,
  });

  const stateLayer = new GeoJsonLayer({
    id: "geojson-layer-states",
    data: stateData,
    pickable: true,
    stroked: true,
    filled: false,
    wireframe: true,
    lineWidthScale: 5,
    lineWidthMinPixels: 2,
    getFillColor: stateFillColor,
    getLineColor: stateLineColor,
    getElevation: 1000,
    getRadius: 100,
    getLineWidth: 50,
  });

  const stateLayerHover = new GeoJsonLayer({
    id: "geojson-layer-states__hover",
    data: stateData &&
      countyData && {
        ...stateData,
        features: stateData.features.filter(
          (f) => f.properties.STATEFP === countyData.properties.STATEFP
        ),
      },
    pickable: true,
    stroked: true,
    filled: false,
    wireframe: true,
    lineWidthScale: 5,
    lineWidthMinPixels: 2,
    getLineColor: stateLineColorHovered,
    getLineWidth: 300,
  });

  const layers = [countyLayer, stateLayer, stateLayerHover];

  return (
    <>
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        layers={layers}
        onHover={({ object }) => {
          setCountyData(object || null);
          return null;
        }}
      >
        <MapCard />
        <StaticMap
          mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
          preventStyleDiffing={true}
          mapStyle={
            isDark
              ? "mapbox://styles/uberdata/cjfxhlikmaj1b2soyzevnywgs"
              : "mapbox://styles/uberdata/cjfyl03kp1tul2smf5v2tbdd4"
          }
        />
      </DeckGL>
      {countyData && <CountyData data={countyData.properties} />}
    </>
  );
}

export { App };
