(() => {
  const products = {
    solar: {name:'Solar Grapefruit',tag:'01 / Bright & dry',title:'Solar<br>Grapefruit.',lead:'A crisp grapefruit finish for the miles ahead.',description:'Citrus with a dry edge. One easy-to-carry stick mixes into your bottle, wherever the day takes you.',image:'vyra-solar',alt:'Solar Grapefruit box and sticks on a running track',accent:'#f1b29b'},
    lime: {name:'Electric Lime',tag:'02 / Fresh & tart',title:'Electric<br>Lime.',lead:'Tart lime with a fresh green edge.',description:'A bright citrus profile for the long way home. The same stick format, ready for a quick mix.',image:'vyra-lime',alt:'Electric Lime stick beside a cyclist bag',accent:'#dce6ac'},
    berry: {name:'Midnight Berry',tag:'03 / Dark & crisp',title:'Midnight<br>Berry.',lead:'Dark berries with a bright hibiscus finish.',description:'The deeper fruit profile in the VYRA range. A compact stick for an evening reset.',image:'vyra-berry',alt:'Midnight Berry open box and individual sticks',accent:'#ddd0e8'}
  };
  const key = new URLSearchParams(location.search).get('flavor');
  const selected = Object.hasOwn(products,key) ? key : 'solar';
  const product = products[selected];
  document.title = product.name + ' — VYRA';
  document.documentElement.style.setProperty('--accent',product.accent);
  document.getElementById('product-tag').textContent = product.tag;
  document.getElementById('product-title').innerHTML = product.title;
  document.getElementById('product-lead').textContent = product.lead;
  document.getElementById('product-description').textContent = product.description;
  const img = document.getElementById('product-image');
  img.src = 'assets/'+product.image+'.webp';
  img.srcset = 'assets/'+product.image+'-640.webp 640w, assets/'+product.image+'.webp 1122w';
  img.sizes = '(max-width:780px) 100vw, 52vw';
  img.alt = product.alt;
  document.getElementById('product-add').href = 'index.html?add='+selected+'#shop';
  document.querySelector('[data-related="'+selected+'"]').setAttribute('aria-current','page');
})();
