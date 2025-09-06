/**
 * Type definitions for WSDOT schema generation
 */

export interface WSDOTProperty {
  name: string;
  type: string;
  nullable: boolean;
  description?: string;
  enum?: unknown[];
}

export interface WSDOTClassDefinition {
  name: string;
  properties: WSDOTProperty[];
  description?: string;
}

export interface JSONSchemaProperty {
  type: string;
  description?: string;
  nullable?: boolean;
  enum?: unknown[];
  items?: JSONSchemaProperty;
  properties?: Record<string, JSONSchemaProperty>;
}

export interface JSONSchema {
  type: "object";
  properties: Record<string, JSONSchemaProperty>;
  required: string[];
  description?: string;
}

export interface SchemaGenerationConfig {
  nullabilityStrategy: "xml" | "docs" | "conservative" | "permissive";
  outputDir: string;
  generateSharedTypes: boolean;
  validateGeneratedSchemas: boolean;
}

export const DEFAULT_CONFIG: SchemaGenerationConfig = {
  nullabilityStrategy: "xml",
  outputDir: "./output",
  generateSharedTypes: true,
  validateGeneratedSchemas: true,
};
