import { scheduleTimeSchema } from "@/schemas/wsf-schedule";
import { scheduleTerminalComboSchema as scheduleScheduleTerminalComboSchema } from "@/schemas/wsf-schedule";
import {
  scheduleResponsesArraySchema,
  type ScheduleTime,
  type ScheduleTerminalCombo,
} from "@/schemas/wsf-schedule";

// ============================================================================
// Output Schemas & Types
//
// scheduleTimeSchema (imported from scheduleTime.zod)
// scheduleScheduleTerminalComboSchema (imported from terminalCombo.zod)
// scheduleResponseSchema (imported from scheduleResponse.zod)
// scheduleResponsesArraySchema (imported from scheduleResponse.zod)
// ScheduleResponse (imported from scheduleResponse.zod)
// ScheduleTime (imported from scheduleTime.zod)
// ScheduleScheduleTerminalCombo (imported from terminalCombo.zod)
// ============================================================================

export const scheduleRouteScheduleScheduleTerminalComboSchema =
  scheduleScheduleTerminalComboSchema;
export const sailingTimeSchema = scheduleTimeSchema;
export const scheduleResponseArraySchema = scheduleResponsesArraySchema;
export type SailingTime = ScheduleTime;
export type ScheduleRouteScheduleScheduleTerminalCombo = ScheduleTerminalCombo;
