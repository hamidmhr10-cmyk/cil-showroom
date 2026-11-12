/* =================================================================
   LURIXA — Showroom Site JS
   Data, CSS/SVG product art, rendering, filtering, modal, animation.
   ================================================================= */
(function () {
  "use strict";

  /* ---------- Company constants ---------- */
  var CO = {
    name: "LURIXA",
    phone: "+44 7402 176349",
    phoneRaw: "447402176349",
    email: "hamid@improvemental.co.uk",
    address: "250 The Village, Butterfield, Great Marlings, Luton, Bedfordshire, LU2 8DL"
  };

  /* =================================================================
     PRODUCT DATA
     ================================================================= */
  var LIGHTING = [
    // CHANDELIERS
    { id:"l1", cat:"chandeliers", art:"chandelier", name:"Grand Crystal Cascade", price:"£485",
      desc:"Multi-tiered crystal chandelier, 12-light, chrome finish — a centrepiece for hallways and dining rooms.",
      dims:"80cm diameter, 120cm drop", finishes:"Chrome, Gold, Black", rooms:"Hallways, Dining Rooms" },
    { id:"l2", cat:"chandeliers", art:"chandelier", name:"Blossom Flower Chandelier", price:"£320",
      desc:"Petal-shaped arms in antique brass with frosted glass shades. 8-light, softly diffused.",
      dims:"65cm diameter, 90cm drop", finishes:"Antique Brass", rooms:"Living Rooms, Bedrooms" },
    { id:"l3", cat:"chandeliers", art:"ring", name:"Nordic Ring Chandelier", price:"£275",
      desc:"Minimalist circular ring in matte black with integrated, dimmable 40W LED.",
      dims:"60cm diameter", finishes:"Matte Black", rooms:"Kitchens, Dining Rooms, Loft Apartments" },
    { id:"l4", cat:"chandeliers", art:"sputnik", name:"Royal Sputnik Burst", price:"£395",
      desc:"Mid-century modern starburst, 18 arms, E14 bulbs in brushed gold — a true statement piece.",
      dims:"75cm diameter", finishes:"Brushed Gold", rooms:"Feature Rooms, Hotels" },
    // CEILING LIGHTS
    { id:"l5", cat:"ceiling", art:"cloud", name:"Cloud Flush Mount LED", price:"£89",
      desc:"Soft white acrylic cloud-shaped flush fitting. Integrated 24W LED, 4000K, IP44 bathroom safe.",
      dims:"Surface mount", finishes:"White Acrylic", rooms:"Bedrooms, Bathrooms" },
    { id:"l6", cat:"ceiling", art:"saturn", name:"Saturn Ring Semi-Flush", price:"£145",
      desc:"Concentric rings in brushed nickel with a warm integrated LED strip. 36W, dimmable, 3000K.",
      dims:"Semi-flush", finishes:"Brushed Nickel", rooms:"Living Rooms, Hallways" },
    { id:"l7", cat:"ceiling", art:"hexagon", name:"Geometric Hexagon Panel", price:"£110",
      desc:"Honeycomb geometric surface-mount panel, 48W LED, IP20 — crisp, modern light.",
      dims:"50cm x 50cm", finishes:"White / Black trim", rooms:"Home Offices, Kitchens" },
    { id:"l8", cat:"ceiling", art:"cage", name:"Vintage Industrial Cage", price:"£65",
      desc:"Exposed cage fitting with Edison bulb (E27 included) in wrought iron, antique finish.",
      dims:"Surface mount", finishes:"Antique Iron", rooms:"Kitchens, Bars, Studies" },
    // GARDEN / OUTDOOR
    { id:"l9", cat:"garden", art:"lantern", name:"Solar Pillar Lantern Set", price:"£175",
      desc:"Set of 2 solar-powered cast aluminium post lanterns, IP65, automatic dusk-to-dawn sensor.",
      dims:"Height: 120cm", finishes:"Black", rooms:"Driveways, Patios, Pathways", unit:"per pair" },
    { id:"l10", cat:"garden", art:"coach", name:"Wall Mounted Coach Light", price:"£55",
      desc:"Traditional Victorian coach lantern wall light, IP44, E27 fitting, powder-coated steel.",
      dims:"Wall mount", finishes:"Black, Antique Bronze", rooms:"Porches, Exterior Walls", unit:"each" },
    { id:"l11", cat:"garden", art:"spike", name:"Spike Garden Spotlight", price:"£79",
      desc:"Low-voltage spike-mount garden spotlight, warm white 3W LED, IP67, fully waterproof.",
      dims:"Spike mount", finishes:"Black", rooms:"Borders, Trees, Features", unit:"per set of 4" },
    { id:"l12", cat:"garden", art:"festoon", name:"String Festoon Lights 10m", price:"£55",
      desc:"10m festoon string lights, 20 × E27 warm white globes, IP44, mains powered.",
      dims:"10m length", finishes:"Black cable", rooms:"Patios, Gardens, Events" },
    // FAN + LIGHT
    { id:"l13", cat:"fan", art:"fan", name:"Breeze Master Ceiling Fan Light", price:"£285",
      desc:"52-inch 5-blade fan with integrated 3-colour LED kit. Remote + wall switch, ultra-quiet DC motor.",
      dims:"52-inch span", finishes:"White, Black, Brushed Nickel", rooms:"Living Rooms, Bedrooms" },
    { id:"l14", cat:"fan", art:"fan", name:"Industrial Barn Fan Light", price:"£245",
      desc:"48-inch 3-blade fan with Edison bulb cage light and exposed motor housing in antique bronze.",
      dims:"48-inch span", finishes:"Antique Bronze", rooms:"Loft Spaces, Restaurants" },
    { id:"l15", cat:"fan", art:"fan", name:"Tropical Rattan Fan Light", price:"£195",
      desc:"42-inch fan with natural rattan blade covers, Boho style, warm LED integrated. Remote control.",
      dims:"42-inch span", finishes:"Natural Rattan", rooms:"Bedrooms, Conservatories" },
    { id:"l16", cat:"fan", art:"fan", name:"Slim Profile Smart Fan Light", price:"£310",
      desc:"Ultra-slim flush mount fan light, Alexa/Google compatible, 36W LED panel, app controlled, 3 speeds.",
      dims:"Low-profile flush", finishes:"White", rooms:"Low Ceilings, Bedrooms" }
  ];

  var FURNITURE = [
    // SOFAS & BEDS
    { id:"f1", cat:"sofas", art:"sofa3", name:"Cloud Compress Sofa — 3 Seater", price:"£499",
      desc:"Space-saving compression sofa that vacuum-packs for easy delivery. High-density foam, linen fabric. Assembles in under 10 minutes.",
      dims:"3-seater", finishes:"Light Grey, Dark Grey, Cream, Navy Blue", rooms:"Living Rooms" },
    { id:"f2", cat:"sofas", art:"sofa2", name:"Cloud Compress Sofa — 2 Seater", price:"£349",
      desc:"Same compression technology in a 2-seater. Perfect for smaller rooms and apartments.",
      dims:"2-seater", finishes:"Light Grey, Dark Grey, Cream, Navy Blue", rooms:"Living Rooms, Studies" },
    { id:"f3", cat:"sofas", art:"corner", name:"Cloud Compress Corner Sofa L-Shape", price:"£749",
      desc:"L-shaped compression sofa seating 5, chaise end included. Vacuum-packed for easy delivery.",
      dims:"L-shape, seats 5", finishes:"Grey, Cream", rooms:"Living Rooms, Family Rooms" },
    { id:"f4", cat:"sofas", art:"mattress", name:"Luxury Mattress — Memory Foam", price:"£189",
      desc:"3-layer memory foam mattress, available with sofa sets or separately. Double and King sizes.",
      dims:"Double / King", finishes:"White cover", rooms:"Bedrooms", from:true },
    // DINING & CHAIRS
    { id:"f5", cat:"dining", art:"table", name:"Lingrui Solid Wood Dining Table 6-Seater", price:"£895",
      desc:"Custom-made solid oak dining table with 6 upholstered chairs. Extendable to 8 seats.",
      dims:"160cm × 90cm (extends to 210cm)", finishes:"Solid Oak", rooms:"Dining Rooms", note:"table + 6 chairs" },
    { id:"f6", cat:"dining", art:"chair", name:"Lingrui Dining Chair — Set of 4", price:"£385",
      desc:"Matching upholstered dining chairs in beige boucle fabric on solid wood legs.",
      dims:"Set of 4", finishes:"Beige Boucle", rooms:"Dining Rooms, Kitchens", note:"per set of 4" },
    { id:"f7", cat:"tv", art:"tvunit", name:"Weiang TV Shelf & Media Unit", price:"£325",
      desc:"Contemporary floating TV shelf and media unit in walnut veneer. 3 shelves + 2 cupboards. Fits TVs up to 75 inches.",
      dims:"180cm × 45cm × 50cm", finishes:"Walnut Veneer", rooms:"Living Rooms" },
    { id:"f8", cat:"tv", art:"bookshelf", name:"Weiang Bookshelf & Display Unit", price:"£195",
      desc:"Matching open-shelf display unit in walnut veneer to pair with the media range.",
      dims:"90cm × 30cm × 180cm", finishes:"Walnut Veneer", rooms:"Living Rooms, Studies" },
    // GARDEN FURNITURE
    { id:"f9", cat:"garden", art:"recliner", name:"Two-Person Transmission Garden Recliner Set", price:"£595",
      desc:"Pair of rattan-effect recliners with adjustable transmission backrests, UV-resistant cushions, powder-coated steel frame. Side table included.",
      dims:"Pair + side table", finishes:"Grey rattan / cream cushions", rooms:"Gardens, Patios, Balconies", unit:"per pair" },
    { id:"f10", cat:"garden", art:"diningset", name:"4-Seater Garden Dining Set", price:"£725",
      desc:"Round table with 4 chairs in all-weather rattan weave with a tempered glass tabletop.",
      dims:"Table diameter: 120cm", finishes:"Mixed Rattan", rooms:"Gardens, Patios" },
    { id:"f11", cat:"garden", art:"lounge", name:"L-Shape Garden Lounge Sofa", price:"£1,150",
      desc:"6-piece modular outdoor corner sofa set, weatherproof cushions with removable covers, powder-coated aluminium frame.",
      dims:"6-piece modular", finishes:"Graphite / Light Grey", rooms:"Gardens, Terraces" },
    { id:"f12", cat:"garden", art:"lounger", name:"Sun Lounger Pair with Side Table", price:"£445",
      desc:"Set of 2 adjustable aluminium sun loungers with a folding side table, UV-resistant textilene fabric.",
      dims:"Pair + folding table", finishes:"Grey textilene", rooms:"Gardens, Poolsides", unit:"per set" }
  ];

  var LIGHT_CATS = [
    { key:"all", label:"All" },
    { key:"chandeliers", label:"Chandeliers" },
    { key:"ceiling", label:"Ceiling Lights" },
    { key:"garden", label:"Garden Lights" },
    { key:"fan", label:"Fan + Light" }
  ];
  var FURN_CATS = [
    { key:"all", label:"All" },
    { key:"sofas", label:"Sofas & Beds" },
    { key:"dining", label:"Dining & Chairs" },
    { key:"garden", label:"Garden Furniture" },
    { key:"tv", label:"TV & Storage" }
  ];
  var CAT_LABEL = {
    chandeliers:"Chandelier", ceiling:"Ceiling Light", fan:"Fan + Light",
    sofas:"Sofas & Beds", dining:"Dining & Chairs", tv:"TV & Storage"
  };
  var DEFAULT_KEYS = { lighting: ["chandeliers","ceiling","garden","fan"], furniture: ["sofas","dining","garden","tv"] };
  /* Categories added in /admin are stored in products.json → merge them into the filter bars */
  function applyCategories(cats) {
    function merge(base, list, items, section) {
      var out = base.slice(), seen = {};
      out.forEach(function(c){ seen[c.key] = 1; });
      (list || []).forEach(function(c){
        if (!c || !c.key || seen[c.key]) return;
        seen[c.key] = 1; out.push({ key:c.key, label:c.label || c.key });
        if (!CAT_LABEL[c.key]) CAT_LABEL[c.key] = c.label || c.key;
      });
      items.forEach(function(p){ if (p.cat && !seen[p.cat]) { seen[p.cat] = 1; out.push({ key:p.cat, label:CAT_LABEL[p.cat] || p.cat }); } });
      // hide custom categories that currently have no products
      return out.filter(function(c){
        return c.key === "all" || DEFAULT_KEYS[section].indexOf(c.key) > -1 ||
          items.some(function(p){ return p.cat === c.key; });
      });
    }
    cats = cats || {};
    LIGHT_CATS = merge(LIGHT_CATS, cats.lighting, LIGHTING, "lighting");
    FURN_CATS = merge(FURN_CATS, cats.furniture, FURNITURE, "furniture");
  }
  function catLabel(p) {
    if (p.cat === "garden") return p.art && p.art.indexOf("sofa")>-1 ? "Garden" : (LIGHTING.indexOf(p)>-1 ? "Garden Light" : "Garden Furniture");
    return CAT_LABEL[p.cat] || p.cat;
  }

  /* =================================================================
     SVG / CSS PRODUCT ART  (gold for lighting, navy for furniture)
     ================================================================= */
  var G = "#D4AF37", G2 = "#C9A84C", N = "#2C3E50", N2 = "#46637e";

  function glow(id) {
    return '<defs><filter id="'+id+'" x="-50%" y="-50%" width="200%" height="200%">' +
      '<feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>';
  }
  function svgWrap(inner, f) { return '<svg viewBox="0 0 200 250" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">'+glow("gl")+(f||"")+inner+'</svg>'; }

  var ART = {
    chandelier: function(){ return svgWrap(
      '<g filter="url(#gl)" stroke="'+G+'" fill="none" stroke-width="2">' +
      '<line x1="100" y1="10" x2="100" y2="40"/>' +
      '<path d="M40 60 Q100 30 160 60"/>' +
      '<path d="M55 95 Q100 70 145 95"/>' +
      '<line x1="100" y1="40" x2="40" y2="60"/><line x1="100" y1="40" x2="160" y2="60"/>' +
      '<line x1="100" y1="55" x2="55" y2="95"/><line x1="100" y1="55" x2="145" y2="95"/>' +
      '</g><g fill="'+G+'" filter="url(#gl)">' +
      ovals([40,40,75,100,125,160,55,145],[60,75,95,80,95,60,95,95]) +
      '<circle cx="100" cy="40" r="5"/></g>'); },

    ring: function(){ return svgWrap(
      '<g filter="url(#gl)"><line x1="100" y1="20" x2="100" y2="60" stroke="'+G+'" stroke-width="2"/>' +
      '<ellipse cx="100" cy="120" rx="62" ry="16" fill="none" stroke="'+G+'" stroke-width="6"/>' +
      '<ellipse cx="100" cy="120" rx="62" ry="16" fill="none" stroke="'+G2+'" stroke-width="2" opacity="0.5"/>' +
      '<line x1="60" y1="60" x2="60" y2="112" stroke="'+G+'" stroke-width="1.5"/>' +
      '<line x1="140" y1="60" x2="140" y2="112" stroke="'+G+'" stroke-width="1.5"/>' +
      '<line x1="100" y1="60" x2="100" y2="105" stroke="'+G+'" stroke-width="1.5"/></g>'); },

    sputnik: function(){ var s=""; for(var i=0;i<18;i++){var a=(i/18)*Math.PI*2;var x=100+Math.cos(a)*70;var y=110+Math.sin(a)*70; s+='<line x1="100" y1="110" x2="'+x.toFixed(1)+'" y2="'+y.toFixed(1)+'" stroke="'+G+'" stroke-width="1.5"/><circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="4" fill="'+G+'"/>';}
      return svgWrap('<line x1="100" y1="20" x2="100" y2="45" stroke="'+G+'" stroke-width="2"/><g filter="url(#gl)">'+s+'<circle cx="100" cy="110" r="10" fill="'+G+'"/></g>'); },

    cloud: function(){ return svgWrap(
      '<g filter="url(#gl)" fill="'+G+'" opacity="0.92">' +
      '<ellipse cx="80" cy="120" rx="34" ry="26"/><ellipse cx="120" cy="120" rx="38" ry="30"/>' +
      '<ellipse cx="100" cy="105" rx="30" ry="26"/><rect x="55" y="120" width="92" height="22" rx="11"/></g>' +
      '<g opacity="0.5">'+rays(100,150)+'</g>'); },

    saturn: function(){ return svgWrap(
      '<g filter="url(#gl)" fill="none" stroke="'+G+'">' +
      '<ellipse cx="100" cy="120" rx="65" ry="20" stroke-width="3"/>' +
      '<ellipse cx="100" cy="120" rx="45" ry="13" stroke-width="3"/>' +
      '<ellipse cx="100" cy="120" rx="22" ry="7" stroke-width="3"/></g>' +
      '<line x1="100" y1="25" x2="100" y2="100" stroke="'+G+'" stroke-width="2"/>'); },

    hexagon: function(){ var h=hexPath(100,120,48); return svgWrap(
      '<g filter="url(#gl)"><path d="'+h+'" fill="none" stroke="'+G+'" stroke-width="3"/>' +
      '<path d="'+hexPath(100,120,30)+'" fill="'+G+'" opacity="0.25" stroke="'+G+'" stroke-width="1.5"/>' +
      '<path d="'+hexPath(100,120,15)+'" fill="'+G+'" opacity="0.5"/></g>'); },

    cage: function(){ return svgWrap(
      '<line x1="100" y1="20" x2="100" y2="50" stroke="'+G+'" stroke-width="2"/>' +
      '<g filter="url(#gl)" fill="none" stroke="'+G+'" stroke-width="2">' +
      '<path d="M65 60 Q100 200 135 60"/>' +
      '<path d="M75 55 L78 175"/><path d="M100 52 L100 185"/><path d="M125 55 L122 175"/>' +
      '<path d="M68 90 Q100 102 132 90"/><path d="M62 130 Q100 145 138 130"/>' +
      '<rect x="80" y="50" width="40" height="12" rx="2"/></g>' +
      '<ellipse cx="100" cy="120" rx="14" ry="20" fill="'+G+'" opacity="0.55" filter="url(#gl)"/>'); },

    lantern: function(){ return svgWrap(
      '<g filter="url(#gl)" stroke="'+G+'" stroke-width="2" fill="none">' +
      '<path d="M75 70 L125 70 L120 150 L80 150 Z"/>' +
      '<path d="M70 70 L100 45 L130 70"/><line x1="100" y1="35" x2="100" y2="45"/>' +
      '<rect x="83" y="150" width="34" height="10"/><line x1="100" y1="160" x2="100" y2="195"/>' +
      '<line x1="75" y1="95" x2="125" y2="95"/><line x1="78" y1="125" x2="122" y2="125"/></g>' +
      '<rect x="84" y="80" width="32" height="62" fill="'+G+'" opacity="0.3"/>'); },

    coach: function(){ return svgWrap(
      '<g filter="url(#gl)" stroke="'+G+'" stroke-width="2" fill="none">' +
      '<rect x="60" y="110" width="12" height="60" rx="3"/>' +
      '<path d="M72 130 L95 130"/><path d="M95 80 L135 80 L130 145 L100 145 Z"/>' +
      '<path d="M90 80 L115 55 L140 80"/><rect x="105" y="145" width="26" height="8"/></g>' +
      '<rect x="100" y="90" width="28" height="50" fill="'+G+'" opacity="0.3"/>'); },

    spike: function(){ return svgWrap(
      '<g filter="url(#gl)" stroke="'+G+'" stroke-width="2" fill="none">' +
      '<path d="M100 180 L96 130 L104 130 Z"/>' +
      '<rect x="88" y="100" width="24" height="30" rx="4"/>' +
      '<ellipse cx="100" cy="100" rx="18" ry="8"/></g>' +
      '<g opacity="0.55">'+rays(100,90)+'</g>' +
      '<ellipse cx="100" cy="98" rx="12" ry="5" fill="'+G+'" filter="url(#gl)"/>'); },

    festoon: function(){ var s='<path d="M15 70 Q100 130 185 70" fill="none" stroke="'+G+'" stroke-width="1.5"/>';
      for(var i=0;i<7;i++){var t=i/6;var x=15+t*170;var y=70+Math.sin(Math.PI*t)*58 - (Math.abs(t-0.5)<0.01?0:0); var yy=70+ (1-Math.pow(2*t-1,2))*58; s+='<line x1="'+x.toFixed(0)+'" y1="'+yy.toFixed(0)+'" x2="'+x.toFixed(0)+'" y2="'+(yy+14).toFixed(0)+'" stroke="'+G+'" stroke-width="1"/><circle cx="'+x.toFixed(0)+'" cy="'+(yy+20).toFixed(0)+'" r="7" fill="'+G+'" filter="url(#gl)" opacity="0.9"/>';}
      return svgWrap(s); },

    fan: function(){ var b=""; for(var i=0;i<5;i++){var a=(i/5)*Math.PI*2 - Math.PI/2; var x=100+Math.cos(a)*60; var y=110+Math.sin(a)*60; var px=100+Math.cos(a+0.32)*58; var py=110+Math.sin(a+0.32)*58; b+='<path d="M100 110 L'+x.toFixed(0)+' '+y.toFixed(0)+' L'+px.toFixed(0)+' '+py.toFixed(0)+' Z" fill="'+G+'" opacity="0.75"/>';}
      return svgWrap('<line x1="100" y1="20" x2="100" y2="45" stroke="'+G+'" stroke-width="2"/><g filter="url(#gl)">'+b+'<circle cx="100" cy="110" r="14" fill="'+G+'"/><ellipse cx="100" cy="178" rx="20" ry="7" fill="'+G+'" opacity="0.55"/></g>'); },

    /* ---------- Furniture (navy line-art) ---------- */
    sofa3: function(){ return svgWrap(sofa(3)); },
    sofa2: function(){ return svgWrap(sofa(2)); },
    corner: function(){ return svgWrap(
      '<g filter="url(#gl)" fill="none" stroke="'+N+'" stroke-width="3" stroke-linejoin="round">' +
      '<path d="M30 95 L30 170 L150 170 L150 130 L170 130 L170 95 L150 95 L150 130"/>' +
      '<rect x="30" y="95" width="140" height="22" rx="6" fill="'+N+'" opacity="0.15"/>' +
      '<line x1="30" y1="170" x2="35" y2="185"/><line x1="150" y1="170" x2="155" y2="185"/></g>'); },
    mattress: function(){ return svgWrap(
      '<g filter="url(#gl)" stroke="'+N+'" stroke-width="3" fill="none" stroke-linejoin="round">' +
      '<rect x="35" y="100" width="130" height="50" rx="10" fill="'+N+'" opacity="0.1"/>' +
      '<line x1="35" y1="118" x2="165" y2="118"/><line x1="35" y1="134" x2="165" y2="134"/></g>' +
      '<g fill="'+N2+'">'+dots([60,90,120,150],[109,127,109,127])+'</g>'); },
    table: function(){ return svgWrap(
      '<g filter="url(#gl)" stroke="'+N+'" stroke-width="3" fill="none" stroke-linejoin="round">' +
      '<rect x="35" y="105" width="130" height="12" rx="4" fill="'+N+'" opacity="0.18"/>' +
      '<line x1="48" y1="117" x2="48" y2="170"/><line x1="152" y1="117" x2="152" y2="170"/>' +
      '<path d="M70 150 L70 175 M70 130 q14 -8 0 -16 v36"/>' +
      '<path d="M130 150 L130 175 M130 130 q-14 -8 0 -16 v36"/></g>'); },
    chair: function(){ return svgWrap(
      '<g filter="url(#gl)" stroke="'+N+'" stroke-width="3" fill="none" stroke-linejoin="round">' +
      '<path d="M70 70 Q70 55 90 55 L120 55 Q130 55 130 70 L130 120" />' +
      '<rect x="68" y="118" width="66" height="14" rx="5" fill="'+N+'" opacity="0.15"/>' +
      '<line x1="74" y1="132" x2="74" y2="180"/><line x1="128" y1="132" x2="128" y2="180"/>' +
      '<rect x="74" y="60" width="56" height="58" rx="8" fill="'+N+'" opacity="0.08"/></g>'); },
    tvunit: function(){ return svgWrap(
      '<g filter="url(#gl)" stroke="'+N+'" stroke-width="3" fill="none" stroke-linejoin="round">' +
      '<rect x="30" y="110" width="140" height="46" rx="6" fill="'+N+'" opacity="0.1"/>' +
      '<line x1="100" y1="110" x2="100" y2="156"/><line x1="30" y1="133" x2="100" y2="133"/>' +
      '<line x1="156" y1="118" x2="166" y2="118"/><line x1="34" y1="118" x2="44" y2="118"/>' +
      '<line x1="40" y1="156" x2="40" y2="166"/><line x1="160" y1="156" x2="160" y2="166"/></g>'); },
    bookshelf: function(){ return svgWrap(
      '<g filter="url(#gl)" stroke="'+N+'" stroke-width="3" fill="none" stroke-linejoin="round">' +
      '<rect x="60" y="60" width="80" height="120" rx="4"/>' +
      '<line x1="60" y1="100" x2="140" y2="100"/><line x1="60" y1="140" x2="140" y2="140"/></g>' +
      '<g fill="'+N+'" opacity="0.4">'+rect4([68,90,112,72],[70,110,150,110],[8,8,8,20],[26,26,26,26])+'</g>'); },
    recliner: function(){ return svgWrap(
      '<g filter="url(#gl)" stroke="'+N+'" stroke-width="3" fill="none" stroke-linejoin="round">' +
      '<path d="M40 150 L60 90 L130 110 L120 150 Z" fill="'+N+'" opacity="0.12"/>' +
      '<line x1="40" y1="150" x2="38" y2="172"/><line x1="120" y1="150" x2="124" y2="172"/>' +
      '<line x1="130" y1="110" x2="150" y2="115"/></g>'); },
    diningset: function(){ return svgWrap(
      '<g filter="url(#gl)" stroke="'+N+'" stroke-width="3" fill="none" stroke-linejoin="round">' +
      '<ellipse cx="100" cy="120" rx="55" ry="18" fill="'+N+'" opacity="0.12"/>' +
      '<line x1="100" y1="130" x2="100" y2="170"/><ellipse cx="100" cy="172" rx="22" ry="6"/>' +
      '<rect x="40" y="95" width="16" height="22" rx="4"/><rect x="144" y="95" width="16" height="22" rx="4"/></g>'); },
    lounge: function(){ return svgWrap(
      '<g filter="url(#gl)" stroke="'+N+'" stroke-width="3" fill="none" stroke-linejoin="round">' +
      '<path d="M35 110 L35 160 L165 160 L165 120 L135 120 L135 110 Z" fill="'+N+'" opacity="0.1"/>' +
      '<rect x="35" y="100" width="100" height="16" rx="5" fill="'+N+'" opacity="0.2"/>' +
      '<line x1="35" y1="160" x2="35" y2="175"/><line x1="165" y1="160" x2="165" y2="175"/></g>'); },
    lounger: function(){ return svgWrap(
      '<g filter="url(#gl)" stroke="'+N+'" stroke-width="3" fill="none" stroke-linejoin="round">' +
      '<path d="M35 140 L70 100 L80 110 L60 145 L150 145 L150 130" fill="'+N+'" opacity="0.1"/>' +
      '<line x1="55" y1="145" x2="52" y2="170"/><line x1="145" y1="145" x2="148" y2="170"/>' +
      '<line x1="60" y1="140" x2="150" y2="140"/></g>'); }
  };

  /* art helpers */
  function ovals(xs, ys){ var s=""; for(var i=0;i<xs.length;i++){ s+='<ellipse cx="'+xs[i]+'" cy="'+(ys[i]+14)+'" rx="3.5" ry="7" opacity="0.9"/>'; } return s; }
  function rays(cx, cy){ var s=""; for(var i=-2;i<=2;i++){ s+='<line x1="'+(cx+i*14)+'" y1="'+cy+'" x2="'+(cx+i*20)+'" y2="'+(cy+34)+'" stroke="'+G+'" stroke-width="1.5"/>'; } return s; }
  function hexPath(cx,cy,r){ var p=""; for(var i=0;i<6;i++){var a=Math.PI/180*(60*i-30);var x=cx+r*Math.cos(a);var y=cy+r*Math.sin(a);p+=(i?"L":"M")+x.toFixed(1)+" "+y.toFixed(1)+" ";} return p+"Z"; }
  function dots(xs,ys){ var s=""; for(var i=0;i<xs.length;i++){s+='<circle cx="'+xs[i]+'" cy="'+ys[i]+'" r="2.5"/>';} return s; }
  function rect4(xs,ys,ws,hs){ var s=""; for(var i=0;i<xs.length;i++){s+='<rect x="'+xs[i]+'" y="'+ys[i]+'" width="'+ws[i]+'" height="'+hs[i]+'" rx="2"/>';} return s; }
  function sofa(seats){ var cushions=""; var n=seats; var startX=48; var w=(104)/n;
    for(var i=0;i<n;i++){ cushions+='<rect x="'+(startX+i*w+3)+'" y="108" width="'+(w-6)+'" height="18" rx="5" fill="'+N+'" opacity="0.18"/>'; }
    return '<g filter="url(#gl)" stroke="'+N+'" stroke-width="3" fill="none" stroke-linejoin="round">' +
      '<path d="M40 100 L40 150 L160 150 L160 100 Q160 90 150 90 L50 90 Q40 90 40 100"/>' +
      '<rect x="40" y="100" width="120" height="26" rx="8" fill="'+N+'" opacity="0.1"/>' +
      '<line x1="40" y1="150" x2="38" y2="170"/><line x1="160" y1="150" x2="162" y2="170"/>' +
      '<path d="M40 126 L36 126 M36 100 q-6 0 -6 14 v12 h6"/>' +
      '<path d="M160 126 L164 126 M164 100 q6 0 6 14 v12 h-6"/></g>' + cushions; }

  /* card visual background per art type */
  var BG = {
    chandelier:"linear-gradient(135deg,#1a1209 0%,#2d1f0a 100%)", sputnik:"linear-gradient(135deg,#1a1209 0%,#2d1f0a 100%)",
    ring:"linear-gradient(135deg,#0f0f1a 0%,#1a1a2e 100%)", cloud:"linear-gradient(135deg,#0f0f1a 0%,#1a1a2e 100%)",
    saturn:"linear-gradient(135deg,#0f0f1a 0%,#1a1a2e 100%)", hexagon:"linear-gradient(135deg,#0f0f1a 0%,#1a1a2e 100%)",
    cage:"linear-gradient(135deg,#12100e 0%,#24180a 100%)",
    lantern:"linear-gradient(135deg,#0d1b0d 0%,#1a2e1a 100%)", coach:"linear-gradient(135deg,#0d1b0d 0%,#1a2e1a 100%)",
    spike:"linear-gradient(135deg,#0d1b0d 0%,#1a2e1a 100%)", festoon:"linear-gradient(135deg,#0d1b0d 0%,#1a2e1a 100%)",
    fan:"linear-gradient(135deg,#12100e 0%,#24180a 100%)",
    sofa3:"linear-gradient(135deg,#f5f0e8 0%,#ede5d6 100%)", sofa2:"linear-gradient(135deg,#f5f0e8 0%,#ede5d6 100%)",
    corner:"linear-gradient(135deg,#f5f0e8 0%,#ede5d6 100%)", mattress:"linear-gradient(135deg,#f5f0e8 0%,#ede5d6 100%)",
    table:"linear-gradient(135deg,#f0ebe0 0%,#e8e0d0 100%)", chair:"linear-gradient(135deg,#f0ebe0 0%,#e8e0d0 100%)",
    tvunit:"linear-gradient(135deg,#f0ede8 0%,#e5e0d8 100%)", bookshelf:"linear-gradient(135deg,#f0ede8 0%,#e5e0d8 100%)",
    recliner:"linear-gradient(135deg,#e8f0e8 0%,#d6e8d6 100%)", diningset:"linear-gradient(135deg,#e8f0e8 0%,#d6e8d6 100%)",
    lounge:"linear-gradient(135deg,#e8f0e8 0%,#d6e8d6 100%)", lounger:"linear-gradient(135deg,#e8f0e8 0%,#d6e8d6 100%)"
  };

  /* For a custom/unknown icon style, fall back to a sensible icon per category */
  var LIGHT_DEFAULT_ART = { chandeliers:"chandelier", ceiling:"cloud", garden:"lantern", fan:"fan" };
  var FURN_DEFAULT_ART = { sofas:"sofa3", dining:"table", tv:"tvunit", garden:"recliner" };
  function artKey(p, light) {
    if (p.art && ART[p.art]) return p.art;
    var d = light ? FURN_DEFAULT_ART : LIGHT_DEFAULT_ART;
    return d[p.cat] || (light ? "sofa3" : "chandelier");
  }
  /* Visual = a real photo if one was uploaded, else the styled SVG placeholder */
  function productVisual(p, light) {
    if (p.image) return '<img class="card__img" src="'+p.image+'" alt="'+escapeHTML(p.name)+'" loading="lazy">';
    return ART[artKey(p, light)]();
  }
  function visualBg(p, light) { return p.image ? "#0d0d0d" : (BG[artKey(p, light)] || "#111"); }

  /* All media for a product: main photo, extra photos, then the video */
  function mediaList(p) {
    var m = [];
    if (p.image) m.push({ t:"img", src:p.image });
    (p.gallery || []).forEach(function(src){ if (src) m.push({ t:"img", src:src }); });
    if (p.video) m.push({ t:"video", src:p.video });
    return m;
  }
  /* Stock: p.stock = number (blank = not shown), p.incoming = "Arriving December" etc. */
  var LOW_STOCK = 3;
  function stockInfo(p) {
    var has = p.stock !== undefined && p.stock !== null && p.stock !== "";
    var n = has ? +p.stock : NaN;
    if (has && n > LOW_STOCK) return { cls:"ok", text:"In stock" };
    if (has && n > 0) return { cls:"low", text:"Only " + n + " left" };
    if (p.incoming) return { cls:"soon", text:p.incoming };
    if (has) return { cls:"out", text:"Out of stock" };
    return null;
  }
  function stockHTML(p) {
    var s = stockInfo(p);
    return s ? '<span class="stock stock--'+s.cls+'">'+escapeHTML(s.text)+'</span>' : "";
  }
  /* Watts: p.watts = "40" or "40W" (blank = row hidden) */
  function wattsText(p) {
    var w = p && p.watts != null ? String(p.watts).trim() : "";
    if (!w) return "";
    return /^\d+(\.\d+)?$/.test(w) ? w + "W" : w;
  }
  function wattsRow(p, label) {
    var w = wattsText(p);
    return w ? '<dt>'+label+'</dt><dd>'+escapeHTML(w)+'</dd>' : '';
  }
  function mediaBadge(p) {
    var photos = (p.image ? 1 : 0) + (p.gallery || []).length, bits = [];
    if (photos > 1) bits.push(photos + " photos");
    if (p.video) bits.push("&#9654; Video");
    return bits.length ? '<span class="card__media">'+bits.join(" · ")+'</span>' : "";
  }
  function stageHTML(item, p) {
    if (item.t === "video")
      return '<video class="gallery__media" src="'+escapeHTML(item.src)+'" controls playsinline preload="metadata"></video>';
    return '<img class="gallery__media" src="'+escapeHTML(item.src)+'" alt="'+escapeHTML(p.name)+'" title="Click to enlarge and zoom">';
  }
  function galleryHTML(p, light) {
    var m = mediaList(p);
    if (!m.length) return '<div class="card__visual" style="aspect-ratio:16/9;border-radius:12px;background:'+visualBg(p, light)+';margin-bottom:1.2rem">'+productVisual(p, light)+'</div>';
    var many = m.length > 1;
    var thumbs = many ? '<div class="gallery__thumbs">' + m.map(function(it, i){
      var inner = it.t === "video"
        ? '<video src="'+escapeHTML(it.src)+'#t=0.5" muted playsinline preload="metadata"></video><span class="gallery__play">&#9654;</span>'
        : '<img src="'+escapeHTML(it.src)+'" alt="" loading="lazy">';
      return '<button type="button" class="gallery__thumb'+(i===0?' active':'')+'" data-gidx="'+i+'" aria-label="'+(it.t==="video"?"Play video":"Photo "+(i+1))+'">'+inner+'</button>';
    }).join("") + '</div>' : '';
    var nav = many ? '<button type="button" class="gallery__nav gallery__nav--prev" data-gstep="-1" aria-label="Previous">&#8249;</button>' +
                     '<button type="button" class="gallery__nav gallery__nav--next" data-gstep="1" aria-label="Next">&#8250;</button>' +
                     '<span class="gallery__count">1 / '+m.length+'</span>' : '';
    return '<div class="gallery" data-pid="'+escapeHTML(p.id)+'" data-gi="0">' +
      '<div class="gallery__stage">'+stageHTML(m[0], p)+nav+'</div>' + thumbs + '</div>';
  }
  function galleryGo(g, idx) {
    var p = findProduct(g.getAttribute("data-pid")); if (!p) return;
    var m = mediaList(p); if (!m.length) return;
    idx = (idx + m.length) % m.length;
    g.setAttribute("data-gi", idx);
    var stage = g.querySelector(".gallery__stage");
    var old = stage.querySelector(".gallery__media");
    if (old) old.outerHTML = stageHTML(m[idx], p);
    var c = g.querySelector(".gallery__count"); if (c) c.textContent = (idx+1) + " / " + m.length;
    g.querySelectorAll(".gallery__thumb").forEach(function(t, i){ t.classList.toggle("active", i === idx); });
  }

  /* =================================================================
     RENDER: product card
     ================================================================= */
  function cardHTML(p, light) {
    var theme = light ? "card--light" : "card--dark";
    var btnClass = light ? "btn--navy" : "btn--gold";
    var priceLine = (p.from ? '<small>from</small>' : (p.unit ? '<small>'+p.unit+'</small>' : '')) ;
    return '<article class="card '+theme+' reveal" data-cat="'+p.cat+'" data-id="'+p.id+'">' +
      '<div class="card__visual" style="background:'+visualBg(p, light)+'">' + productVisual(p, light) + mediaBadge(p) +
        '<div class="card__overlay"><button class="btn '+btnClass+' btn--sm" data-detail="'+p.id+'" data-light="'+(light?1:0)+'">View Details</button></div>' +
      '</div>' +
      '<div class="card__body">' +
        '<span class="badge">'+catLabel(p)+'</span>' +
        '<h3 class="card__name">'+(p.image ? '<a href="/product/'+encodeURIComponent(p.id)+'">'+p.name+'</a>' : p.name)+'</h3>' + stockHTML(p) +
        '<p class="card__desc">'+p.desc+'</p>' +
        '<div class="card__foot">' +
          '<span class="card__price">'+priceLine+p.price+'</span>' +
          '<button class="btn '+btnClass+' btn--sm" data-enquire="'+p.id+'" data-light="'+(light?1:0)+'">Enquire Now</button>' +
        '</div>' +
      '</div>' +
    '</article>';
  }

  function findProduct(id){ return LIGHTING.concat(FURNITURE).filter(function(p){return p.id===id;})[0]; }

  /* =================================================================
     NAV + FOOTER injection
     ================================================================= */
  function navHTML(active) {
    function cur(p){ return active===p ? ' aria-current="page"' : ''; }
    return '<nav class="nav" id="nav" aria-label="Primary"><div class="nav__inner">' +
      '<a class="brand" href="index.html" aria-label="LURIXA home">' +
        '<img class="brand__logo brand__logo--bronze" src="images/logo/lurixa-horizontal-bronze.svg" width="179" height="54" alt="LURIXA">' +
        '<img class="brand__logo brand__logo--gold" src="images/logo/lurixa-horizontal-gold.svg" width="179" height="54" alt="LURIXA">' +
      '</a>' +
      '<ul class="nav__links">' +
        '<li class="nav__item"><a class="nav__link" href="index.html"'+cur("home")+'>Home</a></li>' +
        '<li class="nav__item"><a class="nav__link" href="lighting.html"'+cur("lighting")+'>Lighting <span class="caret">▾</span></a>' +
          '<div class="dropdown"><a href="chandeliers.html">Chandeliers</a><a href="ceiling-lights.html">Ceiling Lights</a><a href="garden-lights.html">Garden Lights</a><a href="fan-lights.html">Fan + Lights</a></div></li>' +
        '<li class="nav__item"><a class="nav__link" href="furniture.html"'+cur("furniture")+'>Furniture <span class="caret">▾</span></a>' +
          '<div class="dropdown"><a href="sofas-and-beds.html">Sofas & Beds</a><a href="dining-and-chairs.html">Dining & Chairs</a><a href="garden-furniture.html">Garden Furniture</a><a href="tv-and-storage.html">TV & Storage</a></div></li>' +
        '<li class="nav__item"><a class="nav__link" href="about.html"'+cur("about")+'>About Us</a></li>' +
        '<li class="nav__item"><a class="nav__link" href="about.html#contact">Contact</a></li>' +
      '</ul>' +
      '<a class="btn btn--gold nav__cta" href="about.html#contact">Request a Quote</a>' +
      '<button class="hamburger" id="hamburger" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>' +
    '</div></nav>' +
    '<div class="mobile-menu" id="mobileMenu">' +
      '<a href="index.html">Home</a>' +
      '<a href="lighting.html">Lighting</a>' +
      '<a class="sub" href="chandeliers.html">Chandeliers</a>' +
      '<a class="sub" href="ceiling-lights.html">Ceiling Lights</a>' +
      '<a class="sub" href="garden-lights.html">Garden Lights</a>' +
      '<a class="sub" href="fan-lights.html">Fan + Lights</a>' +
      '<a href="furniture.html">Furniture</a>' +
      '<a class="sub" href="sofas-and-beds.html">Sofas & Beds</a>' +
      '<a class="sub" href="dining-and-chairs.html">Dining & Chairs</a>' +
      '<a class="sub" href="garden-furniture.html">Garden Furniture</a>' +
      '<a class="sub" href="tv-and-storage.html">TV & Storage</a>' +
      '<a href="about.html">About Us</a>' +
      '<a href="about.html#contact">Contact</a>' +
      '<a class="btn btn--gold" href="about.html#contact">Request a Quote</a>' +
    '</div>';
  }

  function footerHTML() {
    return '<footer class="footer"><div class="container"><div class="footer__grid">' +
      '<div class="footer__brand">' +
        '<a class="brand" href="index.html" aria-label="LURIXA home"><img class="brand__logo brand__logo--gold" src="images/logo/lurixa-horizontal-gold.svg" width="218" height="66" alt="LURIXA"></a>' +
        '<p>Illuminate Your World. Furnish Your Life. Premium lighting and furniture, sourced directly from the world’s finest manufacturers.</p>' +
        '<div class="socials">' +
          '<a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener">'+ICON.instagram+'</a>' +
          '<a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener">'+ICON.facebook+'</a>' +
          '<a href="https://wa.me/'+CO.phoneRaw+'" aria-label="WhatsApp" target="_blank" rel="noopener">'+ICON.whatsapp+'</a>' +
        '</div>' +
      '</div>' +
      '<div><h4>Navigate</h4><a href="index.html">Home</a><a href="lighting.html">Lighting</a><a href="furniture.html">Furniture</a><a href="about.html">About Us</a><a href="about.html#contact">Contact</a></div>' +
      '<div><h4>Collections</h4><a href="chandeliers.html">Chandeliers</a><a href="ceiling-lights.html">Ceiling Lights</a><a href="garden-lights.html">Garden Lights</a><a href="sofas-and-beds.html">Sofas & Beds</a><a href="garden-furniture.html">Garden Furniture</a></div>' +
      '<div class="footer__contact"><h4>Contact</h4>' +
        '<ul>' +
          '<li><span class="ico">'+ICON.pin+'</span><span>'+CO.address+'</span></li>' +
          '<li><span class="ico">'+ICON.phone+'</span><a href="tel:'+CO.phoneRaw+'">'+CO.phone+'</a></li>' +
          '<li><span class="ico">'+ICON.mail+'</span><a href="mailto:'+CO.email+'">'+CO.email+'</a></li>' +
        '</ul>' +
      '</div>' +
    '</div></div>' +
    '<div class="footer__strip">Warehouse &amp; Showroom: Luton, Bedfordshire, LU2 8DL &nbsp;|&nbsp; Tel: '+CO.phone+'</div>' +
    '<div class="footer__bottom">© 2026 LURIXA. All rights reserved. LURIXA is a trading name of Commercial Improvements Ltd, registered in England and Wales.</div>' +
    '</footer>';
  }

  /* inline icons */
  var ICON = {
    instagram:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
    facebook:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M14 9h3l.5-3H14V4.5c0-.9.3-1.5 1.6-1.5H18V.2C17.5.1 16.4 0 15.2 0 12.6 0 11 1.5 11 4.3V6H8v3h3v9h3z"/></svg>',
    whatsapp:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12c0 2.1.6 4.2 1.6 6L0 24l6.2-1.6c1.7.9 3.7 1.4 5.8 1.4 6.6 0 12-5.4 12-12S18.6 0 12 0zm6.9 17c-.3.8-1.7 1.5-2.3 1.6-.6.1-1.4.1-2.2-.1-.5-.2-1.2-.4-2-.8-3.5-1.5-5.8-5.1-6-5.3-.2-.2-1.4-1.9-1.4-3.6s.9-2.5 1.2-2.9c.3-.3.7-.4.9-.4h.6c.2 0 .5 0 .7.5l1 2.4c.1.2.1.4 0 .6l-.5.7c-.2.2-.3.4-.1.7.2.3.9 1.5 2 2.4 1.4 1.2 2.5 1.6 2.8 1.7.3.1.5.1.7-.1l.9-1c.2-.3.4-.2.7-.1l2.3 1.1c.3.2.5.2.6.4.1.1.1.7-.2 1.5z"/></svg>',
    pin:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>',
    phone:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>',
    mail:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 6 10 7 10-7"/></svg>'
  };

  /* =================================================================
     MODAL (enquiry / details)
     ================================================================= */
  function ensureModal() {
    if (document.getElementById("modalRoot")) return;
    var root = document.createElement("div");
    root.id = "modalRoot";
    root.className = "modal-backdrop";
    root.innerHTML = '<div class="modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle"><button class="modal__close" id="modalClose" aria-label="Close dialog">&times;</button><div id="modalContent"></div></div>';
    document.body.appendChild(root);
    root.addEventListener("click", function(e){ if (e.target === root) closeModal(); });
    document.getElementById("modalClose").addEventListener("click", closeModal);
    document.addEventListener("keydown", function(e){
      if (document.getElementById("lbRoot") && document.getElementById("lbRoot").classList.contains("open")) return;
      if (e.key === "Escape") return closeModal();
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      var g = root.classList.contains("open") && root.querySelector(".gallery");
      if (g && g.querySelector(".gallery__thumb")) galleryGo(g, (+g.getAttribute("data-gi") || 0) + (e.key === "ArrowRight" ? 1 : -1));
    });
  }
  function openModal(html) {
    ensureModal();
    document.getElementById("modalContent").innerHTML = html;
    document.getElementById("modalRoot").classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeModal() {
    var r = document.getElementById("modalRoot");
    if (r) { r.classList.remove("open"); r.querySelectorAll("video").forEach(function(v){ try { v.pause(); } catch (x) {} }); }
    document.body.style.overflow = "";
  }

  function enquiryForm(p) {
    var wa = "https://wa.me/"+CO.phoneRaw+"?text=" + encodeURIComponent("Hi, I'm interested in " + (p ? p.name : "your products") + ".");
    return '<div class="modal__head"><span class="eyebrow">Enquiry</span><h3 id="modalTitle">'+(p?p.name:"Request a Quote")+'</h3></div>' +
      (p ? '<div class="modal__detail">'+p.desc+'<dl>' +
            '<dt>Price</dt><dd>'+(p.from?"from ":"")+p.price+(p.unit?" "+p.unit:"")+'</dd>' +
            '<dt>Dimensions</dt><dd>'+p.dims+'</dd>' +
            wattsRow(p, 'Power') +
            '<dt>Finishes</dt><dd>'+p.finishes+'</dd>' +
            '<dt>Suitable for</dt><dd>'+p.rooms+'</dd>' +
          '</dl></div>' : '') +
      '<form id="enqForm" novalidate>' +
        '<input type="text" name="_honey" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px;width:1px;height:1px;opacity:0">' +
        '<div class="form-field"><label for="en">Name</label><input class="form-control" id="en" name="name" required></div>' +
        '<div class="form-field"><label for="ee">Email</label><input class="form-control" id="ee" name="email" type="email" required></div>' +
        '<div class="form-field"><label for="ep">Phone</label><input class="form-control" id="ep" name="phone" type="tel"></div>' +
        '<div class="form-field"><label for="epr">Product</label><input class="form-control" id="epr" name="product" value="'+(p?p.name.replace(/"/g,"&quot;"):"")+'" readonly></div>' +
        '<div class="form-field"><label for="em">Message</label><textarea class="form-control" id="em" name="message" rows="3"></textarea></div>' +
        '<button type="submit" class="btn btn--gold btn--block btn--lg">Send Enquiry</button>' +
      '</form>' +
      '<a class="whatsapp" href="'+wa+'" target="_blank" rel="noopener">'+ICON.whatsapp+' Chat on WhatsApp</a>';
  }

  function detailView(p, light) {
    var btnClass = light ? "btn--navy" : "btn--gold";
    return '<div class="modal__head"><span class="eyebrow">'+catLabel(p)+'</span><h3 id="modalTitle">'+p.name+'</h3></div>' +
      galleryHTML(p, light) +
      '<div class="modal__detail">'+p.desc+'<dl>' +
        '<dt>Price</dt><dd>'+(p.from?"from ":"")+p.price+(p.unit?" "+p.unit:"")+(p.note?" ("+p.note+")":"")+'</dd>' +
        (stockInfo(p) ? '<dt>Availability</dt><dd>'+stockHTML(p)+'</dd>' : '') +
        '<dt>Dimensions</dt><dd>'+p.dims+'</dd>' +
        wattsRow(p, 'Power') +
        '<dt>Finishes</dt><dd>'+p.finishes+'</dd>' +
        '<dt>Suitable rooms</dt><dd>'+p.rooms+'</dd>' +
      '</dl></div>' +
      '<button class="btn '+btnClass+' btn--block btn--lg" data-enquire="'+p.id+'" data-light="'+(light?1:0)+'">Enquire About This Product</button>';
  }

  function thanksHTML(name, product) {
    return '<div class="modal__thanks"><div class="tick">✨</div>' +
      '<h3>Thank you'+(name?", "+escapeHTML(name):"")+'!</h3>' +
      '<p>We’ll contact you within 24 hours'+(product?" about <strong>"+escapeHTML(product)+"</strong>":"")+'.</p>' +
      '<p style="margin-top:1rem">Email us directly at <a href="mailto:'+CO.email+'">'+CO.email+'</a><br>or call <a href="tel:'+CO.phoneRaw+'">'+CO.phone+'</a></p>' +
      '<a class="whatsapp" href="https://wa.me/'+CO.phoneRaw+'" target="_blank" rel="noopener" style="margin-top:1.4rem">'+ICON.whatsapp+' Message us on WhatsApp</a>' +
    '</div>';
  }
  function escapeHTML(s){ return String(s).replace(/[&<>"']/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]; }); }

  /* =================================================================
     LIGHTBOX: full-screen photo viewer with zoom + pan at full resolution
     (wheel / pinch / double-click / buttons, drag to pan, arrows + Esc)
     ================================================================= */
  var LB = { list:[], i:0, s:1, tx:0, ty:0, ptrs:{}, pinch:0, moved:false };
  function lbEl(id){ return document.getElementById(id); }
  function lbEnsure() {
    if (lbEl("lbRoot")) return;
    var r = document.createElement("div");
    r.id = "lbRoot"; r.className = "lightbox";
    r.setAttribute("role", "dialog"); r.setAttribute("aria-modal", "true"); r.setAttribute("aria-label", "Photo viewer");
    r.innerHTML = '<div class="lightbox__stage" id="lbStage"><img id="lbImg" alt="" draggable="false"></div>' +
      '<div class="lightbox__bar">' +
        '<button type="button" data-lb="out" aria-label="Zoom out">&minus;</button>' +
        '<button type="button" data-lb="in" aria-label="Zoom in">+</button>' +
        '<button type="button" data-lb="fit" aria-label="Reset zoom">Fit</button>' +
        '<button type="button" data-lb="close" aria-label="Close viewer">&times;</button>' +
      '</div>' +
      '<button type="button" class="lightbox__nav lightbox__nav--prev" data-lb="prev" aria-label="Previous photo">&#8249;</button>' +
      '<button type="button" class="lightbox__nav lightbox__nav--next" data-lb="next" aria-label="Next photo">&#8250;</button>' +
      '<span class="lightbox__count" id="lbCount"></span>' +
      '<span class="lightbox__hint" id="lbHint">Scroll or pinch to zoom · drag to move</span>';
    document.body.appendChild(r);
    var stage = lbEl("lbStage");
    r.addEventListener("click", function(e){
      var b = e.target.closest("[data-lb]"); if (!b) return;
      var a = b.getAttribute("data-lb");
      if (a === "close") lbClose(); else if (a === "in") lbZoomBy(1.6); else if (a === "out") lbZoomBy(1/1.6);
      else if (a === "fit") lbReset(); else if (a === "prev") lbGo(-1); else if (a === "next") lbGo(1);
    });
    stage.addEventListener("click", function(e){ if (e.target === stage && !LB.moved) lbClose(); });
    stage.addEventListener("wheel", function(e){
      e.preventDefault();
      lbZoomAt(Math.exp(-e.deltaY * (e.ctrlKey ? 0.01 : 0.0018)), e.clientX, e.clientY);
    }, { passive:false });
    stage.addEventListener("dblclick", function(e){
      if (LB.s > 1.05) lbReset(); else lbZoomAt(lbMax() > 2.5 ? 2.5 : lbMax(), e.clientX, e.clientY);
    });
    stage.addEventListener("pointerdown", function(e){
      LB.moved = false; LB.ptrs[e.pointerId] = { x:e.clientX, y:e.clientY };
      try { stage.setPointerCapture(e.pointerId); } catch (x) {}
      LB.pinch = lbPinchDist();
    });
    stage.addEventListener("pointermove", function(e){
      var p = LB.ptrs[e.pointerId]; if (!p) return;
      var ids = Object.keys(LB.ptrs);
      if (ids.length === 2) {
        LB.ptrs[e.pointerId] = { x:e.clientX, y:e.clientY };
        var d = lbPinchDist(), c = lbPinchCentre();
        if (LB.pinch && d) lbZoomAt(d / LB.pinch, c.x, c.y);
        LB.pinch = d; LB.moved = true; return;
      }
      var dx = e.clientX - p.x, dy = e.clientY - p.y;
      LB.ptrs[e.pointerId] = { x:e.clientX, y:e.clientY };
      if (LB.s > 1) { if (Math.abs(dx) + Math.abs(dy) > 0) LB.moved = true; LB.tx += dx; LB.ty += dy; lbApply(); }
    });
    function up(e){ delete LB.ptrs[e.pointerId]; LB.pinch = lbPinchDist(); setTimeout(function(){ LB.moved = false; }, 0); }
    stage.addEventListener("pointerup", up); stage.addEventListener("pointercancel", up);
    document.addEventListener("keydown", function(e){
      if (!r.classList.contains("open")) return;
      var k = e.key;
      if (k === "Escape") { e.stopPropagation(); lbClose(); }
      else if (k === "ArrowRight") lbGo(1); else if (k === "ArrowLeft") lbGo(-1);
      else if (k === "+" || k === "=") lbZoomBy(1.4); else if (k === "-") lbZoomBy(1/1.4); else if (k === "0") lbReset();
    }, true);
    window.addEventListener("resize", function(){ if (r.classList.contains("open")) lbApply(); });
  }
  function lbPinchDist() {
    var ids = Object.keys(LB.ptrs); if (ids.length !== 2) return 0;
    var a = LB.ptrs[ids[0]], b = LB.ptrs[ids[1]];
    return Math.hypot(a.x - b.x, a.y - b.y);
  }
  function lbPinchCentre() {
    var ids = Object.keys(LB.ptrs), a = LB.ptrs[ids[0]], b = LB.ptrs[ids[1]];
    return { x:(a.x + b.x) / 2, y:(a.y + b.y) / 2 };
  }
  /* highest zoom = twice the photo's real pixels */
  function lbMax() {
    var im = lbEl("lbImg"); if (!im || !im.offsetWidth || !im.naturalWidth) return 4;
    return Math.min(12, Math.max(4, (im.naturalWidth / im.offsetWidth) * 2));
  }
  function lbApply() {
    var im = lbEl("lbImg"), st = lbEl("lbStage"); if (!im) return;
    var w = im.offsetWidth * LB.s, h = im.offsetHeight * LB.s;
    var mx = Math.max(0, (w - st.clientWidth) / 2), my = Math.max(0, (h - st.clientHeight) / 2);
    LB.tx = Math.max(-mx, Math.min(mx, LB.tx)); LB.ty = Math.max(-my, Math.min(my, LB.ty));
    im.style.transform = "translate(" + LB.tx + "px," + LB.ty + "px) scale(" + LB.s + ")";
    st.classList.toggle("zoomed", LB.s > 1.01);
  }
  function lbZoomAt(factor, cx, cy) {
    var st = lbEl("lbStage"), rect = st.getBoundingClientRect();
    var ns = Math.max(1, Math.min(lbMax(), LB.s * factor)), k = ns / LB.s;
    var px = cx - (rect.left + rect.width / 2), py = cy - (rect.top + rect.height / 2);
    LB.tx = px - (px - LB.tx) * k; LB.ty = py - (py - LB.ty) * k; LB.s = ns;
    if (ns === 1) { LB.tx = 0; LB.ty = 0; }
    lbApply();
    var h = lbEl("lbHint"); if (h) h.style.opacity = 0;
  }
  function lbZoomBy(f) { var r = lbEl("lbStage").getBoundingClientRect(); lbZoomAt(f, r.left + r.width / 2, r.top + r.height / 2); }
  function lbReset() { LB.s = 1; LB.tx = 0; LB.ty = 0; lbApply(); }
  function lbShow() {
    var im = lbEl("lbImg"); LB.s = 1; LB.tx = 0; LB.ty = 0;
    im.style.transform = ""; im.src = LB.list[LB.i]; lbApply();
    var many = LB.list.length > 1;
    lbEl("lbRoot").classList.toggle("single", !many);
    lbEl("lbCount").textContent = many ? (LB.i + 1) + " / " + LB.list.length : "";
  }
  function lbGo(d) { if (LB.list.length < 2) return; LB.i = (LB.i + d + LB.list.length) % LB.list.length; lbShow(); }
  function lbOpen(list, i) {
    lbEnsure(); LB.list = list; LB.i = i || 0; LB.ptrs = {};
    var r = lbEl("lbRoot"); lbShow(); r.classList.add("open");
    var h = lbEl("lbHint"); h.style.opacity = 1; setTimeout(function(){ h.style.opacity = 0; }, 3500);
    document.body.style.overflow = "hidden";
  }
  function lbClose() {
    var r = lbEl("lbRoot"); if (!r) return;
    r.classList.remove("open");
    var m = document.getElementById("modalRoot");
    if (!(m && m.classList.contains("open"))) document.body.style.overflow = "";
  }
  /* click a product photo (details window, or a product page) to open the viewer */
  function lbFromClick(img) {
    var g = img.closest(".gallery");
    if (g) {
      var p = findProduct(g.getAttribute("data-pid")); if (!p) return false;
      var list = mediaList(p).filter(function(m){ return m.t === "img"; }).map(function(m){ return m.src; });
      var i = list.indexOf(img.getAttribute("src"));
      lbOpen(list, i < 0 ? 0 : i); return true;
    }
    var box = img.closest(".pdp__media"); if (!box) return false;
    var imgs = [].slice.call(box.querySelectorAll("img")).map(function(x){ return x.getAttribute("src"); });
    var j = imgs.indexOf(img.getAttribute("src"));
    lbOpen(imgs, j < 0 ? 0 : j); return true;
  }

  /* delegate clicks for enquire / detail buttons */
  document.addEventListener("click", function(e) {
    var enq = e.target.closest("[data-enquire]");
    var det = e.target.closest("[data-detail]");
    var gt = e.target.closest("[data-gidx],[data-gstep]");
    var zoomImg = e.target.closest(".gallery__media, .pdp__media img");
    if (zoomImg && zoomImg.tagName === "IMG" && !gt && lbFromClick(zoomImg)) return;
    if (gt) {
      var g = gt.closest(".gallery");
      if (!g) return;
      var cur = +g.getAttribute("data-gi") || 0;
      galleryGo(g, gt.hasAttribute("data-gidx") ? +gt.getAttribute("data-gidx") : cur + (+gt.getAttribute("data-gstep")));
      return;
    }
    if (enq) {
      var p = findProduct(enq.getAttribute("data-enquire"));
      openModal(enquiryForm(p));
      bindEnqForm(p);
    } else if (det) {
      var p2 = findProduct(det.getAttribute("data-detail"));
      openModal(detailView(p2, det.getAttribute("data-light")==="1"));
    }
  });
  /* Enquiries are emailed to CO.email via FormSubmit (no server needed).
     The very first submission sends an activation email to that inbox — click it once. */
  var FORM_ENDPOINT = "https://formsubmit.co/ajax/" + CO.email;
  function sendEnquiry(fields, subject) {
    var body = { _subject: subject, _template: "table", _captcha: "false" };
    Object.keys(fields).forEach(function(k){ if (fields[k] !== "" && fields[k] != null) body[k] = fields[k]; });
    body["Sent from page"] = location.href;
    return fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(body)
    }).then(function(r){ return r.json().catch(function(){ return {}; }).then(function(j){
      if (!r.ok || String(j.success) === "false") throw new Error(j.message || ("HTTP " + r.status));
      return j;
    }); });
  }
  function formFields(f) {
    var out = {};
    Array.prototype.forEach.call(f.elements, function(el){
      if (!el.name || el.name === "_honey" || el.type === "submit") return;
      var label = f.querySelector('label[for="'+el.id+'"]');
      out[label ? label.textContent.trim() : el.name] = el.value.trim();
    });
    return out;
  }
  function isSpam(f) { var h = f.querySelector('[name="_honey"]'); return !!(h && h.value); }
  function sendFailHTML() {
    return '<p class="form-error">Sorry, your message couldn’t be sent just now. Please call <a href="tel:'+CO.phoneRaw+'">'+CO.phone+'</a>, ' +
      'email <a href="mailto:'+CO.email+'">'+CO.email+'</a> or <a href="https://wa.me/'+CO.phoneRaw+'" target="_blank" rel="noopener">WhatsApp us</a>.</p>';
  }
  function bindEnqForm(p) {
    var f = document.getElementById("enqForm");
    if (!f) return;
    f.addEventListener("submit", function(e){
      e.preventDefault();
      if (!f.checkValidity()) { f.reportValidity(); return; }
      var who = f.name.value;
      if (isSpam(f)) { openModal(thanksHTML(who, p ? p.name : "")); return; }
      var btn = f.querySelector('[type="submit"]'), old = btn.innerHTML;
      btn.disabled = true; btn.innerHTML = "Sending…";
      var fields = formFields(f);
      if (p) { fields["Price shown"] = (p.from ? "from " : "") + p.price + (p.unit ? " " + p.unit : ""); }
      sendEnquiry(fields, "Website enquiry" + (p ? ": " + p.name : "")).then(function(){
        openModal(thanksHTML(who, p ? p.name : ""));
      }).catch(function(){
        btn.disabled = false; btn.innerHTML = old;
        var err = f.querySelector(".form-error"); if (err) err.remove();
        f.insertAdjacentHTML("beforeend", sendFailHTML());
      });
    });
  }

  /* =================================================================
     PAGE RENDERERS
     ================================================================= */
  function renderGrid(targetId, items, light) {
    var el = document.getElementById(targetId);
    if (!el) return;
    el.innerHTML = items.map(function(p){ return cardHTML(p, light); }).join("");
  }

  function renderFilters(barId, cats, gridId, items, light) {
    var bar = document.getElementById(barId);
    if (!bar) return;
    bar.innerHTML = cats.map(function(c, i){
      return '<button class="pill'+(i===0?' active':'')+'" data-filter="'+c.key+'">'+c.label+'</button>';
    }).join("");
    bar.addEventListener("click", function(e){
      var b = e.target.closest("[data-filter]");
      if (!b) return;
      bar.querySelectorAll(".pill").forEach(function(x){ x.classList.remove("active"); });
      b.classList.add("active");
      var key = b.getAttribute("data-filter");
      var filtered = key==="all" ? items : items.filter(function(p){ return p.cat===key; });
      renderGrid(gridId, filtered, light);
      initStagger();
      observeReveals();
    });
  }

  /* Category landing pages (e.g. /chandeliers) set <body data-cat="chandeliers"> to open on that filter */
  function presetFilter(barId) {
    var key = document.body.getAttribute("data-cat");
    if (!key) return;
    var bar = document.getElementById(barId);
    var btn = bar && bar.querySelector('[data-filter="'+key+'"]');
    if (btn) btn.click();
  }

  function filterFromHash(barId, items, gridId, light) {
    var h = location.hash.replace("#","");
    if (!h) return;
    var bar = document.getElementById(barId);
    var btn = bar && bar.querySelector('[data-filter="'+h+'"]');
    if (btn) { btn.click(); window.scrollTo({ top: 0 }); }
  }

  function renderCarousel() {
    var el = document.getElementById("featuredCarousel");
    if (!el) return;
    var picks = [LIGHTING[0],LIGHTING[12],LIGHTING[3],LIGHTING[8],FURNITURE[0],FURNITURE[4],FURNITURE[8],FURNITURE[6]];
    el.innerHTML = picks.map(function(p){
      var light = FURNITURE.indexOf(p) > -1;
      return cardHTML(p, light);
    }).join("");
    var prev = document.getElementById("carPrev"), next = document.getElementById("carNext");
    if (prev) prev.addEventListener("click", function(){ el.scrollBy({left:-300,behavior:"smooth"}); });
    if (next) next.addEventListener("click", function(){ el.scrollBy({left:300,behavior:"smooth"}); });
  }

  function renderSparkles() {
    var box = document.getElementById("sparkles");
    if (!box) return;
    var html = "";
    for (var i=0;i<40;i++){
      var x = Math.random()*100, y = Math.random()*70, d = (Math.random()*4).toFixed(2), s=(0.6+Math.random()*1.6).toFixed(2);
      html += '<span class="spark" style="left:'+x.toFixed(1)+'%;top:'+y.toFixed(1)+'%;animation-delay:'+d+'s;transform:scale('+s+')"></span>';
    }
    box.innerHTML = html;
  }

  /* =================================================================
     NAV behaviour: scroll glass + hamburger
     ================================================================= */
  function initNav() {
    var nav = document.getElementById("nav");
    function onScroll(){ if (window.scrollY > 30) nav.classList.add("scrolled"); else nav.classList.remove("scrolled"); }
    window.addEventListener("scroll", onScroll, { passive:true }); onScroll();

    var ham = document.getElementById("hamburger");
    var menu = document.getElementById("mobileMenu");
    if (ham && menu) {
      ham.addEventListener("click", function(){
        var open = menu.classList.toggle("open");
        ham.classList.toggle("open", open);
        ham.setAttribute("aria-expanded", open ? "true" : "false");
        document.body.style.overflow = open ? "hidden" : "";
      });
      menu.querySelectorAll("a").forEach(function(a){
        a.addEventListener("click", function(){
          menu.classList.remove("open"); ham.classList.remove("open");
          ham.setAttribute("aria-expanded","false"); document.body.style.overflow = "";
        });
      });
    }
  }

  /* =================================================================
     Scroll reveal (IntersectionObserver)
     ================================================================= */
  var io;
  function observeReveals() {
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal").forEach(function(el){ el.classList.add("in"); });
      return;
    }
    if (!io) {
      io = new IntersectionObserver(function(entries){
        entries.forEach(function(en){ if (en.isIntersecting){ en.target.classList.add("in"); io.unobserve(en.target); } });
      }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    }
    document.querySelectorAll(".reveal:not(.in)").forEach(function(el){ io.observe(el); });
  }

  /* =================================================================
     Generic forms (newsletter / contact) -> inline success
     ================================================================= */
  function initInlineForms() {
    document.querySelectorAll("[data-inline-form]").forEach(function(f){
      if (!f.querySelector('[name="_honey"]'))
        f.insertAdjacentHTML("beforeend", '<input type="text" name="_honey" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px;width:1px;height:1px;opacity:0">');
      f.addEventListener("submit", function(e){
        e.preventDefault();
        if (f.getAttribute("data-sending")) return;
        if (isSpam(f)) { showInlineThanks(f); return; }
        var btn = f.querySelector('[type="submit"]'), old = btn ? btn.innerHTML : "";
        if (btn) { btn.disabled = true; btn.innerHTML = "Sending…"; }
        f.setAttribute("data-sending", "1");
        var page = (document.querySelector("h1") || {}).textContent || document.title;
        sendEnquiry(formFields(f), "Website " + (f.querySelector('[name="message"]') ? "contact form" : "callback request") + " — " + page.trim())
          .then(function(){ showInlineThanks(f); })
          .catch(function(){
            if (btn) { btn.disabled = false; btn.innerHTML = old; }
            f.removeAttribute("data-sending");
            var err = f.parentNode.querySelector(".form-error"); if (err) err.remove();
            f.insertAdjacentHTML("afterend", sendFailHTML());
          });
      });
    });
  }
  function showInlineThanks(f) {
        var msg = f.getAttribute("data-success") || "Thank you! We’ll be in touch.";
        var name = f.querySelector('[name="name"]');
        if (name && name.value) msg = msg.replace("{name}", escapeHTML(name.value));
        msg = msg.replace("{name}", "");
        var err = f.parentNode.querySelector(".form-error"); if (err) err.remove();
        var box = f.parentNode.querySelector(".form-success");
        if (!box) { box = document.createElement("p"); box.className = "form-success"; f.parentNode.appendChild(box); }
        box.innerHTML = msg;
        f.reset();
        f.style.display = "none";
  }

  /* =================================================================
     BOOT
     ================================================================= */
  /* =================================================================
     MOTION (lightweight — CSS-driven, rAF-throttled, no libraries)
     ================================================================= */
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function initScrollProgress() {
    if (document.getElementById("scrollProgress")) return;
    var bar = document.createElement("div");
    bar.className = "scroll-progress"; bar.id = "scrollProgress";
    document.body.appendChild(bar);
    var ticking = false;
    function update() {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0).toFixed(2) + "%";
      ticking = false;
    }
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }

  function initMagnetic() {
    if (reduceMotion || !window.matchMedia || !window.matchMedia("(pointer: fine)").matches) return;
    var els = document.querySelectorAll(".nav__cta, .hero__cta .btn");
    els.forEach(function (el) {
      el.classList.add("magnetic");
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        var x = e.clientX - r.left - r.width / 2;
        var y = e.clientY - r.top - r.height / 2;
        el.style.transform = "translate(" + (x * 0.25).toFixed(1) + "px," + (y * 0.35).toFixed(1) + "px)";
      });
      el.addEventListener("mouseleave", function () { el.style.transform = ""; });
    });
  }

  function initHeroParallax() {
    if (reduceMotion) return;
    var sparks = document.getElementById("sparkles");
    if (!sparks) return;
    var ticking = false;
    function update() { sparks.style.transform = "translateY(" + (window.scrollY * 0.18).toFixed(1) + "px)"; ticking = false; }
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  }

  /* assign an index to grouped items so they cascade in with a stagger */
  function initStagger() {
    var groups = document.querySelectorAll(".grid, .carousel, .pillars, .cards-3, .timeline");
    for (var g = 0; g < groups.length; g++) {
      var kids = groups[g].children;
      for (var i = 0; i < kids.length; i++) { kids[i].style.setProperty("--i", i % 6); }
    }
  }

  function initMotion() {
    initScrollProgress();
    initMagnetic();
    initHeroParallax();
  }

  /* Render everything that depends on product data (runs after JSON loads) */
  function renderData(page) {
    if (page === "home") { renderCarousel(); }
    if (page === "lighting") {
      renderGrid("lightGrid", LIGHTING, false);
      renderFilters("lightFilter", LIGHT_CATS, "lightGrid", LIGHTING, false);
      presetFilter("lightFilter");
      filterFromHash("lightFilter", LIGHTING, "lightGrid", false);
    }
    if (page === "furniture") {
      renderGrid("furnGrid", FURNITURE, true);
      renderFilters("furnFilter", FURN_CATS, "furnGrid", FURNITURE, true);
      presetFilter("furnFilter");
      filterFromHash("furnFilter", FURNITURE, "furnGrid", true);
    }
    initStagger();
    observeReveals();
  }

  function boot() {
    var page = document.body.getAttribute("data-page");

    // inject nav + footer (no product data needed) so the page chrome shows instantly
    var navMount = document.getElementById("site-nav");
    var footMount = document.getElementById("site-footer");
    if (navMount) navMount.innerHTML = navHTML(page);
    if (footMount) footMount.innerHTML = footerHTML();
    initNav();
    initInlineForms();
    if (page === "home") renderSparkles();
    observeReveals();
    initStagger();
    initMotion();

    // Products are managed in data/products.json (editable via /admin).
    // The inline LIGHTING/FURNITURE arrays above are an offline fallback.
    fetch("/data/products.json", { cache: "no-store" })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (data) {
        if (data && data.lighting && data.furniture) { LIGHTING = data.lighting; FURNITURE = data.furniture; applyCategories(data.categories); }
      })
      .catch(function () { /* keep fallback data */ })
      .then(function () { renderData(page); injectProductLD(page); });
  }


  /* SEO: publish real products (those with a photo) as schema.org Product data so Google can show them */
  function injectProductLD(page) {
    try {
      var list = page === "lighting" ? LIGHTING : page === "furniture" ? FURNITURE : null;
      if (!list) return;
      var items = [];
      list.forEach(function (p) {
        if (!p || !p.image || !p.name) return;
        var m = String(p.price || "").match(/£\s*([\d,]+(?:\.\d+)?)/);
        var imgs = [p.image].concat(Array.isArray(p.gallery) ? p.gallery : []).filter(Boolean).map(function (u) { return u.indexOf("http") === 0 ? u : "https://lurixa.co.uk" + (u.charAt(0) === "/" ? "" : "/") + u; });
        var prod = { "@type": "Product", "name": p.name, "image": imgs, "description": p.desc || p.name, "sku": String(p.id), "brand": { "@type": "Brand", "name": "LURIXA" } };
        if (m) {
          var out = typeof p.stock === "number" && p.stock <= 0;
          prod.offers = { "@type": "Offer", "priceCurrency": "GBP", "price": m[1].replace(/,/g, ""), "url": "https://lurixa.co.uk/" + page, "itemCondition": "https://schema.org/NewCondition",
            "availability": out ? (p.incoming ? "https://schema.org/PreOrder" : "https://schema.org/OutOfStock") : "https://schema.org/InStock" };
        }
        items.push(prod);
      });
      if (!items.length) return;
      var el = document.createElement("script");
      el.type = "application/ld+json";
      el.textContent = JSON.stringify({ "@context": "https://schema.org", "@graph": items });
      document.head.appendChild(el);
    } catch (e) { /* never break the page for SEO data */ }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
