<template>
  <div class="max-w-3xl mx-auto">
    <h1 class="text-gray-800 mb-8">{{ pluginName }} Demo</h1>

    <!-- PDF Upload Section -->
    <div class="bg-white rounded-lg p-5 mb-5 shadow-md">
      <h2 class="text-gray-600 text-xl mb-4">Upload PDF</h2>
      <input
        type="file"
        accept="application/pdf"
        @change="handleFileUpload"
        class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
      />
      <p v-if="result.data?.fileName" class="mt-2 text-sm text-gray-600">
        Loaded: {{ result.data.fileName }}
      </p>
    </div>

    <!-- Summary Input Section -->
    <div class="bg-white rounded-lg p-5 mb-5 shadow-md">
      <h2 class="text-gray-600 text-xl mb-4">Mock Summary (for testing view)</h2>
      <textarea
        v-model="mockSummary"
        class="w-full p-3 font-mono text-sm border border-gray-300 rounded-md resize-y bg-gray-50 focus:outline-none focus:border-indigo-500 focus:ring-[3px] focus:ring-indigo-500/10"
        placeholder="Enter mock summary markdown here..."
        rows="6"
      ></textarea>
      <div class="mt-3">
        <button
          @click="applySummary"
          :disabled="!result.data?.pdfData"
          :class="result.data?.pdfData ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-400 cursor-not-allowed'"
          class="py-2.5 px-6 text-white border-none rounded-md cursor-pointer text-sm font-medium transition-colors"
        >
          Apply Summary
        </button>
      </div>
    </div>

    <!-- View Component -->
    <div v-if="ViewComponent" class="bg-white rounded-lg p-5 mb-5 shadow-md">
      <h2 class="text-gray-600 text-xl mb-4">View Component</h2>
      <div class="border border-gray-200 rounded h-[600px]">
        <component
          :is="ViewComponent"
          :selectedResult="result"
          :sendTextMessage="handleSendTextMessage"
          @updateResult="handleUpdate"
        />
      </div>
    </div>

    <!-- Preview Component -->
    <div v-if="PreviewComponent" class="bg-white rounded-lg p-5 mb-5 shadow-md">
      <h2 class="text-gray-600 text-xl mb-4">Preview Component</h2>
      <div class="max-w-[200px]">
        <component :is="PreviewComponent" :result="result" />
      </div>
    </div>

    <!-- Current Result Data -->
    <div class="bg-white rounded-lg p-5 mb-5 shadow-md">
      <h2 class="text-gray-600 text-xl mb-4">Current Result Data</h2>
      <pre class="bg-gray-100 p-3 rounded overflow-x-auto text-xs">{{ resultPreview }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { plugin } from "../src/vue";
import type { ToolResult, ToolPlugin, PdfToolData } from "../src/vue";

// Plugin configuration
const currentPlugin = plugin as unknown as ToolPlugin;

// Computed properties from plugin
const pluginName = computed(() => currentPlugin.toolDefinition.name);
const toolName = computed(() => currentPlugin.toolDefinition.name);
const ViewComponent = computed(() => currentPlugin.viewComponent);
const PreviewComponent = computed(() => currentPlugin.previewComponent);

// State
const mockSummary = ref(`# PDF Summary

This is a **mock summary** for testing the view component.

## Key Points
- Point 1
- Point 2
- Point 3

## Conclusion
The document covers various topics.`);

const result = ref<ToolResult<PdfToolData>>({
  toolName: toolName.value,
  uuid: "demo-uuid-123",
  message: "Ready",
  title: "",
  data: undefined,
});

// Truncate pdfData for display
const resultPreview = computed(() => {
  const preview = { ...result.value };
  if (preview.data?.pdfData && preview.data.pdfData.length > 100) {
    preview.data = {
      ...preview.data,
      pdfData: preview.data.pdfData.substring(0, 100) + "... (truncated)",
    };
  }
  return JSON.stringify(preview, null, 2);
});

// Actions
const handleFileUpload = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    const base64 = reader.result as string;
    result.value = {
      ...result.value,
      title: file.name,
      data: {
        pdfData: base64,
        fileName: file.name,
      },
    };
  };
  reader.readAsDataURL(file);
};

const applySummary = () => {
  if (!result.value.data) return;
  result.value = {
    ...result.value,
    data: {
      ...result.value.data,
      summary: mockSummary.value,
    },
  };
};

const handleSendTextMessage = (text?: string) => {
  console.log("sendTextMessage called:", text);
};

const handleUpdate = (updated: ToolResult<PdfToolData>) => {
  result.value = updated;
  console.log("Result updated:", updated);
};
</script>
