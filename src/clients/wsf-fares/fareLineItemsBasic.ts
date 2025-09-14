import { z } from "zod";
import {
  type FareLineItemBasic,
  fareLineItemBasicSchema,
} from "@/schemas/wsf-fares/fareLineItemBasic.zod";
import type { EndpointMeta } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Input schema for getFareLineItemsBasic */
const fareLineItemsBasicInput = z.object({
  tripDate: z.date(),
  departingTerminalId: z.number().int().positive(),
  arrivingTerminalId: z.number().int().positive(),
  roundTrip: z.boolean(),
});

/** Endpoint metadata for getFareLineItemsBasic */
export const getFareLineItemsBasicMeta: EndpointMeta<
  FareLineItemsBasicInput,
  FareLineItemBasic[]
> = {
  id: "wsf-fares/fareLineItemsBasic",
  endpoint:
    "/ferries/api/fares/rest/farelineitemsbasic/{tripDate}/{departingTerminalId}/{arrivingTerminalId}/{roundTrip}",
  inputSchema: fareLineItemsBasicInput,
  outputSchema: z.array(fareLineItemBasicSchema),
  sampleParams: {
    tripDate: datesHelper.tomorrow(),
    departingTerminalId: 1,
    arrivingTerminalId: 10,
    roundTrip: false,
  },
  cacheStrategy: "DAILY_STATIC",
};

// Type exports
export type FareLineItemsBasicInput = z.infer<typeof fareLineItemsBasicInput>;
