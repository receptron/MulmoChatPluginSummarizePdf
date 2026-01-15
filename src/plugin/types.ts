/**
 * SummarizePdf Tool Definition and Types
 */

// ============================================================================
// Types
// ============================================================================

/** PDF tool data stored in result.data */
export interface PdfToolData {
  pdfData: string; // base64 encoded PDF data
  fileName: string;
  summary?: string;
}

/** Arguments passed to the summarizePDF tool */
export interface PdfArgs {
  prompt: string;
}

/** JSON data returned in result.jsonData */
export interface PdfJsonData {
  fileName: string;
  summary: string;
}

// ============================================================================
// Tool Definition
// ============================================================================

export const TOOL_NAME = "summarizePDF";

export const TOOL_DEFINITION = {
  type: "function" as const,
  name: TOOL_NAME,
  description:
    "Summarize the content of a currently selected PDF file using Claude.",
  parameters: {
    type: "object" as const,
    properties: {
      prompt: {
        type: "string",
        description:
          "Instructions for Claude on how to summarize or analyze the PDF",
      },
    },
    required: ["prompt"],
  },
};
