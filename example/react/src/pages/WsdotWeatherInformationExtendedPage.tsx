import { CloudRain } from "lucide-react";
import { useWeatherInformationExtended } from "ws-dottie";

import ApiSection from "@/components/ApiSection";
import PageLayout from "@/components/PageLayout";

const WsdotWeatherInformationExtendedPage = () => {
  // React Query hooks
  const data = useWeatherInformationExtended();

  return (
    <PageLayout
      icon={CloudRain}
      iconBgColor="bg-slate-500"
      title="WSDOT Weather Information Extended"
      description="Extended weather information and forecasts"
    >
      {/* Data Display */}
      <ApiSection
        title="Weather Information Extended"
        description="Extended weather information and forecasts"
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

export default WsdotWeatherInformationExtendedPage;
