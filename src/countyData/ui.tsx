import { StyledEngineProvider } from "@mui/material/styles";
import { BidenDiagram, TrumpDiagram } from "./diagram";
import styled from "@emotion/styled";
import { CardHeader } from "./cardHeader";
import { CandidatesInfo } from "./candidatesInfo";

type CardProps = {
  left: number;
  top: number;
  pin: {
    direction: string;
    left: number;
  };
};

const CountyCard = styled.div<CardProps>`
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

const DiagramWrapper = styled.div`
  position: absolute;
  right: 63px;
  top: 100px;
  width: 70px;
  height: 70px;
  overflow: hidden;
`;

type Props = {
  x: number;
  y: number;
  pin: {
    direction: string;
    left: number;
  };
  data: any;
};

export const CountyDataCard = ({ x, y, pin, data }: Props) => {
  const trumpPercentage = Math.round((+data.trump_h / +data.total_h) * 100);
  const bidenPercentage = 100 - trumpPercentage;

  return (
    <StyledEngineProvider injectFirst>
      <CountyCard left={x} top={y} pin={pin}>
        <CardHeader county={data.name} state={data.state}></CardHeader>
        <CandidatesInfo
          bidenVal={data.biden_h}
          bidenPer={bidenPercentage}
          trumpVal={data.trump_h}
          trumpPer={trumpPercentage}
        />
        <DiagramWrapper>
          {+data.trump_h > +data.biden_h ? (
            <TrumpDiagram percentage={trumpPercentage} />
          ) : (
            <BidenDiagram percentage={bidenPercentage} />
          )}
        </DiagramWrapper>
      </CountyCard>
    </StyledEngineProvider>
  );
};
