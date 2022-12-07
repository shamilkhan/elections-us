import { useCallback, useContext } from "react";
import { Feature, CountyNameContainer, StateName, Features } from "./styled";
import centroid from "@turf/centroid";
import { ViewStateContext } from "../../map";
import { abbToState } from "./utils";

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
  const { viewState, setViewState } = useContext(ViewStateContext);

  // Fly to county onClick
  const handleClick = useCallback(
    (feature: any) => {
      const [longitude, latitude] = centroid(feature).geometry.coordinates;
      setViewState({
        ...viewState,
        longitude,
        latitude,
        zoom: 8.5,
        transitionDuration: 300,
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
          <CountyName str={feature.properties.name} filter={filter} />
          <StateName>{abbToState(feature.properties.state)}</StateName>
        </Feature>
      ))}
    </Features>
  );
};

type CountyNameProps = {
  str: string;
  filter: string;
};

// County name with highlited filter
const CountyName = ({ str, filter }: CountyNameProps) => {
  const i = str.toLowerCase().indexOf(filter.toLowerCase());
  return (
    <CountyNameContainer>
      <span>{str.slice(0, i)}</span>
      <span style={{ fontWeight: 700 }}>{str.slice(i, i + filter.length)}</span>
      <span>{str.slice(i + filter.length)}</span>
    </CountyNameContainer>
  );
};
