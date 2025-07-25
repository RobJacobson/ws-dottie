import { Cloud } from "lucide-react";
import { useWeatherInformation } from "ws-dottie";

import ApiSection from "@/components/ApiSection";
import PageLayout from "@/components/PageLayout";

const WsdotWeatherInformationPage = () => {
  // React Query hooks
  const data = useWeatherInformation();

  return (
    <PageLayout
      icon={Cloud}
      iconBgColor="bg-sky-500"
      title="WSDOT Weather Information"
      description="Weather information and conditions"
    >
      {/* Data Display */}
      <ApiSection
        title="Weather Information"
        description="Weather information and conditions"
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

export default WsdotWeatherInformationPage;
