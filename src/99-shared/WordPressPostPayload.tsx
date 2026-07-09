type JsonObject = Record<string, any>;

function sanitizeRenderedHtml(html: string): string {
    if (typeof document === "undefined") {
        return html
            .replace(/<script\b[\s\S]*?<\/script>/gi, "")
            .replace(/<link\b[^>]*rel=["'][^"']*stylesheet[^"']*["'][^>]*>/gi, "")
            .replace(/<iframe\b[^>]*class=["'][^"']*wp-embedded-content[^"']*["'][\s\S]*?<\/iframe>/gi, "");
    }

    const template = document.createElement("template");
    template.innerHTML = html;

    template.content
        .querySelectorAll("script, link[rel~='stylesheet'], iframe.wp-embedded-content")
        .forEach((element) => element.remove());

    return template.innerHTML;
}

class WordPressRenderedField {
    public rendered: string;

    public constructor(data: JsonObject = {}) {
        this.rendered = data.rendered ?? "";
    }
}

class WordPressProtectedRenderedField {
    public rendered: string;
    public protected: boolean;

    public constructor(data: JsonObject = {}) {
        this.rendered = sanitizeRenderedHtml(data.rendered ?? "");
        this.protected = data.protected ?? false;
    }
}

class WordPressMeta {
    public advancedSeoDescription: string;
    public jetpackSeoHtmlTitle: string;
    public jetpackSeoNoindex: boolean;
    public crdtDocument: string;
    public coblocksAttr: string;
    public coblocksDimensions: string;
    public coblocksResponsiveHeight: string;
    public coblocksAccordionIeSupport: string;
    public jetpackPostWasEverPublished: boolean;
    public readerSuggestedTags: string;
    public jetpackNewsletterAccess: string;
    public jetpackDontEmailPostToSubs: boolean;
    public jetpackNewsletterTierId: number;
    public jetpackMembershipsContainsPaywalledContent: boolean;
    public jetpackMembershipsContainsPaidContent: boolean;
    public footnotes: string;
    public jetpackPublicizeMessage: string;
    public jetpackPublicizeFeatureEnabled: boolean;
    public jetpackSocialPostAlreadyShared: boolean;
    public jetpackSocialOptions: JsonObject;

    public constructor(data: JsonObject = {}) {
        this.advancedSeoDescription = data.advanced_seo_description ?? "";
        this.jetpackSeoHtmlTitle = data.jetpack_seo_html_title ?? "";
        this.jetpackSeoNoindex = data.jetpack_seo_noindex ?? false;
        this.crdtDocument = data._crdt_document ?? "";
        this.coblocksAttr = data._coblocks_attr ?? "";
        this.coblocksDimensions = data._coblocks_dimensions ?? "";
        this.coblocksResponsiveHeight = data._coblocks_responsive_height ?? "";
        this.coblocksAccordionIeSupport = data._coblocks_accordion_ie_support ?? "";
        this.jetpackPostWasEverPublished = data.jetpack_post_was_ever_published ?? false;
        this.readerSuggestedTags = data.reader_suggested_tags ?? "";
        this.jetpackNewsletterAccess = data._jetpack_newsletter_access ?? "";
        this.jetpackDontEmailPostToSubs = data._jetpack_dont_email_post_to_subs ?? false;
        this.jetpackNewsletterTierId = data._jetpack_newsletter_tier_id ?? 0;
        this.jetpackMembershipsContainsPaywalledContent =
            data._jetpack_memberships_contains_paywalled_content ?? false;
        this.jetpackMembershipsContainsPaidContent =
            data._jetpack_memberships_contains_paid_content ?? false;
        this.footnotes = data.footnotes ?? "";
        this.jetpackPublicizeMessage = data.jetpack_publicize_message ?? "";
        this.jetpackPublicizeFeatureEnabled = data.jetpack_publicize_feature_enabled ?? false;
        this.jetpackSocialPostAlreadyShared = data.jetpack_social_post_already_shared ?? false;
        this.jetpackSocialOptions = data.jetpack_social_options ?? {};
    }
}

class WordPressLinkItem {
    public href: string;
    public embeddable?: boolean;
    public taxonomy?: string;
    public count?: number;
    public id?: number;
    public name?: string;
    public templated?: boolean;

    public constructor(data: JsonObject = {}) {
        this.href = data.href ?? "";
        this.embeddable = data.embeddable;
        this.taxonomy = data.taxonomy;
        this.count = data.count;
        this.id = data.id;
        this.name = data.name;
        this.templated = data.templated;
    }
}

class WordPressLinks {
    public self: WordPressLinkItem[];
    public collection: WordPressLinkItem[];
    public about: WordPressLinkItem[];
    public author: WordPressLinkItem[];
    public replies: WordPressLinkItem[];
    public versionHistory: WordPressLinkItem[];
    public predecessorVersion: WordPressLinkItem[];
    public wpAttachment: WordPressLinkItem[];
    public wpTerm: WordPressLinkItem[];
    public curies: WordPressLinkItem[];

    public constructor(data: JsonObject = {}) {
        this.self = (data.self ?? []).map((x: JsonObject) => new WordPressLinkItem(x));
        this.collection = (data.collection ?? []).map((x: JsonObject) => new WordPressLinkItem(x));
        this.about = (data.about ?? []).map((x: JsonObject) => new WordPressLinkItem(x));
        this.author = (data.author ?? []).map((x: JsonObject) => new WordPressLinkItem(x));
        this.replies = (data.replies ?? []).map((x: JsonObject) => new WordPressLinkItem(x));

        this.versionHistory = (data["version-history"] ?? [])
            .map((x: JsonObject) => new WordPressLinkItem(x));

        this.predecessorVersion = (data["predecessor-version"] ?? [])
            .map((x: JsonObject) => new WordPressLinkItem(x));

        this.wpAttachment = (data["wp:attachment"] ?? [])
            .map((x: JsonObject) => new WordPressLinkItem(x));

        this.wpTerm = (data["wp:term"] ?? [])
            .map((x: JsonObject) => new WordPressLinkItem(x));

        this.curies = (data.curies ?? []).map((x: JsonObject) => new WordPressLinkItem(x));
    }
}

class WordPressAvatarUrls {
    public size24: string;
    public size48: string;
    public size96: string;

    public constructor(data: JsonObject = {}) {
        this.size24 = data["24"] ?? "";
        this.size48 = data["48"] ?? "";
        this.size96 = data["96"] ?? "";
    }
}

class WordPressAuthor {
    public id: number;
    public name: string;
    public url: string;
    public description: string;
    public link: string;
    public slug: string;
    public avatarUrls: WordPressAvatarUrls;
    public links: WordPressLinks;

    public constructor(data: JsonObject = {}) {
        this.id = data.id ?? 0;
        this.name = data.name ?? "";
        this.url = data.url ?? "";
        this.description = data.description ?? "";
        this.link = data.link ?? "";
        this.slug = data.slug ?? "";
        this.avatarUrls = new WordPressAvatarUrls(data.avatar_urls);
        this.links = new WordPressLinks(data._links);
    }
}

class WordPressEmbedded {
    public author: WordPressAuthor[];

    public constructor(data: JsonObject = {}) {
        this.author = (data.author ?? []).map((x: JsonObject) => new WordPressAuthor(x));
    }
}

class WordPressPostPayload {
    public id: number;
    public date: string;
    public dateGmt: string;
    public guid: WordPressRenderedField;
    public modified: string;
    public modifiedGmt: string;
    public slug: string;
    public status: string;
    public type: string;
    public link: string;
    public title: WordPressRenderedField;
    public content: WordPressProtectedRenderedField;
    public excerpt: WordPressProtectedRenderedField;
    public author: number;
    public featuredMedia: number;
    public commentStatus: string;
    public pingStatus: string;
    public sticky: boolean;
    public template: string;
    public format: string;
    public meta: WordPressMeta;
    public categories: number[];
    public tags: number[];
    public classList: string[];
    public jetpackFeaturedMediaUrl: string;
    public jetpackShortlink: string;
    public jetpackSharingEnabled: boolean;
    public jetpackLikesEnabled: boolean;
    public jetpackRelatedPosts: JsonObject[];
    public jetpackPublicizeConnections: JsonObject[];
    public links: WordPressLinks;
    public embedded: WordPressEmbedded;

    public constructor(data: JsonObject = {}) {
        this.id = data.id ?? 0;
        this.date = data.date ?? "";
        this.dateGmt = data.date_gmt ?? "";
        this.guid = new WordPressRenderedField(data.guid);
        this.modified = data.modified ?? "";
        this.modifiedGmt = data.modified_gmt ?? "";
        this.slug = data.slug ?? "";
        this.status = data.status ?? "";
        this.type = data.type ?? "";
        this.link = data.link ?? "";
        this.title = new WordPressRenderedField(data.title);
        this.content = new WordPressProtectedRenderedField(data.content);
        this.excerpt = new WordPressProtectedRenderedField(data.excerpt);
        this.author = data.author ?? 0;
        this.featuredMedia = data.featured_media ?? 0;
        this.commentStatus = data.comment_status ?? "";
        this.pingStatus = data.ping_status ?? "";
        this.sticky = data.sticky ?? false;
        this.template = data.template ?? "";
        this.format = data.format ?? "";
        this.meta = new WordPressMeta(data.meta);
        this.categories = data.categories ?? [];
        this.tags = data.tags ?? [];
        this.classList = data.class_list ?? [];
        this.jetpackFeaturedMediaUrl = data.jetpack_featured_media_url ?? "";
        this.jetpackShortlink = data.jetpack_shortlink ?? "";
        this.jetpackSharingEnabled = data.jetpack_sharing_enabled ?? false;
        this.jetpackLikesEnabled = data.jetpack_likes_enabled ?? false;
        this.jetpackRelatedPosts = data["jetpack-related-posts"] ?? [];
        this.jetpackPublicizeConnections = data.jetpack_publicize_connections ?? [];
        this.links = new WordPressLinks(data._links);
        this.embedded = new WordPressEmbedded(data._embedded);
    }

    public get titleText(): string {
        return this.title.rendered;
    }

    public get contentHtml(): string {
        return this.content.rendered;
    }

    public get excerptHtml(): string {
        return this.excerpt.rendered;
    }

    public get modifiedDate(): Date {
        return new Date(this.modified);
    }

    public get publishedDate(): Date {
        return new Date(this.date);
    }

    public static fromJson(json: JsonObject): WordPressPostPayload {
        return new WordPressPostPayload(json);
    }
}

export default WordPressPostPayload;
