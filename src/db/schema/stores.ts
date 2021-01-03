"use strict";

const AttributeDefinitions = [
  {
    AttributeName: "id",
    AttributeType: "S",
  },
  {
    AttributeName: "name",
    AttributeType: "S",
  },
];

const KeySchema = [
  {
    AttributeName: "id",
    KeyType: "HASH",
  }
];

const ProvisionedThroughput = {
  ReadCapacityUnits: 1,
  WriteCapacityUnits: 1,
};

const GlobalSecondaryIndexes = [
  {
    IndexName: "name-idx",
    KeySchema: [
      {
        AttributeName: "name",
        KeyType: "HASH",
      }
    ],
    Projection: {
      ProjectionType: "ALL"
    },
    ProvisionedThroughput
  }
];

export const storeConfig = {
  TableName: "stores",
  AttributeDefinitions,
  KeySchema,
  ProvisionedThroughput,
  GlobalSecondaryIndexes,
};
