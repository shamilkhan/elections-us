import "mapbox-gl/dist/mapbox-gl.css";
import { useContext, useEffect } from "react";
import { Legend } from "./ui/map-legend";
import { CountyCard, FindCounty } from "../../features";
import { MapViewer } from "./ui/map-viewer";
import { useStore } from "effector-react";
import { mapModel } from ".";
import { LoadProgressContext } from "..";

const NewMap = () => {
  const progress = useStore(mapModel.$fetchProgress);
  const { setLoadProgress } = useContext(LoadProgressContext);

  useEffect(() => {
    setLoadProgress(progress);
  }, [progress]);
  return (
    <>
      <MapViewer />
      <CountyCard />
      <Legend />
      <FindCounty />
    </>
  );
};

export default NewMap;
