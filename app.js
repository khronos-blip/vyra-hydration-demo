(() => {
'use strict';
const flavors={
  "solar": {
    "name": "Solar Grapefruit",
    "accent": "#ed9275",
    "ink": "#a44830",
    "soft": "#f3d2b7",
    "code": "SG–01",
    "profile": "Profile 01 / Citrus",
    "hero": "Bright grapefruit. A dry, lightly saline finish. Made for early miles and the start of something good.",
    "detail": "Bright peel, a clean tart center, and a dry finish. Twenty individual sticks, ready for your next morning loop.",
    "alt": "VYRA Solar Grapefruit carton and coral-accented sticks beside grapefruit on a running track bench",
    "route": "Morning loop",
    "distance": "12.4",
    "metric": "Avg. pace",
    "pace": "5:18",
    "unit": "/km",
    "temp": "24°",
    "duration": "65:43"
  },
  "lime": {
    "name": "Electric Lime",
    "accent": "#d8ee88",
    "ink": "#4e681a",
    "soft": "#dfe5c5",
    "code": "EL–02",
    "profile": "Profile 02 / Green citrus",
    "hero": "Sharp lime. A cool green edge. A pocket-sized ritual for long rides and warm afternoons.",
    "detail": "Tart lime and a green aromatic edge with a clean exit. Twenty individual sticks for the miles between starts.",
    "alt": "VYRA Electric Lime carton and lime-accented sticks on a cycling workbench with fresh limes",
    "route": "Afternoon ride",
    "distance": "33.0",
    "metric": "Avg. speed",
    "pace": "26.4",
    "unit": "km/h",
    "temp": "29°",
    "duration": "1:15:00"
  },
  "berry": {
    "name": "Midnight Berry",
    "accent": "#c8b2dc",
    "ink": "#69517e",
    "soft": "#e2d9ed",
    "code": "MB–03",
    "profile": "Profile 03 / Dark fruit",
    "hero": "Blackberry depth. A bright hibiscus finish. For evening miles and the work you make time for.",
    "detail": "Dark berries, hibiscus, and restrained sweetness. Twenty individual sticks for your evening reset.",
    "alt": "VYRA Midnight Berry carton and violet-accented sticks with blackberries at an indoor track at dusk",
    "route": "Evening track",
    "distance": "6.0",
    "metric": "Avg. pace",
    "pace": "6:00",
    "unit": "/km",
    "temp": "21°",
    "duration": "36:00"
  }
};
const q=id=>document.getElementById(id), root=document.documentElement;
const cart=createDemoCart({overlay:'#overlay',trigger:'#cartOpen',list:'#cartBody',total:'#total',badge:'#count',currency:'USD',noun:'loadout',openClass:'open',overlayClass:'open',bodyClass:'locked'});
let selected='solar';
function select(key) {
  selected=key;const f=flavors[key];document.body.dataset.flavor=key;
  root.style.setProperty('--accent',f.accent);root.style.setProperty('--soft',f.soft);root.style.setProperty('--accent-ink',f.ink);
  setProductPhoto(q('heroImage'),key+'-hero',f.alt);
  setProductPhoto(q('loadImage'),key+'-detail',f.name+' carton and individual sticks in a photographic flat lay');
  q('heroFlavor').textContent=f.name+'.';q('heroCopy').textContent=f.hero;
  q('heroCta').textContent='Choose '+f.name+' ↘';
  q('profile').textContent=f.profile;q('mixCode').textContent=f.code;q('stamp').textContent=f.name+' / '+f.code;
  q('loadCopy').textContent=f.detail;q('packName').textContent=f.name;q('add').textContent='Add '+f.name+' ↗';
  document.querySelectorAll('button[data-flavor]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.flavor===key)));
  const route=document.querySelector('.route');route.querySelector('.label').textContent='Example session / '+f.route;
  route.querySelector('.value').innerHTML=f.distance+' <small>km</small>';
  const datums=document.querySelectorAll('.datum');
  datums[0].querySelector('.label').textContent=f.metric;
  datums[0].querySelector('.value').innerHTML=f.pace+' <small>'+f.unit+'</small>';
  datums[1].querySelector('.value').innerHTML=f.temp+' <small>C</small>';
  datums[2].querySelector('.value').textContent=f.duration;
}
document.querySelectorAll('button[data-flavor]').forEach(b=>b.addEventListener('click',()=>select(b.dataset.flavor)));
q('heroCta').addEventListener('click',()=>{q('loadout').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});});
q('add').addEventListener('click',()=>cart.add({id:selected,name:flavors[selected].name,note:'1 box · 20 sticks × 7 g',price:32,image:'assets/'+selected+'-hero-640.webp'}));
const menu=q('menubtn'),links=q('navlinks');
function closeMenu(){links.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open menu');}
menu.addEventListener('click',()=>{const open=links.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close menu':'Open menu');});
links.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&links.classList.contains('open')){closeMenu();menu.focus();}});
document.addEventListener('click',e=>{if(!links.contains(e.target)&&!menu.contains(e.target))closeMenu();});
select('solar');
})();
