import { z } from "@/shared/zod";
import { vesselBaseSchema } from "../shared/vesselBase";

export const vesselAccommodationSchema = vesselBaseSchema
  .extend({
    CarDeckRestroom: z
      .boolean()
      .describe(
        "True if ADA-accessible restroom is available on car deck; otherwise false."
      ),
    CarDeckShelter: z
      .boolean()
      .describe(
        "True if ADA-accessible shelter is available on car deck; otherwise false."
      ),
    Elevator: z
      .boolean()
      .describe(
        "True if elevator is available for passenger deck access; otherwise false."
      ),
    ADAAccessible: z
      .boolean()
      .describe(
        "True if vessel meets ADA accessibility standards; otherwise false."
      ),
    MainCabinGalley: z
      .boolean()
      .describe(
        "True if food service galley is available in main passenger cabin; otherwise false."
      ),
    MainCabinRestroom: z
      .boolean()
      .describe(
        "True if restroom is available in main passenger cabin; otherwise false."
      ),
    PublicWifi: z
      .boolean()
      .describe("True if public WiFi is available on vessel; otherwise false."),
    ADAInfo: z
      .string()
      .nullable()
      .describe(
        "Detailed ADA accessibility information for passengers with disabilities."
      ),
    AdditionalInfo: z
      .string()
      .nullable()
      .describe(
        "Additional accommodation notes not covered by standard boolean flags."
      ),
  })
  .describe(
    "Vessel accommodation information including amenities, accessibility features, and passenger facilities."
  );

export type VesselAccommodation = z.infer<typeof vesselAccommodationSchema>;
