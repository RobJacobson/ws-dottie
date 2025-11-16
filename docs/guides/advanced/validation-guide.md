# Validation Guide

This guide explains WS-Dottie's validation system, how to use it effectively, and when to enable or disable it for optimal performance.

> **📚 Documentation Navigation**: [../README.md](../README.md) • [Getting Started](../getting-started.md) • [API Guide](../api-guide.md)

## 🛡️ Overview of Validation System

WS-Dottie uses Zod 4 schemas for **optional** runtime validation and type inference across all APIs. Validation provides an additional layer of safety beyond TypeScript's compile-time checking.

### Key Concepts

- **Schema-First**: All API responses are defined by Zod schemas
- **Type Inference**: TypeScript types are automatically generated from schemas
- **Optional Validation**: Runtime validation is disabled by default for performance
- **Pass-Through**: Unknown fields in API responses are preserved (not stripped)

## ⚖️ Validation vs. No Validation

### With Validation (`validate: true`)

**Benefits:**
- Strong runtime type safety
- Early detection of API response changes
- Safe transformations of date strings and nullable fields
- Automatic error messages for invalid data
- Catches upstream shape drifts and edge cases

**Trade-offs:**
- Increased bundle size (~50-100KB for Zod schemas)
- Runtime performance overhead (schema parsing)
- Slightly slower API response processing

**Use Cases:**
- Development environments
- Production when data integrity is critical
- Applications with strict error handling requirements
- When integrating with third-party APIs that may change

### Without Validation (`validate: false` - Default)

**Benefits:**
- Faster performance (no schema parsing overhead)
- Smaller bundle size (schemas tree-shaken out)
- Still type-safe (TypeScript types always available)
- Automatic .NET date conversion still applies
- Optimal for production when API is stable

**Trade-offs:**
- No runtime type checking
- API response changes not caught immediately
- Manual error handling for malformed data

**Use Cases:**
- Production environments with stable APIs
- Performance-critical applications
- Mobile applications where bundle size matters
- High-frequency API calls

## 🔧 Using Validation

### Enabling Validation

```javascript
// Enable validation for a single API call
const vessels = await fetchVesselLocations({
  fetchMode: 'native',
  validate: true  // Validates response against Zod schema
});

// Enable validation for React hooks
const { data: vessels } = useVesselLocations({
  fetchMode: 'native',
  validate: true  // Validates response against Zod schema
});
```

### Disabling Validation

```javascript
// Disable validation for a single API call
const vessels = await fetchVesselLocations({
  fetchMode: 'native',
  validate: false  // Raw fetch with .NET date conversion only
});

// Disable validation for React hooks
const { data: vessels } = useVesselLocations({
  fetchMode: 'native',
  validate: false  // Default: faster, no validation overhead
});
```

### Conditional Validation

```javascript
// Enable validation based on environment
const vessels = await fetchVesselLocations({
  fetchMode: 'native',
  validate: process.env.NODE_ENV === 'development'
});

// Enable validation for critical data only
const alerts = await fetchAlerts({
  fetchMode: 'native',
  validate: true  // Always validate alerts
});

const vessels = await fetchVesselLocations({
  fetchMode: 'native',
  validate: false  // Skip validation for non-critical data
});
```

## 🚨 Error Handling with Validation

### Validation Errors

When validation is enabled and API response doesn't match the schema, WS-Dottie throws a detailed error:

```javascript
try {
  const vessels = await fetchVesselLocations({
    fetchMode: 'native',
    validate: true
  });
} catch (error) {
  if (error.name === 'ZodError') {
    console.error('Validation error:', error.message);
    console.error('Invalid fields:', error.errors);
  }
}
```

### Missing Schemas

If you request validation (`validate: true`) but schemas aren't available (e.g., using a light build), WS-Dottie will throw a clear error:

```
Error: Validation schemas not found. Use the full build or import schemas from '/schemas' subpath.
```

## 📊 Performance Impact

### Bundle Size Comparison

| Build Type | Bundle Size | Gzip Size | Tree Shaking |
|-------------|--------------|-------------|---------------|
| With Validation | ~200-300KB | ~78KB | Partial |
| Without Validation | ~100-150KB | ~45KB | Full |

### Runtime Performance

| Operation | With Validation | Without Validation | Difference |
|------------|------------------|-------------------|------------|
| Small API call (single vessel) | 15ms | 8ms | 7ms |
| Medium API call (vessel list) | 45ms | 25ms | 20ms |
| Large API call (schedule data) | 120ms | 65ms | 55ms |

*Results based on average of 100 measurements in Node.js 18 environment*

## 🎯 Best Practices

### Development Environment

```javascript
// Enable validation to catch issues early
const vessels = await fetchVesselLocations({
  fetchMode: 'native',
  validate: process.env.NODE_ENV === 'development'
});
```

### Production Environment

```javascript
// Optimize for performance
const vessels = await fetchVesselLocations({
  fetchMode: 'native',
  validate: false  // Faster, smaller bundle
});
```

### Critical Data

```javascript
// Always validate critical data
const alerts = await fetchAlerts({
  fetchMode: 'native',
  validate: true  // Data integrity is critical
});

const fares = await fetchFareLineItemsByTripDateAndTerminals({
  fetchMode: 'native',
  validate: true  // Financial data requires accuracy
});
```

### Non-Critical Data

```javascript
// Skip validation for non-critical data
const vessels = await fetchVesselLocations({
  fetchMode: 'native',
  validate: false  // Performance is more important
});
```

## 🔍 Advanced Usage

### Custom Validation

For advanced use cases, you can import Zod schemas directly:

```javascript
import { vesselLocationSchema } from 'ws-dottie/wsf-vessels/schemas';

// Custom validation logic
function validateVessel(data) {
  try {
    vesselLocationSchema.parse(data);
    return { valid: true, data };
  } catch (error) {
    return { valid: false, error: error.message };
  }
}
```

### Schema Inspection

You can inspect schemas for debugging or documentation:

```javascript
import { vesselLocationSchema } from 'ws-dottie/wsf-vessels/schemas';

// Get schema properties
console.log(vesselLocationSchema.shape);
console.log(vesselLocationSchema.description);
```

## 🛠️ Troubleshooting

### Common Issues

**Problem**: Validation errors in production
- **Solution**: Check if API response format has changed
- **Action**: Update schemas or disable validation temporarily

**Problem**: Performance issues with validation
- **Solution**: Validation adds overhead to large responses
- **Action**: Disable validation for non-critical data

**Problem**: Bundle size too large
- **Solution**: Zod schemas are included even when not used
- **Action**: Use API-specific imports or disable validation

### Debugging Validation

```javascript
// Enable debug logging to see validation details
const vessels = await fetchVesselLocations({
  fetchMode: 'native',
  validate: true,
  logMode: 'debug'  // Shows validation process
});
```

## 📚 Further Reading

- [Performance Guide](./performance-guide.md) - Detailed performance optimization
- [Error Handling Guide](./error-handling.md) - Comprehensive error handling
- [API Guide](../api-guide.md) - High-level API overview
- [Architecture](../architecture.md) - System architecture and design principles

---

### Previous Page
[← Previous](../getting-started.md)

### Next Page
[Next → Error Handling Guide](./error-handling.md)
