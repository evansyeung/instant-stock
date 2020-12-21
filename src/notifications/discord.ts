import { Product } from "./../models/product.model";
import { WebhookClient, MessageEmbed } from "discord.js";
import { logger } from "../utils/logger";


// TODO: Convert to env var configs
const webHookId = "";
const webHookToken = "";

let client: WebhookClient;

function createEmbeddedMessage(productInfo: Product): MessageEmbed {
  const embeddedMessage = new MessageEmbed()
    .setTitle("🚨 🚨 🚨  Stock Notification 🚨 🚨 🚨")
    .setDescription(productInfo.itemName)
    .setColor("#0099ff")
    .addFields([
      {
        name: "Product URL",
        value: productInfo.itemUrl,
        inline: true
      },
      {
        name: "Product Add to Cart URL",
        value: productInfo.cartUrl,
        inline: true
      }
    ])
    .setTimestamp();

  return embeddedMessage;
}

export function sendDiscordMessage(productInfo: Product): void {
  logger.debug("↗ sending discord message");

  try {
    client = new WebhookClient(webHookId, webHookToken);

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
    logger.info("✔ discord message sent");

  }
  catch (err) {
    logger.error("✖ couldn't send discord message", err);
  }

  // Attempt to destroy, only if webhook connection exists
  if (client.id) {
    client.destroy();
  }
}
