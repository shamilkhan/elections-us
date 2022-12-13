import { useStore } from "effector-react";
import { mapModel } from ".";
import { CountyCard, ZoomControls } from "../../features";
import { FindCounty, MapViewer } from "../../features";
import { useContext } from "react";
import { LoadProgressContext } from "..";
import { useEffect } from "react";
import { Legend } from "./map-legend";

const MapPage = () => {
  const progress = useStore(mapModel.$fetchProgress);
  const { setLoadProgress } = useContext(LoadProgressContext);

  useEffect(() => {
    setLoadProgress(progress);
  }, [progress]);

  return (
    <>
      <MapViewer />
      <CountyCard />
      <ZoomControls />
      <Legend />
      <FindCounty />
    </>
  );
};

export default MapPage;
