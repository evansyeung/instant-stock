import playerLib, { PlaySound } from "play-sound";
import fs from "fs";
import { logger } from "../utils/logger";

const player: PlaySound = playerLib();

// TODO: use a config file instead
export function playNotificationSound(): void {
  logger.debug("↗ playing sound");

  // filesystem to check user permissions to access file
  fs.access(
    "/Users/evansyeung/src/instant-stock/src/assets/alert-1.mp3",
    fs.constants.F_OK,  // default
    (err) => {
      if (err) {
        logger.error("✖ error opening sound file: ${error.message}");
      }

      player.play("/Users/evansyeung/src/instant-stock/src/assets/alert-1.mp3", (error: Error) => {
        if (error) {
          logger.error("✖ couldn't play sound", error);
        }

        logger.info("✔ played notification sound");
      });
    }
  );
}
