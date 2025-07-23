import { ArrowLeft, Calendar } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useRoutes, useScheduledRoutes } from "ws-dottie";

import ApiDataDisplay from "@/components/ApiDataDisplay";
import type { ApiItem } from "@/types/api";

function WsfSchedulePage() {
  const [selectedRoute, setSelectedRoute] = useState<ApiItem | null>(null);
  const [selectedSchedule, setSelectedSchedule] = useState<ApiItem | null>(null);

  // React Query hooks - using today's date for demo
  const today = new Date();
  const routes = useRoutes(today);
  const scheduledRoutes = useScheduledRoutes();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        <div className="flex items-center gap-3">
          <div className="bg-violet-500 p-3 rounded-lg">
            <Calendar className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">WSF Schedule</h1>
            <p className="text-gray-600">Ferry schedules and departures</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Routes */}
        <ApiDataDisplay
          title="Routes"
          description="Available ferry routes and route information"
          data={routes.data}
          isLoading={routes.isLoading}
          error={routes.error}
          selectedItem={selectedRoute}
          onItemSelect={setSelectedRoute}
          items={routes.data}
          getItemName={(item) => item.routeName || item.description || "Route"}
          getItemId={(item) => item.routeId || item.id || "unknown"}
        />

        {/* Scheduled Routes */}
        <ApiDataDisplay
          title="Scheduled Routes"
          description="Scheduled ferry routes and information"
          data={scheduledRoutes.data}
          isLoading={scheduledRoutes.isLoading}
          error={scheduledRoutes.error}
          selectedItem={selectedSchedule}
          onItemSelect={setSelectedSchedule}
          items={scheduledRoutes.data}
          getItemName={(item) => item.scheduleName || item.description || "Scheduled Route"}
          getItemId={(item) => item.scheduleId || item.id || "unknown"}
        />
      </div>
    </div>
  );
}

export default WsfSchedulePage;
