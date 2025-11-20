/**
 * @fileoverview Fetch Handler Implementations
 *
 * This module provides the fetch handler implementations for native fetch
 * and JSONP requests. These are pure handler functions that handle the
 * low-level details of making HTTP requests.
 */

import type { FetchHandler } from "@/shared/types";

/**
 * Callback function type for JSONP responses
 */
type JSONPCallback = (data: unknown) => void;

/**
 * Extended Window interface for JSONP support
 */
type JSONPWindow = Window & Record<string, JSONPCallback | undefined>;

/**
 * Native fetch handler implementation
 *
 * Uses the standard fetch API available in Node.js and modern browsers.
 * Performs standard HTTP requests and handles response status codes appropriately.
 *
 * @param url - The URL to fetch data from
 * @returns Promise resolving to the response data as a string
 * @throws Error with HTTP status code if the response is not ok (status >= 400)
 */
export const handleFetchNative: FetchHandler = async (
  url: string
): Promise<string> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  return response.text();
};

/**
 * JSONP fetch handler implementation
 *
 * Handles CORS restrictions by using JSONP callbacks instead of direct
 * HTTP requests. Creates a script tag with a callback parameter and
 * handles the response through a global callback function. Automatically
 * cleans up script tags and callbacks after completion or timeout.
 *
 * @param url - The URL to fetch data from
 * @returns Promise resolving to the response data as a JSON string
 * @throws Error if the JSONP request fails, times out (30 seconds), or DOM is unavailable
 */
export const handleFetchJsonp: FetchHandler = async (
  url: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    // DOM availability check with optional chaining
    if (!document?.head) {
      reject(new Error("DOM environment not available"));
      return;
    }

    const script = document.createElement("script");
    const callbackName = `jsonp_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
    let cleanupDone = false;

    // Centralized cleanup function to prevent duplicate operations
    const cleanup = () => {
      if (cleanupDone) return;
      cleanupDone = true;

      try {
        // Safely remove script from DOM
        script.parentNode?.removeChild(script);
      } catch (e) {
        // Script already removed or modified - ignore
      }

      // Clean up global callback
      if ((window as unknown as JSONPWindow)[callbackName]) {
        delete (window as unknown as JSONPWindow)[callbackName];
      }
    };

    // Set up timeout mechanism (30 seconds)
    const timeoutId = setTimeout(() => {
      cleanup();
      reject(new Error("JSONP request timed out after 30 seconds"));
    }, 30000);

    // Add callback to window
    (window as unknown as JSONPWindow)[callbackName] = (data: unknown) => {
      cleanup();
      resolve(JSON.stringify(data));
    };

    script.onerror = () => {
      cleanup();
      reject(new Error("JSONP script failed to load"));
    };

    script.src = `${url}${url.includes("?") ? "&" : "?"}callback=${encodeURIComponent(callbackName)}`;
    document.head.appendChild(script);
  });
};
