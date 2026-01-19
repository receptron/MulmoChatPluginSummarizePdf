/**
 * MulmoChat SummarizePdf Plugin Core (Framework-agnostic)
 *
 * Contains the plugin logic without UI components.
 * Can be used by any framework (Vue, React, etc.)
 */

import type { ToolPluginCore, ToolContext, ToolResult } from "gui-chat-protocol";
import type { PdfToolData, PdfArgs, PdfJsonData } from "./types";
import { TOOL_NAME, TOOL_DEFINITION } from "./definition";

// Re-export for convenience
export { TOOL_NAME, TOOL_DEFINITION } from "./definition";

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
// Execute Function
// ============================================================================

export const executeSummarizePdf = async (
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

  if (!context.app?.summarizePdf) {
    return {
      message: "summarizePdf function not available",
      instructions: "Tell the user that the PDF summarization failed.",
    };
  }

  try {
    const data = await context.app.summarizePdf({
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
// Core Plugin (without UI components)
// ============================================================================

export const pluginCore: ToolPluginCore<PdfToolData, PdfJsonData, PdfArgs> = {
  toolDefinition: TOOL_DEFINITION,
  execute: executeSummarizePdf,
  generatingMessage: "Summarizing PDF...",
  uploadMessage:
    "PDF file is available. Call 'summarizePDF' to see its summary",
  isEnabled: (startResponse) => !!startResponse?.hasAnthropicApiKey,
  inputHandlers: [
    {
      type: "file",
      acceptedTypes: ["application/pdf"],
      handleInput: createUploadedPdfResult,
    },
  ],
};
