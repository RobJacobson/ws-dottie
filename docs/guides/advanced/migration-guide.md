# Migration Guide

This guide helps you migrate your applications from previous versions of WS-Dottie to the current version (1.2.0).

> **📚 Documentation Navigation**: [../README.md](../README.md) • [Getting Started](../getting-started.md) • [API Guide](../api-guide.md)

## 🚀 Version 1.2.0 Migration

### Breaking Changes

#### Import Path Changes

**Before (v1.1.x and earlier):**
```javascript
// All imports from root package
import { useVesselLocations, fetchVesselLocations } from 'ws-dottie';
```

**After (v1.2.0+):**
```javascript
// API-specific imports (recommended)
import { useVesselLocations } from 'ws-dottie/wsf-vessels';
import { fetchVesselLocations } from 'ws-dottie/wsf-vessels/core';

// Shared utilities still from root
import { configManager, fetchDottie } from 'ws-dottie';
```

#### Configuration API Changes

**Before (v1.1.x and earlier):**
```javascript
// Direct configuration
import { setApiKey, setBaseUrl } from 'ws-dottie';
setApiKey('your_key');
setBaseUrl('https://proxy.example.com');
```

**After (v1.2.0+):**
```javascript
// Centralized configuration manager
import { configManager } from 'ws-dottie';
configManager.setApiKey('your_key');
configManager.setBaseUrl('https://proxy.example.com');

// Or configure multiple options at once
configManager.configure({
  apiKey: 'your_key',
  baseUrl: 'https://proxy.example.com'
});
```

#### Function Parameter Changes

**Before (v1.1.x and earlier):**
```javascript
// Multiple parameters
fetchVesselLocations(params, fetchMode, validate);

// Hook with separate options
useVesselLocations(params, queryOptions);
```

**After (v1.2.0+):**
```javascript
// Single parameter object
fetchVesselLocations({
  params,
  fetchMode,
  validate
});

// Hook with unified options
useVesselLocations({
  params,
  fetchMode,
  validate
}, queryOptions);
```

### Migration Steps

#### Step 1: Update Package Dependencies

```bash
# Update to latest version
npm install ws-dottie@latest

# Or update with specific version
npm install ws-dottie@1.2.0
```

#### Step 2: Update Import Statements

Find all imports from 'ws-dottie' in your codebase and update them:

```bash
# Find all imports to update
grep -r "from 'ws-dottie'" src/
```

Update imports using this pattern:

```javascript
// Before
import { useVesselLocations, useAlerts, fetchVesselLocations } from 'ws-dottie';

// After
import { useVesselLocations } from 'ws-dottie/wsf-vessels';
import { useAlerts } from 'ws-dottie/wsdot-highway-alerts';
import { fetchVesselLocations } from 'ws-dottie/wsf-vessels/core';
```

#### Step 3: Update Configuration Code

Replace old configuration API with new configManager:

```javascript
// Before
import { setApiKey, setBaseUrl } from 'ws-dottie';
setApiKey(process.env.API_KEY);
setBaseUrl(process.env.BASE_URL);

// After
import { configManager } from 'ws-dottie';
configManager.configure({
  apiKey: process.env.API_KEY,
  baseUrl: process.env.BASE_URL
});
```

#### Step 4: Update Function Calls

Update function calls to use new parameter structure:

```javascript
// Before
const vessels = await fetchVesselLocations(params, 'native', false);
const { data } = useVesselLocations(params, { staleTime: 5000 });

// After
const vessels = await fetchVesselLocations({
  params,
  fetchMode: 'native',
  validate: false
});
const { data } = useVesselLocations({
  params,
  fetchMode: 'native',
  validate: false
}, { staleTime: 5000 });
```

#### Step 5: Test Your Application

After updating imports and function calls, test your application:

```bash
# Start your application
npm start

# Check for any runtime errors
npm test
```

## 🔄 Common Migration Scenarios

### React Application Migration

**Scenario:** You have a React application using WS-Dottie v1.1.x

**Steps:**
1. Update package dependencies
2. Update all hook imports to use API-specific paths
3. Update hook calls to use new parameter structure
4. Test all components that use WS-Dottie hooks

**Example:**
```javascript
// Before (v1.1.x)
import { useVesselLocations, useAlerts } from 'ws-dottie';

function FerryTracker() {
  const { data: vessels } = useVesselLocations({}, 'native', false);
  const { data: alerts } = useAlerts({}, 'native', true);
  
  return (
    <div>
      <h2>Ferries: {vessels?.length || 0}</h2>
      <h2>Alerts: {alerts?.length || 0}</h2>
    </div>
  );
}

// After (v1.2.0+)
import { useVesselLocations } from 'ws-dottie/wsf-vessels';
import { useAlerts } from 'ws-dottie/wsdot-highway-alerts';

function FerryTracker() {
  const { data: vessels } = useVesselLocations({
    fetchMode: 'native',
    validate: false
  });
  const { data: alerts } = useAlerts({
    fetchMode: 'native',
    validate: true
  });
  
  return (
    <div>
      <h2>Ferries: {vessels?.length || 0}</h2>
      <h2>Alerts: {alerts?.length || 0}</h2>
    </div>
  );
}
```

### Node.js Application Migration

**Scenario:** You have a Node.js server using WS-Dottie v1.1.x

**Steps:**
1. Update package dependencies
2. Update all fetch function imports to use `/core` paths
3. Update fetch function calls to use new parameter structure
4. Test all API endpoints used by your server

**Example:**
```javascript
// Before (v1.1.x)
import { fetchVesselLocations, fetchAlerts } from 'ws-dottie';

app.get('/api/ferry-data', async (req, res) => {
  const vessels = await fetchVesselLocations({}, 'native', false);
  const alerts = await fetchAlerts({}, 'native', true);
  
  res.json({ vessels, alerts });
});

// After (v1.2.0+)
import { fetchVesselLocations } from 'ws-dottie/wsf-vessels/core';
import { fetchAlerts } from 'ws-dottie/wsdot-highway-alerts/core';

app.get('/api/ferry-data', async (req, res) => {
  const vessels = await fetchVesselLocations({
    fetchMode: 'native',
    validate: false
  });
  const alerts = await fetchAlerts({
    fetchMode: 'native',
    validate: true
  });
  
  res.json({ vessels, alerts });
});
```

### CLI Tool Migration

**Scenario:** You have scripts using the WS-Dottie CLI from v1.1.x

**Steps:**
1. Update package dependencies
2. Update CLI command usage (no changes needed for basic commands)
3. Test all scripts that use the CLI

**Example:**
```bash
# No changes needed for basic commands
fetch-dottie --list
fetch-dottie fetchVesselLocations

# Output formatting remains the same
fetch-dottie fetchVesselLocations --pretty
fetch-dottie fetchVesselLocations --limit 5
```

## 🐛 Troubleshooting Migration Issues

### Import Errors

**Problem:** `Module not found: 'ws-dottie/wsf-vessels'`

**Solution:**
1. Ensure you're using v1.2.0 or later
2. Clear your node_modules and reinstall:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

### Configuration Errors

**Problem:** `configManager is not defined`

**Solution:**
1. Update your imports to use the new configManager:
   ```javascript
   import { configManager } from 'ws-dottie';
   ```

### Function Parameter Errors

**Problem:** `TypeError: fetchVesselLocations is not a function`

**Solution:**
1. Check that you're importing from the correct path
2. For fetch functions, ensure you're importing from `/core`:
   ```javascript
   import { fetchVesselLocations } from 'ws-dottie/wsf-vessels/core';
   ```

### Type Errors

**Problem:** TypeScript errors about missing properties

**Solution:**
1. Update your types to use the new parameter structure:
   ```typescript
   // Before
   function callFetch(params: any, fetchMode: string, validate: boolean) {
   
   // After
   function callFetch(options: {
     params?: any;
     fetchMode?: string;
     validate?: boolean;
   }) {
   ```

## 📋 Migration Checklist

- [ ] Update ws-dottie to v1.2.0 or later
- [ ] Update all imports to use API-specific paths
- [ ] Replace old configuration API with configManager
- [ ] Update all function calls to use new parameter structure
- [ ] Test all components using WS-Dottie
- [ ] Update TypeScript types if needed
- [ ] Verify all API endpoints still work
- [ ] Update documentation for your team

## 🆘 Need Help?

If you encounter issues during migration:

1. Check the [Troubleshooting Guide](./troubleshooting.md) for common problems
2. Review the [API Guide](../api-guide.md) for updated usage patterns
3. Open an issue on [GitHub](https://github.com/RobJacobson/ws-dottie/issues) with:
   - Version you're migrating from
   - Version you're migrating to
   - Error messages you're seeing
   - Code example that demonstrates the issue
