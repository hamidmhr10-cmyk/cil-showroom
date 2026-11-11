// Shared helpers for the Cloudflare Pages Functions (product pages + live sitemap).
// Data source of truth: /data/products.json (edited via /admin). Only products that have a real photo get a page.

export const SITE = 'https://lurixa.co.uk';
export const ASSET_V = '20261111f'; // keep in step with the ?v= used in the HTML pages

// category key -> landing page slug (must match the generated category pages)
export const CAT_PAGES = {
  lighting: { chandeliers: 'chandeliers', ceiling: 'ceiling-lights', garden: 'garden-lights', fan: 'fan-lights' },
  furniture: { sofas: 'sofas-and-beds', dining: 'dining-and-chairs', garden: 'garden-furniture', tv: 'tv-and-storage' },
};
const TYPE_LABEL = { lighting: 'Lighting', furniture: 'Furniture' };
const LOW_STOCK = 3;

export const escapeHtml = s => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const jsonLd = obj => JSON.stringify(obj).replace(/</g, '\\u003c');

export async function loadData(context) {
  const r = await context.env.ASSETS.fetch(new URL('/data/products.json', context.request.url));
  if (!r.ok) throw new Error('products.json ' + r.status);
  const data = await r.json();
  if (!data || !Array.isArray(data.lighting) || !Array.isArray(data.furniture)) throw new Error('bad products.json');
  return data;
}

export function findProduct(data, id) {
  for (const type of ['lighting', 'furniture']) {
    const p = data[type].find(x => x && String(x.id) === String(id));
    if (p && p.image && p.name) return { p, type };
  }
  return null;
}

export function listPublished(data) {
  const out = [];
  for (const type of ['lighting', 'furniture']) for (const p of data[type]) if (p && p.image && p.name && p.id) out.push({ p, type });
  return out;
}

const abs = u => (/^https?:/i.test(u) ? u : SITE + (u.charAt(0) === '/' ? '' : '/') + u);

function catLabel(data, type, key) {
  const list = (data.categories && data.categories[type]) || [];
  const hit = list.find(c => c.key === key);
  return hit ? hit.label : key;
}
function catUrl(type, key) {
  const slug = CAT_PAGES[type] && CAT_PAGES[type][key];
  return slug ? '/' + slug : '/' + type;
}
function stockInfo(p) {
  const has = p.stock !== undefined && p.stock !== null && p.stock !== '';
  const n = has ? +p.stock : NaN;
  if (has && n > LOW_STOCK) return { cls: 'ok', text: 'In stock' };
  if (has && n > 0) return { cls: 'low', text: 'Only ' + n + ' left' };
  if (p.incoming) return { cls: 'soon', text: p.incoming };
  if (has) return { cls: 'out', text: 'Out of stock' };
  return null;
}
function trimDesc(t, max) {
  t = String(t || '').replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  return t.slice(0, max - 1).replace(/\s+\S*$/, '') + '…';
}

export function renderProductPage(p, type, data) {
  const url = `${SITE}/product/${encodeURIComponent(p.id)}`;
  const label = catLabel(data, type, p.cat);
  const cUrl = catUrl(type, p.cat);
  const images = [p.image].concat(Array.isArray(p.gallery) ? p.gallery : []).filter(Boolean);
  const title = `${p.name} | ${label} | LURIXA`;
  const desc = trimDesc(`${p.name}: ${p.desc || label}. Delivered across the UK from Luton, or see it in our showroom by appointment.`, 158);
  const priceMatch = String(p.price || '').match(/£\s*([\d,]+(?:\.\d+)?)/);
  const st = stockInfo(p);

  const product = {
    '@type': 'Product', '@id': url + '#product', name: p.name, image: images.map(abs),
    description: p.desc || p.name, sku: String(p.id), brand: { '@type': 'Brand', name: 'LURIXA' }, url,
  };
  if (priceMatch) {
    const out = typeof p.stock === 'number' && p.stock <= 0;
    product.offers = {
      '@type': 'Offer', priceCurrency: 'GBP', price: priceMatch[1].replace(/,/g, ''), url,
      itemCondition: 'https://schema.org/NewCondition',
      availability: out ? (p.incoming ? 'https://schema.org/PreOrder' : 'https://schema.org/OutOfStock') : 'https://schema.org/InStock',
      seller: { '@id': SITE + '/#business' },
    };
  }
  const crumbs = {
    '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE + '/' },
      { '@type': 'ListItem', position: 2, name: TYPE_LABEL[type], item: `${SITE}/${type}` },
      { '@type': 'ListItem', position: 3, name: label, item: SITE + cUrl },
      { '@type': 'ListItem', position: 4, name: p.name, item: url },
    ],
  };

  const specs = [['Size', p.dims], ['Finish', p.finishes], ['Best for', p.rooms], ['Sold', p.unit]]
    .filter(r => r[1]).map(r => `<div><dt>${r[0]}</dt><dd>${escapeHtml(r[1])}</dd></div>`).join('');
  const thumbs = images.slice(1).map(src => `<img src="${escapeHtml(src)}" alt="${escapeHtml(p.name)}" loading="lazy">`).join('');
  const video = p.video ? `<video src="${escapeHtml(p.video)}" controls playsinline preload="metadata" style="margin-top:.8rem"></video>` : '';
  const price = p.price ? `<p class="pdp__price">${escapeHtml(p.price)}${p.unit ? `<small>${escapeHtml(p.unit)}</small>` : ''}</p>` : '';
  const stock = st ? `<span class="stock stock--${st.cls}">${escapeHtml(st.text)}</span>` : '';
  const isLight = type === 'furniture' ? 1 : 0;

  return `<!DOCTYPE html>
<html lang="en-GB">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <base href="/">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(desc)}">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <meta name="theme-color" content="#2A1A0E">
  <link rel="canonical" href="${url}">
  <meta property="og:site_name" content="LURIXA">
  <meta property="og:type" content="product">
  <meta property="og:locale" content="en_GB">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(desc)}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${escapeHtml(abs(images[0]))}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(desc)}">
  <meta name="twitter:image" content="${escapeHtml(abs(images[0]))}">
  <script type="application/ld+json">${jsonLd({ '@context': 'https://schema.org', '@graph': [product, crumbs] })}</script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Inter:wght@400;500;600&family=Cormorant+Garamond:wght@500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css?v=${ASSET_V}">
  <link rel="icon" href="/favicon.ico" sizes="48x48">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png">
  <link rel="apple-touch-icon" href="/apple-touch-icon-180x180.png">
  <link rel="manifest" href="/site.webmanifest">
</head>
<body data-page="product">
  <div id="site-nav"></div>

  <main class="pdp">
    <div class="container">
      <nav class="crumbs" aria-label="Breadcrumb"><a href="index.html">Home</a><span aria-hidden="true">/</span><a href="${type}.html">${TYPE_LABEL[type]}</a><span aria-hidden="true">/</span><a href="${cUrl.slice(1)}.html">${escapeHtml(label)}</a><span aria-hidden="true">/</span><span aria-current="page">${escapeHtml(p.name)}</span></nav>
      <div class="pdp__grid">
        <div class="pdp__media">
          <img src="${escapeHtml(images[0])}" alt="${escapeHtml(p.name)}" width="800" height="800">
          ${thumbs ? `<div class="pdp__thumbs">${thumbs}</div>` : ''}
          ${video}
        </div>
        <div class="pdp__info">
          <span class="pdp__cat">${escapeHtml(label)}</span>
          <h1>${escapeHtml(p.name)}</h1>
          ${price}
          ${stock}
          <p class="pdp__desc">${escapeHtml(p.desc || '')}</p>
          ${specs ? `<dl class="pdp__specs">${specs}</dl>` : ''}
          <div class="pdp__cta">
            <button class="btn btn--gold btn--lg" data-enquire="${escapeHtml(p.id)}" data-light="${isLight}">Enquire About This Product</button>
            <a class="btn btn--ghost btn--lg" href="${cUrl.slice(1)}.html">More ${escapeHtml(label)}</a>
          </div>
          <p class="pdp__note">Delivered across the UK from our Luton warehouse. You are welcome to see pieces in person at our Luton showroom, by appointment.</p>
        </div>
      </div>
    </div>
  </main>

  <div id="site-footer"></div>
  <script src="main.js?v=${ASSET_V}"></script>
</body>
</html>
`;
}

export function renderSitemap(data) {
  const urls = ['/', '/lighting', '/furniture', '/about'];
  for (const type of ['lighting', 'furniture']) for (const slug of Object.values(CAT_PAGES[type])) urls.push('/' + slug);
  const prio = u => (u === '/' ? '1.0' : /^\/(lighting|furniture)$/.test(u) ? '0.9' : u === '/about' ? '0.7' : '0.8');
  const entries = urls.map(u => `  <url>\n    <loc>${SITE}${u}</loc>\n    <priority>${prio(u)}</priority>\n  </url>`);
  for (const { p } of listPublished(data)) entries.push(`  <url>\n    <loc>${SITE}/product/${encodeURIComponent(p.id)}</loc>\n    <priority>0.6</priority>\n  </url>`);
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</urlset>\n`;
}

export async function notFound(context) {
  let body = '<!doctype html><title>Page not found</title><h1>Page not found</h1>';
  try {
    let r = await context.env.ASSETS.fetch(new URL('/404.html', context.request.url));
    if (r.status >= 300 && r.status < 400 && r.headers.get('location')) r = await context.env.ASSETS.fetch(new URL(r.headers.get('location'), context.request.url));
    if (r.ok) body = await r.text();
  } catch (e) { /* use the minimal fallback */ }
  return new Response(body, { status: 404, headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' } });
}
