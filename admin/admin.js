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
    });
  }
  function commitProducts(message){
    var body = { lighting: products.lighting, furniture: products.furniture };
    var content = b64utf8(JSON.stringify(body, null, 2) + "\n");
    return api("/contents/"+CFG.dataPath, { method:"PUT", body:{ message:message, content:content, sha:sha, branch:CFG.branch } })
      .then(function(r){ if(!r.ok) return r.json().then(function(e){ throw { code:r.status, msg:e&&e.message }; }); return r.json(); })
      .then(function(j){ sha = j.content.sha; });
  }
  function uploadImage(file, nameForFile){
    return fileToB64(file).then(function(b64){
      var ext = (file.name.split(".").pop()||"jpg").toLowerCase().replace(/[^a-z0-9]/g,"") || "jpg";
      var path = CFG.imagesDir + "/" + slug(nameForFile) + "-" + Date.now() + "." + ext;
      return api("/contents/"+path, { method:"PUT", body:{ message:"Upload image "+path, content:b64, branch:CFG.branch } })
        .then(function(r){ if(!r.ok) return r.json().then(function(e){ throw { code:r.status, msg:e&&e.message }; }); return "/"+path; });
    });
  }
  function fileToB64(file){
    return new Promise(function(res,rej){
      var fr = new FileReader();
      fr.onload = function(){ var b=new Uint8Array(fr.result), s="", i; for(i=0;i<b.length;i++) s+=String.fromCharCode(b[i]); res(btoa(s)); };
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
        '<div class="item__meta"><span class="price">'+esc(p.price)+'</span>'+suffix+' &nbsp;·&nbsp; '+esc(catLabel(section,p.cat))+'</div></div>' +
      '<div class="item__actions">' +
        '<button class="btn btn--ghost btn--sm" data-edit="'+section+':'+i+'">Edit</button>' +
        '<button class="btn btn--danger btn--sm" data-del="'+section+':'+i+'">Delete</button>' +
      '</div></div>';
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
        '<div class="field"><label>Category</label><select id="mCat"></select></div>' +
        '<div class="field"><label>Price <span class="hint">include £</span></label><input id="mPrice" placeholder="£485"></div>' +
      '</div>' +
      '<div class="row">' +
        '<div class="field"><label>Price note <span class="hint">optional</span></label><input id="mUnit" placeholder="per pair / per set of 4"></div>' +
        '<div class="field"><label>UKCA / status</label><input id="mUkca" placeholder="Yes / Pending / N/A"></div>' +
      '</div>' +
      '<div class="field checkline"><input type="checkbox" id="mFrom"><label for="mFrom" style="margin:0">Show “from” before the price</label></div>' +
      '<div class="field"><label>Description</label><textarea id="mDesc" placeholder="Short selling description…"></textarea></div>' +
      '<div class="row">' +
        '<div class="field"><label>Dimensions</label><input id="mDims" placeholder="80cm diameter, 120cm drop"></div>' +
        '<div class="field"><label>Finishes / options</label><input id="mFin" placeholder="Chrome, Gold, Black"></div>' +
      '</div>' +
      '<div class="field"><label>Suitable rooms</label><input id="mRooms" placeholder="Hallways, Dining Rooms"></div>' +
      '<div class="field"><label>Photo <span class="hint">optional — upload a real product photo</span></label>' +
        '<div class="photo-box"><div class="photo-preview" id="mPrev"><span class="ph">No photo</span></div>' +
        '<div class="photo-controls"><input type="file" id="mFile" accept="image/*"><div class="field" style="margin:.6rem 0 0">' +
          '<label style="font-size:.78rem">No photo yet? Pick a placeholder style — or type your own</label>' +
          '<input id="mArt" list="artList" autocomplete="off" placeholder="e.g. Chandelier — or type your own">' +
          '<datalist id="artList"></datalist></div>' +
        '<button type="button" class="btn btn--ghost btn--sm" id="mClearImg" style="margin-top:.5rem;display:none">Remove photo</button>' +
        '</div></div></div>' +
      '<div class="modal__foot">' +
        '<button class="btn btn--ghost" id="mCancel">Cancel</button>' +
        '<div class="right"><button class="btn btn--gold" id="mSave">Save product</button></div>' +
      '</div>' +
    '</div></div>';
  }
  var pendingFile = null;   // File chosen but not yet uploaded
  var removeImage = false;  // user removed existing photo

  function fillSelect(sel, pairs, val){
    sel.innerHTML = pairs.map(function(p){ return '<option value="'+p[0]+'"'+(p[0]===val?" selected":"")+'>'+esc(p[1])+'</option>'; }).join("");
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
    fillSelect(el("mCat"), CATS[section], p.cat || CATS[section][0][0]);
    fillArt(section, p.art);
    el("mPrice").value = p.price || "";
    el("mUnit").value = p.unit || "";
    el("mUkca").value = p.ukca || "";
    el("mFrom").checked = !!p.from;
    el("mDesc").value = p.desc || "";
    el("mDims").value = p.dims || "";
    el("mFin").value = p.finishes || "";
    el("mRooms").value = p.rooms || "";
    setPreview(p.image || "");
    el("mFile").value = "";
    el("modalBg").classList.add("show");
  }
  function setPreview(src){
    var box = el("mPrev"), clearBtn = el("mClearImg");
    if (src){ box.innerHTML = '<img src="'+esc(src)+'" alt="">'; clearBtn.style.display = "inline-flex"; }
    else { box.innerHTML = '<span class="ph">No photo</span>'; clearBtn.style.display = "none"; }
  }
  function closeModal(){ el("modalBg").classList.remove("show"); }

  function bindModal(){
    el("mCancel").onclick = closeModal;
    el("modalBg").addEventListener("click", function(e){ if(e.target===el("modalBg")) closeModal(); });
    el("mFile").addEventListener("change", function(){
      var f = this.files && this.files[0];
      if (!f) return;
      if (f.size > 8*1024*1024){ alert("Please choose an image under 8 MB."); this.value=""; return; }
      pendingFile = f; removeImage = false;
      var url = URL.createObjectURL(f); setPreview(url);
    });
    el("mClearImg").onclick = function(){ pendingFile=null; removeImage=true; el("mFile").value=""; setPreview(""); };
    el("mSave").onclick = saveEditor;
  }

  function saveEditor(){
    var section = editing.section, index = editing.index;
    var name = el("mName").value.trim();
    var price = el("mPrice").value.trim();
    if (!name){ alert("Please enter a product name."); return; }
    if (!price){ alert("Please enter a price."); return; }

    var base = index >= 0 ? Object.assign({}, products[section][index]) : { id: (section==="lighting"?"l":"f") + Date.now().toString(36) };
    base.name = name;
    base.cat = el("mCat").value;
    base.art = resolveArt(section, el("mArt").value);
    base.price = price;
    base.desc = el("mDesc").value.trim();
    base.dims = el("mDims").value.trim();
    base.finishes = el("mFin").value.trim();
    base.rooms = el("mRooms").value.trim();
    base.ukca = el("mUkca").value.trim();
    if (el("mFrom").checked) base.from = true; else delete base.from;
    var unit = el("mUnit").value.trim();
    if (unit) base.unit = unit; else delete base.unit;
    if (removeImage) base.image = "";
    if (!("image" in base)) base.image = "";

    var saveBtn = el("mSave");
    saveBtn.disabled = true; saveBtn.innerHTML = '<span class="spinner"></span> Saving…';

    var work = Promise.resolve();
    if (pendingFile) {
      work = uploadImage(pendingFile, name).then(function(path){ base.image = path; });
    }
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
