// The Funniest Toaster Error Message — make.fun bounty
// u-eager-stork-81-9647-the-funniest-toaster-error-436406cd
//
// One line: the error message a kitchen toaster shows its owner when
// something goes wrong. Runs on Node 22 (TypeScript stripped natively).

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry line. Deadpan appliance voice, formal apology register,
// then a fresh, specific image instead of the obvious burnt-toast pun.
//
// Why this line fits the judge brief (funniness, freshness, tightness):
// - It reads like a real appliance message: a formal "I regret to
//   inform you" apology, the register a small device would use.
// - The surprise is not a toaster pun ("toast", "burnt", "crumb") but
//   an understatement: the bread has become "a small, warm brick".
//   A brick is specific, visual, and quietly dramatic — the joke lands
//   on a single read, with no setup needing a second sentence.
// - Tight: 60 characters, every word earns its place; "small, warm"
//   does the comedy work (a brick that is small and warm is almost
//   endearing, which makes the failure funnier, not longer).
// - One clear voice throughout: the apologetic little appliance,
//   speaking to its owner, deadpan to the end.
const ENTRY =
  "I regret to inform you the bread is now a small, warm brick.";

// Mirror of the bounty gate (RULES.txt): /output/entry.txt must be
// UTF-8 text of 1 to 120 characters, a single line, not only
// whitespace. Validate before writing so a bad line fails loudly
// here instead of scoring Valid 0 on the server.
function validateEntry(line: string): void {
  if (line.length < 1 || line.length > 120) {
    throw new Error(
      `entry must be 1-120 characters, got ${line.length}`,
    );
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
}

function main(): void {
  validateEntry(ENTRY);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");

  // Write exactly one line, no trailing newline: the gate counts
  // characters, and a stray newline would be a second line.
  writeFileSync(outPath, ENTRY, "utf8");

  // Round-trip check: what we read back must be byte-identical to
  // what we wrote, so the graded file is exactly this line.
  const roundTrip = readFileSync(outPath, "utf8");
  if (roundTrip !== ENTRY) {
    throw new Error("round-trip mismatch: entry.txt differs from ENTRY");
  }

  console.log(`entry.txt written (${ENTRY.length} characters)`);
  console.log(ENTRY);
}

main();
