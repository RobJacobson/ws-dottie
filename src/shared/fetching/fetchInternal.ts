// Internal fetch function for WSF API

import log from "@/lib/logger";

import type { LoggingMode } from "./config";
import { type JsonValue, transformWsfData } from "./utils";

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
 * Internal fetch function with platform-specific implementation and WSF data transformation
 */
export const fetchInternal = async <T>(
  url: string,
  endpoint: string,
  logMode?: LoggingMode
): Promise<T | null> => {
  try {
    let response: JsonValue;

    // Use environment-specific fetch method
    if (isNodeEnvironment()) {
      // Use native fetch in Node.js environment (for testing)
      response = (await fetchNative(url)) as JsonValue;
    } else if (isWebEnvironment()) {
      // Use JSONP on web to avoid CORS issues
      response = (await fetchJsonp(url)) as JsonValue;
    } else {
      // Use native fetch on mobile platforms (React Native)
      response = (await fetchNative(url)) as JsonValue;
    }

    // Apply WSF data transformation recursively
    const transformedResponse = transformWsfData(response) as T;

    if (logMode === "debug") {
      log.debug(`[WSF ${endpoint}] Response transformed:`, transformedResponse);
    }

    return transformedResponse;
  } catch (error) {
    if (logMode === "debug" || logMode === "info") {
      log.error(`[WSF ${endpoint}] Fetch failed:`, error);
    }
    return null;
  }
};

// Helper functions

// Generate unique JSONP callback name to avoid conflicts
const generateCallbackName = () =>
  `jsonp_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

/**
 * Web JSONP fetch (bypasses CORS restrictions) - returns parsed data directly
 */
const fetchJsonp = (url: string): Promise<unknown> => {
  log.debug("fetchJsonp", url);
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

/**
 * Native fetch for mobile platforms - returns parsed data directly
 */
const fetchNative = async (url: string): Promise<unknown> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  return response.json();
};
