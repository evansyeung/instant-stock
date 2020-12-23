import open from "open";
import { getRandom } from "random-useragent";
import { logger } from "./logger";
import { config } from "../config";


export function getRandomUserAgent(): string {
  // const defaultUserAgent = await browser.userAgent()
  const defaultUserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36";
  const userAgent: string =
    getRandom((ua) => {
      return ua.osName !== "Android"
        && ua.osName !== "iOS"
        && ua.browserName === "Chrome"
        && ua.browserVersion > "20";
    }) ?? defaultUserAgent;

  return userAgent;
}

export async function openBrowser(itemUrl: string, cartUrl?: string): Promise<void> {
  const {
    shouldOpenBrowser,
    browserApp
  } = config.webBrowser;

  if (!shouldOpenBrowser) {
    return;
  }

  try {
    const url = cartUrl || itemUrl;

    logger.debug(`↗ opening browser with ${url}`);
    await open(url, { app: browserApp });
  }
  catch (err) {
    logger.error(`  ✖ couldn't open ${browserApp}`, err);
  }

  logger.info(`  ✔ opened ${browserApp} browser`);
}
