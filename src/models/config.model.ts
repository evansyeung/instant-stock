export interface Puppeteer {
  isHeadless: boolean,
  slowMo?: number,
  isDifferentViewPort?: boolean,
  viewPortWidth?: number,
  viewPortHeight?: number,
  isIncognito: boolean,
}

export interface WebBrowser {
  shouldOpenBrowser: boolean,
  browserApp: string,
}

export interface Sound {
  shouldPlayNotificationSound: boolean,
  soundFilePath: string,
}

export interface Discord {
  shouldSendDiscordNotification: boolean,
  discordWebhookId: string,
  discordWebhookToken: string,
}
