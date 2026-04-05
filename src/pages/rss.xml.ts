import type { APIRoute } from "astro";
import { getEmDashCollection, getSiteSettings } from "emdash";

export const GET: APIRoute = async ({ site }) => {
	const settings = await getSiteSettings();
	const siteTitle = settings?.title || "Kin & Stone";
	const siteTagline = settings?.tagline || "Essential goods, thoughtfully made";
	const siteUrl = site?.toString().replace(/\/$/, "") || "https://example.com";

	const { entries: products } = await getEmDashCollection("products", {
		status: "published",
		limit: 50,
		orderBy: { published_at: "desc" },
	});

	const items = products
		.map((p: any) => {
			const url = `${siteUrl}/shop/${p.id}`;
			const pub = p.data.publishedAt ? new Date(p.data.publishedAt).toUTCString() : new Date().toUTCString();
			const desc = `${p.data.price || ""} — ${p.data.short_description || ""}`.trim();
			return `
				<item>
					<title><![CDATA[${p.data.title}]]></title>
					<link>${url}</link>
					<guid>${url}</guid>
					<pubDate>${pub}</pubDate>
					<description><![CDATA[${desc}]]></description>
				</item>`;
		})
		.join("");

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
	<channel>
		<title>${siteTitle}</title>
		<link>${siteUrl}</link>
		<description>${siteTagline}</description>
		${items}
	</channel>
</rss>`;

	return new Response(xml, {
		headers: { "Content-Type": "application/xml; charset=utf-8" },
	});
};
