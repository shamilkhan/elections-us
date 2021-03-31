import React from "react";
import { Card, StyledBody, StyledAction } from "baseui/card";
import { Button } from "baseui/button";

export const MapCard = () => {
  return (
    <Card
      overrides={{
        Root: {
          style: {
            top: "1.5rem",
            left: "1.5rem",
            width: "20rem",
            position: "absolute",
          },
        },
      }}
      title="US 2020 Elections map"
    >
      <img src="/demo.svg" alt="US 2020 Elections map" width="100px" />
      <StyledBody>
        Blue denotes states or congressional districts won by Democrat Joe
        Biden; red denotes those won by Republican Donald Trump.
      </StyledBody>
      <StyledAction>
        <Button
          overrides={{
            BaseButton: { style: { width: "100%" } },
          }}
        >
          Action
        </Button>
      </StyledAction>
    </Card>
  );
};
