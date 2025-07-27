new Swiper(".swiper",{loop:!0,pagination:{el:".main-slider__pagination"},navigation:{prevEl:".main-slider__btn-prev",nextEl:".main-slider__btn-next"}});function x(t){return`
    <div class="products__item" data-id="${t.id}">
      <div class="products__item-img-wrapper"><img src="${t.image}" alt="${t.title}" class="products__item-img"></div>
      <h2 class="products__item-title">${t.title}</h2>
      <div class="products__item-bottom">
        <div class="products__item-price"><span>${t.price}</span> ₽</div>
        <button class="products__item-btn" data-id="${t.id}">
          <svg class="products__item-btn-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 4.16663V15.8333" stroke="#1F2020" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round" />
            <path d="M4.16699 10H15.8337" stroke="#1F2020" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  `}async function w(){try{const t=await fetch("https://687a20daabb83744b7eb8e3f.mockapi.io/products");if(!t.ok)throw new Error("Ошибка загрузки данных");return await t.json()}catch(t){console.error("Ошибка:",t),document.querySelector(".products__box").innerHTML=`
      <div class="error-message">Произошла ошибка при загрузке товаров</div>
    `}}async function m(){const t=await w(),e=document.querySelector(".products__box"),o=document.querySelector(".products__top-count span"),r={new:document.querySelector(".filter__item_new input").checked,available:document.querySelector(".filter__item_available input").checked,contractual:document.querySelector(".filter__item_contractual input").checked,exclusive:document.querySelector(".filter__item_exclusive input").checked,sale:document.querySelector(".filter__item_sale input").checked};let i=t.filter(a=>Object.entries(r).every(([h,k])=>!k||a[h]));const d=document.querySelector(".products__top-sort-option.active"),c=d?d.dataset.sort:"price-desc";v(d),i=S(i,c),e.innerHTML=i.map(x).join(""),o.textContent=i.length,M()}function S(t,e){switch(e){case"price-asc":return[...t].sort((o,r)=>o.price-r.price);case"price-desc":return[...t].sort((o,r)=>r.price-o.price);case"popular":return[...t].sort((o,r)=>r.popularity-o.popularity);case"new":return[...t].sort((o,r)=>new Date(r.dateAdded)-new Date(o.dateAdded));default:return t}}function v(t){const e=document.querySelector(".products__top-sort-current span");t&&e&&(e.innerHTML=t.textContent)}document.querySelectorAll(".products__top-sort-option").forEach(t=>{t.addEventListener("click",function(){document.querySelectorAll(".products__top-sort-option").forEach(e=>{e.classList.remove("active")}),this.classList.add("active"),v(this),m()})});document.addEventListener("DOMContentLoaded",()=>{if(!document.querySelector(".products__top-sort-option.active")){const t=document.querySelector('.products__top-sort-option[data-sort="price-desc"]');t&&(t.classList.add("active"),v(t))}m()});const q=document.querySelectorAll(".filter__item input");q.forEach(t=>{t.addEventListener("click",()=>{m()})});const L=document.querySelector(".header__control-cart"),u=document.querySelector(".cart"),E=document.querySelector(".cart__btn-close");L.addEventListener("click",()=>{u.classList.toggle("active"),document.body.style.overflow="hidden",s.classList.toggle("active")});E.addEventListener("click",()=>{u.classList.toggle("active"),document.body.style.overflow="",s.classList.toggle("active")});const n=[];function C(t){return{id:t.dataset.id,title:t.querySelector(".products__item-title").textContent,price:parseInt(t.querySelector(".products__item-price span").textContent),image:t.querySelector(".products__item-img").src}}function $(t){const e=n.find(o=>o.id===t.id);e?e.quantity+=1:n.push({...t,quantity:1}),p(),_()}function M(){document.querySelectorAll(".products__item").forEach(e=>{const o=e.querySelector(".products__item-btn");o.dataset.id,o.addEventListener("click",()=>{const r=C(e);$(r)})})}function p(){const t=document.querySelector(".cart__main-box"),e=document.querySelector(".cart__bottom-price"),o=document.querySelector(".cart__main-top-count"),r=document.querySelector(".cart__main-top-btn-reset");if(n.length===0){t.innerHTML='<div class="cart__empty">Корзина пуста</div>',e.textContent="0 ₽",o.textContent="0 товаров";return}t.innerHTML=n.map((c,a)=>`
    <div class="cart__main-box-row" data-id="${c.id}">
      <div class="cart__main-box-col">
        <img src="${c.image}" alt="${c.title}" class="cart__main-box-img">
      </div>
      <div class="cart__main-box-col">
        <h2 class="cart__main-box-title">${c.title}</h2>
        <div class="cart__main-box-price">${c.price} ₽</div>
      </div>
      <div class="cart__main-box-col">
        <div class="cart__main-box-controls">
          <button class="cart__main-box-controls-btn cart__main-box-controls-btn_minus" data-id="${c.id}">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="2" viewBox="0 0 12 2" fill="none">
              <path d="M1.3335 1H10.6668" stroke="black" stroke-width="1.4" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </button>
          <span class="cart__main-box-controls-count">${c.quantity}</span>
          <button class="cart__main-box-controls-btn cart__main-box-controls-btn_plus" data-id="${c.id}">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 3.33325V12.6666" stroke="black" stroke-width="1.4" stroke-linecap="round"
                stroke-linejoin="round" />
              <path d="M3.3335 8H12.6668" stroke="black" stroke-width="1.4" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </button>
        </div>
      </div>
      <div class="cart__main-box-col">
        <button class="cart__main-box-btn-close" data-id="${c.id}">
          <svg class="cart__main-box-btn-close-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
            viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18" stroke="#1F2020" stroke-width="1.4" stroke-linecap="round"
              stroke-linejoin="round" />
            <path d="M6 6L18 18" stroke="#1F2020" stroke-width="1.4" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </button>
      </div>
    </div>
    `).join("");const i=n.reduce((c,a)=>c+a.price*a.quantity,0);e.textContent=`${i.toLocaleString()} ₽`;const d=n.reduce((c,a)=>c+a.quantity,0);o.textContent=`${d} ${B(d,"товар","товара","товаров")}`,T(),r.addEventListener("click",f)}function T(){document.querySelectorAll(".cart__main-box-controls-btn_plus").forEach(t=>{t.addEventListener("click",e=>{const o=e.currentTarget.dataset.id;b(o,1)})}),document.querySelectorAll(".cart__main-box-controls-btn_minus").forEach(t=>{t.addEventListener("click",e=>{const o=e.currentTarget.dataset.id;b(o,-1)})}),document.querySelectorAll(".cart__main-box-btn-close").forEach(t=>{t.addEventListener("click",e=>{const o=e.currentTarget.dataset.id;I(o)})})}function b(t,e){const o=n.findIndex(r=>r.id===t);o!==-1&&(n[o].quantity+=e,n[o].quantity<=0&&n.splice(o,1),p(),_())}function I(t){const e=n.findIndex(o=>o.id===t);e!==-1&&(n.splice(e,1),p(),_())}function f(){n.length=0,p(),_()}function _(){const t=document.querySelector(".header__control-cart"),e=n.reduce((o,r)=>o+r.quantity,0);e>0?(t.textContent=e,t.style.display="flex"):t.style.display="none"}function B(t,e,o,r){let i=Math.abs(t);return i%=100,i>=5&&i<=20?r:(i%=10,i===1?e:i>=2&&i<=4?o:r)}document.querySelector(".cart__bottom-btn-order").addEventListener("click",()=>{n.length>0?(alert("Заказ оформлен!"),f(),u.classList.remove("active"),document.body.style.overflow="",s.classList.remove("active")):alert("Корзина пуста!")});const s=document.querySelector(".overlay"),P=document.querySelector(".products__top-sort-current"),l=document.querySelector(".products__top-sort-popup"),j=document.querySelector(".header__nav-mobile-btn"),y=document.querySelector(".header__nav"),A=document.querySelector(".products__top-filters-btn"),g=document.querySelector(".filter");P.addEventListener("click",function(){l.classList.toggle("active"),s.classList.toggle("active")});l.querySelectorAll(".products__top-sort-option").forEach(t=>{t.addEventListener("click",()=>{l.classList.toggle("active"),s.classList.remove("active")})});j.addEventListener("click",function(){y.classList.toggle("active"),s.classList.toggle("active")});s.addEventListener("click",function(){y.classList.remove("active"),s.classList.remove("active"),l.classList.remove("active"),u.classList.remove("active"),document.body.style.overflow="",g.classList.remove("active")});A.addEventListener("click",function(){g.classList.toggle("active"),s.classList.toggle("active")});
