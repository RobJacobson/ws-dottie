import { Building2 } from "lucide-react";
import { useBridgeClearances } from "ws-dottie";

import ApiSection from "@/components/ApiSection";
import PageLayout from "@/components/PageLayout";

const WsdotBridgeClearancesPage = () => {
  // React Query hooks - using I-5 route for demo
  const data = useBridgeClearances("005");

  return (
    <PageLayout
      icon={Building2}
      iconBgColor="bg-green-500"
      title="WSDOT Bridge Clearances"
      description="Bridge clearance information and restrictions"
    >
      {/* Data Display */}
      <ApiSection
        title="Bridge Clearances"
        description="Bridge clearance information and restrictions"
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

export default WsdotBridgeClearancesPage;
