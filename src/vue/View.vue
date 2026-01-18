<template>
  <div class="w-full h-full flex flex-col p-4">
    <div class="flex-1 w-full min-h-0">
      <iframe
        v-if="pdfUrl"
        :src="pdfUrl"
        class="w-full h-full border-0 rounded"
        title="PDF Viewer"
      />
    </div>
    <div
      v-if="pdfData?.fileName"
      class="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg flex-shrink-0"
    >
      <p class="text-sm text-gray-700 dark:text-gray-300">
        <span class="font-medium">File:</span>
        {{ pdfData.fileName }}
      </p>
    </div>
    <div
      v-if="pdfData?.summary"
      class="mt-2 p-3 bg-white rounded-lg flex-shrink-0 max-h-64 overflow-y-auto border border-gray-200"
    >
      <p class="text-sm font-medium text-gray-700 mb-2">Summary:</p>
      <div
        class="markdown-content prose prose-sm prose-slate max-w-none"
        v-html="renderedSummary"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { marked } from "marked";
import type { ToolResult, PdfToolData } from "./types";
import { TOOL_NAME } from "../core/plugin";

const props = defineProps<{
  selectedResult: ToolResult<PdfToolData>;
}>();

const pdfData = ref<PdfToolData | null>(null);
const pdfUrl = ref<string>("");

// Watch selectedResult and update local state
watch(
  () => props.selectedResult,
  (newResult) => {
    if (newResult?.toolName === TOOL_NAME && newResult.data) {
      pdfData.value = newResult.data as PdfToolData;
      loadPdf(newResult);
    }
  },
  { immediate: true, deep: true },
);

const renderedSummary = computed(() => {
  const summary = pdfData.value?.summary;
  if (!summary) return "";
  return marked(summary);
});

async function loadPdf(result: ToolResult<PdfToolData>) {
  const data = result.data;
  const uuid = result.uuid;

  if (!data?.pdfData) return;

  // For demo mode (no server), use data URI directly
  if (!uuid) {
    pdfUrl.value = data.pdfData;
    return;
  }

  try {
    // Call API to save PDF to output folder
    const response = await fetch("/api/save-pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pdfData: data.pdfData,
        uuid,
        fileName: data.fileName || "document.pdf",
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to save PDF");
    }

    const apiResult = await response.json();
    pdfUrl.value = apiResult.pdfUrl;
  } catch (error) {
    console.error("Failed to save PDF to output folder:", error);
    // Fallback to data URI if saving fails
    pdfUrl.value = data.pdfData;
  }
}
</script>
