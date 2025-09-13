import { z } from "zod";
import { alertsResponseSchema } from "./alertsResponse.zod";

/**
 * Array of alerts responses.
 */
export const alertsResponsesSchema = z
  .array(alertsResponseSchema)
  .describe(
    "Alert information tailored for routes, bulletins, service disruptions, etc."
  );

export type AlertsResponses = z.infer<typeof alertsResponsesSchema>;
