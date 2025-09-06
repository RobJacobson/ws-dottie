import {
  scheduleResponseSchema,
  scheduleResponsesArraySchema,
  type ScheduleResponse,
} from "@/schemas/wsf-schedule";

// ============================================================================
// Output Schemas & Types
//
// scheduleResponseSchema (imported from scheduleResponse.zod)
// scheduleResponsesArraySchema (imported from scheduleResponse.zod)
// ScheduleResponse (imported from scheduleResponse.zod)
// ============================================================================

// Re-export schemas and types for convenience
export { scheduleResponseSchema, scheduleResponsesArraySchema };
export type { ScheduleResponse };
