"use strict";

import puppeteer, { Browser, BrowserContext, Page, Response } from 'puppeteer';
import { getRandom } from 'random-useragent';
import { logger } from './utils/logger';


let browser: Browser
let context: BrowserContext
let page: Page

// const defaultUserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36"

const args: string[] = [];
args.push('--no-sandbox');
args.push('--disable-setuid-sandbox');

const options: {} = {
  // headless: false,
  // slowMo: 1000,
  // defaultViewport: {
  //   width: 800,
  //   height: 600,
  // },
  args,
};

async function main() {
  const link = 'https://example.com'
  browser = await puppeteer.launch(options)
  context = await browser.createIncognitoBrowserContext()
  page = await context.newPage()

  const defaultUserAgent = await browser.userAgent()
  const userAgent: string =
    getRandom((ua) => {
      return ua.browserName === 'Chrome' && ua.browserVersion > '20';
    }) ?? defaultUserAgent

  page.setUserAgent(userAgent)

  const response: Response | null = await page.goto(link);

  if (!response) {
    logger.debug(`No response for ${link}`)
  }

  const dimensions = await page.evaluate(() => {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      deviceScaleFactor: window.devicePixelRatio
    }
  })
  console.log("🚀 ~ file: index.ts ~ line 22 ~ dimensions ~ dimensions", dimensions)

  await browser.close();
}

main()
