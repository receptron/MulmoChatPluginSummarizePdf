/**
 * SummarizePdf Tool Definition (Schema)
 */

import type { ToolDefinition } from "./types";

export const TOOL_NAME = "summarizePDF";

export const TOOL_DEFINITION: ToolDefinition = {
  type: "function",
  name: TOOL_NAME,
  description:
    "Summarize the content of a currently selected PDF file using Claude.",
  parameters: {
    type: "object",
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
