import React, { Suspense } from "react";
import { LoaderScreen } from "../entities/loader-screen";

const MapPage = React.lazy(() => import("./map/ui"));

// Without router, not needed yet
export const Routing = () => {
  return (
    <Suspense fallback={<LoaderScreen progress={0} />}>
      <MapPage />
    </Suspense>
  );
};
