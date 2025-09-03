# Templates — Copy/Paste

## Module Header (place before imports)

```typescript
/**
 * @module [API_NAME] API
 * @description [Brief overview with context]
 * 
 * Provides:
 * - [Key capability 1]
 * - [Key capability 2]
 * 
 * Data includes:
 * - [Data type 1]
 * - [Data type 2]
 *
 * @functions
 *   - [functionName]: [Brief description]
 *   - [functionName]: [Brief description]
 *
 * @input
 *   - [functionName]: [param sig / short explanation]
 *   - [functionName]: [param sig / short explanation]
 *
 * @output
 *   - [functionName]: [Return type description]
 *   - [functionName]: [Return type description]
 *
 * @baseType
 *   - [TypeName]: [Purpose]
 *   - [TypeName]: [Purpose]
 *
 * @cli
 *   - [functionName]: node dist/cli.mjs [functionName] '{"param":"value"}'
 *   - [functionName]: node dist/cli.mjs [functionName]
 *
 * @exampleResponse
 * {
 *   "id": 1,
 *   "name": "Example"
 * }
 *
 * @see [Official documentation link]
 */
```

## Function Comment

```typescript
/**
 * [What the function does]
 *
 * @param params - [Parameter description]
 * @returns [Return type description]
 *
 * @example
 * ```typescript
 * const result = await [functionName]([params])
 * console.log(result)
 * ```
 *
 * @throws {Error} [Error conditions]
 */
```

## Hook Factory Comment (TanStack Query wrapper)

```typescript
/**
 * Hook factory that returns a TanStack Query hook for [Entity].
 * Returns [single/array] of [Type].
 */
```

## Schema Comment

```typescript
/**
 * [Input/Response] schema for the [TypeName]
 */
export const [schemaName] = z.object({
  // ...
})
```

## Type Alias Comment

```typescript
/**
 * [TypeName] type - [short description]
 */
export type [TypeName] = z.infer<typeof [schemaName]>
```
