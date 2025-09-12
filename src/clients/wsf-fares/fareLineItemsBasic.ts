import { z } from "zod";
import { fareLineItemBasicSchema } from "@/schemas/wsf-fares";
import { defineEndpoint } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Params schema for getFareLineItemsBasic */
const getFareLineItemsBasicParamsSchema = z.object({
  tripDate: z.date(),
  departingTerminalId: z.number().int().positive(),
  arrivingTerminalId: z.number().int().positive(),
  roundTrip: z.boolean(),
});

/** GetFareLineItemsBasic params type */

/** Endpoint definition for getFareLineItemsBasic */
export const getFareLineItemsBasicDef = defineEndpoint({
  api: "wsf-fares",
  function: "getFareLineItemsBasic",
  endpoint:
    "/ferries/api/fares/rest/farelineitemsbasic/{tripDate}/{departingTerminalId}/{arrivingTerminalId}/{roundTrip}",
  inputSchema: getFareLineItemsBasicParamsSchema,
  outputSchema: z.array(fareLineItemBasicSchema),
  sampleParams: {
    tripDate: datesHelper.tomorrow(),
    departingTerminalId: 1,
    arrivingTerminalId: 10,
    roundTrip: false,
  },
  cacheStrategy: "DAILY_STATIC",
});
