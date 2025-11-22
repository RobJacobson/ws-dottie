# WS-Dottie Documentation

Welcome to the WS-Dottie documentation! This guide will help you get started with Washington State transportation APIs.

## 🚀 Quick Start

- **[Getting Started](./getting-started.md)** - New to WS-Dottie? Start here

## 📚 User Guides

- **[API Guide](./guides/api-guide.md)** - High-level API overview and use cases
- **[Architecture](./guides/architecture.md)** - System architecture and design principles
- **[Categories](./guides/categories/)** - Documentation by data category
  - [Ferries](./guides/categories/ferries.md) - Vessel tracking, terminals, schedules, and fares
  - [Traffic](./guides/categories/traffic.md) - Highway alerts, traffic flow, and travel times
  - [Weather](./guides/categories/weather.md) - Weather conditions, stations, and mountain passes
  - [Infrastructure](./guides/categories/infrastructure.md) - Bridge clearances, toll rates, and border crossings

## 🔧 Advanced Guides

- **[TanStack Query Integration](./guides/advanced/tanstack-query.md)** - React integration with TanStack Query
  - Tags: `react`, `caching`, `performance`
  - Experience: Intermediate
- **[Validation Guide](./guides/advanced/validation-guide.md)** - Zod validation system and best practices
  - Tags: `validation`, `performance`, `zod`, `typescript`
  - Experience: Intermediate
- **[Performance Guide](./guides/advanced/performance-guide.md)** - Optimization techniques
  - Tags: `performance`, `optimization`
  - Experience: Advanced

## 📖 Reference Materials

- **[Endpoints Reference](./guides/endpoints.md)** - Complete endpoint reference table
- **[API Reference](./api-reference/)** - Technical API documentation
  - [Interactive HTML Documentation](./api-reference/) - Browse APIs with examples
  - [OpenAPI Specifications (JSON)](./generated/openapi-json/) - API specifications in JSON format
  - [OpenAPI Specifications (YAML)](./generated/openapi-yaml/) - API specifications in YAML format

## 🛠️ Developer Resources

- **[CLI Usage](./guides/advanced/cli-usage.md)** - Command-line interface and debugging
  - Tags: `cli`, `debugging`, `testing`
  - Experience: Beginner
- **[Error Handling](./guides/advanced/error-handling.md)** - Troubleshooting common issues
  - Tags: `errors`, `debugging`
  - Experience: Intermediate
- **[Fetching Data](./guides/advanced/fetching-data.md)** - Basic fetch-dottie usage patterns
  - Tags: `basics`, `api-calls`, `examples`
  - Experience: Beginner

## 📊 Additional Resources

- **[Sample Data](./generated/sample-data/)** - Sample API responses for testing
- **[Official Documentation](./official-docs/)** - Original WSDOT and WSF documentation
- **[Release Notes](./generated/releases/)** - Version history and changes

## 🔍 Finding Information

### For New Users
1. Start with [Getting Started](./getting-started.md)
2. Explore [Categories](./guides/categories/) relevant to your use case

### For Experienced Users
1. Check the [Endpoints Reference](./guides/endpoints.md) for available functions
2. Browse [API Reference](./api-reference/) for technical details
3. Use [Interactive Documentation](./api-reference/) for live examples

### For Troubleshooting
1. Check the [Error Handling Guide](./guides/advanced/error-handling.md)
2. Review [GitHub Issues](https://github.com/RobJacobson/ws-dottie/issues)
3. Check [Release Notes](./generated/releases/) for recent changes

## 🏷️ Documentation Tags

All documentation pages include tags to help you find relevant content:

- `beginner` - Content for users new to WS-Dottie
- `intermediate` - Content for users with some experience
- `advanced` - Content for experienced users and complex use cases
- `reference` - Content for quick lookup and reference
- `tutorial` - Step-by-step guides and examples
- `errors` - Content for resolving issues and problems

## 📁 Documentation Structure

```
docs/
├── INDEX.md                     # This file (main documentation index)
├── getting-started.md            # Installation and setup guide
├── guides/
│   ├── api-guide.md             # High-level API overview
│   ├── architecture.md           # System architecture
│   ├── endpoints.md             # Complete endpoint reference
│   ├── advanced/
│   │   ├── cli-usage.md         # Command-line interface
│   │   ├── error-handling.md    # Common error patterns
│   │   ├── fetching-data.md     # Basic fetch patterns
│   │   ├── performance-guide.md # Performance optimization
│   │   ├── tanstack-query.md   # React integration
│   │   └── validation-guide.md  # Zod validation
│   └── categories/
│       ├── ferries.md           # Ferry-specific documentation
│       ├── infrastructure.md    # Infrastructure documentation
│       ├── traffic.md           # Traffic-specific documentation
│       └── weather.md           # Weather-specific documentation
├── api-reference/               # Interactive HTML documentation
├── generated/
│   ├── openapi-json/           # OpenAPI JSON specifications
│   ├── openapi-yaml/           # OpenAPI YAML specifications
│   └── sample-data/            # Sample API responses
└── official-docs/              # Original WSDOT and WSF documentation
```

This structure helps you quickly locate the documentation most relevant to your needs and experience level.
