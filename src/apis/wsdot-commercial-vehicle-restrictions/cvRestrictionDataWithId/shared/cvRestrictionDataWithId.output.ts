import { z } from "@/shared/zod";
import { cvRestrictionSchema } from "../../cvRestrictionData/shared/cvRestrictionData.output";

export const cvRestrictionWithIdSchema = cvRestrictionSchema
  .extend({
    UniqueID: z
      .string()
      .nullable()
      .describe(
        "Unique identifier for the commercial vehicle restriction in format 'Type-State-Route-Sequence' (e.g., 'B-WA-010-1')."
      ),
  })
  .describe(
    "Commercial vehicle restriction information with unique identifier, including weight limits by classification, height/width/length restrictions, location data, effective dates, restriction type, and unique restriction ID for bridge and roadway restrictions statewide."
  );

export type CVRestrictionWithId = z.infer<typeof cvRestrictionWithIdSchema>;
