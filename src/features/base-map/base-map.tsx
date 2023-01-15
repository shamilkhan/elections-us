import mapboxgl from "mapbox-gl";
import { useRef, useEffect, useState } from "react";

//@ts-ignore
mapboxgl.workerClass =
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default; // eslint-disable-line

const isDark = true;

type BaseMapProps = {
  onMouseMove?: (e: mapboxgl.MapMouseEvent) => void;
  onCreate?: (mapboxMap: mapboxgl.Map) => void;
  onMouseDown?: () => void;
  onMouseLeave?: (e: mapboxgl.MapMouseEvent) => void;
  onLoad?: () => void;
};

export const BaseMap = ({
  onMouseMove,
  onCreate,
  onMouseDown,
  onMouseLeave,
  onLoad,
}: BaseMapProps) => {
  const mapContainer = useRef(null);
  const [mapInstance, setMapInstance] = useState<mapboxgl.Map | null>(null);
  const prevMouseMove = useRef<typeof onMouseMove>();

  useEffect(() => {
    const container = mapContainer.current;

    if (container === null) return;
    const mapboxMap = new mapboxgl.Map({
      container,
      accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
      style: isDark
        ? "mapbox://styles/uberdata/cjfxhlikmaj1b2soyzevnywgs"
        : "mapbox://styles/uberdata/cjfyl03kp1tul2smf5v2tbdd4",
      center: [-102.497923, 39.510819],
      zoom: 3.5,
    });

    setMapInstance(mapboxMap);

    if (onCreate) onCreate(mapboxMap);
    if (onMouseDown) mapboxMap.on("mousedown", "counties-layer", onMouseDown);
    if (onMouseLeave)
      mapboxMap.on("mouseleave", "counties-layer", onMouseLeave);
    if (onLoad) mapboxMap.once("load", () => onLoad());

    return () => {
      mapboxMap.remove();
    };
  }, []);

  useEffect(() => {
    if (!mapInstance || !onMouseMove) return;
    if (prevMouseMove.current) {
      mapInstance.off("mousemove", "counties-layer", prevMouseMove.current);
    }
    mapInstance.on("mousemove", "counties-layer", onMouseMove);
    prevMouseMove.current = onMouseMove;
  }, [onMouseMove, mapInstance]);

  return <div ref={mapContainer} style={{ width: "100vw", height: "100vh" }} />;
};
