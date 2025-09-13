import { defineEndpoint } from "@/shared/endpoints";
import { getBridgeClearancesMeta } from "./getBridgeClearances";
import { getBridgeClearancesByRouteMeta } from "./getBridgeClearancesByRoute";

export const getBridgeClearances = defineEndpoint(getBridgeClearancesMeta);
export const getBridgeClearancesByRoute = defineEndpoint(
  getBridgeClearancesByRouteMeta
);

// Re-export output types from schemas
export type {
  BridgeClearance,
  BridgeClearances,
} from "@/schemas/wsdot-bridge-clearances";
// Re-export input types from client files
export type { BridgeClearancesInput } from "./getBridgeClearances";
export type { BridgeClearancesByRouteInput } from "./getBridgeClearancesByRoute";
