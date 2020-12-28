"use strict";
import { Browser } from "puppeteer";
import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import AdblockerPlugin from 'puppeteer-extra-plugin-adblocker'
import { Stores } from "./store";
import { productLookUpLoop } from "./store/lookup";
import { logger } from "./utils/logger";
import { config } from "./config";


let browser: Browser;
const sleepTime = 5000;

const args: string[] = [];
args.push("--no-sandbox");
args.push("--disable-setuid-sandbox");
// args.push('--lang')

if (args.length > 0) {
  logger.debug("ℹ puppeteer config: ", args);
}

const options = {
  headless: config.puppeteer.isHeadless,
  ...(config.puppeteer.slowMo && { slowMo: config.puppeteer.slowMo }),
  ...(config.puppeteer.isDifferentViewPort && {
    defaultViewport: {
      width: config.puppeteer.viewPortWidth,
      height: config.puppeteer.viewPortHeight,
    },
  }),
  args,
};

puppeteer.use(StealthPlugin())
puppeteer.use(AdblockerPlugin({ blockTrackers: true }))

logger.info("ℹ puppeteer options: ", options);

async function main() {
  browser = await puppeteer.launch(options);
  config.puppeteer.defaultUserAgent = await browser.userAgent();

  try {
    Object.values(Stores).forEach(async store => {
      await Promise.all(store.products.map(async product => {
        return await productLookUpLoop(store, product, browser);
      }));
    });
  }
  catch (err) {
    logger.error("✖ something bad happened during productLookUpLoop()", err);
  }
}

async function loopMain() {
  try {
    await main();
  }
  catch (err) {
    logger.error("✖ something bad happened, resetting instant stock in 5 seconds", err);
    setTimeout(loopMain, sleepTime);
  }
}

void loopMain();
