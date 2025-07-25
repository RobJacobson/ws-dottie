import { Activity } from "lucide-react";
import { useTrafficFlows } from "ws-dottie";

import ApiSection from "@/components/ApiSection";
import PageLayout from "@/components/PageLayout";

const WsdotTrafficFlowPage = () => {
  // React Query hooks
  const data = useTrafficFlows();

  return (
    <PageLayout
      icon={Activity}
      iconBgColor="bg-indigo-500"
      title="WSDOT Traffic Flow"
      description="Traffic flow and congestion data"
    >
      {/* Data Display */}
      <ApiSection
        title="Traffic Flow"
        description="Traffic flow and congestion data"
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

export default WsdotTrafficFlowPage;
