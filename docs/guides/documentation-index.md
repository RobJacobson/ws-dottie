# Documentation Index

This index provides an overview of all WS-Dottie documentation, organized by category and purpose to help you quickly find the information you need.

## 📚 Core Documentation

### Getting Started
- [Getting Started Guide](../getting-started/getting-started.md) - Installation, setup, and basic usage
- [Quick Reference](../getting-started/quick-start.md) - Common patterns and examples

### API Guides
- [API Guide](./api-guide.md) - High-level API overview and use cases
- [Migration Guide](./advanced/migration-guide.md) - Version migration instructions

### Architecture
- [Architecture Documentation](./architecture.md) - System architecture and design principles

### Implementation Guides
- **[TanStack Query Guide](./advanced/tanstack-query.md)** - React integration with TanStack Query
  - Tags: `react`, `caching`, `performance`
  - Experience: Intermediate
- **[Fetching Data Guide](./fetching-data.md)** - Basic fetch-dottie usage patterns
  - Tags: `basics`, `api-calls`, `examples`
  - Experience: Beginner
- **[CLI Usage Guide](./cli-usage.md)** - Command-line interface and debugging
  - Tags: `cli`, `debugging`, `testing`
  - Experience: Beginner
- **[Error Handling Guide](./error-handling.md)** - Common error patterns and solutions
  - Tags: `errors`, `debugging`
  - Experience: Intermediate
- **[Validation Guide](./advanced/validation-guide.md)** - Zod validation system and best practices
  - Tags: `validation`, `performance`, `zod`, `typescript`
  - Experience: Intermediate

## 📊 Category Documentation

### Ferries
- [Ferries Documentation](./categories/ferries.md) - Vessel tracking, terminals, schedules, and fares
- [Ferry Examples](../examples/ferries.md) - Complete ferry application examples

### Traffic
- [Traffic Documentation](./categories/traffic.md) - Highway alerts, traffic flow, and travel times
- [Traffic Examples](../examples/traffic.md) - Traffic monitoring and analysis examples

### Weather
- [Weather Documentation](./categories/weather.md) - Weather conditions, stations, and mountain passes
- [Weather Examples](../examples/weather.md) - Weather monitoring and analysis examples

### Infrastructure
- [Infrastructure Documentation](./categories/infrastructure.md) - Bridge clearances, toll rates, and border crossings
- [Infrastructure Examples](../examples/infrastructure.md) - Commercial vehicle routing examples

## 🔧 Reference Materials

### API Reference
- [Endpoints Reference](./endpoints.md) - Complete endpoint reference table

### Interactive Documentation
- [OpenAPI Specifications](../generated/openapi/) - API specifications in YAML format
- [HTML Documentation](../api-reference/redoc/) - Interactive HTML documentation with examples

## 📊 Additional Resources

- **[Sample Data](../generated/sample-data/)** - Sample API responses for testing
- **[Official Documentation](../official-docs/)** - Original WSDOT and WSF documentation
- **[Release Notes](../generated/releases/)** - Version history and changes

## 🏷️ Tags

All documentation pages include tags to help you find relevant content:

- `beginner` - Content for users new to WS-Dottie
- `intermediate` - Content for users with some experience
- `advanced` - Content for experienced users and complex use cases
- `reference` - Content for quick lookup and reference
- `tutorial` - Step-by-step guides and examples
- `errors` - Content for resolving issues and problems

## 📋 Finding Information

### Quick Links

- **For New Users**: Start with [Getting Started Guide](./getting-started.md)
- **For Common Questions**: Check [FAQ](./faq.md) (coming soon)
- **For Issues**: Check [Error Handling Guide](./guides/error-handling.md) or [GitHub Issues](https://github.com/RobJacobson/ws-dottie/issues)
- **For Examples**: See category-specific example directories

### Documentation Structure

```
docs/overview/
├── README.md                 # Main overview and quick start
├── getting-started.md         # Installation and setup guide
├── quick-reference.md           # Common patterns and examples
├── api-guide.md               # High-level API overview
├── architecture.md             # System architecture
├── migration-guide.md           # Version migration instructions
├── performance-guide.md         # Performance optimization
├── tanstack-query.md            # React integration
├── fetching-data.md            # Basic fetch patterns
├── cli-usage.md               # Command-line interface
├── error-handling.md            # Common error patterns and solutions
├── documentation-index.md       # This file (documentation index)
├── categories/
│   ├── ferries.md              # Ferry-specific documentation
│   ├── traffic.md              # Traffic-specific documentation
│   ├── weather.md              # Weather-specific documentation
│   └── infrastructure.md        # Infrastructure-specific documentation
└── guides/
    ├── tanstack-query.md         # React integration
    ├── fetching-data.md            # Basic fetch patterns
    ├── cli-usage.md               # Command-line interface
    └── error-handling.md            # Common error patterns and solutions
└── examples/
    ├── ferries.md              # Ferry application examples
    ├── traffic.md              # Traffic application examples
    ├── weather.md              # Weather application examples
    └── infrastructure.md        # Infrastructure application examples
```

This structure helps you quickly locate the documentation most relevant to your needs and experience level.
