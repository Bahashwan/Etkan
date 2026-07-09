/**
 * @etkan-ui/tokens build.
 * The canonical token source lives at the repo root (`/tokens/*.css`) so the
 * no-build-step UI kit demos keep working. This script copies those files into
 * `css/` and generates `css/index.css` (same order as the root styles.css
 * manifest — base.css must come last).
 */
import { cp, mkdir, writeFile, readdir } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const pkgRoot = resolve(here, "..");
const srcDir = resolve(pkgRoot, "..", "..", "tokens");
const outDir = join(pkgRoot, "css");

const ORDER = [
  "fonts.css",
  "colors.css",
  "typography.css",
  "spacing.css",
  "radius.css",
  "shadows.css",
  "motion.css",
  "base.css",
];

await mkdir(outDir, { recursive: true });

const files = (await readdir(srcDir)).filter((f) => f.endsWith(".css"));
const unknown = files.filter((f) => !ORDER.includes(f));
if (unknown.length) {
  throw new Error(
    `tokens/ contains files not listed in the import ORDER of packages/tokens/scripts/build.mjs: ${unknown.join(", ")}. Add them in the right cascade position.`,
  );
}
const missing = ORDER.filter((f) => !files.includes(f));
if (missing.length) {
  throw new Error(`tokens/ is missing expected files: ${missing.join(", ")}`);
}

for (const f of ORDER) {
  await cp(join(srcDir, f), join(outDir, f));
}

const index = [
  "/* ETKAN UI — اتقان · design tokens. Generated file — do not edit.",
  "   Import this once in your app: `import \"@etkan-ui/tokens\";` (bundlers)",
  "   or `<link rel=\"stylesheet\" href=\".../css/index.css\">`. */",
  ...ORDER.map((f) => `@import url("./${f}");`),
  "",
].join("\n");

await writeFile(join(outDir, "index.css"), index, "utf8");
console.log(`@etkan-ui/tokens: built css/ (${ORDER.length} files + index.css)`);
