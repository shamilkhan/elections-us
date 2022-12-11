import { useStore } from "effector-react";
import { mapModel } from ".";
import { CountyCard, Legend, ZoomControls } from "../../entities";
import { LoaderScreen } from "../../entities/";
import { FindCounty, MapViewer, mapViewerModel } from "../../features";

const MapPage = () => {
  const progress = useStore(mapModel.$fetchProgress);
  const mapLoad = useStore(mapViewerModel.$mapLoad);

  return (
    <>
      <LoaderScreen progress={progress} mapLoad={mapLoad} />
      <MapViewer />
      <CountyCard />
      <ZoomControls />
      <Legend />
      <FindCounty />
    </>
  );
};

export default MapPage;
