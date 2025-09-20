import { defineEndpoint } from "@/shared/endpoints";
import { getTrafficFlowsMeta } from "./getTrafficFlow";
import { getTrafficFlowByIdMeta } from "./getTrafficFlowById";

export const getTrafficFlow = defineEndpoint(getTrafficFlowsMeta);
export const getTrafficFlowById = defineEndpoint(getTrafficFlowByIdMeta);

// Re-export input types from client files
export type { TrafficFlowsInput } from "./getTrafficFlow";
export type { TrafficFlowByIdInput } from "./getTrafficFlowById";
