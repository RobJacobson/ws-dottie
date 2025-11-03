/**
 * @fileoverview WSF Schedule API Output Schemas for Schedules
 *
 * This module provides Zod schemas for validating responses from the WSF
 * Schedule API schedule operations.
 */

import { z } from "@/shared/zod-openapi-init";

import { zDotnetDate } from "@/apis/shared";

/**
 * Schema for TerminalCombo - represents terminal combination information
 */
export const terminalComboSchema = z
  .object({
    DepartingTerminalID: z
      .number()
      .describe(
        "Unique identifier for departing terminal, as an integer ID. E.g., '1' for Anacortes terminal, '10' for Friday Harbor terminal. Used as primary key for terminal identification in terminal combo."
      ),
    DepartingTerminalName: z
      .string()
      .describe(
        "Human-readable name of departing terminal, as a terminal name. E.g., 'Anacortes' for terminal 1, 'Friday Harbor' for terminal 10. Provides origin terminal identification for schedule display."
      ),
    ArrivingTerminalID: z
      .number()
      .describe(
        "Unique identifier for arriving terminal, as an integer ID. E.g., '13' for Lopez Island terminal, '15' for Orcas Island terminal. Used as primary key for terminal identification in terminal combo."
      ),
    ArrivingTerminalName: z
      .string()
      .describe(
        "Human-readable name of arriving terminal, as a terminal name. E.g., 'Lopez Island' for terminal 13, 'Orcas Island' for terminal 15. Provides destination terminal identification for schedule display."
      ),
    SailingNotes: z
      .string()
      .describe(
        "Informational text associated with underlying sailing, as sailing notes. E.g., empty string when no notes, notes when special conditions apply. Provides additional sailing information for terminal combination."
      ),
    Annotations: z
      .array(z.string())
      .describe(
        "Array of annotation strings assigned to one or more departures in Times list, as annotation descriptions. E.g., array containing 'No interisland vehicles. Foot passenger and bikes okay.' annotation, empty array when no annotations. Used for displaying additional departure information."
      ),
    Times: z
      .array(
        z
          .object({
            DepartingTime: zDotnetDate().describe(
              "Date and time of departure, as a UTC datetime. E.g., '2025-11-02T14:15:00.000Z' for departure at 2:15 PM on November 2, 2025. Used for departure schedule display."
            ),
            ArrivingTime: zDotnetDate()
              .nullable()
              .describe(
                "Date and time of arrival, as a UTC datetime. E.g., '2025-11-02T15:10:00.000Z' for arrival at 3:10 PM, null when arrival time is unavailable. Used for arrival schedule display."
              ),
            LoadingRule: z
              .union([z.literal(1), z.literal(2), z.literal(3)])
              .describe(
                "Category of travelers supported by departure, as a loading rule code. Valid values: 1 (Passenger), 2 (Vehicle), 3 (Both). E.g., '1' for passenger-only departure, '3' for both passenger and vehicle departure. Used to determine what types of travelers can board."
              ),
            VesselID: z
              .number()
              .describe(
                "Unique identifier for vessel planned to service departure, as an integer ID. E.g., '69' for Samish vessel, '38' for Yakima vessel, '2' for Chelan vessel. Used to identify which vessel operates departure."
              ),
            VesselName: z
              .string()
              .describe(
                "Human-readable name of vessel planned to service departure, as a vessel name. E.g., 'Samish' for vessel 69, 'Yakima' for vessel 38, 'Chelan' for vessel 2. Provides vessel identification for display."
              ),
            VesselHandicapAccessible: z
              .boolean()
              .describe(
                "Indicator whether vessel is ADA accessible, as a boolean. E.g., true for accessible vessels like Samish, Yakima, Chelan. Used to determine accessibility for passengers with disabilities."
              ),
            VesselPositionNum: z
              .number()
              .describe(
                "Position number representing single vessel servicing all stops in journey, as an integer. E.g., '1' for first vessel position, '2' for second vessel position, '3' for third vessel position. Used for vessel scheduling and position tracking."
              ),
            Routes: z
              .array(z.number())
              .describe(
                "Array of route IDs serviced by departure, as route ID integers. E.g., array containing route 9 for Anacortes/San Juan Islands, subset of AllRoutes when departure only serves some routes. Used to identify which routes this departure covers."
              ),
            AnnotationIndexes: z
              .array(z.number())
              .describe(
                "Array of index integers indicating which elements in Annotations array apply to departure, as annotation indexes. E.g., array containing index 0 when first annotation applies, empty array when no annotations apply. Used to associate annotations with specific departures."
              ),
          })
          .describe(
            "Represents scheduled departure detail including departure/arrival times, loading rule, vessel information, routes, and annotation indexes. E.g., departure at 2:15 PM with Samish vessel (ID 69) supporting both passengers and vehicles on route 9."
          )
      )
      .describe(
        "Array of scheduled departure details including departure times, vessel information, loading rules, and annotations. E.g., array containing multiple departures throughout day for terminal combination. Used for schedule display and departure lookups."
      ),
    AnnotationsIVR: z
      .array(z.string())
      .describe(
        "Array of annotation strings formatted for Interactive Voice Response systems, as IVR descriptions. E.g., array containing 'No interisland vehicles. Foot passengers and bikes okay.' for IVR playback, empty array when no IVR annotations. Used for telephone-based schedule information systems."
      ),
  })
  .describe(
    "Represents terminal combination schedule information including departing/arriving terminal IDs and names, sailing notes, annotations, departure times, and IVR annotations. E.g., Anacortes (ID 1) to Lopez Island (ID 13) with multiple departures throughout day. Used for schedule display and terminal-pair schedule lookups."
  );

export type TerminalCombo = z.infer<typeof terminalComboSchema>;

/**
 * Terminal Combos List Schema - represents an list of terminal combinations
 */
export const terminalCombosListSchema = z
  .array(terminalComboSchema)
  .describe(
    "This operation provides departure times for either a trip date and route or a trip date and terminal combination. The resultset accounts for all contingencies, sailing date ranges and time adjustments. Valid departing and arriving terminals may be found using `/terminalsandmates` while valid routes may be found using `/routes`. Similarly, a valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014)."
  );

export type TerminalComboList = z.infer<typeof terminalCombosListSchema>;

/**
 * Schema for Schedule - represents schedule information
 */
export const scheduleSchema = z
  .object({
    ScheduleID: z
      .number()
      .describe(
        "Unique schedule season identifier, as an integer ID. E.g., '193' for Fall 2025 schedule. Used to identify which schedule season this schedule belongs to."
      ),
    ScheduleName: z
      .string()
      .describe(
        "Human-readable schedule season name, as a season name. E.g., 'Fall 2025' for schedule 193. Provides season identification for display."
      ),
    ScheduleSeason: z
      .union([z.literal(0), z.literal(1), z.literal(2), z.literal(3)])
      .describe(
        "Quarterly season identifier code, as a season code. Valid values: 0 (Spring), 1 (Summer), 2 (Fall), 3 (Winter). E.g., '2' for Fall schedule. Used for seasonal schedule organization."
      ),
    SchedulePDFUrl: z
      .string()
      .describe(
        "URL to schedule PDF document, as a PDF URL. E.g., 'http://www.wsdot.wa.gov/ferries/pdf/2025Fall.pdf' for Fall 2025 schedule. Used for accessing printable schedule documents."
      ),
    ScheduleStart: zDotnetDate().describe(
      "Start date when schedule season becomes effective, as a UTC datetime. E.g., '2025-09-21T07:00:00.000Z' for Fall 2025 season starting September 21, 2025 at 3:00 AM. If consumer needs specific time, translate trip date value to 3:00 AM on that date. Indicates when season schedule begins."
    ),
    ScheduleEnd: zDotnetDate().describe(
      "End date when schedule season stops being effective, as a UTC datetime. E.g., '2025-12-27T08:00:00.000Z' for Fall 2025 season ending December 27, 2025 at 2:59 AM. If consumer needs specific time, translate trip date value to next calendar date at 2:59 AM. Indicates when season schedule ends."
    ),
    AllRoutes: z
      .array(z.number())
      .describe(
        "Array of route IDs representing all routes accounted for in schedule resultset, as route ID integers. E.g., array containing route 9 for Anacortes/San Juan Islands route. Used to identify which routes are included in schedule."
      ),
    TerminalCombos: terminalCombosListSchema.describe(
      "Array of departure and arrival terminal pair groupings, as terminal combo objects. E.g., array containing Anacortes-Lopez Island combo, Anacortes-Friday Harbor combo, all terminal pairs for route. Used for schedule display and terminal-pair lookups."
    ),
  })
  .describe(
    "Represents schedule information including schedule season details, route list, and terminal combination schedules. E.g., Fall 2025 schedule (ID 193) for route 9 with all terminal combinations and departure times. Used for schedule lookups and schedule display."
  );

export type Schedule = z.infer<typeof scheduleSchema>;
