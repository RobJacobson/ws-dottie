# Output Schema Instructions

## Overview

This document provides clear, unambiguous instructions for creating Zod schemas from XML API specifications. These instructions must be followed exactly to ensure consistency across the project.

## Input Specifications

The user will provide **two specifications** for each endpoint:

1. **Formal JSON/XML Specification** - Contains the technical schema structure with field types and optionality
2. **Field Description Specification** - Contains detailed descriptions for each field (typically from official API documentation)

Both specifications must be used together to create complete, well-documented schemas.

## Core Rules

### 1. Field Optionality - CRITICAL

**ONLY use `nillable="true"` as the source of truth for field optionality.**

- ✅ **If `nillable="true"`** → Use `.nullable()`
- ❌ **If NO `nillable="true"`** → Field is required (no `.optional()` or `.nullable()`)

### 2. Constraints to IGNORE

**ALWAYS ignore these XML schema constraints:**
- `minOccurs="0"` or any minOccurs value
- `maxOccurs` values
- `minInclusive` values
- `maxInclusive` values
- `minLength` values
- `maxLength` values
- Any other validation constraints

### 3. Type Mapping

Use this exact mapping from XML types to Zod types:

| XML Type | Zod Type |
|----------|----------|
| `xs:string` | `z.string()` |
| `xs:boolean` | `z.boolean()` |
| `xs:int` | `z.number()` |
| `xs:long` | `z.number()` |
| `xs:decimal` | `z.number()` |
| `xs:float` | `z.number()` |
| `xs:double` | `z.number()` |
| `xs:dateTime` | `zWsdotDate` (import from `@/apis/shared`) |
| `xs:date` | `zWsdotDate` (import from `@/apis/shared`) |
| `xs:time` | `z.string()` |
| `xs:anyURI` | `z.string()` |
| `xs:base64Binary` | `z.string()` |
| `xs:guid` | `z.string()` |

### 4. Enum Handling - CRITICAL

**Enum types should be inlined in the parent schema, not declared as separate schemas.**

**DO NOT create separate enum schemas like `CommercialVehicleRestrictionTypeSchema`.**

**Instead, inline the enum directly in the parent schema field.**

**Enum Implementation Rules:**

- **Use numeric literals** - APIs typically return numeric values, not strings
- **Format**: `z.union([z.literal(0), z.literal(1), ...])`
- **Description format**: `"Original description from documentation. (0 = ValueName, 1 = AnotherValue)"`
- **Reference existing schemas** - Check `/src/schemas` for numeric mappings used in deprecated schemas

**Example:**
```typescript
// ✅ CORRECT - Inline enum with numeric literals
RestrictionType: z
  .union([z.literal(0), z.literal(1)])
  .describe("The type of restriction, bridge or road. (0 = BridgeRestriction, 1 = RoadRestriction)")

// ❌ WRONG - Separate enum schema
export const RestrictionTypeSchema = z.enum(["BridgeRestriction", "RoadRestriction"]);
RestrictionType: RestrictionTypeSchema.describe("The type of restriction, bridge or road.")
```

### 5. Documentation Requirements - CRITICAL

**DO NOT insert JSDoc comments for individual fields.**

**MUST insert `.describe()` annotations for each field using the exact text from the Field Description Specification.**

- ✅ **Use exact text** from the second specification
- ✅ **Ensure each description ends with a period**
- ❌ **Do NOT write your own content** for descriptions
- ❌ **Do NOT add JSDoc comments** above fields
- ⚠️ **If unclear about correct text** → STOP and ask user for clarification

## Implementation Steps

### Step 1: Analyze the XML Schema

1. Find all complex types in the schema
2. For each field, check **ONLY** the `nillable` attribute
3. Ignore all other attributes and constraints

### Step 2: Create Individual Schemas

1. Create a separate Zod schema for each complex type
2. Use descriptive names ending with `Schema`
3. Add JSDoc comments describing the schema purpose (not individual fields)

### Step 3: Apply Type Mapping, Enum Handling, and Documentation

1. Map each XML type to its corresponding Zod type
2. Apply `.nullable()` only if `nillable="true"`
3. Do not use `.optional()` unless the field is truly optional in the API
4. **For enum fields**: Inline as `z.union([z.literal(0), z.literal(1), ...])` with numeric literals
5. **Add `.describe()` annotations using exact text from Field Description Specification**. Include a trailing period if one is missing.
6. **For enum descriptions**: Include mapping in parentheses, e.g., `"Description. (0 = Value1, 1 = Value2)"`

### Step 4: Export Types

1. Export each schema
2. **IMMEDIATELY follow each schema export with its corresponding TypeScript type** using `z.infer<typeof SchemaName>`
3. Use descriptive type names
4. **Maintain this pattern**: Schema export → Type export → Next Schema export → Next Type export

## Example

Given this XML schema:

```xml
<xs:complexType name="ExampleData">
  <xs:sequence>
    <xs:element minOccurs="0" name="RequiredField" type="xs:string" />
    <xs:element minOccurs="0" name="OptionalField" nillable="true" type="xs:string" />
    <xs:element minOccurs="0" name="NumberField" type="xs:int" />
    <xs:element minOccurs="0" name="RestrictionType" type="tns:ExampleRestrictionType" />
  </xs:sequence>
</xs:complexType>
<xs:simpleType name="ExampleRestrictionType">
  <xs:restriction base="xs:string">
    <xs:enumeration value="BridgeRestriction" />
    <xs:enumeration value="RoadRestriction" />
  </xs:restriction>
</xs:simpleType>
```

**Correct implementation:**

```typescript
export const ExampleDataSchema = z.object({
  RequiredField: z.string().describe("Description from Field Description Specification."),
  OptionalField: z.string().nullable().describe("Description from Field Description Specification."),
  NumberField: z.number().describe("Description from Field Description Specification."),
  RestrictionType: z
    .union([z.literal(0), z.literal(1)])
    .describe("The type of restriction, bridge or road. (0 = BridgeRestriction, 1 = RoadRestriction)"),
});

export type ExampleData = z.infer<typeof ExampleDataSchema>;
```

**Incorrect implementation:**

```typescript
// ❌ WRONG - using minOccurs instead of nillable, missing .describe() annotations, separate enum schema
export const ExampleRestrictionTypeSchema = z.enum(["BridgeRestriction", "RoadRestriction"]);

export const ExampleDataSchema = z.object({
  RequiredField: z.string().optional(), // WRONG - minOccurs="0" ignored, no description
  OptionalField: z.string().nullable(), // WRONG - no description
  NumberField: z.number().optional(),   // WRONG - minOccurs="0" ignored, no description
  RestrictionType: ExampleRestrictionTypeSchema.describe("The type of restriction, bridge or road."), // WRONG - separate enum, string values
});
```

## File Structure

Create schemas in the appropriate API directory:

```
src/apis/{api-name}/
├── inputSchema.ts      # Input schemas (REQUIRED for all endpoints)
└── outputSchemas.ts    # Output schemas
```

## Input Schema Guidelines - CRITICAL

**Every endpoint MUST have an input schema.**

- ✅ **If an endpoint has parameters beyond AccessCode** → Create input schema with only the non-AccessCode parameters
- ✅ **If an endpoint only requires AccessCode** → Create input schema with `z.object({})` to indicate void input
- ❌ **Do NOT include AccessCode** in any input schemas
- ✅ **Schema naming**: Match function name, omit "AsJson" suffix (e.g., "GetClearancesInputSchema" not "GetClearancesAsJsonInputSchema")
- ✅ **All input properties**: Must have `.describe()` annotations with exact text from official WSF/WSDOT documentation
- ✅ **Missing documentation**: Use empty quotes `""` if official text cannot be found

### WSF Endpoint Naming Conventions - CRITICAL

**For WSF APIs (wsf-fares, wsf-schedule, wsf-terminals, wsf-vessels), use the following naming conventions:**

#### Schema and Type Naming Rules

1. **Remove "Get" prefix** from endpoint names
2. **Remove "All" prefix** from collection endpoints
3. **Remove "Specific" prefix** from individual item endpoints
4. **Remove "Detail" suffix** from endpoint names
5. **Use PascalCase** for both schema names and type names
6. **For endpoints with ID parameters**, use "ById" suffix

#### Examples

**Endpoint → Schema/Type Name:**
- `/cacheflushdate` → `CacheFlushDateInputSchema` / `CacheFlushDateInput`
- `/validdaterange` → `ValidDateRangeInputSchema` / `ValidDateRangeInput`
- `/terminals` → `TerminalsInputSchema` / `TerminalsInput`
- `/terminalmates` → `TerminalMatesInputSchema` / `TerminalMatesInput`
- `/terminalcombo` → `TerminalComboInputSchema` / `TerminalComboInput`
- `/terminalcomboverbose` → `TerminalComboVerboseInputSchema` / `TerminalComboVerboseInput`
- `/farelineitemsbasic` → `FareLineItemsBasicInputSchema` / `FareLineItemsBasicInput`
- `/farelineitems` → `FareLineItemsInputSchema` / `FareLineItemsInput`
- `/farelineitemsverbose` → `FareLineItemsVerboseInputSchema` / `FareLineItemsVerboseInput`
- `/faretotals` → `FareTotalsInputSchema` / `FareTotalsInput`
- `/vesselbasics` → `VesselBasicsInputSchema` / `VesselBasicsInput`
- `/vesselbasics/{VesselID}` → `VesselBasicsByIdInputSchema` / `VesselBasicsByIdInput`
- `/terminalbasics` → `TerminalBasicsInputSchema` / `TerminalBasicsInput`
- `/terminalbasics/{TerminalID}` → `TerminalBasicsByIdInputSchema` / `TerminalBasicsByIdInput`

#### Naming Pattern Summary

```typescript
// ✅ CORRECT - WSF naming convention
export const CacheFlushDateInputSchema = z.object({});
export type CacheFlushDateInput = z.infer<typeof CacheFlushDateInputSchema>;

export const TerminalsInputSchema = z.object({
  TripDate: z.string().describe("Trip date in YYYY-MM-DD format."),
});
export type TerminalsInput = z.infer<typeof TerminalsInputSchema>;

export const VesselBasicsByIdInputSchema = z.object({
  VesselID: z.number().int().describe("Unique identifier for a vessel."),
});
export type VesselBasicsByIdInput = z.infer<typeof VesselBasicsByIdInputSchema>;

// ❌ WRONG - Old naming convention
export const GetCacheFlushDateInputSchema = z.object({});
export const GetAllTerminalsInputSchema = z.object({});
export const GetSpecificVesselBasicDetailInputSchema = z.object({});
```

### Export Ordering Rules - CRITICAL

**Each type export must immediately follow its corresponding schema export.**

**Correct Ordering Pattern:**
```typescript
// ✅ CORRECT - Schema followed immediately by its type
export const FooSchema = z.object({
  field1: z.string().describe("Description."),
});

export type Foo = z.infer<typeof FooSchema>;

export const BarSchema = z.object({
  field2: z.number().describe("Description."),
});

export type Bar = z.infer<typeof BarSchema>;

export const BazSchema = z.object({
  field3: z.boolean().describe("Description."),
});

export type Baz = z.infer<typeof BazSchema>;
```

**Incorrect Ordering:**
```typescript
// ❌ WRONG - All schemas first, then all types
export const FooSchema = z.object({ field1: z.string() });
export const BarSchema = z.object({ field2: z.number() });
export const BazSchema = z.object({ field3: z.boolean() });

export type Foo = z.infer<typeof FooSchema>;
export type Bar = z.infer<typeof BarSchema>;
export type Baz = z.infer<typeof BazSchema>;
```

### Input Schema Implementation Rules

**Schema Naming Convention:**
```typescript
// ✅ CORRECT - Remove "AsJson" suffix
export const GetClearancesInputSchema = z.object({
  Route: z.string().describe("Route number to filter bridge clearances by specific highway routes.")
});

// ❌ WRONG - Includes "AsJson" suffix
export const GetClearancesAsJsonInputSchema = z.object({
  Route: z.string().describe("Route number to filter bridge clearances by specific highway routes.")
});
```

**Void Input Schema (AccessCode only):**
```typescript
// ✅ CORRECT - Void input with empty object
export const GetSomeDataInputSchema = z.object({});

export type GetSomeDataInput = z.infer<typeof GetSomeDataInputSchema>;
```

**Input Schema with Parameters:**
```typescript
// ✅ CORRECT - Non-AccessCode parameters only, with descriptions
export const GetClearancesInputSchema = z.object({
  Route: z.string().describe("Route number to filter bridge clearances by specific highway routes."),
  IncludeDetails: z.boolean().describe("Whether to include detailed bridge information.")
});

// ❌ WRONG - Includes AccessCode
export const GetClearancesInputSchema = z.object({
  AccessCode: z.string().describe("API access code."), // WRONG - AccessCode should be excluded
  Route: z.string().describe("Route number to filter bridge clearances by specific highway routes.")
});
```

**Missing Documentation:**
```typescript
// ✅ CORRECT - Use empty quotes when documentation is not available
export const GetDataInputSchema = z.object({
  UnknownParameter: z.string().describe(""), // Official documentation not found
  KnownParameter: z.number().describe("Number of items to retrieve.")
});
```

## Date Handling - CRITICAL

**Use zWsdotDate instead of z.date() for all date fields.**

- ✅ **Import**: `import { zWsdotDate } from "@/apis/shared"`
- ✅ **Use**: `zWsdotDate` for all `xs:dateTime` and `xs:date` fields
- ❌ **Do NOT use**: `z.date()` in output schemas

## Validation Checklist

Before submitting, verify:

- [ ] Only `nillable="true"` fields use `.nullable()`
- [ ] All `minOccurs`, `maxOccurs`, and other constraints are ignored
- [ ] XML types are mapped correctly using the reference table
- [ ] **Date fields use zWsdotDate** - NOT z.date()
- [ ] **Every endpoint has an input schema** - Either with parameters or `z.object({})` for void input
- [ ] **Input schemas do NOT include AccessCode** - Only non-AccessCode parameters
- [ ] **Input schema names omit "AsJson" suffix** - Match function name without "AsJson"
- [ ] **All input parameters have `.describe()` annotations** - Use official documentation or empty quotes
- [ ] **Export ordering follows pattern** - Schema export immediately followed by its type export
- [ ] **Enum fields are inlined with numeric literals** - NO separate enum schemas
- [ ] **Enum descriptions include numeric mapping** - Format: "Description. (0 = Value1, 1 = Value2)"
- [ ] **WSF APIs use correct naming conventions** - Remove "Get", "All", "Specific", "Detail" prefixes/suffixes
- [ ] **WSF endpoint schemas use PascalCase** - Both schema and type names
- [ ] **WSF ID-based endpoints use "ById" suffix** - e.g., `VesselBasicsByIdInputSchema`
- [ ] Each complex type has its own schema
- [ ] All schemas and types are exported
- [ ] **NO JSDoc comments above individual fields**
- [ ] **All fields have `.describe()` annotations with exact text from Field Description Specification**
- [ ] **All descriptions end with a period**
- [ ] Schema-level JSDoc comments are added for clarity

## Common Mistakes to Avoid

1. **Using `minOccurs="0"` to determine optionality** - This is WRONG
2. **Using `.optional()` instead of `.nullable()`** - These are different concepts
3. **Ignoring the `nillable` attribute** - This is the ONLY source of truth
4. **Applying validation constraints** - These should be ignored
5. **Creating separate enum schemas** - Inline enums with numeric literals instead
6. **Using string enums instead of numeric** - APIs return numbers, not strings
7. **Adding JSDoc comments above fields** - Use `.describe()` instead
8. **Writing custom descriptions** - Use exact text from Field Description Specification
9. **Missing `.describe()` annotations** - All fields must have descriptions
10. **Descriptions without periods** - All descriptions must end with a period
11. **Enum descriptions without numeric mapping** - Include "(0 = Value1, 1 = Value2)" format
12. **Including AccessCode in input schemas** - AccessCode should NOT be in input schemas
13. **Using z.date() instead of zWsdotDate** - Use zWsdotDate for all date fields
14. **Missing input schemas** - Every endpoint MUST have an input schema
15. **Including "AsJson" in input schema names** - Remove "AsJson" suffix from schema names
16. **Missing `.describe()` annotations on input parameters** - All input parameters need descriptions
17. **Incorrect export ordering** - Schema exports must be immediately followed by their type exports
18. **WSF APIs using old naming conventions** - Remove "Get", "All", "Specific", "Detail" prefixes/suffixes
19. **WSF schemas using camelCase instead of PascalCase** - Use PascalCase for both schema and type names
20. **WSF ID-based endpoints missing "ById" suffix** - Use "ById" for endpoints with ID parameters

## Remember

**The `nillable` attribute is the ONLY source of truth for field optionality. All other constraints must be ignored.**

**Enum types should be inlined with numeric literals, not declared as separate schemas. APIs return numeric values, not strings.**

**Use exact text from the Field Description Specification for all `.describe()` annotations. Do not write custom descriptions. Ensure all descriptions end with a period.**
