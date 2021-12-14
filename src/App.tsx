// @ts-nocheck
import React, { useState } from "react";
import DeckGL from "@deck.gl/react";
import { StaticMap } from "react-map-gl";
import { GeoJsonLayer } from "@deck.gl/layers";
import { MapCard } from "./card";
import { CountyData } from "./countyData";

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

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
    return [100, 100, 100, 100];
  }
  const trampVotes = Number(f.properties.VOTES.percentage20_Donald_Trump);
  const isRepablic = trampVotes > 0.5;
  const bidenVotes = Number(f.properties.VOTES.percentage20_Joe_Biden);

  return isRepablic
    ? [200, 0, 0, 400 * Math.pow(trampVotes, 2.7)]
    : [0, 160, 180, 400 * Math.pow(bidenVotes, 2.7)];
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
    extruded: true,
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
    getFillColor: [0, 0, 0, 200],
    getLineColor: [70, 70, 70, 200],
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
    getLineColor: [200, 200, 70, 200],
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
