/* Detail-page commerce: reuse the same validated session bag as the storefront. */
(() => {
 const brand=document.documentElement.dataset.brand;
 const header=document.querySelector('.site-nav')||document.querySelector('.topbar .nav');
 header.classList.add('detail-header');
 const trigger=document.createElement('button');
 trigger.type='button';trigger.id='detail-bag';trigger.className='detail-bag';
 trigger.setAttribute('aria-label','Open bag');
 trigger.innerHTML='<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 7h14l1 14H4L5 7Z"/><path d="M8 8V6a4 4 0 0 1 8 0v2"/></svg><span id="detail-count">0</span>';
 header.append(trigger);
 const ui=document.createElement('template');
 ui.innerHTML='<div class="detail-overlay" id="detail-overlay"></div><aside class="detail-cart" id="cart" role="dialog" aria-modal="true" aria-labelledby="detail-cart-title" aria-hidden="true"><div class="cart-head"><h2 id="detail-cart-title">Your bag</h2><button type="button" aria-label="Close bag">Close</button></div><div id="detail-lines" class="detail-lines"></div><div class="cart-foot"><div class="detail-total"><span>Subtotal</span><strong id="detail-total">0</strong></div><button id="checkout" type="button">Demo checkout</button><p>No payment or personal details are collected.</p></div></aside><div id="toast" class="detail-toast" role="status" aria-live="polite"></div>';
 document.body.append(ui.content);
 let bag;
 function init(){return bag||(bag=createDemoCart({overlay:'#detail-overlay',trigger:'#detail-bag',list:'#detail-lines',total:'#detail-total',badge:'#detail-count',currency:brand==='lumera'?'EUR':'USD',noun:'bag',openClass:'is-open',overlayClass:'is-open',bodyClass:'detail-locked'}));}
 window.setDetailProduct=product=>{
   init();
   const add=document.getElementById('product-add');
   const button=document.createElement('button');button.type='button';button.id=add.id;button.className=add.className;button.textContent=add.textContent.replace(' ↗','');
   add.replaceWith(button);button.addEventListener('click',()=>bag.add(product));
   const main=document.getElementById('main'),crumb=document.createElement('nav');
   crumb.className='detail-crumb '+(brand==='vyra'?'wrap':'shell');crumb.setAttribute('aria-label','Breadcrumb');
   const home=document.createElement('a');home.href='index.html';home.textContent='Home';
   const current=document.createElement('span');current.textContent=product.name;current.setAttribute('aria-current','page');
   crumb.append(home,document.createTextNode(' / '),current);main.prepend(crumb);
   const options=document.createElement('nav');options.className='detail-options';options.setAttribute('aria-label',brand==='lumera'?'Choose your edition':'Choose your flavor');
   for(const related of document.querySelectorAll('[data-related]')){
     const a=document.createElement('a');a.href=related.getAttribute('href');a.textContent=related.textContent.replace('↗','').trim();
     if(related.getAttribute('aria-current')==='page')a.setAttribute('aria-current','page');
     options.append(a);
   }
   document.getElementById('product-description').after(options);
 };
 document.addEventListener('DOMContentLoaded',init,{once:true});
})();
