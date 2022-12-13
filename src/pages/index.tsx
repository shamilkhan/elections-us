import React, { Suspense, useState } from "react";
import { LoaderScreen } from "./loader-screen";

const MapPage = React.lazy(() => import("./map/map"));

type LoadProgress = {
  loadProgress: number;
  setLoadProgress: React.Dispatch<React.SetStateAction<number>>;
};

const iLoadProgressState = {
  loadProgress: 0,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setLoadProgress: () => {},
};

export const LoadProgressContext =
  React.createContext<LoadProgress>(iLoadProgressState);

// Without router, not needed yet
export const Routing = () => {
  const [loadProgress, setLoadProgress] = useState(0);

  return (
    <LoadProgressContext.Provider value={{ loadProgress, setLoadProgress }}>
      {loadProgress < 100 ? <LoaderScreen progress={loadProgress} /> : ""}
      <Suspense>
        <MapPage />
      </Suspense>
    </LoadProgressContext.Provider>
  );
};
