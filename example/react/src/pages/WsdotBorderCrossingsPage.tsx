import { Car } from "lucide-react";
import { useBorderCrossings } from "ws-dottie";

import ApiSection from "@/components/ApiSection";
import PageLayout from "@/components/PageLayout";

const WsdotBorderCrossingsPage = () => {
  // React Query hooks
  const data = useBorderCrossings();

  return (
    <PageLayout
      icon={Car}
      iconBgColor="bg-blue-500"
      title="WSDOT Border Crossings"
      description="Border crossing wait times and status"
    >
      {/* Data Display */}
      <ApiSection
        title="Border Crossings"
        description="Border crossing wait times and status"
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

export default WsdotBorderCrossingsPage;
