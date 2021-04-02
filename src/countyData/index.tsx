// @ts-ignore
import React from "react";
import { Card, StyledBody } from "baseui/card";

export const CountyData = ({ data }: { data: any }) => {
  if (!data.VOTES) return null;
  return (
    <Card
      overrides={{
        Root: {
          style: {
            top: "1.5rem",
            right: "1.5rem",
            width: "20rem",
            position: "absolute",
          },
        },
      }}
      title={`${data.VOTES.county} (${data.VOTES.state}) `}
    >
      <StyledBody>
        Trump:
        {data.VOTES.percentage20_Donald_Trump}
        Biden:
        {data.VOTES.percentage20_Joe_Biden}
      </StyledBody>
    </Card>
  );
};
