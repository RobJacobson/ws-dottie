import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsdotMountainPassConditionsApiMeta } from "../apiMeta";
import {
  type MountainPassConditionByIdInput,
  mountainPassConditionByIdInputSchema,
} from "./shared/passConditions.input";
import {
  type PassCondition,
  passConditionSchema,
} from "./shared/passConditions.output";

/**
 * Metadata for the fetchMountainPassConditionById endpoint
 */
export const mountainPassConditionByIdMeta = {
  functionName: "fetchMountainPassConditionById",
  endpoint: "/getMountainPassConditionAsJon?PassConditionID={PassConditionID}",
  inputSchema: mountainPassConditionByIdInputSchema,
  outputSchema: passConditionSchema,
  sampleParams: { PassConditionID: 12 },
  endpointDescription:
    "Get current conditions for a specific mountain pass by ID.",
} satisfies EndpointMeta<MountainPassConditionByIdInput, PassCondition>;

/**
 * Factory result for mountain pass condition by ID
 */
const mountainPassConditionByIdFactory = createFetchAndHook<
  MountainPassConditionByIdInput,
  PassCondition
>({
  api: wsdotMountainPassConditionsApiMeta,
  endpoint: mountainPassConditionByIdMeta,
  getEndpointGroup: () =>
    require("./shared/passConditions.endpoints").passConditionsGroup,
});

/**
 * Fetch function and React Query hook for retrieving current conditions for a specific mountain pass by ID
 */
export const {
  fetch: fetchMountainPassConditionById,
  hook: useMountainPassConditionById,
} = mountainPassConditionByIdFactory;
