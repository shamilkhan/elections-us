import styled from "@emotion/styled";

type DiagramProps = {
  percentage: number;
};

// Circle diagram for candidate's percentage
const Diagram = styled.div<DiagramProps>`
  position: absolute;
  width: 140px;
  height: 140px;
  aspect-ratio: 1;
  display: inline-grid;
  place-content: center;
  &::before {
    content: "";
    border-radius: 50%;
    inset: 0;
    width: 140px;
    height: 140px;
    background: conic-gradient(
      #85b1d9 ${(props) => 50 + props.percentage / 4}%,
      #e72121 0
    );
    -webkit-mask: radial-gradient(
      farthest-side,
      #0000 calc(99% - 20px),
      #000 calc(100% - 20px)
    );
    mask: radial-gradient(
      farthest-side,
      #0000 calc(99% - 20px),
      #000 calc(100% - 20px)
    );
  }
`;

export const BidenDiagram = styled(Diagram)`
  left: 0px;
  top: -70px;
`;

export const TrumpDiagram = styled(Diagram)`
  &::before {
    background: conic-gradient(
      #85b1d9 ${(props) => 75 + (100 - props.percentage) / 4}%,
      #e72121 0
    );
  }
`;
