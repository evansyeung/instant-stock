"use strict";
import { Store } from "./../models/store.model";
import { Product } from "./../models/product.model";
import { WebhookClient, MessageEmbed } from "discord.js";
import { logger } from "../utils/logger";
import { config } from "../config";


let client: WebhookClient;

function createEmbeddedMessage(storeInfo: Store, productInfo: Product): MessageEmbed {
  const embeddedMessage = new MessageEmbed()
    .setTitle("🚨  Stock Notification  🚨")
    .setDescription(`**${storeInfo.name}**\n${productInfo.name}`)
    .setColor("#7fffd4")
    .addFields([
      {
        name: "PRODUCT LINK",
        value: productInfo.url,
        inline: true
      },
      {
        name: "ATC LINK",
        value: productInfo.atcUrl,
        inline: true
      }
    ])
    .setTimestamp();

  return embeddedMessage;
}

export function sendDiscordMessage(storeInfo: Store, productInfo: Product): void {
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

    const embeddedMessage = createEmbeddedMessage(storeInfo, productInfo);
    client.send(
      `@here **${storeInfo.name}**: ${productInfo.name} is in stock ‼️`,
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
