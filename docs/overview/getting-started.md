# Getting Started with WS-Dottie

This guide will help you get up and running with WS-Dottie to access Washington State transportation data.

> **📚 Documentation Navigation**: [../README.md](../README.md) • [Architecture](./architecture.md) • [API Guide](./api-guide.md)

## 🚀 Quick Start

### 1. Get Your API Key

WS-Dottie requires a free API key from Washington State Department of Transportation (WSDOT):

1. Visit the [WSDOT Developer Portal](https://wsdot.wa.gov/developers/api-access)
2. Sign up with your email address (no credit card required)
3. Copy your API access code

### 2. Install WS-Dottie

```bash
# Using npm
npm install ws-dottie

# Using yarn
yarn add ws-dottie

# Using pnpm
pnpm add ws-dottie
```

### 3. Configure Your API Key

#### Option A: Environment Variables (Recommended)

```bash
# For Node.js applications
export WSDOT_ACCESS_TOKEN=your_api_key_here

# Or add to your .env file
echo "WSDOT_ACCESS_TOKEN=your_api_key_here" >> .env
```

#### Option B: Runtime Configuration

```javascript
import { configManager } from 'ws-dottie';

// Set API key at runtime
configManager.setApiKey('your_api_key_here');

// Optional: Set custom base URL (for proxying)
configManager.setBaseUrl('https://your-proxy-server.com');
```

### 4. Start Using WS-Dottie

```javascript
import { useVesselLocations, useHighwayAlerts, fetchDottie } from 'ws-dottie';

// React hooks (recommended for UI applications)
function TransportationDashboard() {
  const { data: vessels, isLoading } = useVesselLocations();
  const { data: alerts } = useHighwayAlerts();
  
  return (
    <div>
      <h2>Active Ferries: {vessels?.length || 0}</h2>
      <h2>Highway Alerts: {alerts?.length || 0}</h2>
      {isLoading && <div>Loading...</div>}
    </div>
  );
}

// Server-side usage
async function getTransportationData() {
  const vessels = await fetchDottie({
    endpoint: getVesselLocations,
    fetchMode: 'native',
    validate: true
  });
  
  const alerts = await fetchDottie({
    endpoint: getHighwayAlerts,
    fetchMode: 'native',
    validate: true
  });
  
  return { vessels, alerts };
}
```

## 📚 Next Steps

- **[Architecture](./architecture.md)** - System architecture and design principles
- **[API Guide](./api-guide.md)** - High-level API overview and use cases
- **[Category Documentation](./categories/)** - Detailed information by use case
- **[Implementation Guides](./guides/)** - Platform-specific integration patterns
- **[Reference Materials](./reference/)** - Advanced configuration and patterns

For detailed endpoint documentation, interactive examples, and schema definitions, see our generated documentation:
- **[OpenAPI Specifications](../../openapi/)** - API specifications in YAML format
- **[HTML Documentation](../../redoc/)** - Interactive HTML documentation
