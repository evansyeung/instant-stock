import winston from "winston";
import chalk from "chalk";

const logFormat = winston.format.printf((info) => {
  const timestamp = new Date().toLocaleTimeString();

  let out = `${chalk.blue(`[${timestamp}]`)} ${info.level} ${chalk.blue("::")} ${info.message}`;

  if (Object.keys(info.metadata).length > 0) {
    out = `${out} ${chalk.magenta(JSON.stringify(info.metadata, null, 2))}`;
  }

  return out;
});

export const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.metadata({
      fillExcept: ["level", "message", "timestamp"]
    }),
    logFormat
  ),
  transports: [new winston.transports.Console({})]
});
