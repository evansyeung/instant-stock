"use strict";

import { Product } from "./../models/product.model";
import { WebhookClient, MessageEmbed } from "discord.js";
import { logger } from "../utils/logger";
import { config } from "../config";


let client: WebhookClient;

function createEmbeddedMessage(productInfo: Product): MessageEmbed {
  const embeddedMessage = new MessageEmbed()
    .setTitle("🚨  Stock Notification  🚨")
    .setDescription(productInfo.itemName)
    .setColor("#0099ff")
    .addFields([
      {
        name: "Product Link",
        value: productInfo.itemUrl,
        inline: true
      },
      {
        name: "ATC",
        value: productInfo.cartUrl,
        inline: true
      }
    ])
    .setTimestamp();

  return embeddedMessage;
}

export function sendDiscordMessage(productInfo: Product): void {
  const { shouldSendDiscordNotification, discordWebhookId, discordWebhookToken } = config.notification.discord;

  if (!shouldSendDiscordNotification) {
    return;
  }

  logger.debug("↗ sending discord message");

  try {
    client = new WebhookClient(discordWebhookId, discordWebhookToken);

    if (!client.id) {
      throw new Error("Discord WebhookClient connection not initiated - client missing ID");
    }

    const embeddedMessage = createEmbeddedMessage(productInfo);
    client.send(
      `@here ${productInfo.itemName} is in stock ‼️`,
      {
        embeds: [embeddedMessage]
      }
    );
    logger.info("  ✔ discord message sent");

  }
  catch (err) {
    logger.error("  ✖ couldn't send discord message", err);
  }

  // Attempt to destroy, only if webhook connection exists
  if (client.id) {
    client.destroy();
  }
}
