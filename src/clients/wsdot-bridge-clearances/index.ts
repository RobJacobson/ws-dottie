import { getBridgeClearancesMeta } from "./getBridgeClearances";
import { getBridgeClearancesByRouteMeta } from "./getBridgeClearancesByRoute";
import { defineEndpoint } from "@/shared/endpoints";

export const getBridgeClearances = defineEndpoint(getBridgeClearancesMeta);
export const getBridgeClearancesByRoute = defineEndpoint(
  getBridgeClearancesByRouteMeta
);

// Re-export input types from client files
export type { BridgeClearancesInput } from "./getBridgeClearances";
export type { BridgeClearancesByRouteInput } from "./getBridgeClearancesByRoute";
