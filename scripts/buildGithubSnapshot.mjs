import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import authData from '../auth/github.json' with { type: 'json' };
import { read } from "node:fs";

const API_ROOT = "https://api.github.com";
const OUTPUT_PATH = fileURLToPath(new URL("../src/generated/githubSnapshot.json", import.meta.url));
const ACCESS_TOKEN = authData.accessToekn;

function buildUrl(path, params = {}) {
  const url = new URL(`${API_ROOT}${path}`);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, String(value));
  });

  return url;
}

async function fetchJson(path, params = {}) {
  const url = buildUrl(path, params);
  const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Accept': "application/vnd.github+json",
        'X-GitHub-Api-Version': "2026-03-10"
      }
    }
  );

  if (!response.ok) {
    return {};
  }

  return {
    json: await response.json(),
  };
}

async function fetchCollection(path, params = {}) {
  const repos = await fetchJson(path, {
    ...params,
  });
  return repos.json;
}

const [user] = await Promise.all([
  fetchJson("/user")
]);

const [repos] = await Promise.all([
  fetchCollection(`/users/${user.json.login}/repos`),
]);

const repos_with_readmes = await Promise.all( repos.map(async (repo) => {
    const readme = await fetchJson(`/repos/${user.json.login}/${repo.name}/contents/README.md`);
    repo.readme = readme.json;
    return repo;
  })
)
;



const snapshot = {
  generatedAt: new Date().toISOString(),
  source: API_ROOT,
  user: user,
  repos: repos_with_readmes
};

const output = `${JSON.stringify(snapshot, null, 2)}\n`;

await mkdir(dirname(OUTPUT_PATH), { recursive: true });
await writeFile(OUTPUT_PATH, output, "utf8");

console.log(
  `Wrote Github snapshot: ${repos_with_readmes.length} repos_with_readmes.`,
);
