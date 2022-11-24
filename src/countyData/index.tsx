// @ts-ignore
import { StyledEngineProvider } from "@mui/material";
import { useEffect, useState } from "react";
import { CursorPosition } from "../map";
import { CandidatesInfo } from "./candidatesInfo";
import { CardHeader } from "./cardHeader";
import { BidenDiagram, TrumpDiagram } from "./diagram";
import { CountyCard, DiagramWrapper } from "./styled";
import { getPosition } from "./utils";

type Props = {
  data: any;
  cursorPosition: CursorPosition | null;
};

export const CountyData = ({ data, cursorPosition }: Props) => {
  if (!data.total_h || !cursorPosition) return null;
  const { left, top, pin } = getPosition(cursorPosition);

  const [bidenPercentage, setBidenPercentage] = useState<number>(0);
  useEffect(() => {
    setBidenPercentage(Math.round((+data.biden_h / +data.total_h) * 100));
  }, [data.trump_h, data.biden_h]);

  return left && top ? (
    <StyledEngineProvider injectFirst>
      <CountyCard left={left} top={top} pin={pin}>
        <CardHeader county={data.name} state={data.state}></CardHeader>
        <CandidatesInfo
          bidenVal={data.biden_h}
          bidenPer={bidenPercentage}
          trumpVal={data.trump_h}
          trumpPer={100 - bidenPercentage}
        />
        <DiagramWrapper>
          {+data.trump_h > +data.biden_h ? (
            <TrumpDiagram percentage={100 - bidenPercentage} />
          ) : (
            <BidenDiagram percentage={bidenPercentage} />
          )}
        </DiagramWrapper>
      </CountyCard>
    </StyledEngineProvider>
  ) : (
    ""
  );
};
