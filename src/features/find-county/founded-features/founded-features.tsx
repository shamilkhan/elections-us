import { useCallback } from "react";
import centroid from "@turf/centroid";
import { abbToState } from "./lib";
import { useStore } from "effector-react";
import { mapViewerModel } from "../../map-viewer";
import styled from "@emotion/styled";

type FoundedFeaturesProps = {
  features: any;
  filter: string;
  handleClose: () => void;
};

// Div with founded features under the input
export const FoundedFeatures = ({
  features,
  filter,
  handleClose,
}: FoundedFeaturesProps) => {
  const viewState = useStore(mapViewerModel.$viewState);

  // Fly to county onClick
  const handleClick = useCallback(
    (feature: any) => {
      const [longitude, latitude] = centroid(feature).geometry.coordinates;
      mapViewerModel.events.flyTo({
        latitude,
        longitude,
      });
      handleClose();
    },
    [viewState]
  );

  return (
    <Features>
      {features.map((feature: any) => (
        <Feature
          key={feature.properties.id}
          onClick={() => handleClick(feature)}
        >
          <CountyName name={feature.properties.name} filter={filter} />
          <StateName>{abbToState(feature.properties.state)}</StateName>
        </Feature>
      ))}
    </Features>
  );
};

type CountyNameProps = {
  name: string;
  filter: string;
};

// County name with highlited filter
const CountyName = ({ name, filter }: CountyNameProps) => {
  const i = name.toLowerCase().indexOf(filter.toLowerCase());
  return (
    <CountyNameContainer>
      <span>{name.slice(0, i)}</span>
      <span style={{ fontWeight: 700 }}>
        {name.slice(i, i + filter.length)}
      </span>
      <span>{name.slice(i + filter.length)}</span>
    </CountyNameContainer>
  );
};

export const Features = styled.div(() => ({
  "overflowY": "auto",
  "maxHeight": "192px",
  "&::-webkit-scrollbar": {
    "width": 8,
    "&-track": {
      background: "#f0f0f0",
    },
    "&-thumb": {
      background: "#c0c0c0",
    },
  },
}));

export const Feature = styled.div(() => ({
  "height": 64,
  "cursor": "pointer",
  "& + &": {
    borderTop: "1px solid #8590a1",
  },
  "&:hover": {
    background: "#f0f0f0",
  },
}));

export const CountyNameContainer = styled.div(() => ({
  fontSize: "16px",
  lineHeight: "20px",
  padding: "12px 0 4px 16px",
}));

export const StateName = styled.div(() => ({
  fontSize: "14px",
  lineHeight: "16px",
  color: "rgba(51, 70, 99, 0.3)",
  paddingLeft: 16,
}));
