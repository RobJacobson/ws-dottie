/**
 * @fileoverview Shared Zod Schema for .NET Date Format
 *
 * This module provides a Zod schema for validating .NET date format strings.
 */

import { z } from "zod";

/**
 * Creates a Zod schema for .NET date format strings.
 *
 * .NET date format is typically "/Date(1234567890123)/" where the number is milliseconds since epoch.
 */
export const zDotnetDate = () =>
  z
    .string()
    .regex(
      /^\/Date\(-?\d+\)\/$/,
      ".NET date format required (e.g. /Date(1234567890123)/)"
    );

export type DotnetDate = z.infer<ReturnType<typeof zDotnetDate>>;
