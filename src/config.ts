"use strict";

import dotenv from "dotenv";
import path from "path";
import {
  Puppeteer,
  Sound,
  Discord
} from "./models/config.model";


dotenv.config({
  path: `${path.resolve(__dirname, "../local_secrets.env")}`
});

function envOrString(envVar?: string) {
  return envVar || "";
}

function envOrBoolean(envVar?: string) {
  return envVar == "true" || false;
}

function envOrNumber(envVar?: string) {
  return Number(envVar) || 0;
}

const puppeteer: Puppeteer = {
  isHeadless: envOrBoolean(process.env.PUPPETEER_HEADLESS),
  ...(process.env.PUPPETEER_SLOWMO && {
    slowMo: envOrNumber(process.env.PUPPETEER_SLOWMO)
  }),
  isDifferentViewPort: envOrBoolean(process.env.PUPPETEER_VIEWPORT),
  ...(process.env.PUPPETEER_VIEWPORT_WIDTH && {
    viewPortWidth: envOrNumber(process.env.PUPPETEER_VIEWPORT_WIDTH)
  }),
  ...(process.env.PUPPETEER_VIEWPORT_HEIGHT && {
    viewPortHeight: envOrNumber(process.env.PUPPETEER_VIEWPORT_HEIGHT)
  })
};

const sound: Sound = {
  shouldPlayNotificationSound: envOrBoolean(process.env.SOUND_NOTIFICATION),
  soundFilePath: envOrString(process.env.SOUND_FILE_PATH)
};

const discord: Discord = {
  shouldSendDiscordNotification: envOrBoolean(process.env.DISCORD_NOTIFICATION),
  discordWebhookId: envOrString(process.env.DISCORD_WEBHOOK_ID),
  discordWebhookToken: envOrString(process.env.DISCORD_WEBHOOK_TOKEN)
};

export const config = {
  puppeteer,
  notification: {
    sound,
    discord,
  }
};
