import { z } from "zod";
import { fareLineItemSchema } from "@/schemas/wsf-fares";
import { defineEndpoint } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Params schema for getFareLineItems */
const getFareLineItemsParamsSchema = z.object({
  tripDate: z.date(),
  departingTerminalId: z.number().int().positive(),
  arrivingTerminalId: z.number().int().positive(),
  roundTrip: z.boolean(),
});

/** GetFareLineItems params type */

/** Endpoint definition for getFareLineItems */
export const getFareLineItemsDef = defineEndpoint({
  api: "wsf-fares",
  function: "getFareLineItems",
  endpoint:
    "/ferries/api/fares/rest/farelineitems/{tripDate}/{departingTerminalId}/{arrivingTerminalId}/{roundTrip}",
  inputSchema: getFareLineItemsParamsSchema,
  outputSchema: z.array(fareLineItemSchema),
  sampleParams: {
    tripDate: datesHelper.tomorrow(),
    departingTerminalId: 1,
    arrivingTerminalId: 10,
    roundTrip: false,
  },
  cacheStrategy: "DAILY_STATIC",
});
