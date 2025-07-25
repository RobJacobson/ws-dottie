/**
 * Strong type for isomorphic fetch functions
 * Both JSONP and native fetch return raw JSON strings for processing by parseWsdotJson
 */
export type FetchStrategy = (
  url: string,
  expectedType?: "array" | "object"
) => Promise<string>;

/**
 * JSONP callback types for web CORS workaround
 */
export type JSONPCallback = (data: unknown) => void;
export type JSONPWindow = Window & Record<string, JSONPCallback | undefined>;

/**
 * Error response type from WSDOT/WSF APIs
 */
export type ApiErrorResponse = { Message: string };
