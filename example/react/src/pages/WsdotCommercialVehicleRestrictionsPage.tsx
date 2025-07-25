import { Truck } from "lucide-react";
import { useCommercialVehicleRestrictions } from "ws-dottie";

import ApiSection from "@/components/ApiSection";
import PageLayout from "@/components/PageLayout";

const WsdotCommercialVehicleRestrictionsPage = () => {
  // React Query hooks
  const data = useCommercialVehicleRestrictions();

  return (
    <PageLayout
      icon={Truck}
      iconBgColor="bg-orange-500"
      title="WSDOT Commercial Vehicle Restrictions"
      description="Commercial vehicle restrictions and regulations"
    >
      {/* Data Display */}
      <ApiSection
        title="Commercial Vehicle Restrictions"
        description="Commercial vehicle restrictions and regulations"
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

export default WsdotCommercialVehicleRestrictionsPage;
