import { useCallback, useEffect, useState } from "react";
import { FoundedFeatures } from "./foundedFeatures";
import {
  SearchBtn,
  FoundedFeaturesContainer,
  SearchFormContainer,
  SearchInput,
} from "./styled";

export const SearchForm = ({ data }: any) => {
  // Input open state
  const [isOpen, setOpen] = useState(false);

  // Search form focus state
  const [isFocus, setFocus] = useState(false);

  // Filter text in input
  const [filter, setFilter] = useState("");

  // Founded features by input text
  const [foundedFeatures, setFoundedFeatures] = useState<any[]>([]);

  // Finding features by filter
  useEffect(() => {
    if (!data) return;
    if (filter.length <= 1) {
      setFoundedFeatures([]);
    } else {
      const founded: any = data.features.filter((el: any) => {
        return el.properties.name.toLowerCase().includes(filter.toLowerCase());
      });
      setFoundedFeatures(founded);
    }
  }, [filter]);

  useEffect(() => {
    if (!isOpen) setFilter("");
  }, [isOpen]);

  // Input onFocus
  const handleFocus = useCallback(() => {
    setFocus(true);
  }, []);

  // Input onBlur
  const handleBlur = useCallback(() => {
    setFocus(false);
  }, []);

  // Controlled input
  const handleInput = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    setFilter(e.currentTarget.value);
  }, []);

  return (
    <SearchFormContainer>
      <SearchBtn onClick={() => setOpen(!isOpen)} />
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
