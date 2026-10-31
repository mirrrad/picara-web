/* PÍCARA – prototype app: language, shared header/footer, catalogue rendering, cart drawer. */
(function () {
  'use strict';

  var I18N = window.PICARA_I18N;
  var PRODUCTS = window.PICARA_PRODUCTS;
  var COLLECTIONS = window.PICARA_COLLECTIONS;
  var TYPES = window.PICARA_TYPES;
  var MOTIFS = window.PICARA_MOTIFS;
  var WAYS = window.PICARA_WAYS;
  var LANGS = ['es', 'en', 'de'];

  /* ---------- storage (safe) ---------- */
  function load(key, fallback) {
    try { var v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch (e) { return fallback; }
  }
  function save(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* storage unavailable: keep in memory */ }
  }

  /* ---------- language ---------- */
  function pickLang() {
    var q = new URLSearchParams(location.search).get('lang');
    if (LANGS.indexOf(q) > -1) return q;
    var stored = load('picara.lang', null);
    if (LANGS.indexOf(stored) > -1) return stored;
    var nav = (navigator.language || 'es').slice(0, 2);
    return LANGS.indexOf(nav) > -1 ? nav : 'es';
  }
  var lang = pickLang();
  function t(key) { return (I18N[lang] && I18N[lang][key]) || I18N.es[key] || key; }
  function loc(obj) { return obj ? (obj[lang] || obj.es) : ''; }

  function money(n) {
    var locale = { es: 'es-ES', en: 'en-IE', de: 'de-DE' }[lang];
    return new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
  }

  function applyI18n(root) {
    (root || document).querySelectorAll('[data-i18n]').forEach(function (el) { el.textContent = t(el.dataset.i18n); });
    (root || document).querySelectorAll('[data-i18n-placeholder]').forEach(function (el) { el.placeholder = t(el.dataset.i18nPlaceholder); });
    (root || document).querySelectorAll('[data-i18n-aria]').forEach(function (el) { el.setAttribute('aria-label', t(el.dataset.i18nAria)); });
    document.documentElement.lang = lang;
    document.querySelectorAll('.lang button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.lang === lang)); });
  }

  function setLang(next) {
    lang = next; save('picara.lang', next);
    applyI18n();
    renderPage();
    renderCart();
  }

  /* ---------- shared chrome ---------- */
  function langButtons() {
    return LANGS.map(function (l) { return '<button type="button" data-lang="' + l + '">' + l.toUpperCase() + '</button>'; }).join('');
  }

  function header() {
    return '' +
      '<div class="proto" data-i18n="proto"></div>' +
      '<div class="announce mono" data-i18n="announce"></div>' +
      '<header class="site-header"><nav class="wrap nav" aria-label="Main">' +
        '<div class="nav-links" id="nav-links">' +
          '<a href="shop.html" data-i18n="nav_shop"></a>' +
          '<a href="index.html#colecciones" data-i18n="nav_collections"></a>' +
          '<a href="index.html#formas" data-i18n="nav_ways"></a>' +
          '<a href="about.html" data-i18n="nav_about"></a>' +
          '<div class="lang mobile-lang">' + langButtons() + '</div>' +
        '</div>' +
        '<button type="button" class="icon-btn menu-btn" aria-expanded="false" aria-controls="nav-links" data-i18n-aria="menu">' +
          '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M3 7h18M3 12h18M3 17h18"/></svg></button>' +
        '<a class="wordmark" href="index.html">PÍCARA</a>' +
        '<div class="nav-tools">' +
          '<div class="lang">' + langButtons() + '</div>' +
          '<button type="button" class="icon-btn cart-btn" data-i18n-aria="cart">' +
            '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 8h14l-1 12H6L5 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>' +
            '<span class="cart-count">0</span></button>' +
        '</div>' +
      '</nav></header>';
  }

  function footer() {
    return '' +
      '<footer class="site-footer"><div class="wrap">' +
        '<a class="wordmark" href="index.html">PÍCARA</a>' +
        '<div class="foot-cols">' +
          '<div><a href="#" data-i18n="foot_shipping"></a><a href="#" data-i18n="foot_care"></a><a href="#" data-i18n="foot_size"></a></div>' +
          '<div><a href="#" data-i18n="foot_legal"></a><a href="#" data-i18n="foot_privacy"></a><a href="#" data-i18n="foot_withdrawal"></a></div>' +
          '<div><a href="#">Instagram</a><span class="mono">ES · EN · DE</span><span class="mono" data-i18n="foot_designed"></span></div>' +
        '</div>' +
      '</div></footer>' +
      '<div class="scrim" data-close-cart></div>' +
      '<aside class="drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title" aria-hidden="true">' +
        '<div class="drawer-head"><h2 id="cart-title" data-i18n="cart_title"></h2>' +
          '<button type="button" class="icon-btn" data-close-cart data-i18n-aria="close"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>' +
        '<div class="drawer-body" id="cart-lines"></div>' +
        '<div class="drawer-foot"><div class="subtotal"><span data-i18n="subtotal"></span><span id="cart-subtotal"></span></div>' +
          '<button type="button" class="btn btn-primary" disabled data-i18n="checkout"></button>' +
          '<p class="note" data-i18n="checkout_note"></p></div>' +
      '</aside>';
  }

  /* ---------- catalogue helpers ---------- */
  function byId(id) { return PRODUCTS.filter(function (p) { return p.id === id; })[0]; }
  function coll(id) { return COLLECTIONS.filter(function (c) { return c.id === id; })[0]; }
  function productName(p) { return coll(p.collection).name + ' · ' + loc(TYPES[p.type]); }

  function card(p) {
    return '<a class="card" href="product.html?id=' + p.id + '">' +
      '<div class="media bg-fill">' + MOTIFS[p.collection] + '</div>' +
      '<div class="card-row"><span class="card-name">' + productName(p) + '</span><span>' + money(p.price) + '</span></div>' +
      '<span class="mono muted">' + (p.ways.length > 1 ? p.ways.map(function (w) { return t('way_' + w); }).join(' · ') : t('silver') + ' / ' + t('vermeil')) + '</span>' +
    '</a>';
  }

  function tile(c) {
    return '<a class="tile" href="shop.html?c=' + c.id + '">' +
      '<div class="media ' + c.bg + '">' + MOTIFS[c.id] + '</div>' +
      '<span class="tile-name">' + c.name + '</span>' +
      '<span class="mono muted">' + loc(c.tag) + '</span></a>';
  }

  function wayCard(key) {
    return '<div class="way">' + WAYS[key] + '<h3>' + t('way_' + key) + '</h3><p>' + t('way_' + key + '_d') + '</p></div>';
  }

  /* ---------- page renderers ---------- */
  function renderHome() {
    var ways = document.getElementById('ways-grid');
    if (ways) ways.innerHTML = ['short', 'long', 'bracelet', 'earring'].map(wayCard).join('');
    var tiles = document.getElementById('collections-grid');
    if (tiles) tiles.innerHTML = COLLECTIONS.map(tile).join('');
    var first = document.getElementById('first-grid');
    if (first) first.innerHTML = ['libelula-collar', 'mariquita-colgante', 'escarabajo-anillo', 'mariposa-pendientes'].map(function (id) { return card(byId(id)); }).join('');
  }

  var shopFilter = new URLSearchParams(location.search).get('c') || 'all';
  function renderShop() {
    var bar = document.getElementById('filters');
    var grid = document.getElementById('shop-grid');
    if (!bar || !grid) return;
    var chips = [{ id: 'all', name: t('all') }].concat(COLLECTIONS);
    bar.innerHTML = chips.map(function (c) {
      return '<button type="button" class="chip" data-filter="' + c.id + '" aria-pressed="' + (shopFilter === c.id) + '">' + c.name + '</button>';
    }).join('');
    var list = PRODUCTS.filter(function (p) { return shopFilter === 'all' || p.collection === shopFilter; });
    grid.innerHTML = list.length ? list.map(card).join('') : '<p class="empty">' + t('no_results') + '</p>';
  }

  var pdpState = { finish: 'silver', view: 0 };
  function renderProduct() {
    var root = document.getElementById('pdp');
    if (!root) return;
    var p = byId(new URLSearchParams(location.search).get('id')) || null;
    if (!p) {
      root.innerHTML = '<div class="wrap page-head"><h1>' + t('not_found') + '</h1><a class="btn btn-primary" href="shop.html">' + t('back_shop') + '</a></div>';
      return;
    }
    var c = coll(p.collection);
    document.title = productName(p) + ' — PÍCARA';
    var views = ['main'].concat(p.ways).concat(['detail']).slice(0, 4);
    var current = views[pdpState.view] || 'main';
    var viewLabel = current === 'main' ? '01' : current === 'detail' ? '+' : t('way_' + current);
    var price = p.price + (pdpState.finish === 'vermeil' ? p.vermeilExtra : 0);
    var waysMini = p.ways.length ? '<div class="ways-mini"><span class="mono muted">' + t('ways_label') + '</span><div class="row">' +
      p.ways.map(function (w) { return '<div>' + WAYS[w] + '<span>' + t('way_' + w) + '</span></div>'; }).join('') + '</div></div>' : '';
    var transform = p.ways.length ? '<section class="transform"><div class="wrap section"><div class="section-head"><h2>' + t('transform_a') + ' <span class="italic">' + t('transform_b') + '</span></h2></div>' +
      '<div class="grid">' + p.ways.map(function (w) {
        return '<div><div class="media bg-liquen"><span class="ph">[' + t('way_' + w).toUpperCase() + ']</span>' + WAYS[w] + '</div><h3>' + t('way_' + w) + '</h3><p>' + t('way_' + w + '_d') + '</p></div>';
      }).join('') + '</div></div></section>' : '';

    root.innerHTML =
      '<div class="wrap crumbs mono"><a href="index.html">' + t('home') + '</a> / <a href="shop.html?c=' + c.id + '">' + c.name + '</a> / ' + loc(TYPES[p.type]) + '</div>' +
      '<section class="wrap pdp">' +
        '<div class="pdp-gallery">' +
          '<div class="media main ' + c.bg + '">' + MOTIFS[p.collection] + '<span class="ph">[PHOTO · ' + viewLabel.toUpperCase() + ']</span></div>' +
          '<div class="thumbs">' + views.map(function (v, i) {
            var label = v === 'main' ? '01' : v === 'detail' ? '+' : t('way_' + v);
            return '<button type="button" data-view="' + i + '" aria-pressed="' + (pdpState.view === i) + '" aria-label="' + label + '">' + label + '</button>';
          }).join('') + '</div>' +
        '</div>' +
        '<div class="pdp-info">' +
          '<span class="mono muted">' + c.name.toUpperCase() + '</span>' +
          '<h1>' + c.name + '<br><span class="italic">' + loc(TYPES[p.type]).toLowerCase() + '</span></h1>' +
          '<span class="price">' + money(price) + '</span>' +
          '<p class="desc">' + loc(p.desc) + '</p>' +
          '<fieldset><legend class="mono">' + t('finish') + '</legend><div class="opts">' +
            ['silver', 'vermeil'].map(function (f) {
              return '<button type="button" class="opt" data-finish="' + f + '" aria-pressed="' + (pdpState.finish === f) + '"><span class="dot" style="background:' + (f === 'silver' ? '#C9C9C4' : '#B8955E') + '"></span>' + t(f) + '</button>';
            }).join('') + '</div></fieldset>' +
          '<button type="button" class="btn btn-primary" id="add-to-cart" data-id="' + p.id + '">' + t('add_to_cart') + '</button>' +
          waysMini +
          '<div>' +
            '<details open><summary>' + t('acc_materials') + '</summary><p>' + t('materials_text') + '</p></details>' +
            '<details><summary>' + t('acc_size') + '</summary><p>' + loc(p.size) + '</p></details>' +
            '<details><summary>' + t('acc_care') + '</summary><p>' + t('care_text') + '</p></details>' +
            '<details><summary>' + t('acc_shipping') + '</summary><p>' + t('shipping_text') + '</p></details>' +
          '</div>' +
        '</div>' +
      '</section>' + transform;
  }

  function renderPage() {
    renderHome();
    renderShop();
    renderProduct();
  }

  /* ---------- cart ---------- */
  var cart = load('picara.cart', []);
  function cartKey(id, finish) { return id + '|' + finish; }
  function lineTotal(l) { var p = byId(l.id); return p ? (p.price + (l.finish === 'vermeil' ? p.vermeilExtra : 0)) * l.qty : 0; }

  function addToCart(id, finish) {
    var key = cartKey(id, finish);
    var line = cart.filter(function (l) { return cartKey(l.id, l.finish) === key; })[0];
    if (line) line.qty += 1; else cart.push({ id: id, finish: finish, qty: 1 });
    save('picara.cart', cart); renderCart();
  }

  function renderCart() {
    cart = cart.filter(function (l) { return byId(l.id) && l.qty > 0; });
    var count = cart.reduce(function (n, l) { return n + l.qty; }, 0);
    document.querySelectorAll('.cart-count').forEach(function (el) { el.textContent = count; });
    var body = document.getElementById('cart-lines');
    var sub = document.getElementById('cart-subtotal');
    if (!body) return;
    body.innerHTML = cart.length ? cart.map(function (l, i) {
      var p = byId(l.id);
      return '<div class="line"><div class="media ' + coll(p.collection).bg + '">' + MOTIFS[p.collection] + '</div>' +
        '<div><div>' + productName(p) + '</div><div class="mono muted">' + t(l.finish) + '</div>' +
          '<div class="qty"><button type="button" data-qty="' + i + '" data-d="-1" aria-label="' + t('qty_less') + '">−</button><span>' + l.qty + '</span>' +
          '<button type="button" data-qty="' + i + '" data-d="1" aria-label="' + t('qty_more') + '">+</button></div>' +
          '<div><button type="button" class="remove" data-remove="' + i + '">' + t('remove') + '</button></div></div>' +
        '<div>' + money(lineTotal(l)) + '</div></div>';
    }).join('') : '<p class="empty">' + t('cart_empty') + '</p>';
    sub.textContent = money(cart.reduce(function (s, l) { return s + lineTotal(l); }, 0));
  }

  var lastFocus = null;
  function openCart() {
    lastFocus = document.activeElement;
    document.body.classList.add('cart-open');
    document.querySelector('.drawer').setAttribute('aria-hidden', 'false');
    document.querySelector('.drawer [data-close-cart]').focus();
  }
  function closeCart() {
    document.body.classList.remove('cart-open');
    document.querySelector('.drawer').setAttribute('aria-hidden', 'true');
    if (lastFocus) lastFocus.focus();
  }

  function refocus(sel) { var n = document.querySelector(sel); if (n) n.focus(); }

  /* ---------- events ---------- */
  document.addEventListener('click', function (e) {
    var el = e.target.closest('button, [data-close-cart]');
    if (!el) return;
    if (el.dataset.lang) { setLang(el.dataset.lang); return; }
    if (el.classList.contains('menu-btn')) {
      var links = document.getElementById('nav-links');
      var open = links.classList.toggle('open');
      el.setAttribute('aria-expanded', String(open));
      return;
    }
    if (el.classList.contains('cart-btn')) { openCart(); return; }
    if (el.hasAttribute('data-close-cart')) { closeCart(); return; }
    if (el.dataset.filter) {
      shopFilter = el.dataset.filter;
      var url = new URL(location.href);
      if (shopFilter === 'all') url.searchParams.delete('c'); else url.searchParams.set('c', shopFilter);
      history.replaceState(null, '', url);
      renderShop(); return;
    }
    if (el.dataset.finish) { pdpState.finish = el.dataset.finish; renderProduct(); refocus('[data-finish="' + el.dataset.finish + '"]'); return; }
    if (el.dataset.view) { pdpState.view = Number(el.dataset.view); renderProduct(); refocus('[data-view="' + el.dataset.view + '"]'); return; }
    if (el.id === 'add-to-cart') {
      addToCart(el.dataset.id, pdpState.finish);
      el.textContent = t('added');
      setTimeout(function () { el.textContent = t('add_to_cart'); }, 1400);
      openCart(); return;
    }
    if (el.dataset.qty) {
      var line = cart[Number(el.dataset.qty)];
      line.qty += Number(el.dataset.d);
      save('picara.cart', cart); renderCart(); return;
    }
    if (el.dataset.remove) { cart.splice(Number(el.dataset.remove), 1); save('picara.cart', cart); renderCart(); }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && document.body.classList.contains('cart-open')) closeCart();
  });

  document.addEventListener('submit', function (e) {
    if (!e.target.matches('.wl-form')) return;
    e.preventDefault();
    var input = e.target.querySelector('input[type="email"]');
    var msg = e.target.querySelector('.form-msg');
    var ok = input.checkValidity() && input.value.trim() !== '';
    msg.textContent = t(ok ? 'wl_ok' : 'wl_bad');
    if (ok) {
      /* Prototype only: stores locally. Replace with a Shopify customer form or Klaviyo signup. */
      var list = load('picara.waitlist', []); list.push(input.value.trim()); save('picara.waitlist', list);
      input.value = '';
    }
  });

  /* ---------- boot ---------- */
  document.getElementById('site-header').innerHTML = header();
  document.getElementById('site-footer').innerHTML = footer();
  applyI18n();
  renderPage();
  renderCart();
})();
