/**
 * @fileoverview WSF Schedule API Output Schemas for Schedule Today
 *
 * This module provides Zod schemas for validating responses from the WSF
 * Schedule API today's schedule operations.
 */

// Schedule Today uses the same output schema as regular schedules
// Import the terminal combo schema from the schedules output file
export {
  type Schedule,
  scheduleSchema,
  terminalComboSchema,
  terminalCombosListSchema,
} from "../schedules/schedules.output";
