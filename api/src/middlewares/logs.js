import winston from "winston";
import morgan from "morgan";

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({
      level: "info",
      filename: "info.log",
    }),
    new winston.transports.File({
      level: "error",
      filename: "error.log",
    }),
  ],
});

const morganStream = {
  write: function (message) {
    logger.info(message.trim());
  },
  writeError: function (message) {
    logger.error(message.trim());
  },
};

const morganMiddleware = morgan("combined", {
  stream: {
    write: morganStream.write,
    writeError: morganStream.writeError,
  },
});

export { logger, morganMiddleware };
