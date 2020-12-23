"use strict";

import playerLib, { PlaySound } from "play-sound";
import fs from "fs";
import { logger } from "../utils/logger";
import { config } from "../config";


const player: PlaySound = playerLib();

export function playNotificationSound(): void {
  const { shouldPlayNotificationSound, soundFilePath } = config.notification.sound;

  if (!shouldPlayNotificationSound) return;

  logger.debug("↗ playing sound");

  // filesystem (fs) used to check user permissions to access file
  fs.access(
    soundFilePath,
    fs.constants.F_OK,  // default
    (err) => {
      if (err) {
        logger.error("✖ error opening sound file: ${error.message}");
      }

      player.play(soundFilePath, (error: Error) => {
        if (error) {
          logger.error("✖ couldn't play sound", error);
        }

        logger.info("✔ played notification sound");
      });
    }
  );
}
