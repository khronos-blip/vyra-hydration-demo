/* Shared, dependency-free demo cart. All values are conceptual; no network writes. */
// Reveal the mobile purchase bar only after the hero, never over its first impression.
const quickPurchase = document.querySelector('.mobile-purchase');
document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', () => {
  const target = document.getElementById(link.getAttribute('href').slice(1));
  const disclosure = target?.matches('details') ? target : target?.closest('details');
  if (disclosure) disclosure.open = true;
}));
if (quickPurchase) {
  quickPurchase.inert = true;
  new IntersectionObserver(entries => {
    const visible = entries[0].boundingClientRect.bottom < 0;
    quickPurchase.classList.toggle('is-visible', visible);
    quickPurchase.inert = !visible || document.querySelector('#cart').getAttribute('aria-hidden') === 'false';
  }).observe(document.querySelector('.hero'));
}
window.createDemoCart = function(config) {
  const $ = s => document.querySelector(s);
  const drawer = $('#cart'), overlay = $(config.overlay), trigger = $(config.trigger);
  const close = drawer.querySelector('[aria-label^="Close"]');
  const list = $(config.list), total = $(config.total), badge = $(config.badge);
  const checkout = $('#checkout'), foot = drawer.querySelector('.cart-foot');
  const lines = new Map();
  let returnFocus = null, completed = false, timer;
  const money = n => new Intl.NumberFormat('en', {style:'currency',currency:config.currency,maximumFractionDigits:0}).format(n);
  function announce(message) {
    const toast = $('#toast'); clearTimeout(timer);
    toast.textContent = message; toast.classList.add('show');
    timer = setTimeout(() => toast.classList.remove('show'), 3500);
  }
  function isolate(on) {
    for (const node of document.body.children) {
      if ([drawer, overlay, $('#toast')].includes(node) || /SCRIPT|LINK/.test(node.tagName)) continue;
      if (on) { node.dataset.wasInert = String(node.inert); node.inert = true; }
      else if ('wasInert' in node.dataset) { node.inert = node.dataset.wasInert === 'true'; delete node.dataset.wasInert; }
    }
  }
  function render() {
    const rows = [...lines.values()], count = rows.reduce((s,x)=>s+x.quantity,0);
    badge.textContent = count;
    trigger.setAttribute('aria-label', 'Open ' + config.noun + ', ' + count + ' packs');
    checkout.disabled = !count;
    checkout.setAttribute('aria-disabled', String(!count));
    total.textContent = money(rows.reduce((s,x)=>s+x.price*x.quantity,0));
    foot.hidden = completed;
    if (completed) {
      list.innerHTML = '<div class="demo-complete"><span aria-hidden="true">✓</span><h3>Demo complete.</h3><p>No order was placed. No payment or personal information was collected.</p><button class="demo-return" type="button">Continue exploring</button></div>';
      list.querySelector('button').addEventListener('click', hide);
      return;
    }
    list.innerHTML = rows.length ? rows.map(x=>`<article class="shop-line" data-line="${x.id}">
      <img src="${x.image}" alt="" width="88" height="88">
      <div><h3>${x.name}</h3><p>${x.note}</p><strong>${money(x.price*x.quantity)}</strong>
        <div class="shop-quantity" aria-label="Quantity for ${x.name}">
          <button type="button" data-action="minus" data-id="${x.id}" aria-label="Decrease ${x.name} quantity">−</button>
          <output aria-live="polite">${x.quantity}</output>
          <button type="button" data-action="plus" data-id="${x.id}" aria-label="Increase ${x.name} quantity">+</button>
          <button class="shop-remove" type="button" data-action="remove" data-id="${x.id}" aria-label="Remove ${x.name}">Remove</button>
        </div>
      </div></article>`).join('') : '<p class="shop-empty">Your ' + config.noun + ' is empty.<br>Choose a presentation to begin.</p>';
  }
  function show() {
    if (completed) { completed=false; render(); }
    returnFocus=document.activeElement;
    drawer.inert=false; drawer.setAttribute('aria-hidden','false');
    drawer.classList.add(config.openClass); overlay.classList.add(config.overlayClass);
    document.body.classList.add(config.bodyClass);
    trigger.setAttribute('aria-expanded','true'); isolate(true); close.focus();
  }
  function hide() {
    drawer.classList.remove(config.openClass); overlay.classList.remove(config.overlayClass);
    document.body.classList.remove(config.bodyClass); isolate(false);
    if (quickPurchase) quickPurchase.inert = !quickPurchase.classList.contains('is-visible');
    trigger.setAttribute('aria-expanded','false');
    if (returnFocus?.isConnected) returnFocus.focus(); else trigger.focus();
    drawer.inert=true; drawer.setAttribute('aria-hidden','true');
  }
  list.addEventListener('click', e => {
    const b=e.target.closest('[data-action]'); if(!b) return;
    const x=lines.get(b.dataset.id); if(!x) return;
    const order=[...lines.keys()], index=order.indexOf(x.id);
    if(b.dataset.action==='remove') lines.delete(x.id);
    else { x.quantity+=b.dataset.action==='plus'?1:-1; if(x.quantity<=0) lines.delete(x.id); }
    render();
    const candidates=[...list.querySelectorAll('[data-action]')];
    const replacement=candidates.find(el=>el.dataset.id===x.id&&el.dataset.action===b.dataset.action)
      || list.querySelectorAll('[data-action="plus"]')[Math.min(index,lines.size-1)] || close;
    replacement.focus(); announce('Updated ' + config.noun);
  });
  checkout.addEventListener('click', () => {
    if(!lines.size) return;
    lines.clear(); completed=true; render(); list.querySelector('button').focus();
  });
  document.addEventListener('keydown', e => {
    if(drawer.inert) return;
    if(e.key==='Escape'){e.preventDefault();hide();return;}
    if(e.key!=='Tab')return;
    const f=[...drawer.querySelectorAll('button:not([disabled]),a[href],[tabindex="0"]')].filter(x=>x.getClientRects().length);
    if(!f.length)return;
    if(e.shiftKey&&document.activeElement===f[0]){e.preventDefault();f.at(-1).focus();}
    else if(!e.shiftKey&&document.activeElement===f.at(-1)){e.preventDefault();f[0].focus();}
  });
  trigger.setAttribute('aria-controls','cart'); trigger.setAttribute('aria-expanded','false');
  trigger.addEventListener('click',show); close.addEventListener('click',hide); overlay.addEventListener('click',hide);
  drawer.inert=true; render();
  return {add(product) { completed=false; const old=lines.get(product.id); old ? old.quantity++ : lines.set(product.id,{...product,quantity:1}); render();show();announce(product.name+' added'); }};
};
window.setProductPhoto = function(img, name, alt) {
  img.srcset = 'assets/'+name+'-640.webp 640w, assets/'+name+'.webp 1254w';
  img.src = 'assets/'+name+'.webp'; img.alt = alt;
};
