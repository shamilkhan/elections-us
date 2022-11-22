import styled from "@emotion/styled";
import { getColor } from "./utils";

// Candidates data grid
export const CandidatesInfoGrid = styled.div`
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
export const ColumnHeader = styled.div`
  color: rgba(51, 70, 99, 0.6);
  font-size: 14px;
  padding: 0;
  line-height: 20px;
`;

type IsBidenProps = {
  biden?: boolean;
};

// Candidate name (Candidate column)
export const CandidateName = styled.div<IsBidenProps>`
  ${({ biden }) => `
    background: ${getColor(biden, 0.2)};
    border-left: 5px solid ${getColor(biden, 0.5)};
    padding: 0;
    height: 35px;
    line-height: 35px;
    padding-left: 15px;
    margin-right: 10px;
  `}
`;

// Candidate percents (PCT column)
export const CandidatePCT = styled.div<IsBidenProps>`
  font-weight: 700;
  color: ${({ biden }) => getColor(biden, 0.5)};
`;

// Winner percents (right side of card, near with diagram)
export const WinnerPCT = styled.div<IsBidenProps>`
  ${({ biden }) => `
    font-weight: 700;
    color: ${getColor(biden, 1)};
    text-align: right;
    font-size: 30px;
    padding-bottom: ${biden ? "0" : "5px"};
    padding-top: ${biden ? "5px" : "0"};
    &:after {
      position: absolute;
      right: 24px;
      ${
        biden
          ? `
      content: url("/biden-diag-line.svg");
      bottom: 26px;`
          : `      
      content: url("/trump-diag-line.svg");
      bottom: 53px;`
      }
  }
  `}
`;
