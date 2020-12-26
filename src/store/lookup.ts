"use strict";
import { Browser, BrowserContext, Page, Response } from "puppeteer";
import chalk from "chalk";
import { sendNotification } from "../notifications/notification";
import { Store, Selector } from "../models/store.model";
import { Product } from "../models/product.model";
import { getRandomUserAgent, openBrowser, getSleepTime } from "../utils/utils";
import { logger } from "../utils/logger";
import { config } from "../config";


function isProductInStock(text: string, targetText: string): boolean {
  const textLowerCase = text.toLowerCase().trim();
  const result = textLowerCase.includes(targetText);
  logger.debug(`Comparing ${chalk.yellow(`"${textLowerCase}" ⇄  "${targetText}"`)} ➤  ${chalk.yellow(result.toString())}`);
  return result;
}

async function extractPageContents(page: Page, options: Selector): Promise<string | null> {
  return page.evaluate((options: Selector) => {
    const element = <HTMLElement>document.querySelector(options.selector);

    if (!element) {
      return null;
    }

    switch (options.type) {
      case "innerHTML":
        return element.innerHTML;
      default:
        return "Error: selector.type is unknown";
    }
  }, options);
}

async function productLookUp(store: Store, product: Product, browser: Browser) {
  const { isIncognito } = config.puppeteer;

  const context: BrowserContext = isIncognito ? await browser.createIncognitoBrowserContext() : await browser.defaultBrowserContext();
  const page: Page = await context.newPage();
  // await page.setRequestInterception(true);
  await page.setJavaScriptEnabled(false);

  const userAgent = await getRandomUserAgent();
  logger.debug(`ℹ setting page userAgent: ${userAgent}`);
  page.setUserAgent(userAgent);

  const response: Response | null = await page.goto(product.url, {
    waitUntil: "networkidle0"
  });

  if (!response) {
    throw Error(`✖ No response for ${store.name} - ${product.name} - ${product.url}`);
  }

  const { inStockLabel } = store.queryLabel;
  const { targetText } = inStockLabel;
  const contents = await extractPageContents(page, inStockLabel);

  if (!contents) {
    throw Error(`✖ extractPageContents() return null value for ${store.name} - ${product.name}`);
  }

  // If product in stock ➤ open browser with ATC link + notification settings
  if (isProductInStock(contents, targetText)) {
    logger.info(`✔ ${store.name}: ${product.name} is ${chalk.bgGreen("in stock")} 🚨🚨🚨`);
    await openBrowser(product.url, product.atcUrl);
    await sendNotification(store, product);
  } else {
    logger.info(`✖ ${store.name}: ${product.name} is ${chalk.bgRedBright("not in stock")} 🤏`);
  }

  // Clear page cookie history and cache
  const client = await page.target().createCDPSession();
  await client.send("Network.clearBrowserCookies");
  await client.send("Network.clearBrowserCache");

  page.close();
}

export async function productLookUpLoop(store: Store, product: Product, browser: Browser): Promise<void> {
  const { minSleep, maxSleep } = config.sleep;
  logger.info(`ℹ Looking up ${store.name} product: `, product);

  try {
    await productLookUp(store, product, browser);
  }
  catch (err) {
    logger.error("✖ something went wrong with productLookUp()", err);
    return;
  }

  const sleepTime = getSleepTime(minSleep, maxSleep);
  logger.debug(`ℹ Lookup done, next lookup in ${sleepTime} ms`);
  setTimeout(productLookUpLoop, sleepTime, store, product, browser);
}
