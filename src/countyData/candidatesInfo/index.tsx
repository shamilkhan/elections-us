import styled from "@emotion/styled";

// Get color by candidate func for css
const getColor = (biden: boolean | undefined, opacity: number) => {
  if (biden) {
    return `rgba(52, 125, 192, ${opacity})`;
  } else {
    return `rgba(231, 33, 33, ${opacity})`;
  }
};

// Candidates data grid
const CandidatesInfoGrid = styled.div`
  grid-template-rows: repeat(3, 34px);
  grid-template-columns: 154px 50px 58px max-content 1fr;
  justify-content: space-between;
  align-items: center;
  display: grid;
  row-gap: 1px;
  column-gap: 8px;
  font-family: "Rubik";
  margin: 0 24px;
  color: #334663;
`;

// Column's header
const ColumnHeader = styled.div`
  color: rgba(51, 70, 99, 0.6);
  font-size: 14px;
  padding: 0;
  line-height: 20px;
`;

// Candidate name (Candidate column)
const CandidateName = styled.div<{ biden?: boolean }>`
  background: ${({ biden }) => getColor(biden, 0.2)};
  border-left: 5px solid ${({ biden }) => getColor(biden, 0.5)};
  padding: 0;
  height: 35px;
  line-height: 35px;
  padding-left: 15px;
  margin-right: 10px;
`;

// Candidate percents (PCT column)
const CandidatePCT = styled.div<{ biden?: boolean }>`
  font-weight: 700;
  color: ${({ biden }) => getColor(biden, 0.5)};
`;

// Winner percents (right side of card, near with diagram)
const WinnerPCT = styled.div<{ biden?: boolean }>`
  font-weight: 700;
  color: ${({ biden }) => getColor(biden, 1)};
  text-align: right;
  font-size: 30px;
  padding-bottom: ${({ biden }) => (biden ? "0" : "5px")};
  padding-top: ${({ biden }) => (biden ? "5px" : "0")};
  &:after {
    ${({ biden }) =>
      biden
        ? `
    content: url("/biden-diag-line.svg");
    position: absolute;
    bottom: 26px;
    right: 24px;`
        : `      
    content: url("/trump-diag-line.svg");
    position: absolute;
    bottom: 53px;
    right: 24px;`}
  }
`;

// Val - votes value, Per - percentage
type Props = {
  bidenVal: string;
  bidenPer: number;
  trumpVal: string;
  trumpPer: number;
};

export const CandidatesInfo = ({
  bidenVal,
  bidenPer,
  trumpVal,
  trumpPer,
}: Props) => {
  return (
    <CandidatesInfoGrid>
      {/* Row 1 - headers */}
      <ColumnHeader>Candidate</ColumnHeader>
      <ColumnHeader>Party</ColumnHeader>
      <ColumnHeader>Votes</ColumnHeader>
      <ColumnHeader>PCT.</ColumnHeader>
      <div></div>

      {/* Row 2 - Joe Biden info */}
      <CandidateName biden>Joe Biden</CandidateName>
      <div>Dem.</div>
      <div>{bidenVal}</div>
      <CandidatePCT biden>
        {+bidenVal < +trumpVal ? `${bidenPer}%` : ""}
      </CandidatePCT>
      {+bidenVal > +trumpVal ? (
        <WinnerPCT biden>{bidenPer}%</WinnerPCT>
      ) : (
        <div />
      )}

      {/* Row 3 - Donald Trump info */}
      <CandidateName>Donald Trump</CandidateName>
      <div>Rep.</div>
      <div>{trumpVal}</div>
      <CandidatePCT>{+trumpVal < +bidenVal ? `${trumpPer}%` : ""}</CandidatePCT>
      {+trumpVal > +bidenVal ? <WinnerPCT>{trumpPer}%</WinnerPCT> : <div />}
    </CandidatesInfoGrid>
  );
};
