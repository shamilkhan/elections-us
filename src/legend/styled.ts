import styled from "@emotion/styled";

export const LegendContainer = styled.div`
  position: absolute;
  box-sizing: border-box;
  left: 30px;
  bottom: 35px;
  width: 172px;
  height: 50px;
  background: #ffffff;
  box-shadow: 0px 3px 9px rgba(96, 96, 96, 0.22);
  border-radius: 4px;
  padding: 8px;
  z-index: 3;
  font-family: "Rubik", sans-serif;
  font-size: 10px;
`;

export const LegendHeaders = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
`;

export const LegendColors = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 4px;
`;

export const ColorBlock = styled.div`
  background-color: ${({ color }) => color};
  height: 5px;
  width: 100%;
`;

export const LegendPercentage = styled.div`
  display: flex;
  justify-content: space-between;
`;
