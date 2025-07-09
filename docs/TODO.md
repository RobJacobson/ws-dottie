# TODO

## Error Handling
- [ ] Decide on error handling strategy (throw vs return null/empty arrays)
- [ ] Implement error boundaries if needed
- [ ] Add error reporting/monitoring integration
- [ ] Define error types and error response structures

## React Query Integration
- [x] Let React Query handle loading states
- [x] Let React Query handle request deduplication
- [x] Document React Query integration patterns
- [x] Provide example hooks that work with React Query
- [x] **Pattern**: Set `enabled` before spread operator when conditional logic is needed
  ```typescript
  useQuery({
    queryKey: ['key'],
    queryFn: () => fetchData(),
    enabled: !!someCondition, // conditional logic
    ...createInfrequentUpdateOptions(), // spread at end
  });
  ```

## Implementation Tasks
- [x] Create functional URL builder with arrow functions
- [x] Implement type-safe API factories
- [x] Set up instance-based configuration system
- [x] Create React context and hooks
- [x] Add data transformation utilities
- [x] Implement all WSF Vessels APIs
- [ ] Write comprehensive tests
- [x] Create documentation and examples
- [ ] Create working examples that match actual library exports and types
- [ ] Set up NPM publishing pipeline

## Future Considerations
- [ ] Performance optimization
- [ ] Bundle size optimization
- [ ] Tree-shaking support
- [ ] TypeScript strict mode compliance 