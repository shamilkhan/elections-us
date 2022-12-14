/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useStore } from "effector-react";
import { CandidatesInfo, CardHeader, BidenDiagram, TrumpDiagram } from "./ui";
import { $countyCardData, $countyCardPosition } from "./model";

export const CountyCard = () => {
  const countyData = useStore($countyCardData);
  const countyCardPosition = useStore($countyCardPosition);

  return countyCardPosition && countyData ? (
    <CardContainer
      style={{
        left: countyCardPosition.left,
        top: countyCardPosition.top,
      }}
    >
      {countyCardPosition.pin.direction === "up" ? (
        <PinUp style={{ left: countyCardPosition.pin.left }} />
      ) : (
        <PinDown style={{ left: countyCardPosition.pin.left }} />
      )}
      <CardHeader county={countyData.name} state={countyData.state} />
      <CandidatesInfo />
      <DiagramWrapper>
        {countyData.winner === "trump" ? (
          <TrumpDiagram percentage={countyData.trump_percent} />
        ) : (
          <BidenDiagram percentage={countyData.biden_percent} />
        )}
      </DiagramWrapper>
    </CardContainer>
  ) : null;
};

const PinUp = styled.div(() => ({
  position: "absolute",
  top: -12,
  border: "6px solid transparent",
  borderBottom: "6px solid #fff",
}));

const PinDown = styled.div(() => ({
  position: "absolute",
  top: 195,
  border: "6px solid transparent",
  borderTop: "6px solid #fff",
}));

const CardContainer = styled.div(() => ({
  position: "absolute",
  background: "#fff",
  width: 466,
  height: 195,
  borderRadius: 8,
  boxShadow: `0px 1px 11px rgba(51, 70, 99, 0.1),
    0px 12px 41px rgba(51, 70, 99, 0.15)`,
  overflow: "visible",
  pointerEvents: "none",
}));

const DiagramWrapper = styled.div`
  position: absolute;
  right: 63px;
  top: 100px;
  width: 70px;
  height: 70px;
  overflow: hidden;
`;
