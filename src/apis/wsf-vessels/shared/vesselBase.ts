import { z } from "@/shared/zod-openapi-init";

/**
 * VesselClass schema
 *
 * Similar vessels in the fleet are grouped into the same class.
 */
export const vesselClassSchema = z
  .object({
    ClassID: z
      .number()
      .int()
      .describe(
        "Unique vessel class identifier, as an integer ID. E.g., '10' for Issaquah 130 class, '162' for Kwa-di Tabil class. Used to group similar vessels and reference class-specific properties."
      ),
    ClassSubjectID: z
      .number()
      .int()
      .describe(
        "Unique WSF subject identifier for this vessel class, as an integer ID. E.g., '310' for Issaquah 130 class, '427' for Kwa-di Tabil class. Used for internal WSF subject tracking and classification."
      ),
    ClassName: z
      .string()
      .nullable()
      .describe(
        "Vessel class name, as a human-readable description. E.g., 'Issaquah 130' for standard Issaquah-class vessels, 'Kwa-di Tabil' for newer class, null when class name is unavailable. Provides technical classification name for fleet management."
      ),
    SortSeq: z
      .number()
      .int()
      .nullable()
      .describe(
        "Preferred sort order for display purposes, as an integer. E.g., '40' for Issaquah class, '75' for Kwa-di Tabil class, null when sort order is unspecified. Lower values appear first when sorting vessel classes in ascending order."
      ),
    DrawingImg: z
      .string()
      .nullable()
      .describe(
        "URL to detailed vessel class drawing image, as a URL string. E.g., 'https://www.wsdot.wa.gov/ferries/images/pages/boat_drawings/4-issaquah130.gif' for Issaquah class, null when drawing image is unavailable. Used for displaying detailed vessel class schematics and technical diagrams."
      ),
    SilhouetteImg: z
      .string()
      .nullable()
      .describe(
        "URL to small silhouette image of vessel class, as a URL string. E.g., 'https://www.wsdot.wa.gov/ferries/images/pages/boat_drawings/4-issaquah130-sillouette_sml.gif' for Issaquah class, null when silhouette image is unavailable. Used for compact visual identification in vessel lists and maps."
      ),
    PublicDisplayName: z
      .string()
      .nullable()
      .describe(
        "Public-facing vessel class name, as a human-readable description. E.g., 'Issaquah' for Issaquah 130 class, 'Olympic' for Olympic class, null when public display name is unavailable. Provides simplified, public-friendly class name for passenger information displays."
      ),
  })
  .describe(
    "Represents vessel class information grouping similar vessels in the fleet, containing class identification, display ordering, and image references. E.g., Issaquah 130 class (ClassID 10) shared by vessels Cathlamet, Chelan, and Issaquah. Used for organizing vessels by shared characteristics and displaying class-specific information. Multiple vessels can belong to the same class."
  );

export type VesselClass = z.infer<typeof vesselClassSchema>;

/**
 * Base vessel schema containing common vessel fields
 */
export const vesselBaseSchema = z
  .object({
    VesselID: z
      .number()
      .int()
      .describe(
        "Unique vessel identifier, as an integer ID. E.g., '74' for vessel Chimacum, '2' for vessel Chelan, '1' for vessel Cathlamet. Used as primary key for all vessel-related API calls and vessel tracking operations."
      ),
    VesselSubjectID: z
      .number()
      .int()
      .describe(
        "Unique WSF subject identifier for this vessel, as an integer ID. E.g., '487' for vessel Chimacum, '2' for vessel Chelan, '1' for vessel Cathlamet. Used for internal WSF subject tracking and cross-referencing with other WSF systems."
      ),
    VesselName: z
      .string()
      .nullable()
      .describe(
        "Vessel name, as a human-readable description. E.g., 'Chimacum' for vessel 74, 'Chelan' for vessel 2, 'Cathlamet' for vessel 1, null when vessel name is unavailable. Provides primary identification name for display and vessel selection."
      ),
    VesselAbbrev: z
      .string()
      .nullable()
      .describe(
        "Vessel abbreviation code, as a terminal abbreviation. E.g., 'CHM' for Chimacum, 'CHE' for Chelan, 'CAT' for Cathlamet, null when abbreviation is unavailable. Used for compact vessel identification in schedules, displays, and route information."
      ),
    Class: vesselClassSchema.nullable(),
  })
  .describe(
    "Represents base vessel information containing common identification fields shared across all vessel endpoints, including vessel ID, name, abbreviation, and class association. E.g., vessel Chimacum (VesselID 74) in Olympic class (ClassID 100). Used as foundation for all vessel data structures and extended by vessel-specific endpoint schemas."
  );

export type VesselBase = z.infer<typeof vesselBaseSchema>;
