/**
 * MulmoChat Plugin
 *
 * See package.json for plugin details.
 */

import "./style.css";

import { plugin, createUploadedPdfResult } from "./plugin";
import type { ToolPlugin } from "./common";

export { createUploadedPdfResult };

export default { plugin: plugin as ToolPlugin };
