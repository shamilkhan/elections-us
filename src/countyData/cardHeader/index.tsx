import { StyledDivider, Title } from "./styled";

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
