// JSONP (JSON with Padding) fetch strategy for web browsers
//
// This module implements JSONP to bypass CORS restrictions when calling WSDOT/WSF APIs
// from web browsers. JSONP is a legacy technique that exploits browser security
// loopholes to make cross-origin requests.
//
// =============================================================================
// JSONP EXPLANATION - Why This Obscure Technique is Necessary
// =============================================================================
//
// JSONP (JSON with Padding) is a legacy technique that allows cross-origin requests
// in browsers when the target server doesn't support CORS (Cross-Origin Resource Sharing).
// WSDOT and WSF APIs run on outdated servers that don't implement CORS headers,
// making direct fetch() requests impossible from web browsers.
//
// HOW JSONP WORKS (Step-by-Step):
//
// 1. CORS PROBLEM:
//    - Modern browsers block cross-origin fetch() requests unless the server
//      sends specific CORS headers (Access-Control-Allow-Origin, etc.)
//    - WSDOT servers don't send these headers, so fetch() fails with CORS errors
//
// 2. SCRIPT TAG LOOPHOLE:
//    - Browsers allow <script> tags to load resources from any domain
//    - This is a security vulnerability that JSONP exploits for legitimate use
//    - Script tags are not subject to CORS restrictions
//    - WSDOT encourages JSONP as a workaround
//
// 3. JSONP PROCESS:
//    a) Generate a unique callback function name (e.g., "jsonp_1234567890_abc123")
//    b) Create a <script> element with src="https://api.wsdot.wa.gov/endpoint?callback=jsonp_1234567890_abc123"
//    c) Inject the script tag into the document head
//    d) The server responds with: jsonp_1234567890_abc123({"data": "value"})
//    e) Browser executes this as JavaScript, calling our callback function
//    f) Our callback receives the data and resolves the Promise
//    g) Clean up by removing the script tag and callback function
//
// 4. WHY WSDOT NEEDS JSONP:
//    - WSDOT APIs are built on legacy .NET technology (likely .NET Framework)
//    - These servers don't implement modern CORS standards
//    - JSONP was the standard workaround before CORS became widespread
//    - WSDOT explicitly supports JSONP by accepting a "callback" parameter
//
// 5. LIMITATIONS OF JSONP:
//    - Only works with GET requests (no POST, PUT, DELETE)
//    - No access to HTTP status codes or headers
//    - Requires server-side JSONP support (WSDOT has this)
//    - More complex error handling than fetch()
//    - Potential security risks if not implemented carefully
//
// 6. ALTERNATIVES CONSIDERED:
//    - Proxy server: Would require maintaining our own server
//    - Browser extensions: Not practical for web applications
//    - Server-side rendering: Would limit client-side interactivity
//    - CORS proxy services: Unreliable and potentially insecure
//
// JSONP is the most practical solution for WSDOT APIs until they modernize
// their infrastructure to support CORS.

import type { FetchStrategy, JSONPWindow } from "./types";
import { processApiResponse } from "./utils";

// Constants for JSONP request configuration
const JSONP_TIMEOUT_MS = 30_000; // 30 seconds

/**
 * Generates a unique JSONP callback name to avoid conflicts
 *
 * Uses timestamp and random string to ensure uniqueness across
 * concurrent requests and page reloads.
 */
const generateCallbackName = (): string =>
  `jsonp_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

/**
 * Web JSONP fetch strategy (bypasses CORS restrictions)
 *
 * Uses script tag injection to make cross-origin requests that would otherwise
 * be blocked by CORS policy. The WSDOT and WSF APIs support JSONP callbacks.
 *
 * STEP-BY-STEP JSONP PROCESS:
 * 1. Generate unique callback name to avoid conflicts
 * 2. Create <script> element with API URL + callback parameter
 * 3. Define callback function on window object
 * 4. Inject script tag into document head
 * 5. Server responds with: callbackName(data)
 * 6. Browser executes response, calling our callback
 * 7. Callback processes data and resolves Promise
 * 8. Clean up script tag and callback function
 *
 * @param url - The API endpoint URL
 * @returns Promise resolving to raw JSON string
 * @throws Error for timeouts, script load failures, or API errors
 */
export const fetchJsonp: FetchStrategy = (url: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Step 1: Generate unique callback name to avoid conflicts
    const callbackName = generateCallbackName();
    const script = document.createElement("script");
    const jsonpWindow = window as unknown as JSONPWindow;

    // Cleanup function to remove script tag and callback
    const cleanup = () => {
      if (script.parentNode) document.head.removeChild(script);
      if (jsonpWindow[callbackName]) delete jsonpWindow[callbackName];
    };

    // Cleanup with timeout clearing
    const cleanupWithTimeout = () => {
      clearTimeout(timeoutId);
      cleanup();
    };

    // Step 2: Set up timeout to prevent hanging requests
    const timeoutId = setTimeout(() => {
      cleanup();
      reject(new Error("JSONP request timeout"));
    }, JSONP_TIMEOUT_MS);

    // Step 3: Define callback function that server will call
    jsonpWindow[callbackName] = (data: unknown) => {
      cleanupWithTimeout();

      try {
        const result = processApiResponse(data);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    };

    // Step 4: Handle script loading errors
    script.onerror = () => {
      cleanupWithTimeout();
      reject(new Error("JSONP script load failed"));
    };

    // Step 5: Build callback URL and inject script tag
    // Server will respond with: callbackName({"data": "value"})
    script.src = `${url}${url.includes("?") ? "&" : "?"}callback=${callbackName}`;
    document.head.appendChild(script);
  });
};
