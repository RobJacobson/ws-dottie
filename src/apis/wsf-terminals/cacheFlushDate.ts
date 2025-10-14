import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

const DESCRIPTION =
  "Returns the date and time when the WSF terminals data was last updated. This operation helps applications coordinate caching of terminals data that changes infrequently. When the returned date changes, applications should refresh their cached data. Data updates infrequently.";

export const cacheFlushDateResource = {
  name: "cache-flush-date",
  description: DESCRIPTION,
  cacheStrategy: "STATIC" as const,
  endpoints: {
    getCacheFlushDate: {
      function: "getCacheFlushDate",
      endpoint: "/cacheflushdate",
      inputSchema: i.cacheFlushDateSchema,
      outputSchema: o.cacheFlushDateSchema,
      sampleParams: {},
      cacheStrategy: "STATIC",
      description: DESCRIPTION,
    } satisfies EndpointDefinition<
      i.TerminalsCacheFlushDateInput,
      o.TerminalsCacheFlushDate
    >,
  },
};
