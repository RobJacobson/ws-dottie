import { defineEndpoint } from "@/shared/endpoints";
import { getBorderCrossingsMeta } from "./getBorderCrossings";

export const getBorderCrossings = defineEndpoint(getBorderCrossingsMeta);

// Re-export output types from schemas
export type {
  BorderCrossing,
  BorderCrossings,
} from "@/schemas/wsdot-border-crossings";
// Re-export input types from client files
export type { BorderCrossingsInput } from "./getBorderCrossings";
