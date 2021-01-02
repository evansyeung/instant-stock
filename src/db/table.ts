"use strict";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const aws = require("aws-sdk");

const args = process.argv.slice(2);

aws.config.update({
  region: "us-east-1",
  awsAccessKeyId: "",
  secretAccessKey: "",
  endpoint: new aws.Endpoint("http://localhost:8000")
});

// Create the DynamoDB service object
const ddb = new aws.DynamoDB();

const params = {
  AttributeDefinitions: [
    {
      AttributeName: "CUSTOMER_ID",
      AttributeType: "N"
    },
    {
      AttributeName: "CUSTOMER_NAME",
      AttributeType: "S"
    }
  ],
  KeySchema: [
    {
      AttributeName: "CUSTOMER_ID",
      KeyType: "HASH"
    },
    {
      AttributeName: "CUSTOMER_NAME",
      KeyType: "RANGE"
    }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1
  },
  TableName: "CUSTOMER_LIST",
  StreamSpecification: {
    StreamEnabled: false
  }
};

function createTables() {
  ddb.createTable(params, function (err, data) {
    if (err) {
      // eslint-disable-next-line no-console
      console.log("Error", err);
    } else {
      // eslint-disable-next-line no-console
      console.log("Table Created", data);
    }
  });
}

function deleteTables() {
  ddb.deleteTable({ TableName: "CUSTOMER_LIST" }, function (err, data) {
    if (err) {
      // eslint-disable-next-line no-console
      console.error("Unable to delete table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
      // eslint-disable-next-line no-console
      console.log("Deleted table. Table description JSON:", JSON.stringify(data, null, 2));
    }
  });
}


const arg = args[0].toLowerCase();

switch (arg) {
  case "create":
    createTables();
    break;
  case "delete":
    deleteTables();
    break;
  default:
    // eslint-disable-next-line no-console
    console.log(`Command ${arg} not found`);
}
