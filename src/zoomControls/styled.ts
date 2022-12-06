import styled from "@emotion/styled";

export const ZoomControlsContainer = styled.div`
  position: absolute;
  top: 82px;
  right: 30px;
  z-index: 3;
  display: flex;
  flex-direction: column;
  gap: 1px;
`;

const ZoomBtn = styled.button`
  width: 32px;
  height: 32px;
  border: none;
  outline: none;
  background: #ffffff;
  box-shadow: 0px 3px 9px rgba(96, 96, 96, 0.22);
  border-radius: 0px 0px 4px 4px;
  cursor: pointer;
  position: relative;
  &:hover {
    &::after,
    &::before {
      background-color: #000000;
    }
  }

  &:focus {
    border: 2px solid #00b4ff;
  }

  &:active {
    outline: none;
    border: none;
  }
`;

const pseudoElementStyle = `
  content: "";
  display: block;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  background-color: #52575C;
  transition: 0.2s;
`;

export const ZoomIn = styled(ZoomBtn)`
  rotate: 180deg;
  &::after {
    ${pseudoElementStyle}
    width: 10px;
    height: 1px;
  }
  &::before {
    ${pseudoElementStyle}
    width: 1px;
    height: 10px;
  }
  &:hover {
    &::after {
      width: 11px;
      height: 2px;
    }
    &::before {
      width: 2px;
      height: 11px;
    }
  }
`;

export const ZoomOut = styled(ZoomBtn)`
  &::after {
    ${pseudoElementStyle}
    width: 10px;
    height: 1px;
  }
  &:hover {
    &::after {
      width: 11px;
      height: 2px;
    }
  }
`;
