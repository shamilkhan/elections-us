import styled from "@emotion/styled";
import { useStore } from "effector-react";
import { $votesData } from "../../model";
import { getColor } from "./";

export const CandidatesInfo = () => {
  const data = useStore($votesData);

  return data ? (
    <CandidatesInfoGrid>
      {/* Row 1 - Table headers */}
      <ColumnHeader>Candidate</ColumnHeader>
      <ColumnHeader>Party</ColumnHeader>
      <ColumnHeader>Votes</ColumnHeader>
      <ColumnHeader>PCT.</ColumnHeader>
      <div></div>

      {/* Row 2 - Joe Biden info */}

      {/* Name */}
      <CandidateName biden>Joe Biden</CandidateName>
      {/* Party */}
      <div>Dem.</div>
      {/* Votes */}
      <div>{data.biden}</div>
      {/* PCTs */}
      {data.winner === "trump" ? (
        <CandidatePCT biden>{data.biden_percent}%</CandidatePCT>
      ) : (
        <div />
      )}
      {data.winner === "biden" ? (
        <WinnerPCT biden>{data.biden_percent}%</WinnerPCT>
      ) : (
        <div />
      )}

      {/* Row 3 - Donald Trump info */}

      {/* Name */}
      <CandidateName>Donald Trump</CandidateName>
      {/* Party */}
      <div>Rep.</div>
      {/* Votes */}
      <div>{data.trump}</div>
      {/* PCTs */}
      {data.winner === "biden" ? (
        <CandidatePCT>{data.trump_percent}%</CandidatePCT>
      ) : (
        <div />
      )}
      {data.winner === "trump" ? (
        <WinnerPCT>{data.trump_percent}%</WinnerPCT>
      ) : (
        <div />
      )}
    </CandidatesInfoGrid>
  ) : null;
};

type IsBidenProps = {
  biden?: boolean;
};

// Candidates data grid
const CandidatesInfoGrid = styled.div({
  gridTemplateRows: "repeat(3, 34px)",
  gridTemplateColumns: "154px 50px 58px max-content 1fr",
  justifyContent: "space-between",
  alignItems: "center",
  display: "grid",
  rowGap: 1,
  columnGap: 8,
  margin: "0 24px",
  color: "#334663",
});

// Column's header
const ColumnHeader = styled.div({
  color: "rgba(51, 70, 99, 0.6)",
  fontSize: 14,
  padding: 0,
  lineHeight: "20px",
});

// Candidate name (Candidate column)
const CandidateName = styled.div<IsBidenProps>(({ biden }) => ({
  background: getColor(biden, 0.2),
  borderLeft: `5px solid ${getColor(biden, 0.5)}`,
  padding: 0,
  height: 35,
  lineHeight: "35px",
  paddingLeft: 15,
  marginRight: 10,
}));

// Candidate percents (PCT column)
const CandidatePCT = styled.div<IsBidenProps>(({ biden }) => ({
  fontWeight: 700,
  color: getColor(biden, 0.5),
}));

// Winner percents (right side of card, near with diagram)
const WinnerPCT = styled.div<IsBidenProps>(({ biden }) => ({
  "fontWeight": 700,
  "color": getColor(biden, 1),
  "textAlign": "right",
  "fontSize": "30px",
  "paddingBottom": biden ? 0 : 5,
  "paddingTop": biden ? 5 : 0,
  "&:after": {
    position: "absolute",
    right: 24,
    content: biden
      ? 'url("/biden-diag-line.svg")'
      : 'url("/trump-diag-line.svg")',
    bottom: biden ? 26 : 53,
  },
}));
