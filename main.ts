import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I was trained on billions of conversations, and none of them prepared me for you.";

// Gate (competition.yaml): 1-200 characters, not only white space, one line.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`line is ${LINE.length} characters, outside 1-200`);
}
if (LINE.trim().length === 0) {
  throw new Error("line is only white space");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("line must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
mkdirSync(outDir, { recursive: true });

const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

const back = readFileSync(outPath, "utf8");
if (back !== LINE) {
  throw new Error("read-back mismatch");
}
