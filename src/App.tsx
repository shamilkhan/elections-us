// @ts-nocheck
import "./App.css";
import React from "react";
import DeckGL from "@deck.gl/react";
import { StaticMap } from "react-map-gl";
import { GeoJsonLayer } from "@deck.gl/layers";

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

function App() {
  const [isDark, setDark] = React.useState(true);
  const [hasLayer, setHasLayer] = React.useState(true);

  const countyLayer = new GeoJsonLayer({
    id: "geojson-layer",
    data: "/data/next.json",
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
    highlightColor: ({ object: f }) => {
      if (
        !f.properties.VOTES ||
        !f.properties.VOTES.percentage20_Donald_Trump ||
        !f.properties.VOTES.percentage20_Joe_Biden
      ) {
        return [100, 100, 100, 300];
      }
      const trampVotes = Number(f.properties.VOTES.percentage20_Donald_Trump);
      const isRepablic = trampVotes > 0.5;
      const bidenVotes = Number(f.properties.VOTES.percentage20_Joe_Biden);

      return isRepablic
        ? [200, 0, 0, 300 * Math.pow(trampVotes, 3)]
        : [0, 160, 180, 300 * Math.pow(bidenVotes, 3)];
    },
    autoHighlight: true,
  });

  const stateLayer = new GeoJsonLayer({
    id: "geojson-layer-states",
    data: "/data/state.json",
    pickable: true,
    stroked: true,
    filled: false,
    wireframe: true,
    lineWidthScale: 5,
    lineWidthMinPixels: 2,
    getFillColor: [0, 0, 0, 200],
    getLineColor: isDark ? [70, 70, 70, 200] : [200, 200, 200, 200],
    getElevation: 1000,
    getRadius: 100,
    getLineWidth: 50,
  });

  const layers = [countyLayer, stateLayer];

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={hasLayer ? layers : []}
    >
      <div
        style={{
          backgroundColor: "#fff",
          position: "absolute",
          width: "100%",
          top: 0,
          border: "1px solid #000",
        }}
      >
        filters:
        <label>
          Has Layers
          <input
            type="checkbox"
            checked={hasLayer}
            onChange={() => setHasLayer(!hasLayer)}
          />
        </label>
        <label>
          Dark theme
          <input
            type="checkbox"
            checked={isDark}
            onChange={() => setDark(!isDark)}
          />
        </label>
      </div>
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
  );
}

export { App };
