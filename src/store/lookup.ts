"use strict";
import { Browser, BrowserContext, Page, Response } from "puppeteer";
import chalk from "chalk";
import { getRandomUserAgent, openBrowser } from "../utils/utils";
import { sendNotification } from "../notifications/notification";
import { Product } from "../models/product.model";
import { logger } from "../utils/logger";
import { getSleepTime } from "../utils/utils"
import { config } from "../config";


function isProductInStock(text: string, targetText: string): boolean {
  const textLowerCase = text.toLowerCase().trim();
  const result = textLowerCase.includes(targetText);
  logger.debug(`Comparing ${chalk.yellow(`"${textLowerCase}" ⇄  "${targetText}"`)} ➤  ${chalk.yellow(result.toString())}`);
  return result;
}

async function productLookUp(product: Product, browser: Browser) {
  const { isIncognito } = config.puppeteer;

  const context: BrowserContext = isIncognito ? await browser.createIncognitoBrowserContext() : await browser.defaultBrowserContext();
  const page: Page = await context.newPage();
  // await page.setRequestInterception(true);
  await page.setJavaScriptEnabled(false);

  const userAgent = await getRandomUserAgent();
  logger.debug(`ℹ page userAgent: ${userAgent}`);

  page.setUserAgent(userAgent);

  const response: Response | null = await page.goto(product.itemUrl, {
    waitUntil: "networkidle0"
  });

  if (!response) {
    logger.debug(`✖ No response for ${product.itemNumber} - ${product.itemUrl}`);
  }

  const elementText = await page.evaluate(() => {
    // Type assertion to HTMLElement
    // return (document.querySelector(".product-buy") as HTMLElement)?.innerText
    const element = <HTMLElement>document.querySelector(".product-buy");
    return element.innerText;
  });

  // If product in stock ➤ open browser with ATC link + notification settings
  if (isProductInStock(elementText, product.label.targetText)) {
    logger.info(`✔ ${product.itemName} is ${chalk.bgGreen("in stock")} 🚨🚨🚨`);
    await openBrowser(product.itemUrl, product.cartUrl);
    await sendNotification(product);
  } else {
    logger.info(`✖ ${product.itemName} is ${chalk.bgRedBright("not in stock")} 🤏`);
  }

  page.close();
}

export async function productLookUpLoop(product: Product, browser: Browser): Promise<void> {
  logger.info("ℹ Looking up product: ", product);

  try {
    await productLookUp(product, browser);
  }
  catch (err) {
    logger.error(`✖ something went wrong with productLookUp()`, err)
    return;
  }

  const sleepTime = getSleepTime(5000, 15000);
  logger.info(`ℹ Lookup done, next lookup in ${sleepTime} ms`);
  setTimeout(productLookUpLoop, sleepTime, product, browser);
}
