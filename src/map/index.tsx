// @ts-nocheck
import React, { useState } from "react";
import DeckGL from "@deck.gl/react";
import { StaticMap } from "react-map-gl";
import { GeoJsonLayer } from "@deck.gl/layers";
import { CountyData } from "../countyData";
import { LoaderScreen } from "../loaderScreen";
import { useCountyData } from "../app/hooks";
import { getColor } from "./utils";
import { withProviders } from "../app/hocs/withProviders";
import { useEffect } from "react";

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

export type CursorPosition = {
  x: number;
  y: number;
};

// Viewport settings
const INITIAL_VIEW_STATE = {
  longitude: -102.497923,
  latitude: 39.510819,
  zoom: 3.5,
  pitch: 0,
  bearing: 0,
};

const Map = () => {
  const { data, progress } = useCountyData();
  const [isLoad, setLoad] = useState(progress < 100);
  const [isRendered, setRendered] = useState(false);

  useEffect(() => {
    if (progress === 100 && isRendered) {
      setLoad(false);
    }
  }, [progress, isRendered]);

  const isDark = true;
  const [countyData, setCountyData] = useState(null);
  const [cursorPosition, setCursorPosition] = useState<CursorPosition | null>(
    null
  );

  const countyLayer = new GeoJsonLayer({
    id: "geojson-layer",
    data,
    pickable: true,
    stroked: false,
    filled: true,
    extruded: false,
    wireframe: true,
    lineWidthScale: 20,
    lineWidthMinPixels: 2,
    getFillColor: getColor,
    getElevation: 100,
    getPointRadius: 100,
    getLineWidth: 100,
  });

  const layers = [countyLayer];

  return (
    <>
      {isLoad ? <LoaderScreen progress={progress} /> : ""}
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        layers={layers}
        onHover={({ object, x, y }) => {
          if (x >= 0 && y >= 0) {
            setCursorPosition({ x, y });
          } else {
            setCursorPosition(null);
          }
          setCountyData(object || null);
          return null;
        }}
        onDrag={() => setCursorPosition(null)}
      >
        {/* <MapCard /> */}
        <StaticMap
          mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
          preventStyleDiffing={true}
          onLoad={() => setRendered(true)}
          mapStyle={
            isDark
              ? "mapbox://styles/uberdata/cjfxhlikmaj1b2soyzevnywgs"
              : "mapbox://styles/uberdata/cjfyl03kp1tul2smf5v2tbdd4"
          }
        />
      </DeckGL>
      {countyData && (
        <CountyData
          data={countyData.properties}
          cursorPosition={cursorPosition}
        />
      )}
    </>
  );
};

export default withProviders(Map);
