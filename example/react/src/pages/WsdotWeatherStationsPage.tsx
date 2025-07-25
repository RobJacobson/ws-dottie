import { Thermometer } from "lucide-react";
import { useWeatherStations } from "ws-dottie";

import ApiSection from "@/components/ApiSection";
import PageLayout from "@/components/PageLayout";

const WsdotWeatherStationsPage = () => {
  // React Query hooks
  const data = useWeatherStations();

  return (
    <PageLayout
      icon={Thermometer}
      iconBgColor="bg-cyan-500"
      title="WSDOT Weather Stations"
      description="Weather station data and locations"
    >
      {/* Data Display */}
      <ApiSection
        title="Weather Stations"
        description="Weather station data and locations"
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

export default WsdotWeatherStationsPage;
