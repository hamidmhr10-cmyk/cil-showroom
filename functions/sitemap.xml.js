// /sitemap.xml: built live from data/products.json so new products with photos appear automatically.
// If anything goes wrong we fall back to the static sitemap.xml file in the repo.
import { loadData, renderSitemap } from './_lib/shop.js';

export async function onRequestGet(context) {
  try {
    const data = await loadData(context);
    return new Response(renderSitemap(data), {
      headers: { 'content-type': 'application/xml; charset=utf-8', 'cache-control': 'public, max-age=900' },
    });
  } catch (e) {
    return context.next();
  }
}
