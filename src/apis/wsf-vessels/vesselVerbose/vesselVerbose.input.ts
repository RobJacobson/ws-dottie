import { z } from "@/shared/zod";

/**
 * VesselVerbose input schema
 *
 * This operation retrieves highly detailed information pertaining to vessels. It should be used if you need to reduce the "chattiness" of your application and don't mind receiving a larger payload of data. The results include and expand on what's already available through the following operations: /vesselbasics, /vesselaccommodations, /vesselstats.
 */
export const vesselVerboseInputSchema = z
  .object({})
  .strict()
  .describe(
    "Retrieves comprehensive vessel information combining basic details, accommodations, and technical specifications in a single response. E.g., vessel Tokitae with status, amenities, dimensions, and capacity data. Use when you need complete vessel information in one API call to reduce multiple requests. Combines data from vesselBasics, vesselAccommodations, and vesselStats endpoints."
  );

export type VesselVerboseInput = z.infer<typeof vesselVerboseInputSchema>;

/**
 * VesselVerboseById input schema
 */
export const vesselVerboseByIdInputSchema = z
  .object({
    VesselID: z
      .number()
      .int()
      .describe(
        "Unique vessel identifier, as an integer ID. E.g., '68' for vessel Tokitae, '74' for vessel Chimacum. Required to retrieve comprehensive information for a specific vessel."
      ),
  })
  .describe(
    "Retrieves comprehensive vessel information for a specific vessel by VesselID, combining basic details, accommodations, and technical specifications in a single response. E.g., vessel Tokitae with status, amenities, dimensions, capacity data, build year, and vessel history. Use when you need complete vessel information for a single vessel in one API call to reduce multiple requests. Combines data from vesselBasics, vesselAccommodations, and vesselStats endpoints."
  );

export type VesselVerboseByIdInput = z.infer<
  typeof vesselVerboseByIdInputSchema
>;
