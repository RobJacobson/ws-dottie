// Fetch strategies for different platforms

// Constants for JSONP request configuration
const JSONP_TIMEOUT_MS = 30_000; // 30 seconds

// JSONP callback types for web CORS workaround
type JSONPCallback = (data: unknown) => void;
type JSONPWindow = Window & Record<string, JSONPCallback | undefined>;

/**
 * Strong type for isomorphic fetch functions
 * Both JSONP and native fetch return the raw response string for processing by parseWsdotJson
 */
export type FetchStrategy = (url: string) => Promise<string>;

/**
 * Web JSONP fetch (bypasses CORS restrictions) - returns raw response string
 */
export const fetchJsonp: FetchStrategy = (url: string): Promise<string> => {
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

      // Return the raw JSON string for processing by parseWsdotJson
      resolve(JSON.stringify(data));
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
 * Native fetch for mobile platforms - returns raw response string
 */
export const fetchNative: FetchStrategy = async (
  url: string
): Promise<string> => {
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

  // Return the raw JSON string for processing by parseWsdotJson
  return JSON.stringify(data);
};

// Generate unique JSONP callback name to avoid conflicts
const generateCallbackName = () =>
  `jsonp_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
