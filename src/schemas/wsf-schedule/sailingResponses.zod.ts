import { z } from "zod";
import { sailingResponseSchema } from "./sailingResponse.zod";

/**
 * Array of sailing responses.
 */
export const sailingResponsesSchema = z
  .array(sailingResponseSchema)
  .describe("Sailings for a particular scheduled route.");

export type SailingResponses = z.infer<typeof sailingResponsesSchema>;
