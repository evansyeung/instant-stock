"use strict";
import {
  Browser,
  BrowserContext,
  Page,
  Request,
  Response
} from "puppeteer";
import chalk from "chalk";
import { sendNotification } from "../notifications/notification";
import { Store, Selector } from "../models/store.model";
import { Product } from "../models/product.model";
import { getRandomUserAgent, openBrowser, getSleepTime } from "../utils/utils";
import useProxy from "@doridian/puppeteer-page-proxy";
import { logger } from "../utils/logger";
import { config } from "../config";


function isProductInStock(text: string, targetText: string): boolean {
  const textLowerCase = text.toLowerCase().trim();
  const result = textLowerCase.includes(targetText);
  logger.debug(`Comparing ${chalk.yellow(`"${textLowerCase}" ⇄  "${targetText}"`)} ➤  ${chalk.yellow(result.toString())}`);
  return result;
}

function getProxy() {
  // TODO: Implement proxy rotation
  const proxy = "";
  return proxy;
}

async function handleProxy(request: Request, proxy?: string) {
  if (!proxy) {
    return false;
  }

  try {
    await useProxy(request, proxy);
  } catch (error: unknown) {
    logger.error("handleProxy", error);
    try {
      await request.abort();
    }
    // eslint-disable-next-line no-empty
    catch { }
  }

  return true;
}

async function getCurrentPrice(page: Page, currentPriceLabel: Selector): Promise<string> {
  const priceString = await extractPageContents(page, currentPriceLabel);

  if (priceString) {
    const match = priceString.match(/\$?(\d+.\d{2})/);

    if (match) {
      const currentPrice = `$${match[1]}`;
      logger.debug(`✔ successfully matched price ${currentPrice}`);
      return currentPrice;
    }
  }

  return "Unable to retrieve product's price";
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
      case "textContent":
        return element.textContent;
      default:
        return "Error: option.type is unknown";
    }
  }, options);
}

async function productLookUp(store: Store, product: Product, browser: Browser): Promise<void> {
  const { isIncognito } = config.puppeteer;

  const context: BrowserContext = isIncognito ? await browser.createIncognitoBrowserContext() : await browser.defaultBrowserContext();
  const page: Page = await context.newPage();
  // await page.setRequestInterception(true);
  await page.setJavaScriptEnabled(false);

  const userAgent = await getRandomUserAgent();
  logger.debug(`ℹ setting page userAgent: ${userAgent}`);
  page.setUserAgent(userAgent);

  const proxy = getProxy();
  await page.setRequestInterception(true);
  page.on("request", async (request) => {
    if (await handleProxy(request, proxy)) {
      return;
    }

    try {
      await request.continue();
    }
    // eslint-disable-next-line no-empty
    catch { }
  });

  const response: Response | null = await page.goto(product.url, {
    waitUntil: "networkidle0"
  });

  if (!response) {
    throw Error(`✖ No response for ${store.name} - ${product.name} - ${product.url}`);
  }

  const { inStockLabel, currentPriceLabel } = store.queryLabel;
  const contents = await extractPageContents(page, inStockLabel);

  if (contents) {
    // If product in stock ➤ open browser with ATC link + notification settings
    if (isProductInStock(contents, inStockLabel.targetText)) {
      logger.info(`✔ ${store.name}: ${product.name} is ${chalk.bgGreen("in stock")} 🚨🚨🚨`);
      await openBrowser(product.url, product.atcUrl);

      product.currentPrice = await getCurrentPrice(page, currentPriceLabel);
      await sendNotification(store, product);
    } else {
      logger.info(`✖ ${store.name}: ${product.name} is ${chalk.bgRedBright("not in stock")} 🤏`);
    }
  } else {
    logger.error(`✖ Unable to extract page's content for ${product.name}`);
  }

  // Clear page cookie history and cache
  const client = await page.target().createCDPSession();
  await client.send("Network.clearBrowserCookies");
  await client.send("Network.clearBrowserCache");

  page.close();
}

export async function productLookUpLoop(store: Store, product: Product, browser: Browser): Promise<void> {
  const { minSleep, maxSleep } = config.sleep;
  logger.debug(`ℹ Looking up ${store.name} product: `, product);

  try {
    await productLookUp(store, product, browser);
  }
  catch (err) {
    logger.error("✖ something went wrong with productLookUp()", err);
    return;
  }

  const sleepTime = getSleepTime(minSleep, maxSleep);
  logger.debug(`ℹ Lookup done for ${store.name}: ${product.name}, next lookup in ${sleepTime} ms`);
  setTimeout(productLookUpLoop, sleepTime, store, product, browser);
}
