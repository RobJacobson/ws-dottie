import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import * as i from "./cacheFlushDate.input";
import * as o from "./cacheFlushDate.output";

const DESCRIPTION =
  "Returns the date and time when the WSF terminals data was last updated. This operation helps applications coordinate caching of terminals data that changes infrequently. When the returned date changes, applications should refresh their cached data.";

export const cacheFlushDateResource: EndpointGroup = {
  name: "cache-flush-date",
  documentation: {
    resourceDescription: DESCRIPTION,
    businessContext: "",
  },
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
