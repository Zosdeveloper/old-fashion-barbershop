import { SITE_CONFIG, GALLERY_ITEMS, HERO_IMAGES, SERVICES } from "@/lib/constants";

export function GET() {
  const allImages = [
    ...GALLERY_ITEMS.map((item) => ({
      loc: `${SITE_CONFIG.url}/gallery`,
      url: `${SITE_CONFIG.url}${item.src}`,
      caption: item.alt,
    })),
    ...HERO_IMAGES.map((item) => ({
      loc: SITE_CONFIG.url,
      url: `${SITE_CONFIG.url}${item.src}`,
      caption: item.alt,
    })),
    ...SERVICES.map((item) => ({
      loc: SITE_CONFIG.url,
      url: `${SITE_CONFIG.url}${item.image}`,
      caption: `${item.title} at Old Fashion Barbershop`,
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${Array.from(new Set(allImages.map((i) => i.loc)))
  .map(
    (loc) => `  <url>
    <loc>${loc}</loc>
${allImages
  .filter((i) => i.loc === loc)
  .map(
    (img) => `    <image:image>
      <image:loc>${img.url}</image:loc>
      <image:caption>${escapeXml(img.caption)}</image:caption>
    </image:image>`
  )
  .join("\n")}
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
