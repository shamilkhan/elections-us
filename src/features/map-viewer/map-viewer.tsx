import DeckGL from "@deck.gl/react";
import { useStore } from "effector-react";
import { mapViewerModel } from ".";
import { StaticMap } from "react-map-gl";
import { getEmptyPolygon, renderLayers } from "./lib";
import { useCallback, useEffect } from "react";
import { PickInfo } from "deck.gl";
import { mapModel } from "../../pages/map";
import { countyCardModel } from "../county-card";

const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
const isDark = true;

export const MapViewer = () => {
  const viewState = useStore(mapViewerModel.$viewState);
  const countyLayerData = useStore(mapModel.$countyLayerData);
  const hoveredCounty = useStore(mapModel.$hoveredCountyData);

  useEffect(() => {
    mapModel.events.fetchDataFx();
  }, []);

  const handleHover = useCallback((picked: PickInfo<any>) => {
    if (!picked.layer || picked.index < 0) {
      countyCardModel.events.updateCursorPosition(null);
      mapModel.events.setHoveredCounty(getEmptyPolygon());
      return;
    }
    countyCardModel.updateData(picked.object.properties);
    countyCardModel.events.updateCursorPosition({
      left: picked.x,
      top: picked.y,
    });

    mapModel.events.setHoveredCounty(picked.object);
  }, []);

  const layers = renderLayers(countyLayerData, hoveredCounty);

  return (
    <DeckGL
      viewState={viewState}
      onViewStateChange={(e) =>
        mapViewerModel.events.updateViewState(e.viewState)
      }
      controller={true}
      layers={layers}
      onHover={handleHover}
      onDrag={() => countyCardModel.events.updateCursorPosition(null)}
    >
      <StaticMap
        width={"100vw"}
        height={"100vh"}
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
        preventStyleDiffing={true}
        onLoad={() => mapViewerModel.events.setMapLoad()}
        mapStyle={
          isDark
            ? "mapbox://styles/uberdata/cjfxhlikmaj1b2soyzevnywgs"
            : "mapbox://styles/uberdata/cjfyl03kp1tul2smf5v2tbdd4"
        }
      />
    </DeckGL>
  );
};
