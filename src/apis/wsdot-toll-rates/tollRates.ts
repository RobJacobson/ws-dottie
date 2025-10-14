import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

const DESCRIPTION =
  "TollRate information provides current toll rates for high occupancy lanes across statewide coverage areas. Each rate includes trip details, current toll amounts in cents, location information, and last update timestamps.";

export const tollRatesResource = {
  name: "toll-rates",
  description: DESCRIPTION,
  cacheStrategy: "FREQUENT" as const,
  endpoints: {
    all: {
      function: "getTollRates",
      endpoint: "/getTollRatesAsJson",
      inputSchema: i.getTollRatesSchema,
      outputSchema: z.array(o.tollRateSchema),
      sampleParams: {},
      cacheStrategy: "FREQUENT",
      description: `Returns current toll rate information for all toll trips. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<i.GetTollRatesInput, o.TollRate[]>,
  },
};
