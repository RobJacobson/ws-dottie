import { CreditCard } from "lucide-react";
import { useFaresTerminals } from "ws-dottie";

import ApiSection from "@/components/ApiSection";
import PageLayout from "@/components/PageLayout";

const WsfFaresPage = () => {
  // React Query hooks - using today's date for demo
  const today = new Date();
  const data = useFaresTerminals(today);

  return (
    <PageLayout
      icon={CreditCard}
      iconBgColor="bg-emerald-500"
      title="WSF Fares"
      description="Ferry fare information and pricing"
    >
      {/* Data Display */}
      <ApiSection
        title="Fares"
        description="Ferry fare information and pricing"
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

export default WsfFaresPage;
