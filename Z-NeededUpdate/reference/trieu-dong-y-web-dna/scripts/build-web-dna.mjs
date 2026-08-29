import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const root = process.cwd();
const docs = path.join(root, "docs/web-dna");
const readJson = (file) => JSON.parse(fs.readFileSync(path.join(root, file), "utf8"));
const writeJson = (file, value) => {
  const target = path.join(root, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, `${JSON.stringify(value, null, 2)}\n`);
};
const sha = (value) => crypto.createHash("sha256").update(value).digest("hex");
const slugPath = (url) => new URL(url).pathname.replace(/^\/+|\/+$/g, "");

const routeRows = fs.readFileSync(path.join(docs, "03_inventory/routes.jsonl"), "utf8").trim().split("\n").map(JSON.parse);
const rawFiles = fs.readdirSync(path.join(docs, "02_evidence/raw/tier0")).filter((x) => x.endsWith(".jsonl")).sort();
const captures = rawFiles.flatMap((file) => fs.readFileSync(path.join(docs, "02_evidence/raw/tier0", file), "utf8").trim().split("\n").map(JSON.parse));
const deep = readJson("docs/web-dna/02_evidence/derived/archetype-deep-capture.json");
const archetypes = readJson("docs/web-dna/03_inventory/page_archetypes.json").archetypes;
const routeByUrl = new Map(routeRows.map((row) => [row.url, row]));
const captureByUrl = new Map(captures.map((row) => [row.requested, row]));
const sourceUrls = new Set(routeRows.map((row) => row.url));

const content = routeRows.map((route) => {
  const capture = captureByUrl.get(route.url);
  const text = capture?.text || "";
  const hero = capture?.images?.find((image) => image.width >= 500) || capture?.images?.[0] || null;
  return {
    id: route.route_id,
    source_url: route.url,
    source_path: route.path,
    baseline_path: `/baseline/${slugPath(route.url)}`.replace(/\/$/, "") || "/baseline",
    title: capture?.title || route.title || route.path,
    h1: capture?.h1 || route.h1 || [],
    description: capture?.description || text.slice(0, 220),
    excerpt: text.slice(0, 720),
    body_text: text,
    headings: capture?.headings || [],
    archetype: route.archetype,
    priority: route.priority,
    hero,
    images: capture?.images || [],
    links: (capture?.links || []).filter((url) => sourceUrls.has(url.split("#")[0])),
    provenance: {
      captured_at: capture?.captured_at || null,
      method: "browser-rendered-dom",
      status: capture?.status || "missing",
      capture_sha256: sha(JSON.stringify(capture || {})),
    },
  };
});

const render = content.map((item) => ({
  id: item.id,
  source_url: item.source_url,
  source_path: item.source_path,
  baseline_path: item.baseline_path,
  title: item.title,
  h1: item.h1.slice(0, 2),
  description: item.description.slice(0, 320),
  body_text: item.body_text.slice(0, 900),
  headings: item.headings.slice(0, 6),
  archetype: item.archetype,
  hero: item.hero ? { src: item.hero.src, alt: item.hero.alt, width: item.hero.width, height: item.hero.height } : null,
  provenance: { captured_at: item.provenance.captured_at, method: item.provenance.method, status: item.provenance.status, capture_sha256: item.provenance.capture_sha256 },
}));
const lite = content.map((item) => ({
  id: item.id,
  title: item.title,
  excerpt: item.excerpt.slice(0, 320),
  archetype: item.archetype,
  baseline_path: item.baseline_path,
  hero: item.hero ? { src: item.hero.src, alt: item.hero.alt } : null,
}));
writeJson("data/content-index.json", content);
writeJson("data/content-render.json", render);
writeJson("data/content-index-lite.json", lite);

const routeEdges = [];
for (const item of content) {
  for (const target of item.links) {
    const normalized = target.split("#")[0];
    if (routeByUrl.has(normalized)) routeEdges.push({ from: item.id, to: routeByUrl.get(normalized).route_id, type: "links-to" });
  }
}
writeJson("docs/web-dna/05_graphs/site-graph.json", {
  schema_version: "web-dna-site-graph/1.0",
  nodes: routeRows.map(({ route_id, url, path: routePath, archetype, priority }) => ({ id: route_id, url, path: routePath, archetype, priority })),
  edges: routeEdges,
  validation: { node_count: routeRows.length, edge_count: routeEdges.length, orphan_count: routeRows.filter((r) => !routeEdges.some((e) => e.from === r.route_id || e.to === r.route_id)).length },
});

const assetUsage = new Map();
for (const capture of captures) {
  for (const asset of capture.assets || []) {
    if (!asset.startsWith("http")) continue;
    const value = assetUsage.get(asset) || { url: asset, used_by: [], kind: /\.(jpe?g|png|webp|gif|svg)(\?|$)/i.test(asset) ? "image" : /\.css(\?|$)/i.test(asset) ? "stylesheet" : /\.js(\?|$)/i.test(asset) ? "script" : "remote-resource" };
    value.used_by.push(routeByUrl.get(capture.requested)?.route_id || capture.requested);
    assetUsage.set(asset, value);
  }
}
writeJson("docs/web-dna/05_graphs/asset-graph.json", {
  schema_version: "web-dna-asset-graph/1.0",
  nodes: [...assetUsage.values()].map((asset, index) => ({ id: `asset:${String(index + 1).padStart(4, "0")}`, ...asset, used_by: [...new Set(asset.used_by)], resolution: "remote-resolved", provenance: "rendered-dom-reference" })),
  summary: { unique_assets: assetUsage.size, image_assets: [...assetUsage.values()].filter((x) => x.kind === "image").length },
});

const componentCatalog = [
  ["site-header", "shared", "navigation"], ["breadcrumb", "shared", "orientation"],
  ["hero", "section", "attention"], ["archive-grid", "listing", "discovery"],
  ["article-prose", "content", "reading"], ["entity-facts", "entity", "reference"],
  ["lookup-form", "interactive", "lookup"], ["lead-form", "interactive", "contact"],
  ["related-content", "content", "continuation"], ["site-footer", "shared", "trust"],
];
const compositionNodes = componentCatalog.map(([name, family, purpose]) => ({ id: `component:shared:${name}`, name, family, purpose }));
const compositionEdges = archetypes.flatMap((a) => compositionNodes.map((node, index) => ({ from: `archetype:${a.archetype}`, to: node.id, type: "may-contain", confidence: index === 0 || index === 9 ? "observed" : "inferred" })));
writeJson("docs/web-dna/05_graphs/composition-graph.json", { schema_version: "web-dna-composition-graph/1.0", nodes: [...archetypes.map((a) => ({ id: `archetype:${a.archetype}`, type: "page_archetype", count: a.count })), ...compositionNodes], edges: compositionEdges });

const transitions = new Map();
for (const page of deep) for (const item of page.interactive || []) {
  const t = item.transition || "none";
  transitions.set(t, (transitions.get(t) || 0) + 1);
}
writeJson("docs/web-dna/05_graphs/motion-graph.json", {
  schema_version: "web-dna-motion-graph/1.0",
  capture_mode: "computed-transition census",
  limitation: "Runtime mutation was prohibited on the capture surface; motion-capture-v4 is packaged and smoke-tested but not injected into the public site.",
  transition_families: [...transitions.entries()].sort((a, b) => b[1] - a[1]).map(([value, count], index) => ({ id: `motion:transition:${index + 1}`, value, count })),
  tokens: { fast: "120ms", standard: "200ms", deliberate: "250ms", easing: "ease", reduced_motion: "remove non-essential transform and smooth scrolling" },
});

const styles = deep.flatMap((page) => Object.values(page.styles || {}).map((item) => item.style));
const frequency = (field) => [...styles.reduce((map, item) => map.set(item[field], (map.get(item[field]) || 0) + 1), new Map()).entries()].sort((a, b) => b[1] - a[1]).map(([value, count]) => ({ value, count }));
writeJson("docs/web-dna/04_ui_ir/design-tokens.json", {
  schema_version: "web-dna-tokens/1.0",
  source: { font_families: frequency("fontFamily").slice(0, 12), font_sizes: frequency("fontSize").slice(0, 20), colors: frequency("color").slice(0, 24), backgrounds: frequency("backgroundColor").slice(0, 24), radii: frequency("borderRadius").slice(0, 16), shadows: frequency("boxShadow").slice(0, 16) },
  evolved: { color: { ink: "#173827", forest: "#244c37", paper: "#f3efe4", vermilion: "#a94732", gold: "#b38b50" }, typography: { display: "Georgia, serif", body: "Avenir Next, Segoe UI, sans-serif", source_body: "Tahoma, Geneva, Verdana, sans-serif" }, spacing: { unit: 4, section: [64, 80, 96, 120], container: 1180 }, radius: { control: 6, card: 20, pill: 999 }, motion: { fast: 120, standard: 200, deliberate: 250 } },
});

writeJson("docs/web-dna/05_graphs/interaction-graph.json", {
  schema_version: "web-dna-interaction-graph/1.0",
  nodes: [
    { id: "interaction:nav:open", trigger: "click/keyboard", effect: "reveal navigation" },
    { id: "interaction:search:query", trigger: "input", effect: "filter content index" },
    { id: "interaction:lookup:select", trigger: "select", effect: "reveal related knowledge" },
    { id: "interaction:contact:intent", trigger: "click", effect: "open contact channel; no automatic submission" },
  ],
  evidence: { sampled_interactive_elements: deep.reduce((sum, page) => sum + page.interactive.length, 0), archetype_exemplars: deep.length },
});

const summary = {
  schema_version: "web-dna-capture-summary/1.0",
  captured_at: "2026-08-13",
  routes: { expected: routeRows.length, captured: captures.filter((x) => x.status === "captured").length, failed: captures.filter((x) => x.status === "failed").length, unique: new Set(captures.map((x) => x.requested)).size },
  archetypes: { count: archetypes.length, deep_exemplars: deep.length },
  evidence: { raw_batches: rawFiles.length, unique_asset_references: assetUsage.size, unique_image_references: new Set(captures.flatMap((x) => (x.images || []).map((i) => i.src))).size, link_edges: routeEdges.length, interactive_elements_sampled: deep.reduce((sum, page) => sum + page.interactive.length, 0) },
  limitations: ["robots.txt, XML sitemap, and REST endpoints were blocked by the current access surface", "viewport resizing was unavailable; Tier A mobile screenshots remain a future fidelity enhancement", "asset nodes are remote-resolved references, not an offline binary mirror", "motion runtime script was not injected into the public origin; computed transition evidence is used"],
};
writeJson("docs/web-dna/02_evidence/capture-summary.json", summary);
console.log(JSON.stringify(summary, null, 2));
