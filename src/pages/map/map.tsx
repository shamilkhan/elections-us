import { useStore } from "effector-react";
import { mapModel } from ".";
import { CountyCard, ZoomControls, FindCounty } from "../../features";
import { useCallback, useContext } from "react";
import { LoadProgressContext } from "..";
import { useEffect } from "react";
import { MapViewer, mapViewerModel, Legend } from "./ui";

const MapPage = () => {
  const progress = useStore(mapModel.$fetchProgress);
  const { setLoadProgress } = useContext(LoadProgressContext);

  useEffect(() => {
    setLoadProgress(progress);
  }, [progress]);

  const onZoom = useCallback((scale: number) => {
    mapViewerModel.events.zoom(scale);
  }, []);

  return (
    <>
      <MapViewer />
      <CountyCard />
      <ZoomControls onZoom={onZoom} />
      <Legend />
      <FindCounty />
    </>
  );
};

export default MapPage;
