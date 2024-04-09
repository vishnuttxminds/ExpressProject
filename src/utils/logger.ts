import { createLogger, transports, format } from "winston";

export const logger = createLogger({
  level: "info",
  format: format.combine(format.simple()),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "combined.log" }),
  ],
});