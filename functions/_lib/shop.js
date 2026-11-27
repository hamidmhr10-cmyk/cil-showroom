// Shared helpers for the Cloudflare Pages Functions (product pages + live sitemap).
// Data source of truth: /data/products.json (edited via /admin). Only products that have a real photo get a page.

export const SITE = 'https://lurixa.co.uk';
export const ASSET_V = '20261127c'; // keep in step with the ?v= used in the HTML pages

// category key -> landing page slug (must match the generated category pages)
export const CAT_PAGES = {
  lighting: { chandeliers: 'chandeliers', ceiling: 'ceiling-lights', garden: 'garden-lights', fan: 'fan-lights', 'outdoor-wall': 'outdoor-wall-lights', 'indoor-wall': 'indoor-wall-lights' },
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
  const title = p.seo_title || `${p.name} | ${label} | LURIXA`;
  const desc = p.meta ? trimDesc(p.meta, 160) : trimDesc(`${p.name}: ${p.desc || label}. Delivered across the UK from Luton, or see it in our showroom by appointment.`, 158);
  const alts = Array.isArray(p.alt) ? p.alt : [];
  const h1 = p.h1 || p.name;
  const vatIncl = !!(p.unit && /^inc/i.test(p.unit));
  const priceMatch = String(p.price || '').match(/£\s*([\d,]+(?:\.\d+)?)/);
  const st = stockInfo(p);

  const product = {
    '@type': 'Product', '@id': url + '#product', name: p.name, image: images.map(abs),
    description: p.desc || p.name, sku: String(p.sku || p.id), brand: { '@type': 'Brand', name: 'LURIXA' }, url,
  };
  if (priceMatch) {
    const out = typeof p.stock === 'number' && p.stock <= 0;
    product.offers = {
      '@type': 'Offer', priceCurrency: 'GBP', price: priceMatch[1].replace(/,/g, ''), url,
      itemCondition: 'https://schema.org/NewCondition',
      availability: out ? (p.incoming ? 'https://schema.org/PreOrder' : 'https://schema.org/OutOfStock') : 'https://schema.org/InStock',
      seller: { '@id': SITE + '/#business' },
    };
    if (vatIncl) product.offers.priceSpecification = { '@type': 'PriceSpecification', price: priceMatch[1].replace(/,/g, ''), priceCurrency: 'GBP', valueAddedTaxIncluded: true };
  }
  const crumbs = {
    '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE + '/' },
      { '@type': 'ListItem', position: 2, name: TYPE_LABEL[type], item: `${SITE}/${type}` },
      { '@type': 'ListItem', position: 3, name: label, item: SITE + cUrl },
      { '@type': 'ListItem', position: 4, name: p.name, item: url },
    ],
  };

  const wattsTxt = p.watts == null ? '' : (/^\d+(\.\d+)?$/.test(String(p.watts).trim()) ? String(p.watts).trim() + 'W' : String(p.watts).trim());
  const extra = p.specs && typeof p.specs === 'object' ? Object.keys(p.specs).map(k => [k, p.specs[k]]) : [];
  const specs = [['Product code', p.sku], ['Size', p.dims], ['Power', wattsTxt]].concat(extra, [['Finish', p.finishes], ['Best for', p.rooms], ['Sold', vatIncl ? '' : p.unit]])
    .filter(r => r[1]).map(r => `<div><dt>${r[0]}</dt><dd>${escapeHtml(r[1])}</dd></div>`).join('');
  // gallery thumbnails: every photo + the video; small card images are reused for the first two when we have them
  const small = [p.thumb, p.thumb2];
  const media = images.map((src, i) => ({ type: 'img', src, alt: alts[i] || p.name, tn: small[i] || src }));
  if (p.video) media.push({ type: 'video', src: p.video, alt: p.name + ' video', tn: '' });
  const thumbs = media.length > 1 ? media.map((m, i) => `<button type="button" class="pdp__thumb${i === 0 ? ' is-active' : ''}" data-type="${m.type}" data-src="${escapeHtml(m.src)}" data-alt="${escapeHtml(m.alt)}" aria-label="${m.type === 'video' ? 'Play video' : 'Show photo ' + (i + 1)}">` +
    (m.type === 'video' ? `<video src="${escapeHtml(m.src)}#t=0.5" muted playsinline preload="metadata"></video><span class="pdp__play" aria-hidden="true">&#9654;</span>` : `<img src="${escapeHtml(m.tn)}" alt="" loading="lazy">`) + `</button>`).join('') : '';
  const feats = Array.isArray(p.features) && p.features.length ? `<ul class="pdp__features">${p.features.map(x => `<li>${escapeHtml(x)}</li>`).join('')}</ul>` : '';
  const similar = renderSimilar(p, type, data);
  const price = p.price ? `<p class="pdp__price">${escapeHtml(p.price)}${p.unit ? `<small>${escapeHtml(p.unit)}</small>` : ''}</p>` : '';
  const showroom = p.showroom ? '<p class="pdp__note">See it lit in our Luton showroom, by appointment.</p>' : '';
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
          <div class="pdp__stage" id="pdpStage"><img src="${escapeHtml(images[0])}" alt="${escapeHtml(alts[0] || p.name)}" width="1600" height="2000" title="Click to enlarge and zoom"></div>
          ${thumbs ? `<div class="pdp__thumbs">${thumbs}</div>` : ''}
        </div>
        <div class="pdp__info">
          <span class="pdp__cat">${escapeHtml(label)}</span>
          <h1>${escapeHtml(h1)}</h1>
          ${price}
          ${stock}
          <p class="pdp__desc">${escapeHtml(p.desc || '')}</p>
          ${feats}
          ${specs ? `<dl class="pdp__specs">${specs}</dl>` : ''}
          <div class="pdp__cta">
            <button class="btn btn--gold btn--lg" data-enquire="${escapeHtml(p.id)}" data-light="${isLight}">Enquire About This Product</button>
            <a class="btn btn--ghost btn--lg" href="${cUrl.slice(1)}.html">More ${escapeHtml(label)}</a>
          </div>
          ${showroom}
          <p class="pdp__note">Delivered across the UK from our Luton warehouse. You are welcome to see pieces in person at our Luton showroom, by appointment.</p>
        </div>
      </div>
    </div>
    ${similar}
  </main>

  <div id="site-footer"></div>
  <script src="main.js?v=${ASSET_V}"></script>
</body>
</html>
`;
}

// "You may also like": same category first, then the rest of the same section (lighting / furniture); only products with photos
function pickSimilar(p, type, data, max) {
  const pool = listPublished(data).filter(x => x.p.id !== p.id);
  const same = pool.filter(x => x.type === type && x.p.cat === p.cat);
  const rest = pool.filter(x => x.type === type && x.p.cat !== p.cat);
  const other = pool.filter(x => x.type !== type);
  return same.concat(rest, other).slice(0, max).map(x => x.p);
}
function renderSimilar(p, type, data) {
  const list = pickSimilar(p, type, data, 14);
  if (!list.length) return '';
  const item = (x, hidden) => `<a class="sim" href="/product/${encodeURIComponent(x.id)}"${hidden ? ' tabindex="-1" aria-hidden="true"' : ''}>` +
    `<span class="sim__img"><img src="${escapeHtml(x.thumb || x.image)}" alt="${hidden ? '' : escapeHtml(x.name)}" loading="lazy" width="640" height="800"></span>` +
    `<span class="sim__name">${escapeHtml(x.name)}</span>` +
    `<span class="sim__price">${escapeHtml(x.price || '')}${x.unit ? ` <small>${escapeHtml(x.unit)}</small>` : ''}</span></a>`;
  const moving = list.length >= 4;
  const track = list.map(x => item(x, false)).join('') + (moving ? list.map(x => item(x, true)).join('') : '');
  return `<section class="similar" aria-labelledby="similarTitle">
      <div class="container"><h2 id="similarTitle">You may also like</h2></div>
      <div class="similar__viewport${moving ? ' is-moving' : ''}"><div class="similar__track" style="--sim-dur:${list.length * 4}s">${track}</div></div>
    </section>`;
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
