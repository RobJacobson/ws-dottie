import {
  type CacheFlushDateInput,
  type CacheFlushDateOutput,
  createCacheFlushDateEndpointGroup,
} from "@/shared/factories/createCacheFlushDateEndpoint";

export const cacheFlushDateSchedule = createCacheFlushDateEndpointGroup(
  "wsf-schedule",
  "schedule",
  "Schedule"
);

// Re-export with API-specific names for backward compatibility
export type CacheFlushDateScheduleInput = CacheFlushDateInput;
export type CacheFlushDateSchedules = CacheFlushDateOutput;
