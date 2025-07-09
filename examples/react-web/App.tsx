// Example React app using WSDOT API client

import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { createWsdotClient, useWsfApi, WsdotProvider } from 'wsdot-api-client';

// Create client instance
const wsdotClient = createWsdotClient({
  apiKey: process.env.REACT_APP_WSDOT_API_KEY || '',
  timeout: 15000,
  logLevel: 'info'
});

// Component using the API
const RoutePlanner = () => {
  const wsf = useWsfApi();
  const [tripDate, setTripDate] = useState(new Date());
  
  // Using React Query for caching and loading states
  const { data: routes = [], isLoading, error } = useQuery({
    queryKey: ['routes', tripDate],
    queryFn: () => wsf.schedule.getRoutes(tripDate),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  const { data: alerts = [] } = useQuery({
    queryKey: ['alerts'],
    queryFn: () => wsf.schedule.getAlerts(),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
  
  if (isLoading) return <div>Loading routes...</div>;
  if (error) return <div>Error loading routes</div>;
  
  return (
    <div>
      <h1>WSF Route Planner</h1>
      
      <div>
        <label>
          Trip Date:
          <input
            type="date"
            value={tripDate.toISOString().split('T')[0]}
            onChange={(e) => setTripDate(new Date(e.target.value))}
          />
        </label>
      </div>
      
      <h2>Routes ({routes.length})</h2>
      <ul>
        {routes.map((route, index) => (
          <li key={index}>
            Route {route.routeId}: {route.departingTerminal} → {route.arrivingTerminal}
          </li>
        ))}
      </ul>
      
      <h2>Alerts ({alerts.length})</h2>
      <ul>
        {alerts.map((alert, index) => (
          <li key={index}>
            {alert.title}: {alert.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Vessel tracker component with multiple vessel APIs
const VesselTracker = () => {
  const wsf = useWsfApi();
  
  // Vessel locations (real-time positions)
  const { data: vesselLocations = [], isLoading: locationsLoading } = useQuery({
    queryKey: ['vesselLocations'],
    queryFn: () => wsf.vessels.getVesselLocations(),
    refetchInterval: 30 * 1000, // Refresh every 30 seconds
  });
  
  // Vessel watch (real-time status)
  const { data: vesselWatch = [], isLoading: watchLoading } = useQuery({
    queryKey: ['vesselWatch'],
    queryFn: () => wsf.vessels.getVesselWatch(),
    refetchInterval: 60 * 1000, // Refresh every minute
  });
  
  // Vessel watch verbose (detailed real-time status)
  const { data: vesselWatchVerbose = [], isLoading: watchVerboseLoading } = useQuery({
    queryKey: ['vesselWatchVerbose'],
    queryFn: () => wsf.vessels.getVesselWatchVerbose(),
    refetchInterval: 60 * 1000, // Refresh every minute
  });
  
  const isLoading = locationsLoading || watchLoading || watchVerboseLoading;
  
  if (isLoading) return <div>Loading vessel data...</div>;
  
  return (
    <div>
      <h2>Vessel Locations ({vesselLocations.length})</h2>
      <ul>
        {vesselLocations.map((vessel, index) => (
          <li key={index}>
            {vessel.vesselName}: {vessel.latitude}, {vessel.longitude}
          </li>
        ))}
      </ul>
      
      <h2>Vessel Watch ({vesselWatch.length})</h2>
      <ul>
        {vesselWatch.map((vessel, index) => (
          <li key={index}>
            {vessel.vesselName}: {vessel.status} - {vessel.currentRoute}
          </li>
        ))}
      </ul>
      
      <h2>Vessel Watch Verbose ({vesselWatchVerbose.length})</h2>
      <ul>
        {vesselWatchVerbose.map((vessel, index) => (
          <li key={index}>
            {vessel.vesselName}: {vessel.status} - {vessel.currentRoute} - {vessel.nextDeparture}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Main App component
const App = () => {
  return (
    <WsdotProvider client={wsdotClient}>
      <div className="App">
        <RoutePlanner />
        <VesselTracker />
      </div>
    </WsdotProvider>
  );
};

export default App; 