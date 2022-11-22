import {
  CandidateName,
  CandidatePCT,
  CandidatesInfoGrid,
  ColumnHeader,
  WinnerPCT,
} from "./styled";
import { isBidenWins } from "./utils";
import { useEffect, useState } from "react";

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
  const [isBiden, setIsBiden] = useState<boolean | undefined>();

  useEffect(() => {
    setIsBiden(isBidenWins(+bidenVal, +trumpVal));
  }, [trumpVal, bidenVal]);

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
      <CandidatePCT biden>{!isBiden ? `${bidenPer}%` : ""}</CandidatePCT>
      {isBiden ? <WinnerPCT biden>{bidenPer}%</WinnerPCT> : <div />}

      {/* Row 3 - Donald Trump info */}
      <CandidateName>Donald Trump</CandidateName>
      <div>Rep.</div>
      <div>{trumpVal}</div>
      <CandidatePCT>{isBiden ? `${trumpPer}%` : ""}</CandidatePCT>
      {!isBiden ? <WinnerPCT>{trumpPer}%</WinnerPCT> : <div />}
    </CandidatesInfoGrid>
  );
};
