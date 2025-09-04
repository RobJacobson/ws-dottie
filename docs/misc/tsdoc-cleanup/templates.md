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
 *   - [functionName]: [param overview]
 *   - [functionName]:
 *     - [paramName]: [one-line description]
 *     - [paramName]: [one-line description]
 *
 * @output
 *   - [functionName]: [Return type]
 *   - [functionName]: [Return type]
 *   - [Base/Item fields]:
 *     - [FieldName]: [one-line description]
 *     - [FieldName]: [one-line description]
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

## Query Options Comment (TanStack v5)

```typescript
/**
 * Returns query options for [Entity].
 * Query key: ["wsdot"|"wsf", ...]; default cadence: [e.g., 60s].
 */
```

## Schema Comment

```typescript
/**
 * [Input/Response] schema for [TypeName]
 */
export const [schemaName] = z.object({
  /** [one-line description] */
  [fieldName]: [zodType],
  /** [one-line description] */
  [fieldName]: [zodType],
})
```

## Type Alias Comment

```typescript
/**
 * [TypeName] type - [short description]
 */
export type [TypeName] = z.infer<typeof [schemaName]>
```
