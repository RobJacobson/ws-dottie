# WS-Dottie Documentation

> **Your comprehensive TypeScript library for Washington State transportation data**

WS-Dottie provides unified access to Washington State Department of Transportation (WSDOT) and Washington State Ferries (WSF) APIs with full TypeScript support, intelligent caching, and environment-agnostic operation.

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

## 📚 Documentation Structure

### Core Documentation
- **[Getting Started](./getting-started.md)** - Installation, setup, and basic usage
- **[Architecture](./architecture.md)** - System architecture and design principles
- **[API Guide](./api-guide.md)** - High-level API overview and use cases

### Category-Based Documentation
- **[Ferries](./categories/ferries.md)** - Vessel locations, terminals, schedules, and fares
- **[Traffic](./categories/traffic.md)** - Highway alerts, traffic flow, and travel times
- **[Weather](./categories/weather.md)** - Weather information and mountain pass conditions
- **[Infrastructure](./categories/infrastructure.md)** - Bridge clearances, toll rates, and border crossings

### Implementation Guides
- **[TanStack Query](./guides/tanstack-query.md)** - TanStack Query integration and caching
- **[React Integration](./guides/react.md)** - React patterns with WS-Dottie hooks
- **[Node.js Integration](./guides/nodejs.md)** - Server-side usage patterns
- **[CLI Usage](./guides/cli.md)** - Command-line interface and debugging

### Reference Materials
- **[Error Handling](./reference/error-handling.md)** - Error recovery patterns
- **[Type Safety](./reference/type-safety.md)** - TypeScript integration and Zod validation

### Detailed API Documentation
For detailed endpoint documentation, interactive examples, and schema definitions, see our generated documentation:
- **[OpenAPI Specifications](../../openapi/)** - API specifications in YAML format
- **[HTML Documentation](../../redoc/)** - Interactive HTML documentation

## 🎯 Common Use Cases

### Ferry Tracking
Build applications that track real-time ferry locations, monitor terminal wait times, and display sailing schedules.

**Relevant APIs**: [Ferries](./categories/ferries.md)

### Traffic Monitoring
Create dashboards for highway conditions, traffic flow, and travel time estimates.

**Relevant APIs**: [Traffic](./categories/traffic.md)

### Weather Applications
Display weather conditions, road conditions, and mountain pass status.

**Relevant APIs**: [Weather](./categories/weather.md)

### Commercial Vehicle Tools
Build tools for route planning with bridge clearances, toll rates, and vehicle restrictions.

**Relevant APIs**: [Infrastructure](./categories/infrastructure.md)

## 🛠️ Key Features

- **16 APIs** covering WSDOT and WSF data sources
- **90+ endpoints** with comprehensive data access
- **Type-safe** with full TypeScript support
- **React-ready** with TanStack Query integration
- **Performance optimized** with intelligent caching strategies
- **Environment agnostic** (browser, Node.js, CLI)

## 📊 Data Update Frequencies

| Category | Update Frequency | Caching Strategy |
|-----------|------------------|------------------|
| Real-time (Vessels, Alerts) | 5 seconds | REALTIME_UPDATES |
| Frequent (Wait Times, Traffic) | 1-5 minutes | MINUTE_UPDATES |
| Regular (Weather, Conditions) | 15-60 minutes | HOURLY_UPDATES |
| Static (Terminals, Cameras) | Daily | DAILY_UPDATES |
| Historical (Schedules, Fares) | Weekly | WEEKLY_UPDATES |

## 🤝 Contributing

We welcome contributions! Please see our development guide for setup instructions.

## 📄 License

MIT License - see [LICENSE](../../LICENSE) for details.
