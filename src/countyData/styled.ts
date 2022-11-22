import styled from "@emotion/styled";

type CardProps = {
  left: number;
  top: number;
  pin: {
    direction: string;
    left: number;
  };
};

export const CountyCard = styled.div<CardProps>`
  width: 466px;
  height: 195px;
  border-radius: 8px;
  background: #fff;
  position: absolute;
  pointer-events: none;
  font-family: Rubik;
  box-shadow: 0px 1px 11px rgba(51, 70, 99, 0.1),
    0px 12px 41px rgba(51, 70, 99, 0.15);
  overflow: visible;
  left: ${({ left }) => left}px;
  top: ${({ top }) => top}px;
  &::before {
    content: "";
    position: absolute;
    left: ${({ pin }) => pin.left}px;
    top: -12px;
    ${({ pin }) =>
      pin.direction === "up"
        ? `border: 6px solid transparent;
    border-bottom: 6px solid #fff;`
        : `top: 195px;
    border: 6px solid transparent;
    border-top: 6px solid #fff;
    `}
  }
`;

export const DiagramWrapper = styled.div`
  position: absolute;
  right: 63px;
  top: 100px;
  width: 70px;
  height: 70px;
  overflow: hidden;
`;
