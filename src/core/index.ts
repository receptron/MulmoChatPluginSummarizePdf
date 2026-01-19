/**
 * MulmoChat SummarizePdf Plugin - Core (Framework-agnostic)
 *
 * This module exports the core plugin logic without UI components.
 * Import from "@mulmochat-plugin/summarize-pdf" or "@mulmochat-plugin/summarize-pdf/core"
 */

// Export plugin-specific types
export type { PdfToolData, PdfArgs, PdfJsonData } from "./types";

// Export plugin utilities
export {
  TOOL_NAME,
  TOOL_DEFINITION,
  createUploadedPdfResult,
  executeSummarizePdf,
  pluginCore,
} from "./plugin";
