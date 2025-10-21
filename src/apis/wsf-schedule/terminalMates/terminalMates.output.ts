/**
 * @fileoverview WSF Schedule API Output Schemas for Terminal Mates
 *
 * This module provides Zod schemas for validating responses from the WSF
 * Schedule API terminal mates operations.
 */

// Terminal Mates uses the same output schema as terminals
// Import the terminal mate schema from the terminals output file
export {
  Terminal,
  TerminalMate,
  TerminalMateList,
  terminalMateSchema,
  terminalMatesListSchema,
  terminalSchema,
} from "../terminals/terminals.output";
