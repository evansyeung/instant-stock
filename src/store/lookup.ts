"use strict";
import { Browser, BrowserContext, Page, Response } from "puppeteer";
import chalk from "chalk";
import { getRandomUserAgent, openBrowser } from "../utils/utils";
import { sendNotification } from "../notifications/notification";
import { Product } from "../models/product.model";
import { logger } from "../utils/logger";
import { config } from "../config";


let context: BrowserContext;
let page: Page;

// async function lookUp(product: Product, browser: Browser): Promise<String | null> {
async function productLookUp(product: Product, browser: Browser) {
  const { isIncognito } = config.puppeteer;

  context = isIncognito ? await browser.createIncognitoBrowserContext() : await browser.defaultBrowserContext();
  page = await context.newPage();
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

  // If product in stock ➤ notification and open browser and attempt add to cart
  if (isProductInStock(elementText, product.label.targetText)) {
    logger.info(`✔ ${product.itemName} is ${chalk.bgGreen("in stock")} 🚨🚨🚨`);
    await openBrowser(product.itemUrl, product.cartUrl);
    await sendNotification(product);
  } else {
    logger.info(`✖ ${product.itemName} is ${chalk.bgRedBright("not in stock")} 🤏`);
  }

  page.close();
}

function isProductInStock(text: string, targetText: string): boolean {
  const textLowerCase = text.toLowerCase().trim();
  const result = textLowerCase.includes(targetText);
  logger.debug(`Comparing ${chalk.yellow(`"${textLowerCase}" ⇄  "${targetText}"`)} ➤  ${chalk.yellow(result.toString())}`);
  return result;
}

export async function productLookUpLoop(product: Product, browser: Browser): Promise<void> {
  try {
    await productLookUp(product, browser);
  }
  catch (err) {
    logger.info("ℹ Looking up product: ", product);
    return;
  }

  // const sleepTime = 5000;
  // logger.info('ℹ Lookup done, next one in 5000 ms');
  // setTimeout(productLookUpLoop, sleepTime, product, browser);
}
