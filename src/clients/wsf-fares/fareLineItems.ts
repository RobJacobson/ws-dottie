import { z } from "zod";
import { fareLineItemSchema } from "@/schemas/wsf-fares";
import { defineEndpoint } from "@/shared/endpoints";
import { getSampleDates } from "@/shared/utils/dateUtils";

/** Params schema for getFareLineItems */
export const getFareLineItemsParamsSchema = z.object({
  tripDate: z.date(),
  departingTerminalId: z.number().int().positive(),
  arrivingTerminalId: z.number().int().positive(),
  roundTrip: z.boolean(),
});

/** GetFareLineItems params type */
export type GetFareLineItemsParams = z.infer<
  typeof getFareLineItemsParamsSchema
>;

/** Endpoint definition for getFareLineItems */
export const getFareLineItemsDef = defineEndpoint({
  moduleGroup: "wsf-fares",
  functionName: "getFareLineItems",
  endpoint:
    "/ferries/api/fares/rest/farelineitems/{tripDate}/{departingTerminalId}/{arrivingTerminalId}/{roundTrip}",
  inputSchema: getFareLineItemsParamsSchema,
  outputSchema: z.array(fareLineItemSchema),
  sampleParams: {
    tripDate: getSampleDates().tomorrow,
    departingTerminalId: 1,
    arrivingTerminalId: 10,
    roundTrip: false,
  },
  cacheStrategy: "DAILY_STATIC",
});
