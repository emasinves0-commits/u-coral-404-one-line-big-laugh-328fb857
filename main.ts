// "One Line, Big Laugh" — writes a single funny line to /output/entry.txt.
// Deterministic: no network, no arguments, no randomness.
import { mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";

// Where the entry goes. The gate reads /output/entry.txt; ENTRY_OUTPUT_DIR
// exists only so the program can be tested without touching shared /output.
const OUTPUT_DIR = process.env.ENTRY_OUTPUT_DIR ?? "/output";
const OUTPUT_FILE = `${OUTPUT_DIR}/entry.txt`;

// The joke: five stages of grief, resolved on a Costco floor over one chicken.
const ENTRY =
  "I finally reached the final stage of grief, which is just me sitting on the floor of a Costco aisle staring at a single rotisserie chicken.";

function checkEntry(text: string): void {
  const chars = [...text].length;
  const bytes = Buffer.byteLength(text, "utf8");
  if (chars < 1 || chars > 200) {
    throw new Error(`entry is ${chars} chars (${bytes} bytes), must be 1-200`);
  }
  const bad = text.search(/[\u0000-\u001f\u007f]/);
  if (bad !== -1) {
    throw new Error(
      `control character U+${text.charCodeAt(bad).toString(16).padStart(4, "0")} at index ${bad}`,
    );
  }
  if (text !== text.trim()) {
    throw new Error("entry has leading or trailing whitespace");
  }
  if (text.split("\n").length !== 1) {
    throw new Error(`entry must be exactly one line, found ${text.split("\n").length}`);
  }
  if (Buffer.from(text, "utf8").toString("utf8") !== text) {
    throw new Error("entry is not valid UTF-8 round-trip text");
  }
}

checkEntry(ENTRY);
mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(OUTPUT_FILE, ENTRY, "utf8");

// Read back as raw bytes: the file must equal the entry exactly.
const expected = Buffer.from(ENTRY, "utf8");
const actual = readFileSync(OUTPUT_FILE);
if (statSync(OUTPUT_FILE).size !== expected.length || !actual.equals(expected)) {
  throw new Error("read-back mismatch: file differs from entry");
}
console.log(`ok: ${[...ENTRY].length} chars, ${expected.length} bytes written to ${OUTPUT_FILE}`);
