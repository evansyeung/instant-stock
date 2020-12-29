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
  soundPlayer: string
}

export interface SleepConfigs {
  minSleep: number,
  maxSleep: number,
}

export interface DiscordConfigs {
  discordNvidia3070RoleId: string,
  discordNvidia3080RoleId: string,
  discordNvidia3090RoleId: string,
  discordWebhookId: string,
  discordWebhookToken: string,
  shouldSendDiscordNotification: boolean,
}
