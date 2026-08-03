/**
 * `context.app.summarizePdf` and `context.currentResult.data` are `unknown`
 * since gui-chat-protocol 2.0.0, so the plugin narrows both here instead of
 * trusting the host's shape.
 *
 * Run with: yarn test
 */

import { test, describe } from "node:test";
import assert from "node:assert";
import { isPdfToolData, isSummarizePdfResponse } from "../src/core/hostResponse.js";

describe("isSummarizePdfResponse", () => {
  test("accepts a response carrying a summary", () => {
    assert.equal(isSummarizePdfResponse({ summary: "It is about cats." }), true);
  });

  test("accepts a response with no summary key", () => {
    assert.equal(isSummarizePdfResponse({}), true);
  });

  test("rejects a summary that is not a string", () => {
    assert.equal(isSummarizePdfResponse({ summary: 42 }), false);
  });

  test("rejects values that are not a response object", () => {
    [null, undefined, "ok", 7].forEach((value) => {
      assert.equal(
        isSummarizePdfResponse(value),
        false,
        `should reject ${JSON.stringify(value)}`,
      );
    });
  });
});

describe("isPdfToolData", () => {
  test("accepts a card produced by this plugin", () => {
    assert.equal(isPdfToolData({ pdfData: "base64", fileName: "a.pdf" }), true);
  });

  test("accepts a card that already carries a summary", () => {
    assert.equal(
      isPdfToolData({ pdfData: "base64", fileName: "a.pdf", summary: "cats" }),
      true,
    );
  });

  test("rejects another plugin's card", () => {
    assert.equal(isPdfToolData({ imageData: "base64" }), false);
  });
});
