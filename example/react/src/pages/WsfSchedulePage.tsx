import { Calendar } from "lucide-react";
import { useRoutes, useScheduledRoutes } from "ws-dottie";

import ApiSection from "@/components/ApiSection";
import PageLayout from "@/components/PageLayout";

const WsfSchedulePage = () => {
  // React Query hooks - using today's date for demo
  const today = new Date();
  const routes = useRoutes(today);
  const scheduledRoutes = useScheduledRoutes();

  return (
    <PageLayout
      icon={Calendar}
      iconBgColor="bg-violet-500"
      title="WSF Schedule"
      description="Ferry schedules and departures"
    >
      {/* Routes */}
      <ApiSection
        title="Routes"
        description="Available ferry routes and route information"
        query={routes}
        getItemName={(item) => item.routeName || item.description || "Route"}
        getItemId={(item) => item.routeId || item.id || "unknown"}
      />

      {/* Scheduled Routes */}
      <ApiSection
        title="Scheduled Routes"
        description="Scheduled ferry routes and information"
        query={scheduledRoutes}
        getItemName={(item) => item.scheduleName || item.description || "Scheduled Route"}
        getItemId={(item) => item.scheduleId || item.id || "unknown"}
      />
    </PageLayout>
  );
}

export default WsfSchedulePage;
