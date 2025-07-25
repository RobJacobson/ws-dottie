import { DollarSign } from "lucide-react";
import { useTollRates } from "ws-dottie";

import ApiSection from "@/components/ApiSection";
import PageLayout from "@/components/PageLayout";

const WsdotTollRatesPage = () => {
  // React Query hooks
  const data = useTollRates();

  return (
    <PageLayout
      icon={DollarSign}
      iconBgColor="bg-yellow-500"
      title="WSDOT Toll Rates"
      description="Toll rates and pricing information"
    >
      {/* Data Display */}
      <ApiSection
        title="Toll Rates"
        description="Toll rates and pricing information"
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

export default WsdotTollRatesPage;
