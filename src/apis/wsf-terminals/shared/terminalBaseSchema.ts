import { z } from "@/shared/zod-openapi-init";

/**
 * Base terminal schema containing common fields shared across all terminal schemas
 */
export const terminalBaseSchema = z
  .object({
    TerminalID: z
      .number()
      .int()
      .describe(
        "Unique terminal identifier, as an integer ID. E.g., '1' for Anacortes terminal, '3' for Bainbridge Island terminal, '4' for Bremerton terminal. Used as primary key for all terminal-related API calls and terminal identification."
      ),
    TerminalSubjectID: z
      .number()
      .int()
      .describe(
        "Unique WSF subject identifier for terminal, as an integer ID. E.g., '111' for Anacortes subject, '103' for Bainbridge Island subject, '102' for Bremerton subject. Identifies terminal as unique entity within WSF subject management system."
      ),
    RegionID: z
      .number()
      .int()
      .describe(
        "Geographical region identifier where terminal is located, as an integer ID. E.g., '1' for region 1 (Anacortes area), '4' for region 4 (Puget Sound central), '2' for region 2 (Whidbey Island area). Used for regional terminal grouping and filtering."
      ),
    TerminalName: z
      .string()
      .nullable()
      .describe(
        "Terminal name, as a human-readable description. E.g., 'Anacortes' for terminal 1, 'Bainbridge Island' for terminal 3, 'Bremerton' for terminal 4, null when terminal name is unavailable. Provides terminal identification for display and user interfaces."
      ),
    TerminalAbbrev: z
      .string()
      .nullable()
      .describe(
        "Terminal abbreviation code, as a terminal abbreviation. E.g., 'ANA' for Anacortes, 'BBI' for Bainbridge Island, 'BRE' for Bremerton, 'CLI' for Clinton, null when abbreviation is unavailable. Used for compact terminal identification in displays and route codes."
      ),
    SortSeq: z
      .number()
      .int()
      .describe(
        "Preferred sort order for terminal display, as an integer. E.g., '10' for Anacortes, '40' for Bainbridge Island, '30' for Bremerton, '20' for Clinton. Lower values appear first when sorting terminals in ascending order."
      ),
  })
  .describe(
    "Represents base terminal information including identification, naming, regional association, and display ordering. E.g., terminal Anacortes (ID 1, abbreviation ANA) in region 1 with sort order 10. Used as foundation schema shared across all terminal-related endpoints. Provides common terminal identification and display properties."
  );

export type TerminalBase = z.infer<typeof terminalBaseSchema>;
