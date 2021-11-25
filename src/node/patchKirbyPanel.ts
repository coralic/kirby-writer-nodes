import fs from "fs";
import chalk from "chalk";
import consola from "consola";

const pattern = "},this.marks)}";
const patch =
  // Global `window.panel.plugins.marks` array or fallback
  ",...(window.panel.plugins.marks||[])" +
  // Reduce array to object
  ".reduce(" +
  // Reducer callback
  "(a,[n,f])=>({...a,n:new f()})" +
  // Reducer initial value
  ",{})" +
  pattern;

/**
 * Extend writer field to support custom inline marks
 */
async function main() {
  consola.start("Kirby Panel patcher for custom writer marks");

  let path = `${
    fs.existsSync("vendor/getkirby") ? "vendor/getkirby/cms" : "kirby"
  }/panel/dist/js`;
  path += fs.existsSync(`${path}/index.js`) ? "/index.js" : "/app.js";

  if (!fs.existsSync(path)) {
    consola.error(`couldn't find ${chalk.cyan(path)}, is Kirby installed?`);
    return;
  }

  const panel = fs.readFileSync(path, "utf8");

  if (panel.includes(patch)) {
    consola.success("already patched");
    return;
  }

  consola.info("patching the Panel...");

  const output = panel.replace(pattern, patch);
  fs.writeFileSync(path, output, "utf8");

  consola.success("successfully patched");
}

main().catch((err) => consola.error(err));
