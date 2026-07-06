const DEFAULT_NAVI = "COVER";
const DEFAULT_WRITINGS_MODE = "POSTS";
export const DEFAULT_ARTICLE_CATE_ID = 2;
export const DEFAULT_POST_CATE_ID = 27;
const DEFAULT_ARTICLE_ID = -1;

const NAVI_OPTIONS = new Set(["COVER", "ABOUT_ME", "WRITINGS", "TIMELINE", "DEVELOP"]);
const WRITINGS_MODE_OPTIONS = new Set(["POSTS", "ARTICLES"]);

export interface AppRouteParameterState {
    navi: string;
    writingsMode: string;
    cateId: number;
    articleId: number;
}

function normalizeOption(value: string | null | undefined, options: Set<string>, fallback: string): string {
    if (value == null) {
        return fallback;
    }

    const normalized = value.toUpperCase();
    return options.has(normalized) ? normalized : fallback;
}

function parseNumber(value: string | null | undefined, fallback: number): number {
    if (value == null) {
        return fallback;
    }

    const parsed = Number.parseInt(value, 10);
    return Number.isNaN(parsed) ? fallback : parsed;
}

export function readAppRouteParameters(searchParams: URLSearchParams): AppRouteParameterState {
    const navi = normalizeOption(searchParams.get("navi"), NAVI_OPTIONS, DEFAULT_NAVI);
    const hasArticleParams = searchParams.has("cate") || searchParams.has("article");
    const defaultWritingsMode = hasArticleParams ? "ARTICLES" : DEFAULT_WRITINGS_MODE;
    const writingsMode = navi === "WRITINGS"
        ? normalizeOption(searchParams.get("mode"), WRITINGS_MODE_OPTIONS, defaultWritingsMode)
        : DEFAULT_WRITINGS_MODE;

    return {
        navi,
        writingsMode,
        cateId: writingsMode === "ARTICLES"
            ? parseNumber(searchParams.get("cate"), DEFAULT_ARTICLE_CATE_ID)
            : DEFAULT_ARTICLE_CATE_ID,
        articleId: writingsMode === "ARTICLES"
            ? parseNumber(searchParams.get("article"), DEFAULT_ARTICLE_ID)
            : DEFAULT_ARTICLE_ID,
    };
}

export function readLegacyPathParameters(pathname: string): Partial<AppRouteParameterState> | null {
    const parts = pathname.split("/").filter(Boolean);

    if (parts.length === 0) {
        return { navi: "COVER" };
    }

    const navi = normalizeOption(parts[0], NAVI_OPTIONS, DEFAULT_NAVI);
    if (navi !== "WRITINGS") {
        return { navi };
    }

    const mode = normalizeOption(parts[1], WRITINGS_MODE_OPTIONS, DEFAULT_WRITINGS_MODE);
    if (mode !== "ARTICLES") {
        return {
            navi: "WRITINGS",
            writingsMode: "POSTS",
        };
    }

    return {
        navi: "WRITINGS",
        writingsMode: "ARTICLES",
        cateId: parseNumber(parts[2], DEFAULT_ARTICLE_CATE_ID),
        articleId: parseNumber(parts[3], DEFAULT_ARTICLE_ID),
    };
}

export function buildAppRouteUrl(params: Partial<AppRouteParameterState>): string {
    const navi = normalizeOption(params.navi, NAVI_OPTIONS, DEFAULT_NAVI);

    if (navi === "COVER") {
        return "/";
    }

    const searchParams = new URLSearchParams();
    searchParams.set("navi", navi);

    if (navi === "WRITINGS") {
        const hasArticleId = params.articleId != null && params.articleId !== DEFAULT_ARTICLE_ID;
        const mode = normalizeOption(
            params.writingsMode,
            WRITINGS_MODE_OPTIONS,
            hasArticleId ? "ARTICLES" : DEFAULT_WRITINGS_MODE,
        );

        searchParams.set("mode", mode);

        if (mode === "ARTICLES") {
            searchParams.set("cate", String(params.cateId ?? DEFAULT_ARTICLE_CATE_ID));

            if (hasArticleId) {
                searchParams.set("article", String(params.articleId));
            }
        }
    }

    return `/?${searchParams.toString()}`;
}
