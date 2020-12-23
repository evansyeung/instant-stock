"use strict";
import puppeteer, { Browser } from "puppeteer";
import { Products } from "./products";
import { productLookUpLoop } from "./store/lookup";
import { logger } from "./utils/logger";
import { config } from "./config";


let browser: Browser;

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

logger.info("ℹ puppeteer options: ", options);

async function main() {
  browser = await puppeteer.launch(options);

  try {
    // This will async each lookUp call, thus when we use page.goto it will navigate the same incognito tab instead of doing it separately
    // const resolved = await Promise.all(products.map(async (product) => {
    //   return await lookUp(product, browser)
    // }))
    // console.log("🚀 ~ file: index.ts ~ line 57 ~ main ~ results", resolved)

    for (const product of Products) {
      await productLookUpLoop(product, browser);
    }
  }
  catch (err) {
    logger.error("✖ something bad happened during lookUp", err);
  }
}

async function loopMain() {
  try {
    await main();
  }
  catch (err) {
    logger.error("✖ something bad happened, resetting instant stock in 5 seconds", err);
    setTimeout(loopMain, 5000);
  }
  // await browser.close();
}

void loopMain();
