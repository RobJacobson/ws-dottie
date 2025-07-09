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
- [x] Write comprehensive tests
- [x] Create documentation and examples
- [ ] Convert mock-based tests to actual code testing
- [ ] Create working examples that match actual library exports and types
- [ ] Set up NPM publishing pipeline

## Future Considerations
- [ ] Performance optimization
- [ ] Bundle size optimization
- [ ] Tree-shaking support
- [ ] TypeScript strict mode compliance

## Test Conversion Plan

### Current Mock-Based Test Issues
- Many tests use manual mocks instead of importing actual functions
- Tests don't verify actual function behavior, only structure
- Missing proper React Query hook testing
- Inconsistent mocking patterns across test files

### Conversion Strategy
1. **API Tests**: Import actual API functions and test their behavior
   - Test function signatures and return types
   - Mock only the fetch layer (`fetchWsfArray`, `buildWsfUrl`)
   - Verify correct parameters are passed to fetch functions
   - Test error handling and edge cases

2. **Hook Tests**: Create proper React Query hook tests
   - Use `renderHook` with `QueryClientProvider`
   - Mock API functions, not React Query internals
   - Test loading states, error states, and data flow
   - Verify caching behavior and enabled conditions

3. **Shared Utils Tests**: Already converted (using actual `transformWsfData`)

### Files to Convert
- [x] `tests/unit/api/wsf/vessels/vesselLocations/api.test.ts` - Converted
- [x] `tests/unit/api/wsf/vessels/vesselLocations/hook.test.ts` - Created
- [ ] `tests/unit/api/wsf/vessels/vesselVerbose/` - Convert API and create hooks
- [ ] `tests/unit/api/wsf/terminals/terminalBasics/` - Already good, add hooks
- [ ] `tests/unit/api/wsf/terminals/terminalSailingSpace/` - Convert and add hooks
- [ ] `tests/unit/api/wsf/terminals/terminalverbose/` - Convert and add hooks
- [ ] `tests/unit/api/wsf/terminals/terminalLocations/` - Convert and add hooks
- [ ] `tests/unit/api/wsf/terminals/terminalWaitTimes/` - Convert and add hooks
- [ ] `tests/unit/api/wsf/schedule/routes/` - Convert and add hooks
- [ ] `tests/unit/api/wsf/schedule/schedules/` - Convert and add hooks
- [ ] `tests/unit/api/wsf/schedule/terminals/` - Convert and add hooks
- [ ] `tests/unit/api/wsf/schedule/vessels/` - Convert and add hooks
- [ ] `tests/unit/api/wsf/schedule/timeAdjustments/` - Convert and add hooks
- [ ] `tests/unit/api/wsf/schedule/validDateRange/` - Convert and add hooks
- [ ] `tests/unit/api/wsf/fares/` - Convert and add hooks
- [ ] All WSDOT API tests (highway cameras, traffic flow, etc.)

### Benefits of Conversion
- **Better Coverage**: Tests actual function behavior, not just structure
- **Easier Maintenance**: Changes to actual code will be caught by tests
- **Real Integration**: Tests verify the actual integration between components
- **Better Debugging**: Failed tests point to real issues, not mock problems
- **Documentation**: Tests serve as examples of how to use the API 