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
    !f.properties.total_h ||
    !f.properties.trump_h ||
    !f.properties.biden_h
  ) {
    return errColor;
  }

  const trampVotes = Number(f.properties.trump_h / f.properties.total_h);
  const bidenVotes = Number(f.properties.biden_h / f.properties.total_h);
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

const useCountyData1 = () => {
  const [data, setData] = useState();
  React.useEffect(() => {
    const loadData = async () => {
      setData(await (await fetch("/data/us-counties-results.json")).json());
    };
    loadData();
  }, []);
  return data;
};

const useCountyData = () => {
  const [data, setData] = useState();
  React.useEffect(() => {
    const loadData = async () => {
      setData(await (await fetch("/data/us-counties-results.json")).json());
    };
    loadData();
  }, []);
  return data;
};

function App() {
  const countyDataState = useCountyData();

  const isDark = true;
  const [countyData, setCountyData] = useState(null);

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
    getElevation: 100,
    getRadius: 100,
    getLineWidth: 100,
  });

  const layers = [countyLayer];

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
