/**
 * @fileoverview Fetch Strategies for WS-Dottie
 *
 * This module provides different fetch strategies for different runtime
 * environments. It includes JSONP for browser environments (to handle CORS)
 * and native fetch for server environments, with automatic strategy selection
 * based on the current environment.
 */

import {
  isTestEnvironment,
  isWebEnvironment,
  shouldForceJsonp,
} from "@/shared/fetching/detectEnvironment";
import type { FetchStrategy } from "@/shared/types";

/**
 * Callback function type for JSONP responses
 *
 * Used to define callback functions that handle JSONP responses from
 * the WSDOT/WSF APIs in browser environments.
 */
type JSONPCallback = (data: unknown) => void;

/**
 * Extended Window interface for JSONP support
 *
 * Extends the standard Window interface to include dynamic callback
 * functions for JSONP requests.
 */
type JSONPWindow = Window & Record<string, JSONPCallback | undefined>;

/**
 * Selects the appropriate fetch strategy based on environment
 *
 * This function automatically selects the best fetch strategy based on
 * the current runtime environment:
 * - Test environments: Native fetch (simpler for testing)
 * - Web browsers: JSONP (bypasses CORS restrictions)
 * - Server environments: Native fetch
 * - Override: FORCE_JSONP=true for JSONP testing
 *
 * @returns The appropriate fetch strategy function
 */
export const selectFetchStrategy = (): FetchStrategy => {
  if (shouldForceJsonp()) {
    return fetchJsonp;
  }

  if (isTestEnvironment()) {
    return fetchNative;
  }

  return isWebEnvironment() ? fetchJsonp : fetchNative;
};

/**
 * JSONP fetch strategy for browser environments
 *
 * This strategy handles CORS restrictions by using JSONP callbacks instead
 * of direct HTTP requests. It creates a script tag with a callback parameter
 * and handles the response through a global callback function.
 *
 * @param url - The URL to fetch data from
 * @returns Promise resolving to the response data as a JSON string
 */
export const fetchJsonp = async (url: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    const callbackName = `jsonp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Add callback to window
    (window as unknown as JSONPWindow)[callbackName] = (data: unknown) => {
      document.head.removeChild(script);
      delete (window as unknown as JSONPWindow)[callbackName];
      resolve(JSON.stringify(data));
    };

    script.onerror = () => {
      document.head.removeChild(script);
      delete (window as unknown as JSONPWindow)[callbackName];
      reject(new Error("JSONP request failed"));
    };

    script.src = `${url}${url.includes("?") ? "&" : "?"}callback=${callbackName}`;
    document.head.appendChild(script);
  });
};

/**
 * Native fetch strategy for server environments
 *
 * This strategy uses the standard fetch API available in Node.js and
 * modern browsers. It performs standard HTTP requests and handles
 * response status codes appropriately.
 *
 * @param url - The URL to fetch data from
 * @returns Promise resolving to the response data as a string
 * @throws Error if the response is not ok (status >= 400)
 */
export const fetchNative = async (url: string): Promise<string> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  return response.text();
};
