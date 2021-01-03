import { dynamodbDocClient } from "./../utils/aws";
import { logger } from "./../utils/logger";
import { Store } from "./../models/store.model";
import { Stores } from "../store";

interface BatchItems {
  PutRequest: {
    Item: Store
  }
}

function main() {
  const items: BatchItems[] = [];
  Object.values(Stores).forEach(store => {
    items.push({
      PutRequest: {
        Item: store
      }
    });
  });

  const params = {
    RequestItems: {
      stores: items
    },
  };

  dynamodbDocClient.batchWrite(params, function (err, data) {
    if (err) {
      logger.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
      logger.info("Added item:", JSON.stringify(data, null, 2));
    }
  });
}

main();
