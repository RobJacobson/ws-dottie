import { z } from "zod";
import { fareLineItemSchema } from "@/schemas/wsf-fares";
import { defineEndpoint } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Input schema for getFareLineItems */
const fareLineItemsInput = z.object({
  tripDate: z.date(),
  departingTerminalId: z.number().int().positive(),
  arrivingTerminalId: z.number().int().positive(),
  roundTrip: z.boolean(),
});

/** Endpoint metadata for getFareLineItems */
export const getFareLineItemsMeta = defineEndpoint({
  api: "wsf-fares",
  function: "getFareLineItems",
  endpoint:
    "/ferries/api/fares/rest/farelineitems/{tripDate}/{departingTerminalId}/{arrivingTerminalId}/{roundTrip}",
  inputSchema: fareLineItemsInput,
  outputSchema: z.array(fareLineItemSchema),
  sampleParams: {
    tripDate: datesHelper.tomorrow(),
    departingTerminalId: 1,
    arrivingTerminalId: 10,
    roundTrip: false,
  },
  cacheStrategy: "DAILY_STATIC",
});

// Type exports
export type FareLineItemsInput = z.infer<typeof fareLineItemsInput>;
