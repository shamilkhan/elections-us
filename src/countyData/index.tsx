// @ts-ignore
import React from "react";
import { Card } from "baseui/card";
import { Table } from "baseui/table-semantic/";

export const CountyData = ({ data }: { data: any }) => {
  if (!data.VOTES) return null;

  const COLUMNS = ["", "Party", "Votes", "PCT."];
  const formateNumber = new Intl.NumberFormat("en-US");

  const votesData = {
    biden: {
      count: formateNumber.format(data.VOTES.votes20_Joe_Biden),
      percentage: `${(+data.VOTES.percentage20_Joe_Biden * 100).toFixed(1)}%`,
    },
    trump: {
      count: formateNumber.format(data.VOTES.votes20_Donald_Trump),
      percentage: `${(+data.VOTES.percentage20_Donald_Trump * 100).toFixed(
        1
      )}%`,
    },
  };

  const maxValue = Math.max(
    +data.VOTES.percentage20_Joe_Biden,
    +data.VOTES.percentage20_Donald_Trump
  );

  return (
    <Card
      overrides={{
        Root: {
          style: {
            top: "1.5rem",
            right: "1.5rem",
            width: "30rem",
            position: "absolute",
          },
        },
      }}
      title={`${data.VOTES.county} (${data.VOTES.state}) `}
    >
      <Table
        overrides={{
          TableBodyRow: {
            style: {
              ":first-child": {
                borderLeft: "15px solid #155a66",
                backgroundColor:
                  maxValue === +data.VOTES.percentage20_Joe_Biden
                    ? "rgba(21, 90, 102, 0.4)"
                    : "transparent",
              },
              ":last-child": {
                borderLeft: "15px solid #8a0200",
                backgroundColor:
                  maxValue === +data.VOTES.percentage20_Donald_Trump
                    ? "rgba(138, 2, 0, 0.4)"
                    : "transparent",
              },
            },
          },
        }}
        columns={COLUMNS}
        data={[
          [
            "Joe Biden",
            "Dem.",
            votesData.biden.count,
            votesData.biden.percentage,
          ],
          [
            "Donald Trump",
            "Rep.",
            votesData.trump.count,
            votesData.trump.percentage,
          ],
        ]}
      />
    </Card>
  );
};
