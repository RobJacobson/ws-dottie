import { getBorderCrossingsMeta } from "./getBorderCrossings";
import { defineEndpoint } from "@/shared/endpoints";

export const getBorderCrossings = defineEndpoint(getBorderCrossingsMeta);

// Re-export input types from client files
export type { BorderCrossingsInput } from "./getBorderCrossings";
