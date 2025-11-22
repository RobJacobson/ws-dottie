import { z } from "@/shared/zod";

export const mountainPassConditionsInputSchema = z
  .object({})
  .describe("Input parameters for retrieving all mountain pass conditions.");

export type MountainPassConditionsInput = z.infer<
  typeof mountainPassConditionsInputSchema
>;

export const mountainPassConditionByIdInputSchema = z
  .object({
    PassConditionID: z.number().int().describe("Numeric ID of the mountain pass."),
  })
  .describe(
    "Input parameters for retrieving a specific mountain pass condition by ID."
  );

export type MountainPassConditionByIdInput = z.infer<
  typeof mountainPassConditionByIdInputSchema
>;
