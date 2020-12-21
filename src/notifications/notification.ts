import { Product } from './../models/product.model';
import { playNotificationSound } from './sound'
import { sendDiscordMessage } from './discord'

export async function sendNotification(productInfo: Product) {
  await Promise.all([
    playNotificationSound(),
    sendDiscordMessage(productInfo),
  ])
}
