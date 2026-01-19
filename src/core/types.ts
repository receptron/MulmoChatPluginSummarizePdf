/**
 * SummarizePdf Plugin Types
 *
 * Plugin-specific types only.
 * Common types are imported from gui-chat-protocol.
 */

// ============================================================================
// SummarizePdf-specific Types
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
