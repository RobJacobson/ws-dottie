import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import type { CacheFlushDateInput } from "./cacheFlushDate.input";
import { cacheFlushDateInputSchema } from "./cacheFlushDate.input";
import type { FaresCacheFlushDate } from "./cacheFlushDate.output";
import { cacheFlushDateSchema } from "./cacheFlushDate.output";

const RESOURCE_DESCRIPTION =
  "Each CacheFlushDate item represents the timestamp when Washington State Ferries fare data was last updated in the system. This information helps applications determine when to refresh cached fare information.";

const BUSINESS_CONTEXT =
  "Use to synchronize fare data caching by providing the last update timestamp for efficient data management and ensuring fare accuracy across applications.";

const ENDPOINT_DESCRIPTION =
  "Returns a single CacheFlushDate for the WSF fares system.";

export const cacheFlushDateGroup = {
  name: "cache-flush-date",
  documentation: {
    resourceDescription: RESOURCE_DESCRIPTION,
    businessContext: BUSINESS_CONTEXT,
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
      description: ENDPOINT_DESCRIPTION,
    } satisfies EndpointDefinition<CacheFlushDateInput, FaresCacheFlushDate>,
  },
} satisfies EndpointGroup;
