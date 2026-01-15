/**
 * MulmoChat SummarizePdf Plugin
 *
 * A plugin for summarizing PDF files using Claude.
 *
 * @example Basic usage
 * ```typescript
 * import { plugin } from "@mulmochat-plugin/summarize-pdf";
 * import "@mulmochat-plugin/summarize-pdf/style.css";
 * // Use plugin directly
 * ```
 */

import type { ToolPlugin, ToolContext, ToolResult } from "../common";
import {
  TOOL_DEFINITION,
  TOOL_NAME,
  type PdfToolData,
  type PdfArgs,
  type PdfJsonData,
} from "./types";
import View from "./View.vue";
import Preview from "./Preview.vue";

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Create a ToolResult for an uploaded PDF file
 */
export function createUploadedPdfResult(
  pdfData: string,
  fileName: string,
): ToolResult<PdfToolData, PdfJsonData> {
  return {
    toolName: TOOL_NAME,
    data: { pdfData, fileName },
    message: "",
    title: fileName,
  };
}

// ============================================================================
// Plugin Implementation
// ============================================================================

const summarizePDF = async (
  context: ToolContext,
  args: PdfArgs,
): Promise<ToolResult<PdfToolData, PdfJsonData>> => {
  const { prompt } = args;

  // Get the current PDF data from context
  const currentPdfData = context.currentResult?.data as PdfToolData | undefined;

  if (!currentPdfData?.pdfData) {
    return {
      message:
        "No PDF file available to summarize. Please select a PDF file first.",
      instructions:
        "Tell the user that no PDF file is currently selected and they need to upload a PDF file first.",
    };
  }

  if (!context.app?.fetchSummarizePdf) {
    return {
      message: "fetchSummarizePdf function not available",
      instructions: "Tell the user that the PDF summarization failed.",
    };
  }

  try {
    const data = await context.app.fetchSummarizePdf({
      prompt,
      pdfData: currentPdfData.pdfData,
    });
    const summary = data.summary || "";

    return {
      data: {
        ...currentPdfData,
        summary,
      },
      jsonData: {
        fileName: currentPdfData.fileName,
        summary,
      },
      message: "PDF summarized successfully",
      instructions: `Give the user a brief summary of the PDF.`,
      instructionsRequired: true,
      updating: true,
    };
  } catch (error) {
    console.error("PDF summarization failed", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return {
      message: `PDF summarization failed: ${errorMessage}`,
      instructions: `Tell the user that the PDF summarization failed with error: ${errorMessage}`,
    };
  }
};

// ============================================================================
// Export
// ============================================================================

/**
 * SummarizePdf plugin instance
 */
export const plugin: ToolPlugin<PdfToolData, PdfJsonData, PdfArgs> = {
  toolDefinition: TOOL_DEFINITION,
  execute: summarizePDF,
  generatingMessage: "Summarizing PDF...",
  uploadMessage:
    "PDF file is available. Call 'summarizePDF' to see its summary",
  isEnabled: (startResponse) => !!startResponse?.hasAnthropicApiKey,
  viewComponent: View,
  previewComponent: Preview,
  fileUpload: {
    acceptedTypes: ["application/pdf"],
    handleUpload: createUploadedPdfResult,
  },
};
