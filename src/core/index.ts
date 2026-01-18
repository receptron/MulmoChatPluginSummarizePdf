/**
 * MulmoChat SummarizePdf Plugin - Core (Framework-agnostic)
 *
 * This module exports the core plugin logic without UI components.
 * Import from "@mulmochat-plugin/summarize-pdf" or "@mulmochat-plugin/summarize-pdf/core"
 */

// Export all types
export type {
  BackendType,
  ToolContextApp,
  ToolContext,
  ToolResult,
  ToolResultComplete,
  JsonSchemaProperty,
  ToolDefinition,
  StartApiResponse,
  ToolSample,
  InputHandler,
  FileInputHandler,
  ClipboardImageInputHandler,
  UrlInputHandler,
  TextInputHandler,
  FileUploadConfig,
  ConfigValue,
  ConfigFieldSchema,
  PluginConfigSchema,
  ViewComponentProps,
  PreviewComponentProps,
  ToolPluginCore,
  PdfToolData,
  PdfArgs,
  PdfJsonData,
} from "./types";

// Export plugin utilities
export {
  TOOL_NAME,
  TOOL_DEFINITION,
  createUploadedPdfResult,
  executeSummarizePdf,
  pluginCore,
} from "./plugin";
