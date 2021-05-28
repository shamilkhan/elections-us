// @ts-ignore
import React from "react";
import { Card } from "baseui/card";
import { TableBuilder, TableBuilderColumn } from "baseui/table-semantic/";

const getVotingData = (data: any) => {
  return [
    {
      name: "Joe Biden",
      party: "Dem.",
      count: data.VOTES.votes20_Joe_Biden,
      percentage: `${(+data.VOTES.percentage20_Joe_Biden * 100).toFixed(1)}%`,
      color: `#155a66`,
      countyWiningColor: "rgba(21, 90, 102, 0.4)",
    },
    {
      name: "Donald Trump",
      party: "Rep.",
      count: data.VOTES.votes20_Donald_Trump,
      percentage: `${(+data.VOTES.percentage20_Donald_Trump * 100).toFixed(
        1
      )}%`,
      color: `#8a0200`,
      countyWiningColor: "rgba(138, 2, 0, 0.4)",
    },
  ];
};

export const CountyData = ({ data }: { data: any }) => {
  if (!data.VOTES) return null;
  const formateNumber = new Intl.NumberFormat("en-US");
  const votesData = getVotingData(data);

  const maxValue = Math.max(...votesData.map((voteData) => +voteData.count));

  const getBackgroundColor = (rowIndex: number) => {
    return maxValue === +votesData[rowIndex].count
      ? votesData[rowIndex].countyWiningColor
      : "";
  };

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
      <TableBuilder
        overrides={{
          TableBodyRow: {
            style: ({ $rowIndex }) => ({
              borderLeft: `15px solid ${votesData[$rowIndex].color}`,
              backgroundColor: getBackgroundColor($rowIndex),
            }),
          },
        }}
        data={votesData}
      >
        <TableBuilderColumn header="" id="name">
          {(row) => row.name}
        </TableBuilderColumn>
        <TableBuilderColumn header="Party" id="party">
          {(row) => row.party}
        </TableBuilderColumn>
        <TableBuilderColumn header="Votes" id="count">
          {(row) => formateNumber.format(row.count)}
        </TableBuilderColumn>
        <TableBuilderColumn header="PCT." id="percentage">
          {(row) => row.percentage}
        </TableBuilderColumn>
      </TableBuilder>
    </Card>
  );
};
