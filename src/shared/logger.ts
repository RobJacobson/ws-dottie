// Simple logger for the WSDOT API client library

const log = {
  debug: (...args: unknown[]) => {
    if (
      typeof process !== "undefined" &&
      process.env.NODE_ENV === "development"
    ) {
      console.debug("[WSF Debug]", ...args);
    }
  },
  info: (...args: unknown[]) => {
    console.info("[WSF Info]", ...args);
  },
  warn: (...args: unknown[]) => {
    console.warn("[WSF Warn]", ...args);
  },
  error: (...args: unknown[]) => {
    console.error("[WSF Error]", ...args);
  },
};

export default log;
