# WS-Dottie

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

## 📚 Documentation

WS-Dottie provides comprehensive documentation to help you get started quickly:

### 📖 Core Documentation
- **[Getting Started](./docs/overview/getting-started.md)** - Installation, setup, and basic usage
- **[Architecture](./docs/overview/architecture.md)** - System architecture and design principles
- **[API Guide](./docs/overview/api-guide.md)** - High-level API overview and use cases

### 📂 Category-Based Documentation
- **[Ferries](./docs/overview/categories/ferries.md)** - Vessel locations, terminals, schedules, and fares
- **[Traffic](./docs/overview/categories/traffic.md)** - Highway alerts, traffic flow, and travel times
- **[Weather](./docs/overview/categories/weather.md)** - Weather information and mountain pass conditions
- **[Infrastructure](./docs/overview/categories/infrastructure.md)** - Bridge clearances, toll rates, and border crossings

### 🛠️ Implementation Guides
- **[TanStack Query](./docs/overview/guides/tanstack-query.md)** - TanStack Query integration and caching
- **[Fetching Data](./docs/overview/guides/fetching-data.md)** - Basic fetch-dottie usage patterns
- **[CLI Usage](./docs/overview/guides/cli-usage.md)** - Command-line interface and debugging
- **[Error Handling](./docs/overview/guides/error-handling.md)** - Error recovery patterns

### 📚 Reference Materials
- **[Endpoints](./docs/overview/endpoints.md)** - Complete endpoint reference table

### 🔗 Detailed API Documentation
For detailed endpoint documentation, interactive examples, and schema definitions, see our generated documentation:
- **[OpenAPI Specifications](./docs/openapi/)** - API specifications in YAML format
- **[HTML Documentation](./docs/redoc/)** - Interactive HTML documentation with examples

Our documentation is automatically generated from API definitions, ensuring it stays synchronized with the latest code changes.

## 🎯 Key Features

- **16 APIs** covering WSDOT and WSF data sources
- **90+ endpoints** with comprehensive data access
- **Type-safe** with full TypeScript support
- **React-ready** with TanStack Query integration
- **Performance optimized** with intelligent caching strategies
- **Environment agnostic** (browser, Node.js, CLI)

## ⚛️ TanStack Query Integration

WS-Dottie provides first-class TanStack Query integration with optimized hooks for all APIs:

```javascript
import { useVesselLocations, useHighwayAlerts, tanstackQueryOptions } from 'ws-dottie';

function TransportationDashboard() {
  // Real-time data (5-second updates)
  const { data: vessels, isLoading } = useVesselLocations({
    queryOptions: tanstackQueryOptions.REALTIME_UPDATES
  });
  
  // Frequent updates (1-minute updates)
  const { data: alerts } = useHighwayAlerts({
    queryOptions: tanstackQueryOptions.MINUTE_UPDATES
  });
  
  return (
    <div>
      <h2>Active Ferries: {vessels?.length || 0}</h2>
      <h2>Highway Alerts: {alerts?.length || 0}</h2>
      {isLoading && <div>Loading...</div>}
    </div>
  );
}
```

**Available Caching Strategies**:
- `REALTIME_UPDATES` - 5-second refresh for vessel locations, traffic alerts
- `MINUTE_UPDATES` - 1-minute refresh for terminal wait times, traffic flow
- `HOURLY_UPDATES` - 15-minute refresh for weather conditions, road status
- `DAILY_UPDATES` - 24-hour refresh for schedules, fares
- `WEEKLY_UPDATES` - Manual refresh for static data like terminal info

For detailed TanStack Query patterns, see the **[TanStack Query Guide](./docs/overview/guides/tanstack-query.md)**.

## 📊 Data Update Frequencies

| Category | Update Frequency | Caching Strategy |
|-----------|------------------|------------------|
| Real-time (Vessels, Alerts) | 5 seconds | REALTIME_UPDATES |
| Frequent (Wait Times, Traffic) | 1-5 minutes | MINUTE_UPDATES |
| Regular (Weather, Conditions) | 15-60 minutes | HOURLY_UPDATES |
| Static (Terminals, Cameras) | Daily | DAILY_UPDATES |
| Historical (Schedules, Fares) | Weekly | WEEKLY_UPDATES |

## 🛠️ Common Use Cases

### Ferry Tracking
Build applications that track real-time ferry locations, monitor terminal wait times, and display sailing schedules.

**Relevant APIs**: [Ferries](./docs/overview/categories/ferries.md)

### Traffic Monitoring
Create dashboards for highway conditions, traffic flow, and travel time estimates.

**Relevant APIs**: [Traffic](./docs/overview/categories/traffic.md)

### Weather Applications
Display weather conditions, road conditions, and mountain pass status.

**Relevant APIs**: [Weather](./docs/overview/categories/weather.md)

### Commercial Vehicle Tools
Build tools for route planning with bridge clearances, toll rates, and vehicle restrictions.

**Relevant APIs**: [Infrastructure](./docs/overview/categories/infrastructure.md)

## 🔧 Advanced Features

### Caching Strategies
WS-Dottie provides optimized caching strategies for different data types:

```javascript
import { tanstackQueryOptions } from 'ws-dottie';

// Real-time data (5-second updates)
const realtimeConfig = tanstackQueryOptions.REALTIME_UPDATES;

// Frequent updates (1-minute updates)
const minuteConfig = tanstackQueryOptions.MINUTE_UPDATES;

// Hourly updates (1-hour updates)
const hourlyConfig = tanstackQueryOptions.HOURLY_UPDATES;

// Daily updates (24-hour updates)
const dailyConfig = tanstackQueryOptions.DAILY_UPDATES;

// Weekly updates (manual refresh only)
const weeklyConfig = tanstackQueryOptions.WEEKLY_UPDATES;
```

### Error Handling
Comprehensive error handling with detailed context and recovery strategies:

```javascript
import { WsdotApiError } from 'ws-dottie';

try {
  const data = await fetchDottie({
    endpoint: getVesselLocations,
    fetchMode: 'native',
    validate: true
  });
} catch (error) {
  if (error instanceof WsdotApiError) {
    console.error('API Error:', error.message);
    console.error('Status:', error.status);
    console.error('Context:', error.context);
  }
  throw error;
}
```

## 🌐 Environment Support

WS-Dottie works seamlessly across different environments:

### Browser Applications
- **Transport**: JSONP for CORS compatibility
- **Features**: Automatic retry, error handling, type safety
- **Usage**: React hooks or fetchDottie with `fetchMode: 'jsonp'`

### Node.js Applications
- **Transport**: Native fetch with full HTTP capabilities
- **Features**: Streaming, custom headers, proxy support
- **Performance**: Higher throughput, connection pooling

### CLI Applications
- **Transport**: Native fetch with formatted output
- **Features**: Pretty printing, filtering, batch operations
- **Usage**: Command-line interface for debugging and automation

## 📦 Package Structure

WS-Dottie is tree-shakeable. Use named imports for optimal bundle size:

```javascript
// ✅ Good: Tree-shakeable imports
import { 
  useVesselLocations, 
  useHighwayAlerts,
  WsfVessels,
  WsdotHighwayAlerts 
} from 'ws-dottie';

// ❌ Avoid: Deep imports that prevent tree-shaking
import * from 'ws-dottie';
```

## 🧪 Testing

WS-Dottie includes comprehensive testing with support for both Node.js and browser environments:

```bash
# Quick test commands
npm run test:e2e                    # E2E tests (Node.js)
npm run test:module                 # Module-specific tests
npm run test:direct                 # Direct vitest execution

# JSONP testing (browser environment)
JSONP=true npm run test:e2e
JSONP=true npm run test:module
```

## 🤝 Contributing

We welcome contributions! Please see our development guide for setup instructions.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/RobJacobson/ws-dottie.git
cd ws-dottie

# Install dependencies
npm install

# Run tests
npm run test

# Start development server
npm run dev
```

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details.

---

**Made with ❤️ for Washington State travelers**
