import { useCallback, useContext } from "react";
import { ViewStateContext } from "../map";
import { ZoomControlsContainer, ZoomIn, ZoomOut } from "./styled";

export const ZoomControls = () => {
  const { viewState, setViewState } = useContext(ViewStateContext);

  // Zoom controls onClick
  const handleClick = useCallback(
    (scale: number) => {
      setViewState({
        ...viewState,
        zoom: viewState.zoom + scale,
        transitionDuration: 80,
      });
    },
    [viewState]
  );

  return (
    <ZoomControlsContainer>
      <ZoomIn onClick={() => handleClick(0.5)} />
      <ZoomOut onClick={() => handleClick(-0.5)} />
    </ZoomControlsContainer>
  );
};
