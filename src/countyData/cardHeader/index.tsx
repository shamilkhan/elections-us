import styled from "@emotion/styled";
import Divider from "@mui/material/Divider";

// County (state) name
const Title = styled.div`
  line-height: 16px;
  font-size: 18px;
  font-weight: 500;
  padding: 22px 26px 15px;
  vertical-align: center;

  &:before {
    content: url("/location-pin.svg");
    width: 12px;
    height: 16px;
    margin-right: 7px;
  }
`;

// Divider between header and grid
const StyledDivider = styled(Divider)`
  color: rgba(133, 144, 161, 0.5);
  margin: 0 24px 10px;
`;

type Props = {
  county: string;
  state: string;
};

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
