import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import authData from '../auth/github.json' with { type: 'json' };

const API_ROOT = "https://api.github.com";
const OUTPUT_PATH = fileURLToPath(new URL("../src/99-generated/githubSnapshot.json", import.meta.url));
const ACCESS_TOKEN = authData.accessToekn;
const REPO_CONCURRENCY = 2;

function decodeGitHubContent(content, encoding) {
  if (!content || encoding !== "base64") {
    return content ?? "";
  }

  const cleaned = content
    .replace(/\s/g, "")
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  return Buffer.from(cleaned, "base64").toString("utf-8");
}

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

async function mapWithConcurrency(items, concurrency, mapper) {
  const results = new Array(items.length);
  let nextIndex = 0;

  const workers = Array.from(
    { length: Math.min(concurrency, items.length) },
    async () => {
      while (nextIndex < items.length) {
        const currentIndex = nextIndex;
        nextIndex += 1;
        results[currentIndex] = await mapper(items[currentIndex], currentIndex);
      }
    },
  );

  await Promise.all(workers);
  return results;
}

function encodeGitHubPath(path) {
  return path.split("/").map(encodeURIComponent).join("/");
}

function buildGitHubFileUrl(repo, path, type) {
  const encodedBranch = encodeURIComponent(repo.default_branch);
  const encodedPath = encodeGitHubPath(path);
  const view = type === "directory" ? "tree" : "blob";

  return `${repo.html_url}/${view}/${encodedBranch}/${encodedPath}`;
}

function buildCodebaseTree(files, repo) {
  const root = [];
  const directoriesByPath = new Map();

  files
    .toSorted((a, b) => a.path.localeCompare(b.path))
    .forEach((file) => {
      const parts = file.path.split("/");
      let children = root;
      let currentPath = "";

      parts.forEach((part, index) => {
        currentPath = currentPath ? `${currentPath}/${part}` : part;

        if (index === parts.length - 1) {
          children.push({
            name: part,
            path: currentPath,
            github_url: buildGitHubFileUrl(repo, currentPath, "file"),
          });
          return;
        }

        let directory = directoriesByPath.get(currentPath);

        if (!directory) {
          directory = {
            name: part,
            path: currentPath,
            github_url: buildGitHubFileUrl(repo, currentPath, "directory"),
            children: [],
          };
          directoriesByPath.set(currentPath, directory);
          children.push(directory);
        }

        children = directory.children;
      });
    });

  return root;
}

async function fetchRepoCodebase(owner, repo) {
  const branch = encodeURIComponent(repo.default_branch);
  const treeResponse = await fetchJson(
    `/repos/${owner}/${repo.name}/git/trees/${branch}`,
    { recursive: 1 },
  );
  const codebase = treeResponse.json?.tree
    ?.filter((entry) => entry.type === "blob")
    .map((file) => ({ path: file.path })) ?? [];

  return {
    files: buildCodebaseTree(codebase, repo),
    truncated: treeResponse.json?.truncated ?? false,
  };
}

async function fetchRepoSnapshot(repo) {
  const readme = await fetchJson(`/repos/${user.json.login}/${repo.name}/contents/README.md`);
  repo.readme = readme.json;

  try {
    if (repo.readme?.content) {
      repo.readme.content = decodeGitHubContent(
        repo.readme.content,
        repo.readme.encoding,
      );
    }
  } catch (error) {
    console.log(`Could not decode README for ${repo.name}:`, error);
  }

  const codebase = await fetchRepoCodebase(user.json.login, repo);
  repo.codebase = codebase.files;
  repo.codebase_truncated = codebase.truncated;

  return repo;
}

const [user] = await Promise.all([
  fetchJson("/user")
]);

const [repos] = await Promise.all([
  fetchCollection(`/users/${user.json.login}/repos`),
]);

const repos_with_readmes = await mapWithConcurrency(
  repos,
  REPO_CONCURRENCY,
  fetchRepoSnapshot,
);

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
