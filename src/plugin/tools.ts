/**
 * SummarizePdf Tool Definition
 */

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
