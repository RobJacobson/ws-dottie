import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import type { TerminalsCacheFlushDateInput } from "./cacheFlushDate.input";
import { cacheFlushDateInputSchema } from "./cacheFlushDate.input";
import type { TerminalsCacheFlushDate } from "./cacheFlushDate.output";
import { cacheFlushDateSchema } from "./cacheFlushDate.output";

const DESCRIPTION =
  "Returns the date and time when the WSF terminals data was last updated. This operation helps applications coordinate caching of terminals data that changes infrequently. When the returned date changes, applications should refresh their cached data.";

export const cacheFlushDateResource = {
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
      inputSchema: cacheFlushDateInputSchema,
      outputSchema: cacheFlushDateSchema,
      sampleParams: {},
      cacheStrategy: "STATIC",
      description: DESCRIPTION,
    } satisfies EndpointDefinition<
      TerminalsCacheFlushDateInput,
      TerminalsCacheFlushDate
    >,
  },
} satisfies EndpointGroup;
