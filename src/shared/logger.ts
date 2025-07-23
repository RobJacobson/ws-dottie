// Simple logger for the WSDOT API client library

const isDevelopment =
  typeof process !== "undefined" && process.env.NODE_ENV === "development";

const log = {
  debug: isDevelopment
    ? console.debug.bind(console, "[WS-Dottie Debug]")
    : () => {},
  info: console.info.bind(console, "[WS-Dottie Info]"),
  warn: console.warn.bind(console, "[WS-Dottie Warn]"),
  error: console.error.bind(console, "[WS-Dottie Error]"),
};

export default log;
