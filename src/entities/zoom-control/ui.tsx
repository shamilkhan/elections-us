import styled from "@emotion/styled";
import { mapViewerModel } from "../../features/map-viewer";

export const ZoomControls = () => {
  return (
    <ZoomControlsContainer>
      <ZoomIn onClick={() => mapViewerModel.events.zoom(0.5)} />
      <ZoomOut onClick={() => mapViewerModel.events.zoom(-0.5)} />
    </ZoomControlsContainer>
  );
};

export const ZoomControlsContainer = styled.div(() => ({
  position: "absolute",
  top: 82,
  right: 30,
  zIndex: 3,
  display: "flex",
  flexDirection: "column",
  gap: 1,
}));

const ZoomBtn = styled.button(() => ({
  "width": 36,
  "height": 36,
  "border": "none",
  "outline": "none",
  "background": "#ffffff",
  "boxShadow": "0px 3px 9px rgba(96, 96, 96, 0.22)",
  "borderRadius": "0px 0px 4px 4px",
  "cursor": "pointer",
  "position": "relative",
  "&:hover": {
    "&::before, &::after": {
      backgroundColor: "#000000",
    },
  },
  "&:focus": {
    border: "2px solid #00b4ff",
  },
  "&:active": {
    outline: "none",
    border: "none",
  },
}));

const ZoomIn = styled(ZoomBtn)(() => ({
  "rotate": "180deg",
  "&::after": {
    content: "''",
    display: "block",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)",
    backgroundColor: "#52575C",
    transition: "0.2s",
    width: 10,
    height: 1,
  },
  "&::before": {
    content: "''",
    display: "block",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)",
    backgroundColor: "#52575C",
    transition: "0.2s",
    width: 1,
    height: 10,
  },
  "&:hover": {
    "&::after": {
      width: 11,
      height: 2,
    },
    "&::before": {
      width: 2,
      height: 11,
    },
  },
}));

const ZoomOut = styled(ZoomBtn)(() => ({
  "&::after": {
    content: "''",
    display: "block",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)",
    backgroundColor: "#52575C",
    transition: "0.2s",
    width: 10,
    height: 1,
  },
  "&:hover": {
    "&::after": {
      width: 11,
      height: 2,
    },
  },
}));
