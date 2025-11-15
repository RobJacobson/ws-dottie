# Troubleshooting Guide

This guide helps you resolve common issues when using WS-Dottie, from setup to advanced usage scenarios.

> **📚 Documentation Navigation**: [../README.md](../README.md) • [Getting Started](../getting-started.md) • [API Guide](../api-guide.md)

## 🔧 Common Issues

### API Key Problems

#### API Key Not Working

**Symptoms:**
- Error messages about missing or invalid API key
- 401 Unauthorized responses from API
- Empty data responses

**Solutions:**
1. Verify your API key is correct and active
   ```bash
   # Test your API key with CLI
   fetch-dottie fetchVesselLocations
   ```

2. Check environment variable naming
   ```javascript
   // For Create React App
   console.log(process.env.REACT_APP_WSDOT_ACCESS_TOKEN);
   
   // For Vite
   console.log(process.env.VITE_WSDOT_ACCESS_TOKEN);
   
   // For Next.js
   console.log(process.env.NEXT_PUBLIC_WSDOT_ACCESS_TOKEN);
   ```

3. Ensure environment variables are loaded
   ```javascript
   // Add debugging to verify
   console.log('API Key:', process.env.WSDOT_ACCESS_TOKEN ? 'Set' : 'Not set');
   ```

4. Restart your development server after changing environment variables

#### API Key Revoked or Expired

**Symptoms:**
- Previously working API calls now return 401 errors
- Intermittent authentication failures

**Solutions:**
1. Generate a new API key from [WSDOT Developer Portal](https://wsdot.wa.gov/developers/api-access)
2. Update your environment configuration
3. Consider implementing key rotation for production applications

### Import/Export Issues

#### Module Not Found Errors

**Symptoms:**
- `Module not found: 'ws-dottie/wsf-vessels'`
- `Cannot resolve module 'ws-dottie'`
- TypeScript errors about missing modules

**Solutions:**
1. Verify you're using the correct import path
   ```javascript
   // Correct for React hooks
   import { useVesselLocations } from 'ws-dottie/wsf-vessels';
   
   // Correct for fetch functions
   import { fetchVesselLocations } from 'ws-dottie/wsf-vessels/core';
   
   // Correct for types
   import type { VesselLocation } from 'ws-dottie/wsf-vessels';
   ```

2. Check your package.json for correct version
   ```bash
   # Verify installed version
   npm list ws-dottie
   
   # Update to latest version
   npm install ws-dottie@latest
   ```

3. Clear node_modules and reinstall
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

#### TypeScript Compilation Errors

**Symptoms:**
- Type errors about missing properties or methods
- `Cannot find module 'ws-dottie' or its type declarations`
- Errors about incompatible types

**Solutions:**
1. Update TypeScript to latest version
   ```bash
   npm install -D typescript@latest
   ```

2. Check tsconfig.json configuration
   ```json
   {
     "compilerOptions": {
       "moduleResolution": "node",
       "esModuleInterop": true,
       "allowSyntheticDefaultImports": true
     }
   }
   ```

3. Use explicit type imports
   ```typescript
   // Import types explicitly
   import type { VesselLocation } from 'ws-dottie/wsf-vessels';
   
   // Use type assertions if needed
   const vessels = await fetchVesselLocations() as VesselLocation[];
   ```

### Network Issues

#### CORS Errors in Browser

**Symptoms:**
- CORS policy errors in browser console
- Failed network requests with CORS-related error messages
- Empty responses in browser but successful in CLI

**Solutions:**
1. Use JSONP mode for browser requests
   ```javascript
   // Configure for browser
   const { data: vessels } = useVesselLocations({
     fetchMode: 'jsonp', // Bypasses CORS
     validate: true
   });
   ```

2. Set up a proxy server for production
   ```javascript
   // Configure proxy in production
   configManager.setBaseUrl('https://your-proxy-server.com');
   ```

#### Timeouts and Slow Responses

**Symptoms:**
- Requests taking a long time to complete
- Timeout errors
- Slow application performance

**Solutions:**
1. Increase timeout configuration
   ```javascript
   configManager.configure({
     timeout: 30000, // 30 seconds
     retries: 2,
     retryDelay: 1000
   });
   ```

2. Optimize your requests
   ```javascript
   // Disable validation for faster responses
   const vessels = await fetchVesselLocations({
     validate: false // Faster parsing
   });
   ```

3. Implement request cancellation
   ```javascript
   import { useVesselLocations } from 'ws-dottie/wsf-vessels';
   
   function VesselComponent() {
     const { data: vessels, refetch } = useVesselLocations();
     
     const handleRefresh = () => {
       refetch(); // Cancel previous request and start new one
     };
     
     return (
       <div>
         <button onClick={handleRefresh}>Refresh</button>
         {/* Display vessels */}
       </div>
     );
   }
   ```

### Data Issues

#### Empty or Unexpected Responses

**Symptoms:**
- API calls return empty arrays or null
- Data structure doesn't match documentation
- Unexpected values in response

**Solutions:**
1. Check API status and availability
   ```bash
   # Check WSDOT API status
   curl -I https://wsdot.wa.gov/ferries/api/vessels/rest/vessellocations
   ```

2. Validate response with schema
   ```javascript
   // Enable validation to catch schema mismatches
   const vessels = await fetchVesselLocations({
     validate: true // Will throw descriptive errors
   });
   ```

3. Check for API deprecations
   ```javascript
   // Look for deprecation warnings in response
   console.warn('Check for deprecation warnings in API response');
   ```

#### Date/Time Conversion Issues

**Symptoms:**
- Dates showing as strings instead of Date objects
- Incorrect timezone handling
- Invalid date values

**Solutions:**
1. Verify .NET date conversion is working
   ```javascript
   // Check if dates are properly converted
   const vessels = await fetchVesselLocations();
   console.log(vessels[0]?.DepartingTime instanceof Date); // Should be true
   ```

2. Handle timezone differences
   ```javascript
   // Convert to local timezone if needed
   const localTime = new Date(vessel.DepartingTime);
   const adjustedTime = new Date(localTime.getTime() + timezoneOffset * 60000);
   ```

### React Integration Issues

#### Components Not Re-rendering with Data Changes

**Symptoms:**
- UI not updating when data changes
- Stale data displayed
- Hooks not triggering re-renders

**Solutions:**
1. Check query key dependencies
   ```javascript
   // Ensure query keys change when data changes
   const { data: vessels } = useVesselLocations({
     params: { routeId: selectedRoute }, // Changes when selectedRoute changes
   });
   ```

2. Manually invalidate queries when needed
   ```javascript
   import { useQueryClient } from '@tanstack/react-query';
   
   function RefreshButton() {
     const queryClient = useQueryClient();
     
     const handleRefresh = () => {
       queryClient.invalidateQueries(['vesselLocations']);
     };
     
     return <button onClick={handleRefresh}>Refresh</button>;
   }
   ```

#### Memory Leaks in React Components

**Symptoms:**
- Memory usage increasing over time
- Performance degradation
- Browser crashes on memory-intensive pages

**Solutions:**
1. Properly cleanup effects
   ```javascript
   import { useEffect } from 'react';
   
   function VesselMap({ vesselId }) {
     useEffect(() => {
       // Setup map for vessel
       const map = initializeMap();
       
       return () => {
         // Cleanup when component unmounts
         map.destroy();
       };
     }, [vesselId]); // Only recreate when vesselId changes
   }
   ```

2. Avoid storing large datasets in state
   ```javascript
   // Bad: Storing large array in state
   const [allVessels, setAllVessels] = useState([]);
   
   // Good: Using pagination or virtualization
   const { data: vessels } = useVesselLocations();
   const displayedVessels = vessels?.slice(0, 10); // Only display first 10
   ```

### CLI Issues

#### Command Not Found

**Symptoms:**
- `command not found: fetch-dottie`
- Permission denied errors
- CLI not working after installation

**Solutions:**
1. Verify installation
   ```bash
   # Check if CLI is installed
   npm list -g | grep fetch-dottie
   
   # Or use npx without installation
   npx fetch-dottie --help
   ```

2. Check PATH environment
   ```bash
   # Add npm global bin to PATH
   export PATH=$(npm config get prefix)/bin:$PATH
   ```

3. Use package.json scripts
   ```json
   {
     "scripts": {
       "fetch-vessels": "fetch-dottie fetchVesselLocations"
     }
   }
   
   // Then run with
   npm run fetch-vessels
   ```

#### Output Formatting Issues

**Symptoms:**
- Malformed JSON output
- Excessive output in terminal
- Special characters not displaying correctly

**Solutions:**
1. Use appropriate output flags
   ```bash
   # Pretty print with 2-space indentation
   fetch-dottie fetchVesselLocations --pretty
   
   # Limit output to first 5 items
   fetch-dottie fetchVesselLocations --limit 5
   
   # Silent mode (JSON only)
   fetch-dottie fetchVesselLocations --silent
   ```

2. Pipe to other tools for formatting
   ```bash
   # Format with jq
   fetch-dottie fetchVesselLocations | jq '.[] | {VesselName, Latitude, Longitude}'
   
   # Save to file
   fetch-dottie fetchVesselLocations > vessels.json
   ```

## 🔍 Debugging Techniques

### Browser Debugging

1. Use browser dev tools
   ```javascript
   // Add debugging to your application
   configManager.configure({
     logLevel: 'debug' // Shows detailed request/response info
   });
   
   // Or enable per-request
   const vessels = await fetchVesselLocations({
     logMode: 'debug' // Override global setting
   });
   ```

2. Monitor network requests
   ```javascript
   // Check Network tab in dev tools
   // Verify correct URLs, headers, and responses
   ```

3. Use React DevTools
   ```javascript
   // Install React Developer Tools
   // Inspect component props and state
   // Check TanStack Query devtools
   ```

### Server-Side Debugging

1. Add request logging
   ```javascript
   // Enable detailed logging
   const vessels = await fetchVesselLocations({
     logMode: 'debug'
   });
   
   // Or add custom logging
   console.log('Request URL:', 'https://wsdot.wa.gov/ferries/api/vessels/rest/vessellocations');
   console.log('Response:', vessels);
   ```

2. Use Node.js debugging
   ```bash
   # Run with Node.js inspector
   node --inspect your-app.js
   
   # Or with VS Code
   code --inspect your-app.js
   ```

3. Test endpoints individually
   ```javascript
   // Isolate problematic endpoints
   try {
     const vessels = await fetchVesselLocations({ validate: true });
     console.log('Vessels:', vessels.length);
   } catch (error) {
     console.error('Vessel locations failed:', error);
   }
   ```

### Performance Debugging

1. Measure API response times
   ```javascript
   // Add timing to your requests
   const start = Date.now();
   const vessels = await fetchVesselLocations();
   const duration = Date.now() - start;
   console.log(`API call took ${duration}ms`);
   ```

2. Profile memory usage
   ```javascript
   // Check memory before and after API calls
   const before = process.memoryUsage();
   const vessels = await fetchVesselLocations();
   const after = process.memoryUsage();
   
   console.log('Memory delta:', {
     heapUsed: after.heapUsed - before.heapUsed,
     heapTotal: after.heapTotal - before.heapTotal
   });
   ```

## 📋 Getting Help

### Self-Service Resources

1. Check the [API Guide](../api-guide.md) for usage examples
2. Review the [Performance Guide](./performance-guide.md) for optimization tips
3. Search existing [GitHub issues](https://github.com/RobJacobson/ws-dottie/issues) for similar problems

### Reporting Issues

When reporting an issue, include:

1. Environment details
   - Node.js version
   - Browser version
   - WS-Dottie version
   - Operating system

2. Code example
   - Minimal reproduction case
   - Full error message
   - Expected vs. actual behavior

3. Debug logs
   - Request/response details
   - Console output
   - Network request details

```javascript
// Example issue report
**Environment:**
- Node.js 18.17.0
- Chrome 120.0.0.0
- WS-Dottie 1.2.0
- macOS 14.2

**Code:**
```javascript
import { useVesselLocations } from 'ws-dottie/wsf-vessels';

function TestComponent() {
  const { data: vessels, error } = useVesselLocations({
    fetchMode: 'native',
    validate: true
  });
  
  if (error) {
    console.error('Error fetching vessels:', error);
  }
  
  return <div>Vessels: {vessels?.length || 0}</div>;
}
```

**Error:**
```
TypeError: Cannot read properties of undefined (reading 'length')
```

**Expected:**
Component should display the number of vessels returned from the API.
```

## 🚀 Advanced Troubleshooting

### Custom Error Handling

Implement robust error handling for production applications:

```javascript
import { useVesselLocations } from 'ws-dottie/wsf-vessels';

function useVesselData() {
  const { data: vessels, error, isLoading, retry } = useVesselLocations({
    fetchMode: 'native',
    validate: false,
    retry: 3, // Custom retry count
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 10000), // Exponential backoff
    onError: (error) => {
      // Custom error handling
      console.error('Vessel API error:', error);
      
      // Send to error reporting service
      if (error.statusCode >= 500) {
        reportError(error);
      }
    }
  });
  
  return { vessels, error, isLoading, retry };
}
```

### Request Optimization

Optimize requests for specific use cases:

```javascript
// For real-time data (prioritize speed over validation)
const realTimeVessels = await fetchVesselLocations({
  fetchMode: 'native',
  validate: false, // Faster
  logMode: 'none' // Minimal overhead
});

// For critical data (prioritize accuracy over speed)
const criticalAlerts = await fetchAlerts({
  fetchMode: 'native',
  validate: true, // Ensure data integrity
  logMode: 'debug' // Detailed logging
});
```
