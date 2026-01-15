/**
 * SummarizePdf Types
 */

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
