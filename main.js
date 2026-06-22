/* =================================================================
   Commercial Improvements Ltd (CIL) — Showroom Site JS
   Data, CSS/SVG product art, rendering, filtering, modal, animation.
   ================================================================= */
(function () {
  "use strict";

  /* ---------- Company constants ---------- */
  var CO = {
    name: "Commercial Improvements Ltd",
    phone: "+44 7402 176349",
    phoneRaw: "447402176349",
    email: "info@improvemental.co.uk",
    address: "250 The Village, Butterfield, Great Marlings, Luton, Bedfordshire, LU2 8DL"
  };

  /* =================================================================
     PRODUCT DATA
     ================================================================= */
  var LIGHTING = [
    // CHANDELIERS
    { id:"l1", cat:"chandeliers", art:"chandelier", name:"Grand Crystal Cascade", price:"£485",
      desc:"Multi-tiered crystal chandelier, 12-light, chrome finish — a centrepiece for hallways and dining rooms.",
      dims:"80cm diameter, 120cm drop", finishes:"Chrome, Gold, Black", rooms:"Hallways, Dining Rooms", ukca:"Yes" },
    { id:"l2", cat:"chandeliers", art:"chandelier", name:"Blossom Flower Chandelier", price:"£320",
      desc:"Petal-shaped arms in antique brass with frosted glass shades. 8-light, softly diffused.",
      dims:"65cm diameter, 90cm drop", finishes:"Antique Brass", rooms:"Living Rooms, Bedrooms", ukca:"Yes" },
    { id:"l3", cat:"chandeliers", art:"ring", name:"Nordic Ring Chandelier", price:"£275",
      desc:"Minimalist circular ring in matte black with integrated, dimmable 40W LED.",
      dims:"60cm diameter", finishes:"Matte Black", rooms:"Kitchens, Dining Rooms, Loft Apartments", ukca:"Yes" },
    { id:"l4", cat:"chandeliers", art:"sputnik", name:"Royal Sputnik Burst", price:"£395",
      desc:"Mid-century modern starburst, 18 arms, E14 bulbs in brushed gold — a true statement piece.",
      dims:"75cm diameter", finishes:"Brushed Gold", rooms:"Feature Rooms, Hotels", ukca:"Yes" },
    // CEILING LIGHTS
    { id:"l5", cat:"ceiling", art:"cloud", name:"Cloud Flush Mount LED", price:"£89",
      desc:"Soft white acrylic cloud-shaped flush fitting. Integrated 24W LED, 4000K, IP44 bathroom safe.",
      dims:"Surface mount", finishes:"White Acrylic", rooms:"Bedrooms, Bathrooms", ukca:"Yes" },
    { id:"l6", cat:"ceiling", art:"saturn", name:"Saturn Ring Semi-Flush", price:"£145",
      desc:"Concentric rings in brushed nickel with a warm integrated LED strip. 36W, dimmable, 3000K.",
      dims:"Semi-flush", finishes:"Brushed Nickel", rooms:"Living Rooms, Hallways", ukca:"Yes" },
    { id:"l7", cat:"ceiling", art:"hexagon", name:"Geometric Hexagon Panel", price:"£110",
      desc:"Honeycomb geometric surface-mount panel, 48W LED, IP20 — crisp, modern light.",
      dims:"50cm x 50cm", finishes:"White / Black trim", rooms:"Home Offices, Kitchens", ukca:"Yes" },
    { id:"l8", cat:"ceiling", art:"cage", name:"Vintage Industrial Cage", price:"£65",
      desc:"Exposed cage fitting with Edison bulb (E27 included) in wrought iron, antique finish.",
      dims:"Surface mount", finishes:"Antique Iron", rooms:"Kitchens, Bars, Studies", ukca:"Pending" },
    // GARDEN / OUTDOOR
    { id:"l9", cat:"garden", art:"lantern", name:"Solar Pillar Lantern Set", price:"£175",
      desc:"Set of 2 solar-powered cast aluminium post lanterns, IP65, automatic dusk-to-dawn sensor.",
      dims:"Height: 120cm", finishes:"Black", rooms:"Driveways, Patios, Pathways", ukca:"Yes", unit:"per pair" },
    { id:"l10", cat:"garden", art:"coach", name:"Wall Mounted Coach Light", price:"£55",
      desc:"Traditional Victorian coach lantern wall light, IP44, E27 fitting, powder-coated steel.",
      dims:"Wall mount", finishes:"Black, Antique Bronze", rooms:"Porches, Exterior Walls", ukca:"Yes", unit:"each" },
    { id:"l11", cat:"garden", art:"spike", name:"Spike Garden Spotlight", price:"£79",
      desc:"Low-voltage spike-mount garden spotlight, warm white 3W LED, IP67, fully waterproof.",
      dims:"Spike mount", finishes:"Black", rooms:"Borders, Trees, Features", ukca:"Yes", unit:"per set of 4" },
    { id:"l12", cat:"garden", art:"festoon", name:"String Festoon Lights 10m", price:"£55",
      desc:"10m festoon string lights, 20 × E27 warm white globes, IP44, mains powered.",
      dims:"10m length", finishes:"Black cable", rooms:"Patios, Gardens, Events", ukca:"Yes" },
    // FAN + LIGHT
    { id:"l13", cat:"fan", art:"fan", name:"Breeze Master Ceiling Fan Light", price:"£285",
      desc:"52-inch 5-blade fan with integrated 3-colour LED kit. Remote + wall switch, ultra-quiet DC motor.",
      dims:"52-inch span", finishes:"White, Black, Brushed Nickel", rooms:"Living Rooms, Bedrooms", ukca:"Yes" },
    { id:"l14", cat:"fan", art:"fan", name:"Industrial Barn Fan Light", price:"£245",
      desc:"48-inch 3-blade fan with Edison bulb cage light and exposed motor housing in antique bronze.",
      dims:"48-inch span", finishes:"Antique Bronze", rooms:"Loft Spaces, Restaurants", ukca:"Yes" },
    { id:"l15", cat:"fan", art:"fan", name:"Tropical Rattan Fan Light", price:"£195",
      desc:"42-inch fan with natural rattan blade covers, Boho style, warm LED integrated. Remote control.",
      dims:"42-inch span", finishes:"Natural Rattan", rooms:"Bedrooms, Conservatories", ukca:"Yes" },
    { id:"l16", cat:"fan", art:"fan", name:"Slim Profile Smart Fan Light", price:"£310",
      desc:"Ultra-slim flush mount fan light, Alexa/Google compatible, 36W LED panel, app controlled, 3 speeds.",
      dims:"Low-profile flush", finishes:"White", rooms:"Low Ceilings, Bedrooms", ukca:"Yes" }
  ];

  var FURNITURE = [
    // SOFAS & BEDS
    { id:"f1", cat:"sofas", art:"sofa3", name:"Cloud Compress Sofa — 3 Seater", price:"£499",
      desc:"Space-saving compression sofa that vacuum-packs for easy delivery. High-density foam, linen fabric. Assembles in under 10 minutes.",
      dims:"3-seater", finishes:"Light Grey, Dark Grey, Cream, Navy Blue", rooms:"Living Rooms", ukca:"N/A (Fire-rated)" },
    { id:"f2", cat:"sofas", art:"sofa2", name:"Cloud Compress Sofa — 2 Seater", price:"£349",
      desc:"Same compression technology in a 2-seater. Perfect for smaller rooms and apartments.",
      dims:"2-seater", finishes:"Light Grey, Dark Grey, Cream, Navy Blue", rooms:"Living Rooms, Studies", ukca:"N/A (Fire-rated)" },
    { id:"f3", cat:"sofas", art:"corner", name:"Cloud Compress Corner Sofa L-Shape", price:"£749",
      desc:"L-shaped compression sofa seating 5, chaise end included. Vacuum-packed for easy delivery.",
      dims:"L-shape, seats 5", finishes:"Grey, Cream", rooms:"Living Rooms, Family Rooms", ukca:"N/A (Fire-rated)" },
    { id:"f4", cat:"sofas", art:"mattress", name:"Luxury Mattress — Memory Foam", price:"£189",
      desc:"3-layer memory foam mattress, available with sofa sets or separately. Double and King sizes.",
      dims:"Double / King", finishes:"White cover", rooms:"Bedrooms", ukca:"N/A (Fire-rated)", from:true },
    // DINING & CHAIRS
    { id:"f5", cat:"dining", art:"table", name:"Lingrui Solid Wood Dining Table 6-Seater", price:"£895",
      desc:"Custom-made solid oak dining table with 6 upholstered chairs. Extendable to 8 seats.",
      dims:"160cm × 90cm (extends to 210cm)", finishes:"Solid Oak", rooms:"Dining Rooms", ukca:"N/A", note:"table + 6 chairs" },
    { id:"f6", cat:"dining", art:"chair", name:"Lingrui Dining Chair — Set of 4", price:"£385",
      desc:"Matching upholstered dining chairs in beige boucle fabric on solid wood legs.",
      dims:"Set of 4", finishes:"Beige Boucle", rooms:"Dining Rooms, Kitchens", ukca:"N/A", note:"per set of 4" },
    { id:"f7", cat:"tv", art:"tvunit", name:"Weiang TV Shelf & Media Unit", price:"£325",
      desc:"Contemporary floating TV shelf and media unit in walnut veneer. 3 shelves + 2 cupboards. Fits TVs up to 75 inches.",
      dims:"180cm × 45cm × 50cm", finishes:"Walnut Veneer", rooms:"Living Rooms", ukca:"N/A" },
    { id:"f8", cat:"tv", art:"bookshelf", name:"Weiang Bookshelf & Display Unit", price:"£195",
      desc:"Matching open-shelf display unit in walnut veneer to pair with the media range.",
      dims:"90cm × 30cm × 180cm", finishes:"Walnut Veneer", rooms:"Living Rooms, Studies", ukca:"N/A" },
    // GARDEN FURNITURE
    { id:"f9", cat:"garden", art:"recliner", name:"Two-Person Transmission Garden Recliner Set", price:"£595",
      desc:"Pair of rattan-effect recliners with adjustable transmission backrests, UV-resistant cushions, powder-coated steel frame. Side table included.",
      dims:"Pair + side table", finishes:"Grey rattan / cream cushions", rooms:"Gardens, Patios, Balconies", ukca:"N/A", unit:"per pair" },
    { id:"f10", cat:"garden", art:"diningset", name:"4-Seater Garden Dining Set", price:"£725",
      desc:"Round table with 4 chairs in all-weather rattan weave with a tempered glass tabletop.",
      dims:"Table diameter: 120cm", finishes:"Mixed Rattan", rooms:"Gardens, Patios", ukca:"N/A" },
    { id:"f11", cat:"garden", art:"lounge", name:"L-Shape Garden Lounge Sofa", price:"£1,150",
      desc:"6-piece modular outdoor corner sofa set, weatherproof cushions with removable covers, powder-coated aluminium frame.",
      dims:"6-piece modular", finishes:"Graphite / Light Grey", rooms:"Gardens, Terraces", ukca:"N/A" },
    { id:"f12", cat:"garden", art:"lounger", name:"Sun Lounger Pair with Side Table", price:"£445",
      desc:"Set of 2 adjustable aluminium sun loungers with a folding side table, UV-resistant textilene fabric.",
      dims:"Pair + folding table", finishes:"Grey textilene", rooms:"Gardens, Poolsides", ukca:"N/A", unit:"per set" }
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

  /* =================================================================
     RENDER: product card
     ================================================================= */
  function cardHTML(p, light) {
    var theme = light ? "card--light" : "card--dark";
    var btnClass = light ? "btn--navy" : "btn--gold";
    var art = (ART[p.art] || ART.chandelier)();
    var priceLine = (p.from ? '<small>from</small>' : (p.unit ? '<small>'+p.unit+'</small>' : '')) ;
    return '<article class="card '+theme+' reveal" data-cat="'+p.cat+'" data-id="'+p.id+'">' +
      '<div class="card__visual" style="background:'+(BG[p.art]||"#111")+'">' + art +
        '<div class="card__overlay"><button class="btn '+btnClass+' btn--sm" data-detail="'+p.id+'" data-light="'+(light?1:0)+'">View Details</button></div>' +
      '</div>' +
      '<div class="card__body">' +
        '<span class="badge">'+catLabel(p)+'</span>' +
        '<h3 class="card__name">'+p.name+'</h3>' +
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
      '<a class="brand" href="index.html" aria-label="CIL home">' +
        '<span class="brand__mono">CIL</span>' +
        '<span class="brand__name">Commercial Improvements<span>Ltd</span></span>' +
      '</a>' +
      '<ul class="nav__links">' +
        '<li class="nav__item"><a class="nav__link" href="index.html"'+cur("home")+'>Home</a></li>' +
        '<li class="nav__item"><a class="nav__link" href="lighting.html"'+cur("lighting")+'>Lighting <span class="caret">▾</span></a>' +
          '<div class="dropdown"><a href="lighting.html#chandeliers">Chandeliers</a><a href="lighting.html#ceiling">Ceiling Lights</a><a href="lighting.html#garden">Garden Lights</a><a href="lighting.html#fan">Fan + Lights</a></div></li>' +
        '<li class="nav__item"><a class="nav__link" href="furniture.html"'+cur("furniture")+'>Furniture <span class="caret">▾</span></a>' +
          '<div class="dropdown"><a href="furniture.html#sofas">Sofas & Beds</a><a href="furniture.html#dining">Dining & Chairs</a><a href="furniture.html#garden">Garden Furniture</a><a href="furniture.html#tv">TV & Storage</a></div></li>' +
        '<li class="nav__item"><a class="nav__link" href="about.html"'+cur("about")+'>About Us</a></li>' +
        '<li class="nav__item"><a class="nav__link" href="about.html#contact">Contact</a></li>' +
      '</ul>' +
      '<a class="btn btn--gold nav__cta" href="about.html#contact">Request a Quote</a>' +
      '<button class="hamburger" id="hamburger" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>' +
    '</div></nav>' +
    '<div class="mobile-menu" id="mobileMenu">' +
      '<a href="index.html">Home</a>' +
      '<a href="lighting.html">Lighting</a>' +
      '<a class="sub" href="lighting.html#chandeliers">Chandeliers</a>' +
      '<a class="sub" href="lighting.html#ceiling">Ceiling Lights</a>' +
      '<a class="sub" href="lighting.html#garden">Garden Lights</a>' +
      '<a class="sub" href="lighting.html#fan">Fan + Lights</a>' +
      '<a href="furniture.html">Furniture</a>' +
      '<a class="sub" href="furniture.html#sofas">Sofas & Beds</a>' +
      '<a class="sub" href="furniture.html#dining">Dining & Chairs</a>' +
      '<a class="sub" href="furniture.html#garden">Garden Furniture</a>' +
      '<a class="sub" href="furniture.html#tv">TV & Storage</a>' +
      '<a href="about.html">About Us</a>' +
      '<a href="about.html#contact">Contact</a>' +
      '<a class="btn btn--gold" href="about.html#contact">Request a Quote</a>' +
    '</div>';
  }

  function footerHTML() {
    return '<footer class="footer"><div class="container"><div class="footer__grid">' +
      '<div class="footer__brand">' +
        '<a class="brand" href="index.html"><span class="brand__mono">CIL</span><span class="brand__name">Commercial Improvements<span>Ltd</span></span></a>' +
        '<p>Illuminate Your World. Furnish Your Life. Premium lighting and furniture, sourced directly from the world’s finest manufacturers.</p>' +
        '<div class="socials">' +
          '<a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener">'+ICON.instagram+'</a>' +
          '<a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener">'+ICON.facebook+'</a>' +
          '<a href="https://wa.me/'+CO.phoneRaw+'" aria-label="WhatsApp" target="_blank" rel="noopener">'+ICON.whatsapp+'</a>' +
        '</div>' +
      '</div>' +
      '<div><h4>Navigate</h4><a href="index.html">Home</a><a href="lighting.html">Lighting</a><a href="furniture.html">Furniture</a><a href="about.html">About Us</a><a href="about.html#contact">Contact</a></div>' +
      '<div><h4>Collections</h4><a href="lighting.html#chandeliers">Chandeliers</a><a href="lighting.html#ceiling">Ceiling Lights</a><a href="lighting.html#garden">Garden Lights</a><a href="furniture.html#sofas">Sofas & Beds</a><a href="furniture.html#garden">Garden Furniture</a></div>' +
      '<div class="footer__contact"><h4>Contact</h4>' +
        '<ul>' +
          '<li><span class="ico">'+ICON.pin+'</span><span>'+CO.address+'</span></li>' +
          '<li><span class="ico">'+ICON.phone+'</span><a href="tel:'+CO.phoneRaw+'">'+CO.phone+'</a></li>' +
          '<li><span class="ico">'+ICON.mail+'</span><a href="mailto:'+CO.email+'">'+CO.email+'</a></li>' +
        '</ul>' +
      '</div>' +
    '</div></div>' +
    '<div class="footer__strip">Warehouse &amp; Showroom: Luton, Bedfordshire, LU2 8DL &nbsp;|&nbsp; Tel: '+CO.phone+'</div>' +
    '<div class="footer__bottom">© 2026 Commercial Improvements Ltd. All rights reserved. Registered in England and Wales.</div>' +
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
    document.addEventListener("keydown", function(e){ if (e.key === "Escape") closeModal(); });
  }
  function openModal(html) {
    ensureModal();
    document.getElementById("modalContent").innerHTML = html;
    document.getElementById("modalRoot").classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeModal() {
    var r = document.getElementById("modalRoot");
    if (r) r.classList.remove("open");
    document.body.style.overflow = "";
  }

  function enquiryForm(p) {
    var wa = "https://wa.me/"+CO.phoneRaw+"?text=" + encodeURIComponent("Hi, I'm interested in " + (p ? p.name : "your products") + ".");
    return '<div class="modal__head"><span class="eyebrow">Enquiry</span><h3 id="modalTitle">'+(p?p.name:"Request a Quote")+'</h3></div>' +
      (p ? '<div class="modal__detail">'+p.desc+'<dl>' +
            '<dt>Price</dt><dd>'+(p.from?"from ":"")+p.price+(p.unit?" "+p.unit:"")+'</dd>' +
            '<dt>Dimensions</dt><dd>'+p.dims+'</dd>' +
            '<dt>Finishes</dt><dd>'+p.finishes+'</dd>' +
            '<dt>Suitable for</dt><dd>'+p.rooms+'</dd>' +
            '<dt>UKCA marked</dt><dd>'+p.ukca+'</dd>' +
          '</dl></div>' : '') +
      '<form id="enqForm" novalidate>' +
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
      '<div class="card__visual" style="aspect-ratio:16/9;border-radius:12px;background:'+(BG[p.art]||"#111")+';margin-bottom:1.2rem">'+(ART[p.art]||ART.chandelier)()+'</div>' +
      '<div class="modal__detail">'+p.desc+'<dl>' +
        '<dt>Price</dt><dd>'+(p.from?"from ":"")+p.price+(p.unit?" "+p.unit:"")+(p.note?" ("+p.note+")":"")+'</dd>' +
        '<dt>Dimensions</dt><dd>'+p.dims+'</dd>' +
        '<dt>Finishes</dt><dd>'+p.finishes+'</dd>' +
        '<dt>Suitable rooms</dt><dd>'+p.rooms+'</dd>' +
        '<dt>UKCA marked</dt><dd>'+p.ukca+'</dd>' +
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

  /* delegate clicks for enquire / detail buttons */
  document.addEventListener("click", function(e) {
    var enq = e.target.closest("[data-enquire]");
    var det = e.target.closest("[data-detail]");
    if (enq) {
      var p = findProduct(enq.getAttribute("data-enquire"));
      openModal(enquiryForm(p));
      bindEnqForm(p);
    } else if (det) {
      var p2 = findProduct(det.getAttribute("data-detail"));
      openModal(detailView(p2, det.getAttribute("data-light")==="1"));
    }
  });
  function bindEnqForm(p) {
    var f = document.getElementById("enqForm");
    if (!f) return;
    f.addEventListener("submit", function(e){
      e.preventDefault();
      openModal(thanksHTML(f.name.value, p ? p.name : ""));
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
      observeReveals();
    });
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
      f.addEventListener("submit", function(e){
        e.preventDefault();
        var msg = f.getAttribute("data-success") || "Thank you! We’ll be in touch.";
        var name = f.querySelector('[name="name"]');
        if (name && name.value) msg = msg.replace("{name}", escapeHTML(name.value));
        msg = msg.replace("{name}", "");
        var box = f.parentNode.querySelector(".form-success");
        if (!box) { box = document.createElement("p"); box.className = "form-success"; f.parentNode.appendChild(box); }
        box.innerHTML = msg;
        f.reset();
        f.style.display = "none";
      });
    });
  }

  /* =================================================================
     BOOT
     ================================================================= */
  function boot() {
    var body = document.body;
    var page = body.getAttribute("data-page");

    // inject nav + footer
    var navMount = document.getElementById("site-nav");
    var footMount = document.getElementById("site-footer");
    if (navMount) navMount.innerHTML = navHTML(page);
    if (footMount) footMount.innerHTML = footerHTML();

    initNav();

    if (page === "home") {
      renderSparkles();
      renderCarousel();
    }
    if (page === "lighting") {
      renderGrid("lightGrid", LIGHTING, false);
      renderFilters("lightFilter", LIGHT_CATS, "lightGrid", LIGHTING, false);
      filterFromHash("lightFilter", LIGHTING, "lightGrid", false);
    }
    if (page === "furniture") {
      renderGrid("furnGrid", FURNITURE, true);
      renderFilters("furnFilter", FURN_CATS, "furnGrid", FURNITURE, true);
      filterFromHash("furnFilter", FURNITURE, "furnGrid", true);
    }

    initInlineForms();
    observeReveals();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
