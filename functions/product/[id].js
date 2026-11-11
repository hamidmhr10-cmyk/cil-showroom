// /product/<id>: server-rendered product page for products that have a real photo (see _lib/shop.js)
import { loadData, findProduct, renderProductPage, notFound } from '../_lib/shop.js';

export async function onRequestGet(context) {
  let hit;
  try {
    const data = await loadData(context);
    let id = context.params.id;
    try { id = decodeURIComponent(id); } catch (e) { /* keep raw */ }
    hit = findProduct(data, id);
    if (hit) {
      return new Response(renderProductPage(hit.p, hit.type, data), {
        headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'public, max-age=300' },
      });
    }
  } catch (e) {
    // temporary problem: tell crawlers to retry rather than drop the page
    return new Response('Temporarily unavailable', { status: 503, headers: { 'retry-after': '120', 'cache-control': 'no-store' } });
  }
  return notFound(context);
}

// crawlers sometimes probe with HEAD
export const onRequestHead = onRequestGet;
