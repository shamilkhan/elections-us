import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import { useRef, useEffect, useState, useCallback } from "react";
import { useStore } from "effector-react";
import { mapModel } from "../..";
import { BaseMap, countyCardModel, ZoomControls } from "../../../../features";
import { updateData } from "../../../../features/county-card/model";
import { addLayers } from "./model";
import { $flyToCoords } from "../../../../features/find-county/ui/founded-features";

export const MapViewer = () => {
  const [map, setMap] = useState<mapboxgl.Map>();
  const [isLoad, setLoad] = useState(false);
  const prevHoveredId = useRef<number | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const data = useStore(mapModel.$countyLayerData);
  const flyToCoords = useStore($flyToCoords);

  useEffect(() => {
    if (!map || !flyToCoords) return;
    const { latitude, longitude } = flyToCoords;
    map.flyTo({
      center: [longitude, latitude],
      zoom: 8,
      speed: 1.8,
    });
  }, [flyToCoords]);

  useEffect(() => {
    mapModel.events.fetchDataFx();
  }, []);

  const onCreate = useCallback((map: mapboxgl.Map) => {
    setMap(map);
  }, []);

  const onLoad = useCallback(() => {
    setLoad(true);
  }, []);

  const onMouseMove = useCallback(
    (e: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
      if (!map) return;
      countyCardModel.events.updateCardPosition({
        left: e.point.x,
        top: e.point.y,
      });

      if (e.features && e.features.length > 0) {
        updateData(e.features[0].properties);
        setHoveredId(e.features[0].id);
      }
    },
    [map]
  );
  const onMouseDown = useCallback(() => {
    updateData(null);
  }, []);

  const onMouseLeave = useCallback(() => {
    setHoveredId(null);
    updateData(null);
  }, []);

  useEffect(() => {
    if (!map) return;
    if (prevHoveredId.current !== null) {
      map.setFeatureState(
        { source: "counties", id: prevHoveredId.current },
        { hover: false }
      );
    }
    if (hoveredId) {
      map.setFeatureState(
        { source: "counties", id: hoveredId },
        { hover: true }
      );
    }
    prevHoveredId.current = hoveredId;
  }, [map, hoveredId]);

  const onZoom = useCallback(
    (scale: number) => {
      if (!map) return;
      map.zoomTo(map.getZoom() + scale);
    },
    [map]
  );

  useEffect(() => {
    if (data && map && isLoad) {
      addLayers({
        map,
        data,
      });
    }
  }, [data, map, isLoad]);

  return (
    <>
      <BaseMap
        onCreate={onCreate}
        onMouseMove={onMouseMove}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onLoad={onLoad}
      />
      <ZoomControls onZoom={onZoom} />
    </>
  );
};
