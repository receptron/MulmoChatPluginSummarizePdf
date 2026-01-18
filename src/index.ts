/**
 * MulmoChat SummarizePdf Plugin
 *
 * Default export is the framework-agnostic core.
 * For Vue implementation, import from "@mulmochat-plugin/summarize-pdf/vue"
 *
 * @example Default (Core - framework-agnostic)
 * ```typescript
 * import { pluginCore, TOOL_NAME, PdfToolData } from "@mulmochat-plugin/summarize-pdf";
 * ```
 *
 * @example Vue implementation
 * ```typescript
 * import SummarizePdfPlugin from "@mulmochat-plugin/summarize-pdf/vue";
 * import "@mulmochat-plugin/summarize-pdf/style.css";
 * ```
 */

// Default export is core (framework-agnostic)
export * from "./core";
export { pluginCore as default } from "./core";

// Re-export helper function for backward compatibility
export { createUploadedPdfResult } from "./core";
