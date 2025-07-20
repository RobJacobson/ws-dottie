// Internal fetch function for WSF API

import log from "@/lib/logger";

import type { LoggingMode } from "./config";
import { createApiError, type WsdotApiError } from "./errors";
import { type JsonValue, transformWsdotData } from "./utils";

// Constants for JSONP request configuration
const JSONP_TIMEOUT_MS = 30_000; // 30 seconds

// JSONP callback types for web CORS workaround
type JSONPCallback = (data: unknown) => void;
type JSONPWindow = Window & Record<string, JSONPCallback | undefined>;

/**
 * Detect if we're in a Node.js environment
 */
const isNodeEnvironment = () => {
  return (
    typeof process !== "undefined" && process.versions && process.versions.node
  );
};

/**
 * Detect if we're in a web browser environment
 */
const isWebEnvironment = () => {
  return typeof window !== "undefined" && typeof document !== "undefined";
};

/**
 * Detect if we're in a test environment (Happy DOM, jsdom, etc.)
 */
const isTestEnvironment = () => {
  return (
    (typeof process !== "undefined" && process.env.NODE_ENV === "test") ||
    (typeof process !== "undefined" &&
      process.env.VITEST_WORKER_ID !== undefined) ||
    (typeof window !== "undefined" &&
      window.navigator?.userAgent?.includes("jsdom")) ||
    (typeof window !== "undefined" &&
      window.navigator?.userAgent?.includes("happy-dom"))
  );
};

/**
 * Internal fetch function with platform-specific implementation and WSF data transformation
 *
 * - Uses native fetch for test environments (Happy DOM, jsdom) to avoid JSONP issues
 * - Uses JSONP for real web browsers to bypass CORS restrictions
 * - Uses native fetch for all other environments (Node.js, Bun, React Native, etc.)
 * - All errors (including from JSONP) are always wrapped as WsdotApiError for consistent error handling
 */
export const fetchInternal = async <T>(
  url: string,
  endpoint: string,
  logMode?: LoggingMode
): Promise<T> => {
  try {
    let response: JsonValue;

    // Use native fetch for test environments to avoid JSONP issues
    if (isTestEnvironment()) {
      try {
        response = (await fetchNative(url)) as JsonValue;
      } catch (err) {
        // Always wrap as WsdotApiError for consistent error handling
        throw createApiError(err, endpoint, url);
      }
    } else if (isWebEnvironment()) {
      // Use JSONP for real web browsers to bypass CORS
      try {
        response = (await fetchJsonp(url)) as JsonValue;
      } catch (err) {
        // Always wrap as WsdotApiError for consistent error handling
        throw createApiError(err, endpoint, url);
      }
    } else {
      // Fallback: use native fetch for Node.js, Bun, React Native, etc.
      try {
        response = (await fetchNative(url)) as JsonValue;
      } catch (err) {
        // Always wrap as WsdotApiError for consistent error handling
        throw createApiError(err, endpoint, url);
      }
    }

    // Apply WSF data transformation recursively
    const transformedResponse = transformWsdotData(response) as T;

    if (logMode === "debug") {
      log.debug(`[WSF ${endpoint}] Response transformed:`, transformedResponse);
    }

    return transformedResponse;
  } catch (error) {
    if (logMode === "debug" || logMode === "info") {
      log.error(`[WSF ${endpoint}] Fetch failed:`, error);
    }

    // Always wrap as WsdApiError for consistent error handling
    throw createApiError(error, endpoint, url);
  }
};

// Helper functions

/**
 * Web JSONP fetch (bypasses CORS restrictions) - returns parsed data directly
 */
const fetchJsonp = (url: string): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    const callbackName = generateCallbackName();
    const script = document.createElement("script");
    const jsonpWindow = window as unknown as JSONPWindow;

    // Cleanup DOM and callback references
    const cleanup = () => {
      if (script.parentNode) document.head.removeChild(script);
      if (jsonpWindow[callbackName]) delete jsonpWindow[callbackName];
    };

    // Cleanup with timeout clearing
    const cleanupWithTimeout = () => {
      clearTimeout(timeoutId);
      cleanup();
    };

    // Prevent hanging requests
    const timeoutId = setTimeout(() => {
      cleanup();
      reject(new Error("JSONP request timeout"));
    }, JSONP_TIMEOUT_MS);

    // Success callback - WSF API calls this with data
    jsonpWindow[callbackName] = (data: unknown) => {
      cleanupWithTimeout();

      // Check if the response contains an error message
      if (data && typeof data === "object" && "Message" in data) {
        const errorData = data as { Message: string };
        const message = errorData.Message.toLowerCase();
        if (
          message.includes("failed") ||
          message.includes("invalid") ||
          message.includes("not valid") ||
          message.includes("cannot be used") ||
          message.includes("error")
        ) {
          reject(new Error(errorData.Message));
          return;
        }
      }

      resolve(data);
    };

    // Handle script loading errors
    script.onerror = () => {
      cleanupWithTimeout();
      reject(new Error("JSONP script load failed"));
    };

    // Build callback URL and inject script
    script.src = `${url}${url.includes("?") ? "&" : "?"}callback=${callbackName}`;
    document.head.appendChild(script);
  });
};

// Generate unique JSONP callback name to avoid conflicts
const generateCallbackName = () =>
  `jsonp_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

/**
 * Native fetch for mobile platforms - returns parsed data directly
 */
const fetchNative = async (url: string): Promise<unknown> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  const data = await response.json();

  // Check if the response contains an error message (same logic as JSONP)
  if (data && typeof data === "object" && "Message" in data) {
    const errorData = data as { Message: string };
    const message = errorData.Message.toLowerCase();
    if (
      message.includes("failed") ||
      message.includes("invalid") ||
      message.includes("not valid") ||
      message.includes("cannot be used") ||
      message.includes("error")
    ) {
      throw new Error(errorData.Message);
    }
  }

  return data;
};
