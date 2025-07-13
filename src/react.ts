// React-specific exports for the WSDOT API client
// This file re-exports the types and hooks that are used by React applications

// Types
export type { VesselLocation, VesselVerbose } from "@/api/wsf/vessels/types";
export type { TerminalBasics, TerminalVerbose } from "@/api/wsf/terminals/types";

// React Query hooks
export * from "@/api/wsf/vessels/hook";
export * from "@/api/wsf/terminals/hook";
export * from "@/api/wsf/schedule/hook";
export * from "@/api/wsf/fares/hook";

// Shared caching utilities
export * from "@/shared/caching"; 