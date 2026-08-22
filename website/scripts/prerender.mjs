import { access, readFile, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { render } from "../.ssr/entry-server.js";

const outputDirectory = resolve("dist");
const indexPath = resolve(outputDirectory, "index.html");
const shell = await readFile(indexPath, "utf8");
const marker = '<div id="root"></div>';

if (!shell.includes(marker)) throw new Error("Could not find the React root in dist/index.html");

const rendered = render();
for (const assetPath of rendered.matchAll(/(?:src|href)="(\/assets\/[^\"]+)"/g)) {
  await access(resolve(outputDirectory, assetPath[1].slice(1)));
}

await writeFile(indexPath, shell.replace(marker, `<div id="root">${rendered}</div>`));
await rm(resolve(".ssr"), { recursive: true, force: true });
