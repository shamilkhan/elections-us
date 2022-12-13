import styled from "@emotion/styled";

type Props = {
  county: string;
  state: string;
};

// Card header county + (state)
export const CardHeader = ({ county, state }: Props) => {
  return (
    <>
      <Title>
        {county} ({state})
      </Title>
      <StyledDivider />
    </>
  );
};

// County (state) name
export const Title = styled.div({
  "lineHeight": "16px",
  "fontSize": 18,
  "fontWeight": 500,
  "padding": "22px 26px 15px",
  "&:before": {
    content: "url('/location-pin.svg')",
    width: 12,
    height: 16,
    marginRight: 7,
  },
});

// Divider between header and grid
export const StyledDivider = styled.div({
  background: "rgba(0, 0, 0, 0.12)",
  margin: "0 24px 10px",
  height: "1px",
});
