import styled from "@emotion/styled";
import { useStore } from "effector-react";
import { useCallback, useEffect } from "react";
import { findCountyModel } from ".";
import { mapModel } from "../../pages/map";
import { FoundedFeatures } from "./foundedFeatures";

export const FindCounty = () => {
  // Input open state
  const isOpen = useStore(findCountyModel.$inputOpen);

  // Founded features by input text
  const foundedFeatures = useStore(mapModel.$foundedFeatures);

  // Search form focus state
  const isFocus = useStore(findCountyModel.$inputFocus);

  // Filter text in input
  const filter = useStore(mapModel.$filter);

  useEffect(() => {
    if (!isOpen) mapModel.events.updateFilter("");
  }, [isOpen]);

  // Input onFocus
  const handleFocus = useCallback(() => {
    findCountyModel.events.setInputFocus(true);
  }, []);

  // Input onBlur
  const handleBlur = useCallback(() => {
    findCountyModel.events.setInputFocus(false);
  }, []);

  // Controlled input
  const handleInput = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    mapModel.events.updateFilter(e.currentTarget.value);
  }, []);

  return (
    <SearchFormContainer>
      <SearchBtn onClick={() => findCountyModel.events.setInputOpen()} />
      <SearchInput
        placeholder="Search"
        open={isOpen}
        value={filter}
        onInput={handleInput}
        onClick={handleFocus}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {isFocus && isOpen && foundedFeatures.length > 0 ? (
        <FoundedFeaturesContainer
          tabIndex={0}
          onMouseDown={(e) => e.preventDefault()}
        >
          <FoundedFeatures
            features={foundedFeatures}
            filter={filter}
            handleClose={handleBlur}
          />
        </FoundedFeaturesContainer>
      ) : (
        ""
      )}
    </SearchFormContainer>
  );
};

const SearchBtn = styled.button(() => ({
  "position": "absolute",
  "left": 0,
  "top": 0,
  "width": 36,
  "height": 36,
  "border": "none",
  "outline": "none",
  "background": "#fff",
  "cursor": "pointer",
  "borderRadius": "4px",
  "&:after": {
    content: "''",
    width: 12,
    height: 12,
    position: "absolute",
    left: "54%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    backgroundImage: "url(/search-default.svg)",
  },
  "&:hover": {
    "&:after": {
      backgroundImage: "url(/search-hover.svg)",
      left: "51%",
    },
  },
}));

type InputProps = {
  open: boolean;
};

const SearchInput = styled.input<InputProps>(({ open }) => ({
  width: open ? 244 : 0,
  height: 36,
  transition: "0.2s",
  borderRadius: "4px",
  padding: "0 0 0 36px",
  margin: 0,
  border: "none",
  outline: "none",
  boxShadow: "0px 3px 9px rgba(96, 96, 96, 0.22)",
  fontSize: "12px",
  lineHeight: "16px",
}));

const SearchFormContainer = styled.div(() => ({
  display: "flex",
  flexDirection: "column",
  gap: 5,
  position: "absolute",
  right: 30,
  top: 30,
}));

const FoundedFeaturesContainer = styled.div(() => ({
  width: 244,
  background: "#fff",
  borderRadius: "4px",
  transition: "0.2s",
  maxHeight: 192,
  overflow: "hidden",
  zIndex: 3,
}));
