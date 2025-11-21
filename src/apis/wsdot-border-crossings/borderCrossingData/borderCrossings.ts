import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsdotBorderCrossingsApiMeta } from "../apiMeta";
import {
  type BorderCrossingsInput,
  borderCrossingsInputSchema,
} from "./shared/borderCrossingData.input";
import {
  type BorderCrossing,
  borderCrossingSchema,
} from "./shared/borderCrossingData.output";

/**
 * Metadata for the fetchBorderCrossings endpoint
 */
export const borderCrossingsMeta = {
  functionName: "fetchBorderCrossings",
  endpoint: "/GetBorderCrossingsAsJson",
  inputSchema: borderCrossingsInputSchema,
  outputSchema: borderCrossingSchema.array(),
  sampleParams: {},
  endpointDescription:
    "List current wait times for all Washington border crossings into Canada.",
} satisfies EndpointMeta<BorderCrossingsInput, BorderCrossing[]>;

/**
 * Factory result for border crossings
 */
const borderCrossingsFactory = createFetchAndHook<
  BorderCrossingsInput,
  BorderCrossing[]
>({
  api: wsdotBorderCrossingsApiMeta,
  endpoint: borderCrossingsMeta,
  getEndpointGroup: () =>
    require("./shared/borderCrossingData.endpoints").borderCrossingDataGroup,
});

/**
 * Fetch function and React Query hook for retrieving current wait times for all Washington border crossings into Canada
 */
export const { fetch: fetchBorderCrossings, hook: useBorderCrossings } =
  borderCrossingsFactory;
