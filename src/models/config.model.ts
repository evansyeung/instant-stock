export interface PuppeteerConfigs {
  isHeadless: boolean,
  slowMo?: number,
  isDifferentViewPort?: boolean,
  viewPortWidth?: number,
  viewPortHeight?: number,
  isIncognito: boolean,
  defaultUserAgent: string,
}

export interface BrowserConfigs {
  shouldOpenBrowser: boolean,
  browserApp: string,
}

export interface StoreConfigs {
  shouldCheckNewegg: boolean,
  shouldCheckBestbuy: boolean,
}

export interface SoundConfigs {
  shouldPlayNotificationSound: boolean,
  soundFilePath: string,
}

export interface SleepConfigs {
  minSleep: number,
  maxSleep: number,
}

export interface DiscordConfigs {
  shouldSendDiscordNotification: boolean,
  discordWebhookId: string,
  discordWebhookToken: string,
}
