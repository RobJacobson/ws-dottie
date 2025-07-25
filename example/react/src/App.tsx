import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import WsdotBorderCrossingsPage from "./pages/WsdotBorderCrossingsPage";
import WsdotBridgeClearancesPage from "./pages/WsdotBridgeClearancesPage";
import WsdotCommercialVehicleRestrictionsPage from "./pages/WsdotCommercialVehicleRestrictionsPage";
import WsdotHighwayAlertsPage from "./pages/WsdotHighwayAlertsPage";
import WsdotHighwayCamerasPage from "./pages/WsdotHighwayCamerasPage";
import WsdotMountainPassConditionsPage from "./pages/WsdotMountainPassConditionsPage";
import WsdotTollRatesPage from "./pages/WsdotTollRatesPage";
import WsdotTrafficFlowPage from "./pages/WsdotTrafficFlowPage";
import WsdotTravelTimesPage from "./pages/WsdotTravelTimesPage";
import WsdotWeatherInformationExtendedPage from "./pages/WsdotWeatherInformationExtendedPage";
import WsdotWeatherInformationPage from "./pages/WsdotWeatherInformationPage";
import WsdotWeatherStationsPage from "./pages/WsdotWeatherStationsPage";
import WsfFaresPage from "./pages/WsfFaresPage";
import WsfSchedulePage from "./pages/WsfSchedulePage";
import WsfTerminalsPage from "./pages/WsfTerminalsPage";
import WsfVesselsPage from "./pages/WsfVesselsPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/wsdot-border-crossings"
              element={<WsdotBorderCrossingsPage />}
            />
            <Route
              path="/wsdot-bridge-clearances"
              element={<WsdotBridgeClearancesPage />}
            />
            <Route
              path="/wsdot-commercial-vehicle-restrictions"
              element={<WsdotCommercialVehicleRestrictionsPage />}
            />
            <Route
              path="/wsdot-highway-alerts"
              element={<WsdotHighwayAlertsPage />}
            />
            <Route
              path="/wsdot-highway-cameras"
              element={<WsdotHighwayCamerasPage />}
            />
            <Route
              path="/wsdot-mountain-pass-conditions"
              element={<WsdotMountainPassConditionsPage />}
            />
            <Route path="/wsdot-toll-rates" element={<WsdotTollRatesPage />} />
            <Route
              path="/wsdot-traffic-flow"
              element={<WsdotTrafficFlowPage />}
            />
            <Route
              path="/wsdot-travel-times"
              element={<WsdotTravelTimesPage />}
            />
            <Route
              path="/wsdot-weather-information"
              element={<WsdotWeatherInformationPage />}
            />
            <Route
              path="/wsdot-weather-information-extended"
              element={<WsdotWeatherInformationExtendedPage />}
            />
            <Route
              path="/wsdot-weather-stations"
              element={<WsdotWeatherStationsPage />}
            />
            <Route path="/wsf-fares" element={<WsfFaresPage />} />
            <Route path="/wsf-schedule" element={<WsfSchedulePage />} />
            <Route path="/wsf-terminals" element={<WsfTerminalsPage />} />
            <Route path="/wsf-vessels" element={<WsfVesselsPage />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
