// WSF Cache Provider Component
// Monitors cache flush dates and automatically invalidates queries when data changes

import { useEffect, useRef } from "react";

import { useCacheFlushDateSchedule } from "../../schedule/cacheFlushDateSchedule";
import { useCacheFlushDateTerminals } from "../../terminals/cacheFlushDateTerminals";
import { useCacheFlushDateVessels } from "../../vessels/cacheFlushDateVessels";
import { useWsfCacheFlushMonitor } from "./invalidation";

/**
 * WSF Cache Provider Component
 *
 * This component monitors cache flush dates from all WSF APIs and automatically
 * invalidates related queries when the cache flush date changes, indicating
 * that the underlying data has been updated on the server.
 *
 * This component should be placed high in the component tree, ideally near
 * the root of your application, to ensure all WSF queries are properly
 * invalidated when data changes.
 */
export const WsfCacheProvider = () => {
  const {
    monitorVesselsCacheFlush,
    monitorTerminalsCacheFlush,
    monitorScheduleCacheFlush,
  } = useWsfCacheFlushMonitor();

  // Cache flush date queries
  const { data: vesselsCacheFlushDate } = useCacheFlushDateVessels();
  const { data: terminalsCacheFlushDate } = useCacheFlushDateTerminals();
  const { data: scheduleCacheFlushDate } = useCacheFlushDateSchedule();

  // Store previous cache flush dates to detect changes
  const previousVesselsFlushDate = useRef<Date | null>(null);
  const previousTerminalsFlushDate = useRef<Date | null>(null);
  const previousScheduleFlushDate = useRef<Date | null>(null);

  // Monitor vessels cache flush date changes
  useEffect(() => {
    const currentFlushDate = vesselsCacheFlushDate?.lastUpdated || null;
    monitorVesselsCacheFlush(
      previousVesselsFlushDate.current,
      currentFlushDate
    );
    previousVesselsFlushDate.current = currentFlushDate;
  }, [vesselsCacheFlushDate?.lastUpdated, monitorVesselsCacheFlush]);

  // Monitor terminals cache flush date changes
  useEffect(() => {
    const currentFlushDate = terminalsCacheFlushDate?.lastUpdated || null;
    monitorTerminalsCacheFlush(
      previousTerminalsFlushDate.current,
      currentFlushDate
    );
    previousTerminalsFlushDate.current = currentFlushDate;
  }, [terminalsCacheFlushDate?.lastUpdated, monitorTerminalsCacheFlush]);

  // Monitor schedule cache flush date changes
  useEffect(() => {
    const currentFlushDate = scheduleCacheFlushDate?.lastUpdated || null;
    monitorScheduleCacheFlush(
      previousScheduleFlushDate.current,
      currentFlushDate
    );
    previousScheduleFlushDate.current = currentFlushDate;
  }, [scheduleCacheFlushDate?.lastUpdated, monitorScheduleCacheFlush]);

  // This component doesn't render anything
  return null;
};
