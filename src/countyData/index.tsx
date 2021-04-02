import React from "react";
import { Card, StyledBody } from "baseui/card";

export const CountyData = ({ data }: { data: Record<string, unknown> }) => {
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
      title="County data:"
    >
      <StyledBody>
        <ul>
          {Object.entries(data).map(([key, value]) => (
            <li>{`${key} ${JSON.stringify(value)}`}</li>
          ))}
        </ul>
      </StyledBody>
    </Card>
  );
};
