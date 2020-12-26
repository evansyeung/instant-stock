"use strict";
import { Store } from "./../models/store.model";
import { Product } from "./../models/product.model";
import { playNotificationSound } from "./sound";
import { sendDiscordMessage } from "./discord";

export async function sendNotification(storeInfo: Store, productInfo: Product): Promise<void> {
  await Promise.all([
    playNotificationSound(),
    sendDiscordMessage(storeInfo, productInfo),
  ]);
}
