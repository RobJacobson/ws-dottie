/**
 * @fileoverview WSF Schedule API Input Schemas for Terminal Mates
 *
 * This module provides Zod schemas for validating input parameters for the WSF
 * Schedule API endpoints related to terminal mates operations.
 */

// Terminal Mates uses the same input schema as terminals
// Import the terminal mates schema from the terminals input file
export {
  ScheduleTerminalMatesInput,
  terminalMatesSchema,
} from "../terminals/terminals.input";
