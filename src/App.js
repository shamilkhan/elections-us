import "./App.css";
import React from 'react';
import DeckGL from '@deck.gl/react';
import { StaticMap } from 'react-map-gl';
import { GeoJsonLayer } from '@deck.gl/layers';

import UsStates from './data/state.json';
import UsCounties from './data/test.json';

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

console.log("process.env logger", process.env);

// UsCounties.features.forEach(f => {
//   const { STATEFP } = f.properties;
//   const state = UsStates.features.find(stateFeature => stateFeature.properties.STATEFP === STATEFP);
//   if (state && state.properties && state.properties.STUSPS) {
//     f.properties.STATESHORTNAME = state.properties.STUSPS;
//   }
// });

// UsCounties.features.forEach(f => {
//   const { STATESHORTNAME, NAME } = f.properties;
//   if (STATESHORTNAME && NAME) {
//     const votes = Votes.root.row.find(v => v.state === STATESHORTNAME && v.county === NAME);
//     if (votes) {
//       f.properties.VOTES = votes;
//     }
//   }
// });

// Viewport settings
const INITIAL_VIEW_STATE = {
  longitude: -102.497923,
  latitude: 39.510819,
  zoom: 3.5,
  pitch: 0,
  bearing: 0
};

function App() {
  const countyLayer = new GeoJsonLayer({
    id: 'geojson-layer',
    data: UsCounties,
    pickable: true,
    stroked: false,
    filled: true,
    extruded: true,
    wireframe: true,
    lineWidthScale: 20,
    lineWidthMinPixels: 2,
    getFillColor: (f) => {
      if (!f.properties.VOTES) {
        return [100, 100, 100, 100];
      }
      const isRepablic = f.properties.VOTES.percentage20_Donald_Trump;
      return isRepablic > 0.5 ? [200, 0, 0, 200] : [0, 160, 180, 200]
    },
    getLineColor: (f) => {
      if (!f.properties.VOTES) {
        return [100, 100, 100, 100];
      }
      const isRepablic = f.properties.VOTES.percentage20_Donald_Trump > 0.5;
      return isRepablic ? [200, 0, 0, 200] : [0, 160, 180, 200];
    },
    getElevation: f => {
      if (!f.properties.VOTES) {
        return 1;
      }
      const isRepablic = f.properties.VOTES.percentage20_Donald_Trump > 0.5;

      return (isRepablic ? Number(f.properties.VOTES.percentage20_Donald_Trump) : Number(f.properties.VOTES.percentage20_Joe_Biden)) * 20000 || 1;
    },
    getRadius: 100,
    getLineWidth: 100,
    highlightColor: ({ object: f }) => {
      if (!f.properties.VOTES) {
        return [100, 100, 100, 300];
      }
      const isRepablic = f.properties.VOTES.percentage20_Donald_Trump;
      return isRepablic > 0.5 ? [200, 0, 0, 400] : [0, 160, 180, 400]
    },
    autoHighlight: true,
  });

  const stateLayer = new GeoJsonLayer({
    id: 'geojson-layer-states',
    data: UsStates,
    pickable: true,
    stroked: true,
    filled: false,
    wireframe: true,
    lineWidthScale: 20,
    lineWidthMinPixels: 2,
    getFillColor: [0, 200, 0, 200],
    getLineColor: [200, 200, 200, 200],
    getElevation: 1000,
    getRadius: 100,
    getLineWidth: 100,
  });

  const layers = [countyLayer, stateLayer];

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layers}
    >
      <StaticMap mapStyle='mapbox://styles/mapbox/dark-v10' mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
    </DeckGL>
  );
}

export { App };