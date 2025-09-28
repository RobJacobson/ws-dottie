import { z } from "zod";

import {
  type FareLineItemBasic,
  fareLineItemBasicSchema,
} from "@/schemas/wsf-fares/fareLineItemBasic.zod";
import type { EndpointDefinition } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Input schema for getFareLineItemsBasic */
const fareLineItemsBasicInput = z.object({
  tripDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  departingTerminalId: z.number().int().positive(),
  arrivingTerminalId: z.number().int().positive(),
  roundTrip: z.boolean(),
});

/** Endpoint metadata for getFareLineItemsBasic */
export const getFareLineItemsBasicMeta: EndpointDefinition<
  FareLineItemsBasicInput,
  FareLineItemBasic[]
> = {
  api: "wsf-fares",
  function: "fareLineItemsBasic",
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
  cacheStrategy: "STATIC",
};

// Type exports
export type FareLineItemsBasicInput = z.infer<typeof fareLineItemsBasicInput>;
