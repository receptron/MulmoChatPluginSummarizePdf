/**
 * MulmoChat SummarizePdf Plugin - Vue Implementation
 *
 * Full Vue plugin with UI components.
 * Import from "@mulmochat-plugin/summarize-pdf/vue"
 */

// Import styles for Vue components
import "../style.css";

import type { ToolPlugin, PdfToolData, PdfArgs, PdfJsonData } from "./types";
import { pluginCore } from "../core/plugin";
import View from "./View.vue";
import Preview from "./Preview.vue";

// ============================================================================
// Vue Plugin (with components)
// ============================================================================

/**
 * SummarizePdf plugin instance with Vue components
 */
export const plugin: ToolPlugin<PdfToolData, PdfJsonData, PdfArgs> = {
  ...pluginCore,
  viewComponent: View,
  previewComponent: Preview,
};

// Re-export types
export type { ToolPlugin, ToolPluginConfig } from "./types";

// Re-export core types for convenience
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

// Re-export core plugin utilities
export {
  TOOL_NAME,
  TOOL_DEFINITION,
  createUploadedPdfResult,
  executeSummarizePdf,
  pluginCore,
} from "../core/plugin";

// Export components for direct use
export { View, Preview };

// Default export for MulmoChat compatibility: { plugin }
export default { plugin };
