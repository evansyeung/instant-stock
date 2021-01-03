import { dynamodbDocClient } from "./../utils/aws";
import { Store } from "./../models/store.model";
import { Stores } from "../store";
import { logger } from "./../utils/logger";


type BatchItems = {
  PutRequest: {
    Item: Store
  }
}

function generateParams(stores: { [key: string]: Store }) {
  const items: BatchItems[] = [];
  const params = {
    RequestItems: {}
  };

  Object.values(stores).forEach(store => {
    logger.info(`${store.name} to be written to stores table`);
    items.push({
      PutRequest: {
        Item: store
      }
    });
  });

  params.RequestItems["stores"] = items;
  return params;
}

async function batchWriteItems(params) {
  try {
    await dynamodbDocClient.batchWrite(params).promise();
    logger.info("Items written to table");
  } catch (err) {
    logger.error("Error writing items into table!", err);
  }
}

function main() {
  const params = generateParams(Stores);
  batchWriteItems(params);
}

main();
