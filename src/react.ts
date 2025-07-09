// React-specific exports for the WSDOT API client
// This file re-exports the types and hooks that are used by React applications

// Types
export type { VesselLocation, VesselVerbose } from "@/api/wsf/vessels/types";
export type { TerminalBasics, TerminalVerbose } from "@/api/wsf/terminals/types";

// Hooks - we'll need to create these or import from the working app
// For now, this is a placeholder 