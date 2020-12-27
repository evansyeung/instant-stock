"use strict";

import dotenv from "dotenv";
import path from "path";
import {
  BrowserConfigs,
  DiscordConfigs,
  PuppeteerConfigs,
  SoundConfigs,
  SleepConfigs,
  StoreConfigs,
} from "./models/config.model";


interface Notification {
  sound: SoundConfigs,
  discord: DiscordConfigs
}

dotenv.config({
  path: `${path.resolve(__dirname, "../local_secrets.env")}`
});

function envOrString(envVar?: string) {
  return envVar || "";
}

function envOrBoolean(envVar?: string) {
  return envVar == "true" || false;
}

function envOrNumber(envVar?: string, defaultVal?: number) {
  return Number(envVar) || defaultVal || 0;
}

const sleep: SleepConfigs = {
  minSleep: envOrNumber(process.env.MIN_SLEEP, 30000),
  maxSleep: envOrNumber(process.env.MAX_SLEEP, 30000)
};

const puppeteer: PuppeteerConfigs = {
  defaultUserAgent: "",
  isDifferentViewPort: envOrBoolean(process.env.PUPPETEER_VIEWPORT),
  isHeadless: envOrBoolean(process.env.PUPPETEER_HEADLESS),
  isIncognito: envOrBoolean(process.env.PUPPETEER_IS_INCOGNITO),
  ...(process.env.PUPPETEER_SLOWMO && { slowMo: envOrNumber(process.env.PUPPETEER_SLOWMO, 1000) }),
  ...(process.env.PUPPETEER_VIEWPORT_WIDTH && { viewPortWidth: envOrNumber(process.env.PUPPETEER_VIEWPORT_WIDTH, 1920) }),
  ...(process.env.PUPPETEER_VIEWPORT_HEIGHT && { viewPortHeight: envOrNumber(process.env.PUPPETEER_VIEWPORT_HEIGHT, 1080) }),

};

const browser: BrowserConfigs = {
  browserApp: envOrString(process.env.BROWSER_APP),
  shouldOpenBrowser: envOrBoolean(process.env.BROWSER_OPEN),
};

const store: StoreConfigs = {
  shouldCheckBestbuy: envOrBoolean(process.env.STORE_CHECK_BESTBUY),
  shouldCheckNewegg: envOrBoolean(process.env.STORE_CHECK_NEWEGG),
};

const sound: SoundConfigs = {
  soundFilePath: envOrString(process.env.SOUND_FILE_PATH),
  shouldPlayNotificationSound: envOrBoolean(process.env.SOUND_NOTIFICATION),
};

const discord: DiscordConfigs = {
  discordNvidia3070RoleId: envOrString(process.env.DISCORD_NVIDIA_3070_ROLE_ID),
  discordNvidia3080RoleId: envOrString(process.env.DISCORD_NVIDIA_3080_ROLE_ID),
  discordNvidia3090RoleId: envOrString(process.env.DISCORD_NVIDIA_3090_ROLE_ID),
  discordWebhookId: envOrString(process.env.DISCORD_WEBHOOK_ID),
  discordWebhookToken: envOrString(process.env.DISCORD_WEBHOOK_TOKEN),
  shouldSendDiscordNotification: envOrBoolean(process.env.DISCORD_NOTIFICATION),
};

const notification: Notification = {
  sound,
  discord
};

export const config = {
  browser,
  puppeteer,
  notification,
  sleep,
  store
};
