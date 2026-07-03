import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const API_ROOT = "https://public-api.wordpress.com/wp/v2/sites/oxoi3.wordpress.com";
const OUTPUT_PATH = fileURLToPath(new URL("../src/generated/wpSnapshot.json", import.meta.url));
const API_PAGE_SIZE = 100;
const APP_PAGE_SIZE = 12;

function buildUrl(path, params = {}) {
  const url = new URL(`${API_ROOT}${path}`);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, String(value));
  });

  return url;
}

async function fetchJson(path, params = {}) {
  const url = buildUrl(path, params);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }

  return {
    json: await response.json(),
    totalPages: Number.parseInt(response.headers.get("X-WP-TotalPages") ?? "1", 10) || 1,
  };
}

async function fetchCollection(path, params = {}) {
  const firstPage = await fetchJson(path, {
    ...params,
    page: 1,
    per_page: API_PAGE_SIZE,
  });

  const remainingPages = Array.from(
    { length: Math.max(firstPage.totalPages - 1, 0) },
    (_, index) => index + 2,
  );

  const rest = await Promise.all(
    remainingPages.map((page) =>
      fetchJson(path, {
        ...params,
        page,
        per_page: API_PAGE_SIZE,
      }).then((result) => result.json),
    ),
  );

  return [firstPage.json, ...rest].flat();
}

const [posts, tags, categories] = await Promise.all([
  fetchCollection("/posts", { _embed: "author" }),
  fetchCollection("/tags"),
  fetchCollection("/categories"),
]);

const snapshot = {
  generatedAt: new Date().toISOString(),
  source: API_ROOT,
  appPageSize: APP_PAGE_SIZE,
  posts,
  tags,
  categories,
};

const output = `${JSON.stringify(snapshot, null, 2)}\n`;

await mkdir(dirname(OUTPUT_PATH), { recursive: true });
await writeFile(OUTPUT_PATH, output, "utf8");

console.log(
  `Wrote WordPress snapshot: ${posts.length} posts, ${tags.length} tags, ${categories.length} categories.`,
);
