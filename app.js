(() => {
'use strict';
const flavors={solar:{name:'Solar Grapefruit',accent:'#ed9275'},lime:{name:'Electric Lime',accent:'#d8ee88'},berry:{name:'Midnight Berry',accent:'#c8b2dc'}};
const q=id=>document.getElementById(id);
const cart=createDemoCart({overlay:'#overlay',trigger:'#cartOpen',list:'#cartBody',total:'#total',badge:'#count',currency:'USD',noun:'bag',openClass:'open',overlayClass:'open',bodyClass:'locked'});
let selected='solar';
function add(key=selected) {
  selected=key;
  const f=flavors[key];
  q('quick-name').textContent=f.name;
  document.documentElement.style.setProperty('--accent',f.accent);
  cart.add({id:key,name:f.name,note:'1 box · 20 sticks × 7 g',price:32,image:'assets/vyra-'+key+'-640.webp'});
}
q('quick-add').addEventListener('click',()=>add());
document.querySelectorAll('[data-product]').forEach(b=>b.addEventListener('click',()=>add(b.dataset.product)));
const menu=q('menubtn'),links=q('navlinks');
function closeMenu(){links.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open menu');}
menu.addEventListener('click',()=>{const open=links.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close menu':'Open menu');});
links.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&links.classList.contains('open')){closeMenu();menu.focus();}});
document.addEventListener('click',e=>{if(!links.contains(e.target)&&!menu.contains(e.target))closeMenu();});
})();
