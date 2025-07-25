import { Mountain } from "lucide-react";
import { useMountainPassConditions } from "ws-dottie";

import ApiSection from "@/components/ApiSection";
import PageLayout from "@/components/PageLayout";

const WsdotMountainPassConditionsPage = () => {
  // React Query hooks
  const data = useMountainPassConditions();

  return (
    <PageLayout
      icon={Mountain}
      iconBgColor="bg-gray-500"
      title="WSDOT Mountain Pass Conditions"
      description="Mountain pass conditions and restrictions"
    >
      {/* Data Display */}
      <ApiSection
        title="Mountain Pass Conditions"
        description="Mountain pass conditions and restrictions"
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

export default WsdotMountainPassConditionsPage;
