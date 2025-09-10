import { z } from "zod";
import { fareLineItemBasicSchema } from "@/schemas/wsf-fares";
import { defineEndpoint } from "@/shared/endpoints";
import { getSampleDates } from "@/shared/utils/dateUtils";

/** Params schema for getFareLineItemsBasic */
export const getFareLineItemsBasicParamsSchema = z.object({
  tripDate: z.date(),
  departingTerminalId: z.number().int().positive(),
  arrivingTerminalId: z.number().int().positive(),
  roundTrip: z.boolean(),
});

/** GetFareLineItemsBasic params type */
export type GetFareLineItemsBasicParams = z.infer<
  typeof getFareLineItemsBasicParamsSchema
>;

/** Endpoint definition for getFareLineItemsBasic */
export const getFareLineItemsBasicDef = defineEndpoint({
  moduleGroup: "wsf-fares",
  functionName: "getFareLineItemsBasic",
  endpoint:
    "/ferries/api/fares/rest/farelineitemsbasic/{tripDate}/{departingTerminalId}/{arrivingTerminalId}/{roundTrip}",
  inputSchema: getFareLineItemsBasicParamsSchema,
  outputSchema: z.array(fareLineItemBasicSchema),
  sampleParams: {
    tripDate: getSampleDates().tomorrow,
    departingTerminalId: 1,
    arrivingTerminalId: 10,
    roundTrip: false,
  },
  cacheStrategy: "DAILY_STATIC",
});
