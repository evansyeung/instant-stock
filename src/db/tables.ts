"use strict";
import chalk from "chalk";
import { dynamodb } from "../utils/aws";
import { storeConfig } from "./schema/stores";
import { logger } from "../utils/logger";


async function createTables() {
  try {
    await dynamodb.createTable(storeConfig).promise();
    logger.info(`Created: ${chalk.green(`${storeConfig.TableName}`)} table`);
  } catch (err) {
    logger.error("Error creating tables!", err);
  }
}

async function deleteTables() {
  try {
    await dynamodb.deleteTable({ TableName: storeConfig.TableName }).promise();
    logger.info(`Deleted: ${chalk.red(`${storeConfig.TableName}`)} table`);
  } catch (err) {
    logger.error("Error deleting tables!", err);
  }
}

async function resetTables() {
  try {
    await deleteTables();
    await createTables();
  } catch (err) {
    logger.error("Error resetting tables!", err);
  }
}

function main() {
  const args = process.argv.slice(2);
  const arg = args[0]?.toLowerCase() || "missing arg";

  switch (arg) {
    case "create":
      createTables();
      break;
    case "delete":
      deleteTables();
      break;
    case "reset":
      resetTables();
      break;
    default:
      logger.error(`Command ${arg} not found`);
  }
}

main();
