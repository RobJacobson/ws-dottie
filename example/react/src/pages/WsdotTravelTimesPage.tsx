import { Clock } from "lucide-react";
import { useTravelTimes } from "ws-dottie";

import ApiSection from "@/components/ApiSection";
import PageLayout from "@/components/PageLayout";

const WsdotTravelTimesPage = () => {
  // React Query hooks
  const data = useTravelTimes();

  return (
    <PageLayout
      icon={Clock}
      iconBgColor="bg-teal-500"
      title="WSDOT Travel Times"
      description="Travel time estimates and predictions"
    >
      {/* Data Display */}
      <ApiSection
        title="Travel Times"
        description="Travel time estimates and predictions"
        query={data}
        getItemName={(item) =>
          item.name || item.title || item.description || "Item"
        }
        getItemId={(item) =>
          item.id || item.vesselId || item.terminalId || "unknown"
        }
      />
    </PageLayout>
  );
}

export default WsdotTravelTimesPage;
