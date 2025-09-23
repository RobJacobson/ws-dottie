#!/usr/bin/env node

/**
 * @fileoverview Fetch-Dottie CLI Tool Entry Point
 *
 * This module provides the main entry point for the fetch-dottie command-line tool
 * for accessing WSDOT/WSF APIs with configurable transport and validation options.
 *
 * ## Features
 *
 * - **Transport Control**: Choose between native fetch and JSONP via --jsonp flag
 * - **Validation Control**: Choose validation level via --no-validation flag
 * - **Type-Safe API Access**: Full TypeScript type safety with Zod validation (default)
 * - **Data Transformation**: Automatic validation and transformation of API responses
 * - **Comprehensive Error Handling**: Detailed error messages with helpful context
 * - **Flexible Output**: Support for pretty-printing, quiet mode, and output truncation
 * - **Date Handling**: Automatic conversion of .NET datetime strings to JavaScript Date objects
 *
 * ## Usage
 *
 * ```bash
 * fetch-dottie <function-name> [params] [options]
 * ```
 *
 * @example
 * ```bash
 * # Default: native fetch with validation
 * fetch-dottie vesselBasics
 *
 * # Native fetch without validation
 * fetch-dottie vesselBasics --no-validation
 *
 * # JSONP with validation (browser environments)
 * fetch-dottie vesselBasics --jsonp
 *
 * # JSONP without validation (browser environments)
 * fetch-dottie vesselBasics --jsonp --no-validation
 *
 * # List all available functions
 * fetch-dottie --list
 *
 * # Pretty-print output
 * fetch-dottie vesselBasics --pretty
 * ```
 */

import { setupCli } from "./cli";

// Setup and run the CLI tool
setupCli();
