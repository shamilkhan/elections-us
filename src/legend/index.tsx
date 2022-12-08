import {
  ColorBlock,
  LegendColors,
  LegendContainer,
  LegendHeaders,
  LegendPercentage,
} from "./styled";

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
          <ColorBlock color={color} />
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
