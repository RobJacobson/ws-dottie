export * from "./getBridgeClearances";
export * from "./getBridgeClearancesByRoute";

// Re-export output types from schemas
export type {
  BridgeClearance,
  BridgeClearances,
} from "@/schemas/wsdot-bridge-clearances";
