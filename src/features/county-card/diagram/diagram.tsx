import styled from "@emotion/styled";

type DiagramProps = {
  percentage: number;
};

// Circle diagram for candidate's percentage
const Diagram = styled.div<DiagramProps>(({ percentage }) => ({
  "position": "absolute",
  "width": 140,
  "height": 140,
  "aspectRatio": "1",
  "display": "inline-grid",
  "placeContent": "center",
  "&::before": {
    content: "''",
    borderRadius: "50%",
    inset: 0,
    width: 140,
    height: 140,
    background: `conic-gradient(
      #85b1d9 ${50 + percentage / 4}%,
      #e72121 0
    )`,
    WebkitMask: `radial-gradient(
      farthest-side,
      #0000 calc(99% - 20px),
      #000 calc(100% - 20px)
    )`,
    mask: `radial-gradient(
      farthest-side,
      #0000 calc(99% - 20px),
      #000 calc(100% - 20px)
    )`,
  },
}));

// Biden diagram
export const BidenDiagram = styled(Diagram)(() => ({
  left: 0,
  top: -70,
}));

// Trumo diagram
export const TrumpDiagram = styled(Diagram)(({ percentage }) => ({
  "&::before": {
    background: `conic-gradient(
      #85b1d9 ${75 + (100 - percentage) / 4}%,
      #e72121 0
    )`,
  },
}));
