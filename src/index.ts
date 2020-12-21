"use strict";

import puppeteer, { Browser, BrowserContext, Page, Response } from 'puppeteer';
import chalk from 'chalk';
import { getRandomUserAgent } from './utils/utils'
import { sendNotification } from './notifications/notification'
import { Products } from './products'
import { Product } from './models/product.model';
import { logger } from './utils/logger';


let browser: Browser
let context: BrowserContext
let page: Page


const args: string[] = [];
args.push('--no-sandbox');
args.push('--disable-setuid-sandbox');
// args.push('--lang')

if (args.length > 0) {
  logger.debug('ℹ puppeteer config: ', args);
}

const options = {
  // headless: false,
  // slowMo: 700,
  // defaultViewport: {
  //   width: 1920,
  //   height: 1080,
  // },
  args,
};

logger.info('ℹ puppeteer options: ', options)

async function main() {
  browser = await puppeteer.launch(options)

  try {
    // This will async each lookUp call, thus when we use page.goto it will navigate the same incognito tab instead of doing it separately
    // const resolved = await Promise.all(products.map(async (product) => {
    //   return await lookUp(product, browser)
    // }))
    // console.log("🚀 ~ file: index.ts ~ line 57 ~ main ~ results", resolved)

    for (const product of Products) {
      logger.info('ℹ Looking up product: ', product)
      await lookUp(product, browser)
    }
  }
  catch (err) {
    logger.error('✖ something bad happened during lookUp', err)
  }

  await browser.close();
}

// async function lookUp(product: Product, browser: Browser): Promise<String | null> {
async function lookUp(product: Product, browser: Browser) {
  context = await browser.createIncognitoBrowserContext()
  page = await context.newPage();
  await page.setJavaScriptEnabled(false);

  const userAgent = await getRandomUserAgent()
  logger.debug(`ℹ page userAgent: ${userAgent}`)

  page.setUserAgent(userAgent)

  const response: Response | null = await page.goto(product.itemUrl, { waitUntil: 'networkidle0' });

  if (!response) {
    logger.debug(`✖ No response for ${product.itemNumber} - ${product.itemUrl}`)
  }

  const elementText = await page.evaluate(() => {
    // Type assertion to HTMLElement
    // return (document.querySelector(".product-buy") as HTMLElement)?.innerText
    const element = <HTMLElement>document.querySelector(".product-buy")
    return element.innerText
  })

  // If product in stock ➤ notificaiton and open browser and attempt add to cart
  if (isProductInStock(elementText, product.label.targetText)) {
    logger.info(`✔ ${product.itemName} is ${chalk.bgGreen('in stock')} 🚨🚨🚨`)
    await sendNotification(product)
  } else {
    logger.info(`✖ ${product.itemName} is ${chalk.bgRedBright('not in stock')} 🤏`)
  }

  page.close()
}

function isProductInStock(text: string, targetText: string) {
  const textLowerCase = text.toLowerCase().trim()
  logger.info(`Comparing ${chalk.yellow(`"${textLowerCase}" ⇄  "${targetText}"`)} ➤  ${textLowerCase.includes(targetText)}`)
  return textLowerCase.includes(targetText)
}

async function loopMain() {
  try {
    await main()
  }
  catch (err) {
    logger.error('✖ something bad happened, resetting instant stock in 5 seconds', err)
  }
}

void loopMain()
