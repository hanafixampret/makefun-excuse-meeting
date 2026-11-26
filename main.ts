import { writeFileSync, mkdirSync } from "node:fs";

const ENTRY =
  "Sorry — I can't make this one. The meeting about having fewer meetings just ran over, so they scheduled a follow-up.";

const chars = [...ENTRY].length;
if (chars < 1 || chars > 200) {
  throw new Error(`entry is ${chars} characters, gate is 1-200`);
}
if (ENTRY.includes("\n") || ENTRY.trim() !== ENTRY) {
  throw new Error("entry must be a single line with no surrounding whitespace");
}
if (/\s{2,}/.test(ENTRY)) {
  throw new Error("entry must not contain double spaces");
}
const bytes = Buffer.byteLength(ENTRY, "utf8");
if (bytes > 200) {
  throw new Error(`entry is ${bytes} bytes, gate is 1-200 characters`);
}
if (!ENTRY.endsWith(".")) {
  throw new Error("entry must end with a full stop");
}
if (!ENTRY.toLowerCase().includes("meeting")) {
  throw new Error("entry must read as an excuse for skipping a meeting");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");
console.log(`wrote /output/entry.txt (${chars} chars)`);
