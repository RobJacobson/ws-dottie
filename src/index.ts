// WSDOT API Client Library

// API exports
export * from "./api/wsf";
// React integration
export * from "./react";
export type { WsdotClient } from "./shared/fetching/client";
// Core client
export { createWsdotClient } from "./shared/fetching/client";
export * from "./shared/fetching/config";
// Legacy exports for backward compatibility
export * from "./shared/fetching/dateUtils";
export * from "./shared/fetching/fetch";
export * from "./shared/fetching/fetchInternal";
export * from "./shared/fetching/utils";
