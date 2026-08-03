import type { PdfToolData } from "./types";

export interface SummarizePdfResponse {
  summary?: string;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isOptionalString = (value: unknown): value is string | undefined =>
  value === undefined || typeof value === "string";

export const isSummarizePdfResponse = (
  value: unknown,
): value is SummarizePdfResponse =>
  isRecord(value) && isOptionalString(value.summary);

/** `ToolContext.currentResult.data` is `unknown` — the host may hold any plugin's card. */
export const isPdfToolData = (value: unknown): value is PdfToolData =>
  isRecord(value) &&
  typeof value.pdfData === "string" &&
  typeof value.fileName === "string" &&
  isOptionalString(value.summary);
