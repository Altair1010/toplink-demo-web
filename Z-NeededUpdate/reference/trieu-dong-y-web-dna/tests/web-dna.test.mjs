import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const read = (file) => JSON.parse(fs.readFileSync(new URL(file, import.meta.url), "utf8"));

test("capture package accounts for every route", () => {
  const summary = read("../docs/web-dna/02_evidence/capture-summary.json");
  const content = read("../data/content-index.json");
  assert.equal(summary.routes.expected, 634);
  assert.equal(summary.routes.captured, 634);
  assert.equal(summary.routes.failed, 0);
  assert.equal(content.length, 634);
  assert.equal(new Set(content.map((x) => x.source_url)).size, 634);
  assert.ok(content.every((x) => x.provenance.capture_sha256.length === 64));
});

test("task graph is acyclic and dependencies resolve", () => {
  const graph = read("../task-graph.json");
  const ids = new Set(graph.tasks.map((x) => x.id));
  assert.equal(ids.size, graph.tasks.length);
  assert.ok(graph.tasks.every((task) => task.depends_on.every((id) => ids.has(id))));
  const visiting = new Set();
  const visited = new Set();
  const byId = new Map(graph.tasks.map((task) => [task.id, task]));
  const walk = (id) => {
    if (visiting.has(id)) throw new Error(`cycle at ${id}`);
    if (visited.has(id)) return;
    visiting.add(id);
    for (const dep of byId.get(id).depends_on) walk(dep);
    visiting.delete(id);
    visited.add(id);
  };
  for (const id of ids) walk(id);
  assert.equal(visited.size, graph.tasks.length);
});

test("graphs preserve route and evidence integrity", () => {
  const site = read("../docs/web-dna/05_graphs/site-graph.json");
  const assets = read("../docs/web-dna/05_graphs/asset-graph.json");
  const interactions = read("../docs/web-dna/05_graphs/interaction-graph.json");
  assert.equal(site.nodes.length, 634);
  assert.equal(new Set(site.nodes.map((x) => x.id)).size, 634);
  assert.ok(site.edges.length > 30000);
  assert.equal(assets.nodes.length, 1939);
  assert.equal(interactions.evidence.archetype_exemplars, 21);
});

test("primary product routes render", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("web-dna", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  for (const path of ["/", "/knowledge", "/lookup", "/care", "/package", "/baseline", "/baseline/huyet-dao/am-bao"]) {
    const response = await worker.fetch(new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
    assert.equal(response.status, 200, path);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i, path);
    assert.ok((await response.text()).length > 500, path);
  }
});
