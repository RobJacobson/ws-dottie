import { z } from "@/shared/zod";
import { vesselBaseSchema } from "../../shared/vesselBase";

export const vesselBasicSchema = vesselBaseSchema
  .extend({
    Status: z
      .union([z.literal(1), z.literal(2), z.literal(3)])
      .nullable()
      .describe(
        "Code indicating operational status: 1 = In Service, 2 = Maintenance, 3 = Out of Service."
      ),
    OwnedByWSF: z
      .boolean()
      .describe("True if vessel is owned by WSF; otherwise false."),
  })
  .describe(
    "Basic vessel information including identification, operational status, and ownership."
  );

export type VesselBasic = z.infer<typeof vesselBasicSchema>;
