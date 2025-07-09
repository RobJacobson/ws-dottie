// React context and provider for WSDOT API client

import type React from 'react';
import { createContext, useContext } from 'react';

import type { WsdotClient } from '../shared/fetching/client';

// React context
const WsdotContext = createContext<WsdotClient | null>(null);

// Provider component
export const WsdotProvider = ({ 
  children, 
  client 
}: { 
  children: React.ReactNode; 
  client: WsdotClient; 
}) => (
  <WsdotContext.Provider value={client}>
    {children}
  </WsdotContext.Provider>
);

// Hook to access client
export const useWsdotClient = () => {
  const client = useContext(WsdotContext);
  if (!client) {
    throw new Error('useWsdotClient must be used within WsdotProvider');
  }
  return client;
};

// Convenience hooks for specific APIs
export const useWsfApi = () => {
  const { wsf } = useWsdotClient();
  return wsf;
};

export const useWsdApi = () => {
  const { wsdot } = useWsdotClient();
  return wsdot;
}; 