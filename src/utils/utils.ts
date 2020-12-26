import open from "open";
import { getRandom } from "random-useragent";
import { logger } from "./logger";
import { config } from "../config";


export function getRandomUserAgent(): string {
  const { defaultUserAgent } = config.puppeteer;
  const userAgent: string =
    getRandom((ua) => {
      return ua.osName !== "Android"
        && ua.osName !== "iOS"
        && ua.browserName === "Chrome"
        && ua.browserVersion > "20";
    }) ?? defaultUserAgent;

  return userAgent;
}

export function getSleepTime(minSleep: number, maxSleep: number): number {
  return Math.random() * (maxSleep - minSleep) + minSleep;
}

export async function openBrowser(itemUrl: string, atcUrl?: string): Promise<void> {
  const {
    shouldOpenBrowser,
    browserApp
  } = config.browser;

  if (!shouldOpenBrowser) {
    return;
  }

  try {
    const url = atcUrl || itemUrl;

    logger.debug(`↗ opening browser with ${url}`);
    await open(url, { app: browserApp });
  }
  catch (err) {
    logger.error(`  ✖ couldn't open ${browserApp}`, err);
  }

  logger.info(`  ✔ opened ${browserApp} browser`);
}
