import type { EndpointDefinition } from "@/apis/types";
import * as i from "./cacheFlushDate.input";
import * as o from "./cacheFlushDate.output";

const DESCRIPTION =
  "Returns the date and time when the WSF vessel data was last updated. This operation helps applications coordinate caching of vessel data that changes infrequently. When the returned date changes, applications should refresh their cached data. Data updates infrequently.";

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
      i.VesselsCacheFlushDateInput,
      o.VesselsCacheFlushDate
    >,
  },
};
