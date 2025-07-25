import { AlertTriangle } from "lucide-react";
import { useHighwayAlerts } from "ws-dottie";

import ApiSection from "@/components/ApiSection";
import PageLayout from "@/components/PageLayout";

const WsdotHighwayAlertsPage = () => {
  // React Query hooks
  const highwayAlerts = useHighwayAlerts();

  return (
    <PageLayout
      icon={AlertTriangle}
      iconBgColor="bg-red-500"
      title="WSDOT Highway Alerts"
      description="Real-time highway alerts and incidents"
    >
      {/* Highway Alerts */}
      <ApiSection
        title="Highway Alerts"
        description="Real-time highway alerts and incidents including road closures, accidents, and construction"
        query={highwayAlerts}
        getItemName={(item) => item.headlineDescription || item.description || "Alert"}
        getItemId={(item) => item.eventId || item.id || "unknown"}
      />
    </PageLayout>
  );
};

export default WsdotHighwayAlertsPage;
