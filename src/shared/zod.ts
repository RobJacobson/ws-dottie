/**
 * @fileoverview Zod OpenAPI Extension Initialization
 *
 * This module ensures that Zod is extended with OpenAPI functionality before
 * any schemas are created. All schema files should import `z` from this module
 * instead of directly from 'zod' to ensure the `.openapi()` method is available.
 *
 * This fixes the issue where schemas created before `extendZodWithOpenApi()` was
 * called don't have the `.openapi()` method, preventing proper schema registration
 * in OpenAPI specifications.
 */

import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

// Extend Zod with OpenAPI support BEFORE any schemas are created
// This must be called before any imports that create Zod schemas
extendZodWithOpenApi(z);

// Re-export z so all schema files can import from this module
export { z };
