import type React from "react";

import { useGlobalCacheFlushMonitor, WSFCacheProvider } from "./index";

/**
 * Example component showing how to use the new WSF caching system
 *
 * This component demonstrates:
 * 1. How to include the WSFCacheProvider
 * 2. How to monitor cache flush status
 * 3. The automatic nature of the system
 */
export const WSFExample: React.FC = () => {
  return (
    <div>
      <h2>WSF Caching Example</h2>
      <p>
        This example shows how the new caching system automatically monitors all
        WSF APIs without requiring manual configuration.
      </p>

      {/* Simply include the provider - that's it! */}
      <WSFCacheProvider />

      {/* Optional: Monitor the status */}
      <CacheStatusMonitor />
    </div>
  );
};

/**
 * Optional component to monitor cache flush status
 * This is not required for the caching to work
 */
const CacheStatusMonitor: React.FC = () => {
  const { cacheFlushDates, isMonitoring, hasErrors, isLoading } =
    useGlobalCacheFlushMonitor();

  if (isLoading) {
    return <div>Initializing cache monitoring...</div>;
  }

  if (hasErrors) {
    return <div style={{ color: "red" }}>Cache monitoring has errors</div>;
  }

  return (
    <div
      style={{ border: "1px solid #ccc", padding: "1rem", margin: "1rem 0" }}
    >
      <h3>Cache Monitoring Status</h3>
      <p>
        <strong>Status:</strong> {isMonitoring ? "✅ Active" : "❌ Inactive"}
      </p>

      <h4>Last Cache Flush Dates:</h4>
      <ul>
        <li>
          <strong>Fares:</strong>{" "}
          {cacheFlushDates.fares?.toISOString() || "Unknown"}
        </li>
        <li>
          <strong>Schedule:</strong>{" "}
          {cacheFlushDates.schedule?.toISOString() || "Unknown"}
        </li>
        <li>
          <strong>Terminals:</strong>{" "}
          {cacheFlushDates.terminals?.toISOString() || "Unknown"}
        </li>
        <li>
          <strong>Vessels:</strong>{" "}
          {cacheFlushDates.vessels?.toISOString() || "Unknown"}
        </li>
      </ul>

      <p style={{ fontSize: "0.9em", color: "#666" }}>
        This monitoring happens automatically every 5 minutes. When any cache
        flush date changes, all relevant queries are automatically invalidated
        and fresh data is fetched.
      </p>
    </div>
  );
};

/**
 * Example of how to use WSF data with automatic cache invalidation
 *
 * Note: You don't need to do anything special - the caching just works!
 */
export const ExampleUsage: React.FC = () => {
  return (
    <div
      style={{ border: "1px solid #eee", padding: "1rem", margin: "1rem 0" }}
    >
      <h3>Usage Example</h3>
      <p>
        With the WSFCacheProvider in place, you can use WSF data hooks normally:
      </p>

      <pre
        style={{ background: "#f5f5f5", padding: "1rem", borderRadius: "4px" }}
      >
        {`// These hooks will automatically have their cache invalidated
// when the server data changes - no manual intervention needed!

import { useFares } from "@/api/wsf-fares";
import { useSchedule } from "@/api/wsf-schedule";
import { useTerminals } from "@/api/wsf-terminals";
import { useVessels } from "@/api/wsf-vessels";

function MyComponent() {
  const { data: fares } = useFares();
  const { data: schedule } = useSchedule();
  const { data: terminals } = useTerminals();
  const { data: vessels } = useVessels();
  
  // All data automatically stays fresh!
  return <div>...</div>;
}`}
      </pre>

      <p>
        <strong>That's it!</strong> The WSFCacheProvider handles all the
        complexity of monitoring cache flush dates and invalidating queries
        automatically.
      </p>
    </div>
  );
};
