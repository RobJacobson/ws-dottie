import { Camera } from "lucide-react";
import { useHighwayCameras } from "ws-dottie";

import ApiSection from "@/components/ApiSection";
import PageLayout from "@/components/PageLayout";

const WsdotHighwayCamerasPage = () => {
  // React Query hooks
  const data = useHighwayCameras();

  return (
    <PageLayout
      icon={Camera}
      iconBgColor="bg-purple-500"
      title="WSDOT Highway Cameras"
      description="Highway camera feeds and locations"
    >
      {/* Data Display */}
      <ApiSection
        title="Highway Cameras"
        description="Highway camera feeds and locations"
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

export default WsdotHighwayCamerasPage;
