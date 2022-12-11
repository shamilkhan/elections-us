const colors = [
  "#1E6995",
  "#387CA5",
  "#7FB8D9",
  "#B1D9EE",
  "#FFCABA",
  "#FFAA8F",
  "#FF774C",
  "#E95425",
];

export const Legend = () => {
  return (
    <LegendContainer>
      <LegendHeaders>
        <span>Biden</span>
        <span>Trump</span>
      </LegendHeaders>
      <LegendColors>
        {colors.map((color) => (
          <ColorBlock color={color} key={color} />
        ))}
      </LegendColors>
      <LegendPercentage>
        <span>95%</span>
        <span>85%</span>
        <span>75%</span>
        <span>50%</span>
        <span>75%</span>
        <span>85%</span>
        <span>95%</span>
      </LegendPercentage>
    </LegendContainer>
  );
};

import styled from "@emotion/styled";

const LegendContainer = styled.div(() => ({
  position: "absolute",
  boxSizing: "border-box",
  left: 30,
  bottom: 35,
  width: 184,
  height: 52,
  background: "#ffffff",
  boxShadow: "0px 3px 9px rgba(96, 96, 96, 0.22)",
  borderRadius: "4px",
  padding: 8,
  fontSize: "11px",
  userSelect: "none",
}));

const LegendHeaders = styled.div(() => ({
  display: "flex",
  justifyContent: "space-between",
  marginBottom: 4,
}));

const LegendColors = styled.div(() => ({
  display: "flex",
  width: "100%",
  marginBottom: 4,
}));

const ColorBlock = styled.div(({ color }) => ({
  backgroundColor: color,
  height: 5,
  width: "100%",
}));

const LegendPercentage = styled.div(() => ({
  display: "flex",
  justifyContent: "space-between",
}));
