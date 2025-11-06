import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { z } from "@/shared/zod-openapi-init";
import type {
  VesselBasicsByIdInput,
  VesselBasicsInput,
} from "./vesselBasics.input";
import {
  vesselBasicsByIdInputSchema,
  vesselBasicsInputSchema,
} from "./vesselBasics.input";
import type { VesselBasic } from "./vesselBasics.output";
import { vesselBasicSchema } from "./vesselBasics.output";

export const vesselBasicsResource = {
  name: "vessel-basics",
  documentation: {
    resourceDescription:
      "Each VesselBasic item represents essential identification and operational status data for Washington State Ferries vessels. These items include vessel names, identification numbers, vessel classifications, and current operational status including service availability and maintenance schedules.",
    businessContext:
      "Use to display vessel information and track fleet status by providing identification details and operational status for passenger information systems. Supports trip planning applications and fleet management tools for Washington State Ferry services.",
  },
  cacheStrategy: "STATIC" as const,
  endpoints: {
    getVesselBasics: {
      function: "getVesselBasics",
      endpoint: "/vesselBasics",
      inputSchema: vesselBasicsInputSchema,
      outputSchema: z.array(vesselBasicSchema),
      sampleParams: {},
      endpointDescription:
        "Returns multiple VesselBasic objects for all vessels in the fleet.",
    } satisfies EndpointDefinition<VesselBasicsInput, VesselBasic[]>,
    getVesselBasicsByVesselId: {
      function: "getVesselBasicsByVesselId",
      endpoint: "/vesselBasics/{VesselID}",
      inputSchema: vesselBasicsByIdInputSchema,
      outputSchema: vesselBasicSchema,
      sampleParams: { VesselID: 74 },
      endpointDescription:
        "Returns a VesselBasic object containing essential identification and status information for the specified vessel.",
    } satisfies EndpointDefinition<VesselBasicsByIdInput, VesselBasic>,
  },
} satisfies EndpointGroup;
