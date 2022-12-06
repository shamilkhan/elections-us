// @ts-nocheck
import React, { useState } from "react";
import DeckGL from "@deck.gl/react";
import { StaticMap } from "react-map-gl";
import { GeoJsonLayer } from "@deck.gl/layers";
import { CountyData } from "../countyData";
import { LoaderScreen } from "../loaderScreen";
import { useCountyData } from "../app/hooks";
import { getColor, getEmptyPolygon } from "./utils";
import { withProviders } from "../app/hocs/withProviders";
import { useEffect } from "react";
import { ZoomControls } from "../zoomControls";
import { SearchForm } from "../searchForm";

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

export type CursorPosition = {
  x: number;
  y: number;
};

// Viewport initial settings
const INITIAL_VIEW_STATE = {
  longitude: -102.497923,
  latitude: 39.510819,
  zoom: 3.5,
  pitch: 0,
  bearing: 0,
};

type ViewState = typeof INITIAL_VIEW_STATE & {
  transitionDuration?: number;
};

type ViewStateCtx = {
  viewState: ViewState;
  setViewState: React.Dispatch<React.SetStateAction<ViewState>>;
};

// Viewstate context
export const ViewStateContext = React.createContext<ViewStateCtx>(undefined);

const Map = () => {
  // Elections data and download progress
  const { data, progress } = useCountyData();

  // Download data state
  const [isLoad, setLoad] = useState(progress < 100);

  // Map render state
  const [isRendered, setRendered] = useState(false);

  // Controlled view state
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);

  useEffect(() => {
    if (progress === 100 && isRendered) {
      setLoad(false);
    }
  }, [progress, isRendered]);

  const isDark = true;

  // Hovered county data object
  const [countyData, setCountyData] = useState(null);

  // Position of cursor
  const [cursorPosition, setCursorPosition] = useState<CursorPosition | null>(
    null
  );

  // County layer
  const countyLayer = new GeoJsonLayer({
    id: "geojson-layer",
    data,
    pickable: true,
    stroked: false,
    filled: true,
    wireframe: true,
    getFillColor: getColor,
    getElevation: 100,
    getPointRadius: 100,
    onHover: ({ object, x, y }) => {
      if (x >= 0 && y >= 0) {
        setCursorPosition({ x, y });
      } else {
        setCursorPosition(null);
      }
      setCountyData(object || null);
      return null;
    },
  });

  // Hovered county layer with stroke
  const hoverLayer = new GeoJsonLayer({
    id: "hover-layer",
    data: countyData || getEmptyPolygon(),
    stroked: true,
    lineWidthMinPixels: 2,
    filled: false,
  });

  const layers = [countyLayer, hoverLayer];

  return (
    <ViewStateContext.Provider value={{ viewState, setViewState }}>
      {isLoad ? (
        <LoaderScreen progress={progress} />
      ) : (
        <>
          <ZoomControls />
          <SearchForm data={data} />
        </>
      )}
      <DeckGL
        viewState={viewState}
        onViewStateChange={(e) => setViewState(e.viewState)}
        controller={true}
        layers={layers}
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
    </ViewStateContext.Provider>
  );
};

export default withProviders(Map);
