import { Building } from "lucide-react";
import { useTerminals } from "ws-dottie";

import ApiSection from "@/components/ApiSection";
import PageLayout from "@/components/PageLayout";

const WsfTerminalsPage = () => {
  // React Query hooks - using today's date for demo
  const today = new Date();
  const data = useTerminals(today);

  return (
    <PageLayout
      icon={Building}
      iconBgColor="bg-amber-500"
      title="WSF Terminals"
      description="Ferry terminal information and status"
    >
      {/* Data Display */}
      <ApiSection
        title="Terminals"
        description="Ferry terminal information and status"
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

export default WsfTerminalsPage;
