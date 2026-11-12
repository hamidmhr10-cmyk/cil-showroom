/* =================================================================
   LURIXA Product Manager — edits data/products.json + /images in the
   GitHub repo (hamidmhr10-cmyk/cil-showroom) straight from the browser.
   The access key (a GitHub fine-grained token) is stored ONLY in this
   browser's localStorage. Saving commits to GitHub → Vercel redeploys.
   ================================================================= */
(function () {
  "use strict";

  var CFG = { owner: "hamidmhr10-cmyk", repo: "cil-showroom", branch: "main",
              dataPath: "data/products.json", imagesDir: "images" };
  var TOKEN_KEY = "cil-admin-token";

  var app = document.getElementById("app");
  var token = "";
  try { token = localStorage.getItem(TOKEN_KEY) || ""; } catch (e) {}
  var products = { lighting: [], furniture: [] };
  var sha = null;
  var editing = null; // { section, index }

  var CATS = {
    lighting: [["chandeliers","Chandeliers"],["ceiling","Ceiling Lights"],["garden","Garden Lights"],["fan","Fan + Light"]],
    furniture: [["sofas","Sofas & Beds"],["dining","Dining & Chairs"],["garden","Garden Furniture"],["tv","TV & Storage"]]
  };
  var ARTS = {
    lighting: [["chandelier","Chandelier"],["ring","Ring"],["sputnik","Sputnik / starburst"],["cloud","Cloud / flush"],["saturn","Saturn rings"],["hexagon","Hexagon panel"],["cage","Cage / Edison"],["lantern","Lantern"],["coach","Coach / wall"],["spike","Spike spotlight"],["festoon","Festoon string"],["fan","Fan light"]],
    furniture: [["sofa3","Sofa (3 seater)"],["sofa2","Sofa (2 seater)"],["corner","Corner sofa"],["mattress","Mattress / bed"],["table","Dining table"],["chair","Chair"],["tvunit","TV unit"],["bookshelf","Bookshelf / display"],["recliner","Recliner"],["diningset","Garden dining set"],["lounge","Lounge sofa"],["lounger","Sun lounger"]]
  };
  var NEW_CAT = "__new__";
  function addCategories(section, list){
    (list || []).forEach(function(c){
      if (!c || !c.key) return;
      for (var i=0;i<CATS[section].length;i++) if (CATS[section][i][0]===c.key) return;
      CATS[section].push([c.key, c.label || c.key]);
    });
  }
  function catLabel(section, key) { var a = CATS[section]; for (var i=0;i<a.length;i++) if(a[i][0]===key) return a[i][1]; return key; }

  /* ---------- helpers ---------- */
  function esc(s){ return String(s==null?"":s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c];}); }
  function el(id){ return document.getElementById(id); }
  function slug(s){ return String(s||"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"").slice(0,40) || "product"; }
  function b64utf8(str){ return btoa(unescape(encodeURIComponent(str))); }
  function fromB64utf8(b64){ return decodeURIComponent(escape(atob(b64.replace(/\s/g,"")))); }

  /* ---------- GitHub API ---------- */
  function api(path, opts){
    opts = opts || {};
    return fetch("https://api.github.com/repos/"+CFG.owner+"/"+CFG.repo+path, {
      method: opts.method || "GET",
      headers: { "Authorization": "Bearer "+token, "Accept": "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28" },
      body: opts.body ? JSON.stringify(opts.body) : undefined
    });
  }
  function loadProducts(){
    return api("/contents/"+CFG.dataPath+"?ref="+CFG.branch+"&t="+Date.now()).then(function(r){
      if (r.status === 401) throw { code: 401 };
      if (!r.ok) throw { code: r.status };
      return r.json();
    }).then(function(j){
      sha = j.sha;
      var data = JSON.parse(fromB64utf8(j.content));
      products.lighting = data.lighting || [];
      products.furniture = data.furniture || [];
      var cats = data.categories || {};
      addCategories("lighting", cats.lighting);
      addCategories("furniture", cats.furniture);
    });
  }
  function commitProducts(message){
    function catList(section){ return CATS[section].map(function(c){ return { key:c[0], label:c[1] }; }); }
    var body = { categories: { lighting: catList("lighting"), furniture: catList("furniture") }, lighting: products.lighting, furniture: products.furniture };
    var content = b64utf8(JSON.stringify(body, null, 2) + "\n");
    return api("/contents/"+CFG.dataPath, { method:"PUT", body:{ message:message, content:content, sha:sha, branch:CFG.branch } })
      .then(function(r){ if(!r.ok) return r.json().then(function(e){ throw { code:r.status, msg:e&&e.message }; }); return r.json(); })
      .then(function(j){ sha = j.content.sha; });
  }
  /* Only shrink very large photos (max 3200px, high-quality JPEG) so zooming on the site stays sharp */
  function prepImage(file){
    if (!/^image\/(jpeg|png|webp)$/.test(file.type)) return Promise.resolve(file);
    return new Promise(function(res){
      var url = URL.createObjectURL(file), img = new Image();
      img.onload = function(){
        var MAX = 3200, w = img.naturalWidth, h = img.naturalHeight, k = Math.min(1, MAX / Math.max(w, h));
        if (k === 1 && file.size < 3.5*1024*1024){ URL.revokeObjectURL(url); return res(file); }
        var c = document.createElement("canvas"); c.width = Math.round(w*k); c.height = Math.round(h*k);
        var x = c.getContext("2d"); x.fillStyle = "#ffffff"; x.fillRect(0, 0, c.width, c.height); x.imageSmoothingEnabled = true; x.imageSmoothingQuality = "high"; x.drawImage(img, 0, 0, c.width, c.height);
        URL.revokeObjectURL(url);
        c.toBlob(function(b){
          if (!b || b.size >= file.size) return res(file);
          res(new File([b], file.name.replace(/\.[^.]+$/, "") + ".jpg", { type: "image/jpeg" }));
        }, "image/jpeg", 0.93);
      };
      img.onerror = function(){ URL.revokeObjectURL(url); res(file); };
      img.src = url;
    });
  }
  function uploadImage(file, nameForFile){
    return prepImage(file).then(function(f){ return uploadFile(f, nameForFile); });
  }
  function uploadFile(file, nameForFile){
    return fileToB64(file).then(function(b64){
      var ext = (file.name.split(".").pop()||"jpg").toLowerCase().replace(/[^a-z0-9]/g,"") || "jpg";
      var path = CFG.imagesDir + "/" + slug(nameForFile) + "-" + Date.now() + "." + ext;
      return api("/contents/"+path, { method:"PUT", body:{ message:"Upload "+path, content:b64, branch:CFG.branch } })
        .then(function(r){ if(!r.ok) return r.json().then(function(e){ throw { code:r.status, msg:e&&e.message }; }); return "/"+path; });
    });
  }
  function fileToB64(file){
    return new Promise(function(res,rej){
      var fr = new FileReader();
      fr.onload = function(){ var b=new Uint8Array(fr.result), parts=[], i; for(i=0;i<b.length;i+=0x8000) parts.push(String.fromCharCode.apply(null, b.subarray(i, i+0x8000))); res(btoa(parts.join(""))); };
      fr.onerror = rej; fr.readAsArrayBuffer(file);
    });
  }

  /* ---------- LOGIN GATE ---------- */
  function renderGate(errMsg){
    app.innerHTML =
      '<div class="gate"><div class="gate__card">' +
        '<span class="gate__logo">LURIXA</span>' +
        '<h1>Product Manager</h1>' +
        '<p class="sub">Enter your access key to add, edit and remove products on your website.</p>' +
        '<label for="tok">Access key</label>' +
        '<input id="tok" type="password" placeholder="github_pat_…" autocomplete="off" spellcheck="false">' +
        '<div class="err" id="gateErr">'+esc(errMsg||"")+'</div>' +
        '<button class="btn btn--emerald" id="tokBtn">Unlock</button>' +
        '<details><summary>First time? How to get your access key (one-off, 2 minutes)</summary><ol>' +
          '<li>Open <a href="https://github.com/settings/personal-access-tokens/new" target="_blank" rel="noopener">GitHub fine-grained tokens</a> (sign in as <code>hamidmhr10-cmyk</code>).</li>' +
          '<li><b>Token name:</b> <code>LURIXA website</code>. Set an expiry if you like.</li>' +
          '<li><b>Repository access:</b> choose <b>Only select repositories</b> → pick <code>cil-showroom</code>.</li>' +
          '<li><b>Permissions → Repository permissions → Contents:</b> set to <b>Read and write</b>.</li>' +
          '<li>Click <b>Generate token</b>, copy it, and paste it above. It is saved only in this browser.</li>' +
        '</ol></details>' +
      '</div></div>';
    el("tokBtn").onclick = function(){
      var v = el("tok").value.trim();
      if(!v){ el("gateErr").textContent = "Please paste your access key."; return; }
      token = v; try { localStorage.setItem(TOKEN_KEY, v); } catch(e){}
      init();
    };
    el("tok").addEventListener("keydown", function(e){ if(e.key==="Enter") el("tokBtn").click(); });
  }

  /* ---------- DASHBOARD ---------- */
  function topbar(){
    return '<div class="topbar">' +
      '<div class="topbar__brand"><span class="mono">LURIXA</span> Product Manager</div>' +
      '<div class="topbar__actions">' +
        '<a class="pill" href="/" target="_blank" rel="noopener">View site ↗</a>' +
        '<button class="btn btn--ghost btn--sm" id="logout" style="color:#cfe3d8;border-color:rgba(255,255,255,.25)">Log out</button>' +
      '</div></div>';
  }
  function itemHTML(section, p, i){
    var thumb = p.image
      ? '<img src="'+esc(p.image)+'" alt="">'
      : '<span class="ph">'+esc(catLabel(section, p.cat))+'</span>';
    var suffix = p.from ? " (from)" : (p.unit ? " · "+esc(p.unit) : "");
    return '<div class="item">' +
      '<div class="item__thumb">'+thumb+'</div>' +
      '<div class="item__info"><h3>'+esc(p.name)+'</h3>' +
        '<div class="item__meta"><span class="price">'+esc(p.price)+'</span>'+suffix+' &nbsp;·&nbsp; '+esc(catLabel(section,p.cat))+stockChip(p)+'</div></div>' +
      '<div class="item__actions">' +
        (typeof p.stock === "number" && p.stock > 0 ? '<button class="btn btn--ghost btn--sm" data-sold="'+section+':'+i+'" title="Take one off the stock count">−1 sold</button>' : '') +
        '<button class="btn btn--ghost btn--sm" data-edit="'+section+':'+i+'">Edit</button>' +
        '<button class="btn btn--danger btn--sm" data-del="'+section+':'+i+'">Delete</button>' +
      '</div></div>';
  }
  function stockChip(p){
    if (typeof p.stock === "number"){
      var cls = p.stock === 0 ? "out" : (p.stock <= 3 ? "low" : "ok");
      return ' &nbsp;·&nbsp; <span class="stockchip stockchip--'+cls+'">Stock: '+p.stock+'</span>';
    }
    return p.incoming ? ' &nbsp;·&nbsp; <span class="stockchip stockchip--soon">'+esc(p.incoming)+'</span>' : '';
  }
  function soldOne(section, index){
    var p = products[section][index];
    if (!p || typeof p.stock !== "number" || p.stock <= 0) return;
    if (!confirm('Mark one "'+p.name+'" as sold? Stock goes from '+p.stock+' to '+(p.stock-1)+'.')) return;
    p.stock -= 1;
    commitProducts("Sold 1: "+p.name+" (stock now "+p.stock+")").then(function(){
      refreshLists();
      notice("ok", "<strong>Updated.</strong> “"+esc(p.name)+"” stock is now "+p.stock+". The website updates in about a minute.");
    }).catch(function(e){ p.stock += 1; refreshLists(); handleError(e); });
  }
  function groupHTML(section, title){
    var arr = products[section];
    var rows = arr.map(function(p,i){ return itemHTML(section,p,i); }).join("") || '<p style="color:#6b726b">No products yet.</p>';
    return '<section class="group">' +
      '<div class="group__head"><h2>'+title+' <span class="count">('+arr.length+')</span></h2>' +
        '<button class="btn btn--gold" data-add="'+section+'">+ Add '+title+' product</button></div>' +
      '<div class="list">'+rows+'</div></section>';
  }
  function renderDashboard(){
    app.innerHTML = topbar() +
      '<div class="wrap">' +
        '<div class="notice" id="notice"></div>' +
        groupHTML("lighting","Lighting") +
        groupHTML("furniture","Furniture") +
      '</div>' + modalHTML();
    el("logout").onclick = function(){ try{ localStorage.removeItem(TOKEN_KEY); }catch(e){} token=""; renderGate(); };
    if (!onDashClick._bound){ app.addEventListener("click", onDashClick); onDashClick._bound = true; }
  }
  function refreshLists(){
    var wrap = app.querySelector(".wrap");
    if (!wrap) return renderDashboard();
    // re-render just the groups (keep notice)
    var notice = el("notice").outerHTML;
    wrap.innerHTML = notice + groupHTML("lighting","Lighting") + groupHTML("furniture","Furniture");
  }
  function onDashClick(e){
    var add = e.target.closest("[data-add]");
    var edit = e.target.closest("[data-edit]");
    var del = e.target.closest("[data-del]");
    var sold = e.target.closest("[data-sold]");
    if (sold){ var s=sold.getAttribute("data-sold").split(":"); return soldOne(s[0], +s[1]); }
    if (add) return openEditor(add.getAttribute("data-add"), -1);
    if (edit){ var a=edit.getAttribute("data-edit").split(":"); return openEditor(a[0], +a[1]); }
    if (del){ var b=del.getAttribute("data-del").split(":"); return deleteItem(b[0], +b[1]); }
  }

  /* ---------- NOTICES ---------- */
  function notice(type, msg){
    var n = el("notice"); if(!n) return;
    n.className = "notice show notice--"+type;
    n.innerHTML = msg;
    if (type === "ok") setTimeout(function(){ if(n) n.className="notice"; }, 6000);
    window.scrollTo({ top:0, behavior:"smooth" });
  }

  /* ---------- EDIT MODAL ---------- */
  function modalHTML(){
    return '<div class="modal-bg" id="modalBg"><div class="modal">' +
      '<h2 id="mTitle">Add product</h2>' +
      '<div class="field"><label>Product name</label><input id="mName" placeholder="e.g. Grand Crystal Cascade"></div>' +
      '<div class="row">' +
        '<div class="field"><label>Category</label><select id="mCat"></select>' +
          '<input id="mCatNew" placeholder="Type the new category name, e.g. Wall Lights" style="display:none;margin-top:.5rem"></div>' +
        '<div class="field"><label>Price <span class="hint">include £</span></label><input id="mPrice" placeholder="£485"></div>' +
      '</div>' +
      '<div class="field"><label>Price note <span class="hint">optional</span></label><input id="mUnit" placeholder="per pair / per set of 4"></div>' +
      '<div class="row">' +
        '<div class="field"><label>Stock quantity <span class="hint">leave blank to hide</span></label><input id="mStock" type="number" min="0" step="1" inputmode="numeric" placeholder="e.g. 6"></div>' +
        '<div class="field"><label>Coming soon note <span class="hint">optional</span></label><input id="mIncoming" placeholder="e.g. Arriving December"></div>' +
      '</div>' +
      '<p class="hint-line">Customers see <b>In stock</b> (4+), <b>Only 3 / 2 / 1 left</b>, or <b>Out of stock</b> — the note shows instead when stock is 0 or blank.</p>' +
      '<div class="field checkline"><input type="checkbox" id="mFrom"><label for="mFrom" style="margin:0">Show “from” before the price</label></div>' +
      '<div class="field"><label>Description</label><textarea id="mDesc" placeholder="Short selling description…"></textarea></div>' +
      '<div class="row">' +
        '<div class="field"><label>Dimensions</label><input id="mDims" placeholder="80cm diameter, 120cm drop"></div>' +
        '<div class="field"><label>Finishes / options</label><input id="mFin" placeholder="Chrome, Gold, Black"></div>' +
      '</div>' +
      '<div class="row">' +
        '<div class="field"><label>Suitable rooms</label><input id="mRooms" placeholder="Hallways, Dining Rooms"></div>' +
        '<div class="field"><label>Watts <span class="hint">optional — leave blank to hide</span></label><input id="mWatts" placeholder="e.g. 40 or 12W LED"></div>' +
      '</div>' +
      '<div class="field"><label>Main photo <span class="hint">shown on the product card</span></label>' +
        '<div class="photo-box"><div class="photo-preview" id="mPrev"><span class="ph">No photo</span></div>' +
        '<div class="photo-controls"><input type="file" id="mFile" accept="image/*"><div class="field" style="margin:.6rem 0 0">' +
          '<label style="font-size:.78rem">No photo yet? Pick a placeholder style — or type your own</label>' +
          '<input id="mArt" list="artList" autocomplete="off" placeholder="e.g. Chandelier — or type your own">' +
          '<datalist id="artList"></datalist></div>' +
        '<button type="button" class="btn btn--ghost btn--sm" id="mClearImg" style="margin-top:.5rem;display:none">Remove photo</button>' +
        '</div></div></div>' +
      '<div class="field"><label>More photos <span class="hint">optional — shown in “View Details”. You can pick several at once</span></label>' +
        '<input type="file" id="mGallery" accept="image/jpeg,image/png,image/webp" multiple>' +
        '<div class="gal-edit" id="mGalList"></div></div>' +
      '<div class="field"><label>Video <span class="hint">optional — short MP4 clip, under 20 MB</span></label>' +
        '<input type="file" id="mVideo" accept="video/mp4,video/webm,video/quicktime">' +
        '<div class="vid-edit" id="mVidBox"></div></div>' +
      '<div class="modal__foot">' +
        '<button class="btn btn--ghost" id="mCancel">Cancel</button>' +
        '<div class="right"><button class="btn btn--gold" id="mSave">Save product</button></div>' +
      '</div>' +
    '</div></div>';
  }
  var galleryItems = [];    // [{ src, file? }] extra photos (file = not yet uploaded)
  var videoItem = null;     // { src, file? } or null
  var MAX_VIDEO_MB = 20;
  var pendingFile = null;   // File chosen but not yet uploaded
  var removeImage = false;  // user removed existing photo

  function fillSelect(sel, pairs, val){
    sel.innerHTML = pairs.map(function(p){ return '<option value="'+esc(p[0])+'"'+(p[0]===val?" selected":"")+'>'+esc(p[1])+'</option>'; }).join("");
  }
  function fillCatSelect(section, val){
    var sel = el("mCat");
    fillSelect(sel, CATS[section], val);
    sel.insertAdjacentHTML("beforeend", '<option value="'+NEW_CAT+'">＋ Add a new category (type your own)…</option>');
    el("mCatNew").value = ""; el("mCatNew").style.display = "none";
  }
  /* returns the category key to save, creating the category if it's new */
  function resolveCat(section){
    var v = el("mCat").value;
    if (v !== NEW_CAT) return v;
    var label = el("mCatNew").value.trim();
    if (!label) return null;
    var arr = CATS[section], i;
    for (i=0;i<arr.length;i++){ if (arr[i][1].toLowerCase()===label.toLowerCase() || arr[i][0]===slug(label)) return arr[i][0]; }
    var key = slug(label);
    arr.push([key, label]);
    return key;
  }
  /* Icon-style combo: presets you can pick OR type your own custom style */
  function fillArt(section, current){
    el("artList").innerHTML = ARTS[section].map(function(p){ return '<option value="'+esc(p[1])+'">'; }).join("");
    var label = "";
    for (var i=0;i<ARTS[section].length;i++){ if (ARTS[section][i][0] === current){ label = ARTS[section][i][1]; break; } }
    el("mArt").value = label || (current || "");
  }
  function resolveArt(section, value){
    value = (value || "").trim();
    if (!value) return ARTS[section][0][0];
    var arr = ARTS[section], i;
    for (i=0;i<arr.length;i++){ if (arr[i][1].toLowerCase() === value.toLowerCase()) return arr[i][0]; }
    for (i=0;i<arr.length;i++){ if (arr[i][0].toLowerCase() === value.toLowerCase()) return arr[i][0]; }
    return slug(value); // custom style — the site shows a category-appropriate icon
  }
  function openEditor(section, index){
    editing = { section: section, index: index };
    pendingFile = null; removeImage = false;
    var p = index >= 0 ? products[section][index] : {};
    el("mTitle").textContent = (index>=0 ? "Edit product" : "Add "+section+" product");
    el("mName").value = p.name || "";
    fillCatSelect(section, p.cat || CATS[section][0][0]);
    fillArt(section, p.art);
    el("mPrice").value = p.price || "";
    el("mUnit").value = p.unit || "";
    el("mStock").value = (p.stock === undefined || p.stock === null) ? "" : p.stock;
    el("mIncoming").value = p.incoming || "";
    el("mFrom").checked = !!p.from;
    el("mDesc").value = p.desc || "";
    el("mDims").value = p.dims || "";
    el("mFin").value = p.finishes || "";
    el("mRooms").value = p.rooms || "";
    el("mWatts").value = p.watts || "";
    setPreview(p.image || "");
    el("mFile").value = "";
    galleryItems = (p.gallery || []).map(function(src){ return { src: src }; });
    videoItem = p.video ? { src: p.video } : null;
    el("mGallery").value = ""; el("mVideo").value = "";
    renderGallery(); renderVideo();
    el("modalBg").classList.add("show");
  }
  function setPreview(src){
    var box = el("mPrev"), clearBtn = el("mClearImg");
    if (src){ box.innerHTML = '<img src="'+esc(src)+'" alt="">'; clearBtn.style.display = "inline-flex"; }
    else { box.innerHTML = '<span class="ph">No photo</span>'; clearBtn.style.display = "none"; }
  }
  function renderGallery(){
    var box = el("mGalList");
    if (!galleryItems.length){ box.innerHTML = '<p class="gal-empty">No extra photos yet.</p>'; return; }
    box.innerHTML = galleryItems.map(function(g, i){
      return '<div class="gal-item"><img src="'+esc(g.src)+'" alt="">' +
        (g.file ? '<span class="gal-new">new</span>' : '') +
        '<button type="button" class="gal-del" data-gdel="'+i+'" title="Remove this photo">×</button></div>';
    }).join("");
  }
  function renderVideo(){
    var box = el("mVidBox");
    if (!videoItem){ box.innerHTML = ""; return; }
    box.innerHTML = '<video src="'+esc(videoItem.src)+'" controls muted playsinline preload="metadata"></video>' +
      '<button type="button" class="btn btn--ghost btn--sm" id="mVidDel">Remove video</button>';
  }
  function isHeic(f){ return /heic|heif/i.test(f.type) || /\.(heic|heif)$/i.test(f.name); }
  function closeModal(){
    var v = el("mVidBox") && el("mVidBox").querySelector("video"); if (v) try { v.pause(); } catch(e){}
    el("modalBg").classList.remove("show");
  }

  function bindModal(){
    el("mCancel").onclick = closeModal;
    el("modalBg").addEventListener("click", function(e){ if(e.target===el("modalBg")) closeModal(); });
    el("mFile").addEventListener("change", function(){
      var f = this.files && this.files[0];
      if (!f) return;
      if (isHeic(f)){ alert("iPhone HEIC photos can't be shown on websites. Please choose a JPG or PNG (on iPhone: Settings → Camera → Formats → Most Compatible)."); this.value=""; return; }
      if (f.size > 15*1024*1024){ alert("Please choose an image under 15 MB."); this.value=""; return; }
      pendingFile = f; removeImage = false;
      var url = URL.createObjectURL(f); setPreview(url);
    });
    el("mClearImg").onclick = function(){ pendingFile=null; removeImage=true; el("mFile").value=""; setPreview(""); };
    el("mGallery").addEventListener("change", function(){
      var files = Array.prototype.slice.call(this.files || []), skipped = 0;
      files.forEach(function(f){
        if (isHeic(f) || f.size > 15*1024*1024 || !/^image\//.test(f.type)){ skipped++; return; }
        galleryItems.push({ src: URL.createObjectURL(f), file: f });
      });
      this.value = "";
      renderGallery();
      if (skipped) alert(skipped + " file(s) skipped — use JPG/PNG photos under 15 MB.");
    });
    el("mGalList").addEventListener("click", function(e){
      var b = e.target.closest("[data-gdel]"); if (!b) return;
      galleryItems.splice(+b.getAttribute("data-gdel"), 1); renderGallery();
    });
    el("mVideo").addEventListener("change", function(){
      var f = this.files && this.files[0]; if (!f) return;
      if (f.size > MAX_VIDEO_MB*1024*1024){ alert("That video is " + (f.size/1048576).toFixed(0) + " MB. Please use a short clip under " + MAX_VIDEO_MB + " MB (trim it or record at 1080p)."); this.value=""; return; }
      videoItem = { src: URL.createObjectURL(f), file: f };
      this.value = ""; renderVideo();
      // catch broken/preview files (e.g. a 0.2-second clip) and codecs the browser can't play
      var probe = document.createElement("video"), item = videoItem;
      probe.preload = "metadata"; probe.muted = true;
      probe.onloadedmetadata = function(){
        if (item !== videoItem) return;
        if (probe.duration && probe.duration < 1)
          alert("Heads up: this video is only " + probe.duration.toFixed(1) + " seconds long — it may be a preview/thumbnail rather than the full clip. Check the original file, or remove it and choose another.");
      };
      probe.onerror = function(){
        if (item !== videoItem) return;
        alert("This video can't be played in this browser (often iPhone 'High Efficiency'/HEVC video). Please export it as a standard MP4 (H.264) and try again.");
      };
      probe.src = item.src;
    });
    el("mVidBox").addEventListener("click", function(e){
      if (e.target.id === "mVidDel"){ videoItem = null; renderVideo(); }
    });
    el("mSave").onclick = saveEditor;
    el("mCat").addEventListener("change", function(){
      var isNew = this.value === NEW_CAT;
      el("mCatNew").style.display = isNew ? "block" : "none";
      if (isNew) el("mCatNew").focus();
    });
  }

  function saveEditor(){
    var section = editing.section, index = editing.index;
    var name = el("mName").value.trim();
    var price = el("mPrice").value.trim();
    if (!name){ alert("Please enter a product name."); return; }
    if (!price){ alert("Please enter a price."); return; }
    if (el("mCat").value === NEW_CAT && !el("mCatNew").value.trim()){ alert("Please type a name for the new category."); el("mCatNew").focus(); return; }

    var base = index >= 0 ? Object.assign({}, products[section][index]) : { id: (section==="lighting"?"l":"f") + Date.now().toString(36) };
    base.name = name;
    base.cat = resolveCat(section);
    base.art = resolveArt(section, el("mArt").value);
    base.price = price;
    base.desc = el("mDesc").value.trim();
    base.dims = el("mDims").value.trim();
    base.finishes = el("mFin").value.trim();
    base.rooms = el("mRooms").value.trim();
    var wattsVal = el("mWatts").value.trim();
    if (wattsVal) base.watts = wattsVal; else delete base.watts;
    delete base.ukca;
    if (el("mFrom").checked) base.from = true; else delete base.from;
    var stockVal = el("mStock").value.trim();
    if (stockVal === "") delete base.stock; else base.stock = Math.max(0, parseInt(stockVal, 10) || 0);
    var incoming = el("mIncoming").value.trim();
    if (incoming) base.incoming = incoming; else delete base.incoming;
    var unit = el("mUnit").value.trim();
    if (unit) base.unit = unit; else delete base.unit;
    if (removeImage) base.image = "";
    if (!("image" in base)) base.image = "";

    var saveBtn = el("mSave");
    saveBtn.disabled = true; saveBtn.innerHTML = '<span class="spinner"></span> Saving…';

    // Upload everything one by one (main photo → extra photos → video), then save the product
    var newGal = galleryItems.filter(function(g){ return g.file; }).length;
    var total = (pendingFile ? 1 : 0) + newGal + (videoItem && videoItem.file ? 1 : 0), done = 0;
    function step(label){ done++; saveBtn.innerHTML = '<span class="spinner"></span> Uploading '+label+' ('+done+' of '+total+')…'; }
    var work = Promise.resolve();
    if (pendingFile) {
      work = work.then(function(){ step("main photo"); return uploadImage(pendingFile, name); }).then(function(path){ base.image = path; pendingFile = null; });
    }
    var gal = [];
    galleryItems.forEach(function(g, i){
      work = work.then(function(){
        if (!g.file){ gal.push(g.src); return; }
        step("photo");
        return uploadImage(g.file, name + "-" + (i+2)).then(function(path){ gal.push(path); g.src = path; delete g.file; });
      });
    });
    work = work.then(function(){ if (gal.length) base.gallery = gal; else delete base.gallery; });
    if (videoItem && videoItem.file) {
      work = work.then(function(){ step("video"); return uploadFile(videoItem.file, name + "-video"); })
                 .then(function(path){ base.video = path; videoItem = { src: path }; });
    } else if (videoItem) base.video = videoItem.src; else delete base.video;
    work.then(function(){
      if (index >= 0) products[section][index] = base;
      else products[section].push(base);
      return commitProducts((index>=0?"Update":"Add")+" product: "+name);
    }).then(function(){
      closeModal();
      saveBtn.disabled = false; saveBtn.textContent = "Save product";
      refreshLists();
      notice("ok", "<strong>Saved!</strong> “"+esc(name)+"” is updated. Your live site refreshes in about a minute.");
    }).catch(function(e){
      saveBtn.disabled = false; saveBtn.textContent = "Save product";
      handleError(e);
    });
  }

  function deleteItem(section, index){
    var p = products[section][index];
    if (!p) return;
    if (!confirm('Delete "'+p.name+'"? This removes it from your website.')) return;
    var removed = products[section].splice(index, 1)[0];
    commitProducts("Delete product: "+removed.name).then(function(){
      refreshLists();
      notice("ok", "<strong>Deleted.</strong> “"+esc(removed.name)+"” was removed. Your live site refreshes in about a minute.");
    }).catch(function(e){
      products[section].splice(index, 0, removed); // put it back on failure
      refreshLists();
      handleError(e);
    });
  }

  function handleError(e){
    if (e && e.code === 401){ try{localStorage.removeItem(TOKEN_KEY);}catch(x){} token=""; renderGate("Your access key was rejected or expired. Please paste a fresh one."); return; }
    if (e && e.code === 409){ notice("err", "Someone (or another tab) changed the data. Please reload this page and try again."); return; }
    notice("err", "Sorry, that didn’t save"+(e&&e.msg?(": "+esc(e.msg)):" — please check your connection")+". Nothing was lost; try again.");
  }

  /* ---------- BOOT ---------- */
  function init(){
    app.innerHTML = '<div class="loading">Loading your products…</div>';
    loadProducts().then(function(){
      renderDashboard();
      bindModal();
    }).catch(function(e){
      if (e && e.code === 401){ try{localStorage.removeItem(TOKEN_KEY);}catch(x){} token=""; renderGate("That access key was rejected. Please check it and try again."); }
      else renderGate("Couldn’t load products"+(e&&e.code?(" ("+e.code+")"):"")+". Check your connection, then re-enter your key.");
    });
  }

  if (token) init(); else renderGate();
})();
