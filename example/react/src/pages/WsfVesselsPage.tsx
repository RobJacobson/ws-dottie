import { Ship } from "lucide-react";
import { 
  useCacheFlushDateVessels, 
  useVesselAccommodations, 
  useVesselBasics, 
  useVesselHistory, 
  useVesselLocations, 
  useVesselStats, 
  useVesselVerbose 
} from "ws-dottie";

import ApiSection from "@/components/ApiSection";
import PageLayout from "@/components/PageLayout";
import SingleItemApiSection from "@/components/SingleItemApiSection";
import type { ApiItem } from "@/types/api";

const WsfVesselsPage = () => {
  // React Query hooks
  const vesselBasics = useVesselBasics();
  const vesselLocations = useVesselLocations();
  const vesselAccommodations = useVesselAccommodations();
  const vesselStats = useVesselStats();
  const vesselHistory = useVesselHistory();
  const vesselVerbose = useVesselVerbose();
  const cacheFlushDate = useCacheFlushDateVessels();

  const getVesselName = (item: ApiItem) => item.vesselName || item.name || "Unknown Vessel";
  const getVesselId = (item: ApiItem) => item.vesselId || item.id || "unknown";

  return (
    <PageLayout
      icon={Ship}
      iconBgColor="bg-navy-500"
      title="WSF Vessels"
      description="Washington State Ferries vessel information and tracking"
    >
      {/* Vessel Basics */}
      <ApiSection
        title="Vessel Basics"
        description="Basic vessel information including names, abbreviations, class information, and operational status"
        query={vesselBasics}
        getItemName={getVesselName}
        getItemId={getVesselId}
      />

      {/* Vessel Locations */}
      <ApiSection
        title="Vessel Locations"
        description="Real-time vessel positions, speeds, headings, and status information"
        query={vesselLocations}
        getItemName={getVesselName}
        getItemId={getVesselId}
      />

      {/* Vessel Accommodations */}
      <ApiSection
        title="Vessel Accommodations"
        description="Accommodation information including amenities, facilities, and passenger services"
        query={vesselAccommodations}
        getItemName={getVesselName}
        getItemId={getVesselId}
      />

      {/* Vessel Statistics */}
      <ApiSection
        title="Vessel Statistics"
        description="Statistical information about vessels including operational metrics and performance data"
        query={vesselStats}
        getItemName={getVesselName}
        getItemId={getVesselId}
      />

      {/* Vessel History */}
      <ApiSection
        title="Vessel History"
        description="Historical information about vessels including past operations and service records"
        query={vesselHistory}
        getItemName={getVesselName}
        getItemId={getVesselId}
      />

      {/* Vessel Verbose */}
      <ApiSection
        title="Vessel Verbose"
        description="Comprehensive vessel information including specifications, capacity, and amenities"
        query={vesselVerbose}
        getItemName={getVesselName}
        getItemId={getVesselId}
      />

      {/* Cache Flush Date */}
      <SingleItemApiSection
        title="Cache Flush Date"
        description="Date when the vessel data cache was last flushed"
        query={cacheFlushDate}
        transformData={(data) => ({ cacheFlushDate: data })}
      />
    </PageLayout>
  );
};

export default WsfVesselsPage;
