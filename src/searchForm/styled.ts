import styled from "@emotion/styled";

export const SearchBtn = styled.button`
  position: absolute;
  left: 0;
  top: 0;
  width: 32px;
  height: 32px;
  border: none;
  outline: none;
  background: #fff;
  cursor: pointer;
  border-radius: 4px;
  &:after {
    content: "";
    width: 12px;
    height: 12px;
    position: absolute;
    left: 54%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-image: url(/search-default.svg);
  }
  &:hover {
    &:after {
      background-image: url(/search-hover.svg);
      left: 51%;
    }
  }
`;

type InputProps = {
  open: boolean;
};

export const SearchInput = styled.input<InputProps>`
  box-sizing: border-box;
  width: ${({ open }) => (open ? "244px" : "0")};
  height: 32px;
  transition: 0.2s;
  border-radius: 4px;
  padding: 0 0 0 32px;
  margin: 0;
  border: none;
  outline: none;
  box-shadow: 0px 3px 9px rgba(96, 96, 96, 0.22);
  font-size: 12px;
  line-height: 16px;
  font-family: Rubik, sans-serif;
`;

export const SearchFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  position: absolute;
  right: 30px;
  top: 30px;
  z-index: 3;
  font-family: Rubik;
`;

export const FoundedFeaturesContainer = styled.div`
  width: 244px;
  background: #fff;
  z-index: 3;
  border-radius: 4px;
  transition: 0.2s;
  max-height: 192px;
  overflow: hidden;
`;
