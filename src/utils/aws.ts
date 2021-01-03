"use strict";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const aws = require("aws-sdk");
// import { config } from "../config";

// const {
//   awsAccessKeyId,
//   awsSecretAccessKey,
//   awsRegion,
//   awsEndpoint,
// } = config.aws;

aws.config.update({
  region: "us-east-1",
  awsAccessKeyId: "",
  secretAccessKey: "",
  endpoint: new aws.Endpoint("http://localhost:8000")
});

const dynamodb = new aws.DynamoDB();
const dynamodbDocClient = new aws.DynamoDB.DocumentClient({
  convertEmptyValues: true
});

export {
  dynamodb,
  dynamodbDocClient
};
