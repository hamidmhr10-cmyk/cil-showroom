# Managing your products — plain-English guide

Your website now has a private **Product Manager**. You use it to add, edit, and
remove products yourself. You never touch any code, and there's nothing to
"maintain" — the technical side keeps running on its own.

> **Where it lives:** https://cil-showroom.vercel.app/admin
> (once you set up a custom domain, it'll be `yourdomain.co.uk/admin`)

---

## One-time setup: get your access key (about 2 minutes)

The Product Manager asks for an **access key** the first time. This proves it's
really you, so strangers can't change your products. You only do this once per
device/browser.

1. Go to **https://github.com/settings/personal-access-tokens/new**
   (sign in as **hamidmhr10-cmyk** if asked).
2. **Token name:** type `LURIXA website`.
3. **Expiration:** pick whatever you like (e.g. 1 year). When it expires you just
   make a new one the same way.
4. **Repository access:** choose **Only select repositories**, then pick
   **cil-showroom**.
5. Scroll to **Permissions → Repository permissions → Contents** and set it to
   **Read and write**.
6. Click **Generate token** at the bottom, then **copy** the key
   (it starts with `github_pat_…`).
7. Go to your **/admin** page, paste the key, and click **Unlock**.

That's it. The key is saved **only in your browser** — never shared with anyone.
If you ever use a new computer, just paste the same key (or make a new one).

---

## Day-to-day: adding new stock

1. Open **/admin** (it remembers your key).
2. Under **Lighting** or **Furniture**, click **“+ Add product”**.
3. Fill in the form:
   - **Name**, **Category**, **Price** (include the £).
     Need a category that isn't listed? Choose **“＋ Add a new category (type your own)…”**
     at the bottom of the Category list and type its name. It appears as a filter
     button on the website as soon as a product uses it.
   - **Price note** (optional) — e.g. *per pair*, *per set of 4*.
   - **Stock quantity** (optional) — how many you have. Customers see *In stock* (4 or more),
     *Only 3 / 2 / 1 left*, or *Out of stock*. Leave blank to show nothing.
   - **Coming soon note** (optional) — e.g. *Arriving December*; shown when stock is 0 or blank.
   - Sold one? Click **−1 sold** next to the product in the list — no need to open it.
   - Tick **“Show ‘from’ before the price”** if it's a starting price.
   - **Description**, **Dimensions**, **Finishes/options**, **Suitable rooms**.
   - **Main photo** — click *Choose file* and pick a photo of the product.
     (No photo yet? Pick an **icon style** and a tidy placeholder graphic is used instead.)
   - **More photos** (optional) — pick as many as you like (hold Ctrl to select several).
     They appear in **View Details** with arrows and thumbnails. Click × on a thumbnail to remove one.
     Big photos are shrunk automatically before upload. iPhone HEIC photos are not supported:
     set iPhone → Settings → Camera → Formats → **Most Compatible** to take JPGs.
   - **Video** (optional) — one short MP4 clip, under 20 MB (about 20–40 seconds at 1080p).
     It shows as the last item in View Details.
4. Click **Save product**.
5. You'll see *“Saved!”* — your live website updates in **about a minute**.
   Refresh the site to see it.

**Editing** an existing product: click **Edit**, change anything, **Save**.
**Removing** a product: click **Delete** and confirm.

---

## Tips

- **Photos:** landscape or square photos look best. Keep them under 8 MB.
- **It takes ~1 minute** for changes to appear on the live site — that's normal.
- **Made a mistake?** Just edit or delete the product and save again.
- **Lost/expired key?** Make a new one (steps above) and paste it in.

---

## If something goes wrong

- The Product Manager will show a clear message (e.g. wrong key, no internet).
  Nothing is lost — just fix it and try again.
- Stuck, or a fiddly listing? **Send me the details (and photo)** and I'll add it
  for you. The Product Manager is for you to use day-to-day; I'm your backup.

---

*Contact: +44 7402 176349 · info@improvemental.co.uk*
