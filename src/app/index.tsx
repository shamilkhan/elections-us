import React, { Suspense } from "react";
import { LoaderScreen } from "../loaderScreen";
import "./styles/index.scss";

const Map = React.lazy(() => import("../map"));

export const App = () => {
  return (
    <>
      <Suspense fallback={<LoaderScreen progress={0} />}>
        <Map />
      </Suspense>
    </>
  );
};
