import { getRandom } from 'random-useragent';


export async function getRandomUserAgent() {
  // const defaultUserAgent = await browser.userAgent()
  const defaultUserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36"
  const userAgent: string =
    getRandom((ua) => {
      return ua.osName !== 'Android'
        && ua.osName !== 'iOS'
        && ua.browserName === 'Chrome'
        && ua.browserVersion > '20';
    }) ?? defaultUserAgent

  return userAgent
}
