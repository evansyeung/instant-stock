"use strict";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const aws = require("aws-sdk");
import { config } from "../config";

const {
  awsAccessKeyId,
  awsSecretAccessKey,
  awsRegion,
  awsEndpoint,
} = config.aws;

aws.config.update({
  region: awsRegion,
  awsAccessKeyId: awsAccessKeyId,
  secretAccessKey: awsSecretAccessKey,
  endpoint: new aws.Endpoint(awsEndpoint)
});

const dynamodb = new aws.DynamoDB();
const dynamodbDocClient = new aws.DynamoDB.DocumentClient({
  convertEmptyValues: true
});

export {
  dynamodb,
  dynamodbDocClient
};
