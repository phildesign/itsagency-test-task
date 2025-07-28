new Swiper(".swiper",{loop:!0,pagination:{el:".main-slider__pagination"},navigation:{prevEl:".main-slider__btn-prev",nextEl:".main-slider__btn-next"}});function x(t){return`
    <div class="products__item" data-id="${t.id}">
      <div class="products__item-img-wrapper"><img src="${t.image}" alt="${t.title}" class="products__item-img"></div>
      <h2 class="products__item-title">${t.title}</h2>
      <div class="products__item-bottom">
        <div class="products__item-price"><span>${t.price}</span> ₽</div>
        <button class="products__item-btn" data-id="${t.id}">
          <svg class="products__item-btn-icon products__item-btn-icon-plus" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 4.16663V15.8333" stroke="#1F2020" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M4.16699 10H15.8337" stroke="#1F2020" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <svg class="products__item-btn-icon products__item-btn-icon-check" style="display: none;" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M16.6667 5L7.50001 14.1667L3.33334 10" stroke="#1F2020" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  `}async function S(){try{const t=await fetch("https://687a20daabb83744b7eb8e3f.mockapi.io/products");if(!t.ok)throw new Error("Ошибка загрузки данных");return await t.json()}catch(t){console.error("Ошибка:",t),document.querySelector(".products__box").innerHTML='<div class="error-message">Произошла ошибка при загрузке товаров</div>'}}function l(){document.querySelectorAll(".products__item").forEach(e=>{const o=e.dataset.id,c=e.querySelector(".products__item-btn"),r=c.querySelector(".products__item-btn-icon-plus"),i=c.querySelector(".products__item-btn-icon-check");s.some(d=>d.id===o)?(r.style.display="none",i.style.display="block"):(r.style.display="block",i.style.display="none")})}async function v(){const t=await S(),e=document.querySelector(".products__box"),o=document.querySelector(".products__top-count span"),c={new:document.querySelector(".filter__item_new input").checked,available:document.querySelector(".filter__item_available input").checked,contractual:document.querySelector(".filter__item_contractual input").checked,exclusive:document.querySelector(".filter__item_exclusive input").checked,sale:document.querySelector(".filter__item_sale input").checked};let r=t.filter(d=>Object.entries(c).every(([k,w])=>!w||d[k]));const i=document.querySelector(".products__top-sort-option.active"),n=i?i.dataset.sort:"price-desc";y(i),r=q(r,n),e.innerHTML=r.map(x).join(""),o.textContent=r.length,I(),l()}function q(t,e){switch(e){case"price-asc":return[...t].sort((o,c)=>o.price-c.price);case"price-desc":return[...t].sort((o,c)=>c.price-o.price);case"popular":return[...t].sort((o,c)=>c.popularity-o.popularity);case"new":return[...t].sort((o,c)=>new Date(c.dateAdded)-new Date(o.dateAdded));default:return t}}function y(t){const e=document.querySelector(".products__top-sort-current span");t&&e&&(e.innerHTML=t.textContent)}document.querySelectorAll(".products__top-sort-option").forEach(t=>{t.addEventListener("click",function(){document.querySelectorAll(".products__top-sort-option").forEach(e=>e.classList.remove("active")),this.classList.add("active"),y(this),v()})});document.addEventListener("DOMContentLoaded",()=>{if(!document.querySelector(".products__top-sort-option.active")){const t=document.querySelector('.products__top-sort-option[data-sort="price-desc"]');t&&(t.classList.add("active"),y(t))}v()});const L=document.querySelectorAll(".filter__item input");L.forEach(t=>{t.addEventListener("click",()=>v())});const s=[];function E(t){return{id:t.dataset.id,title:t.querySelector(".products__item-title").textContent,price:parseInt(t.querySelector(".products__item-price span").textContent),image:t.querySelector(".products__item-img").src}}function C(t){const e=s.find(o=>o.id===t.id);e?e.quantity+=1:s.push({...t,quantity:1}),p(),_(),l()}function I(){document.querySelectorAll(".products__item").forEach(e=>{const o=e.querySelector(".products__item-btn");o.dataset.id,o.addEventListener("click",()=>{const c=E(e);C(c)})})}function p(){const t=document.querySelector(".cart__main-box"),e=document.querySelector(".cart__bottom-price"),o=document.querySelector(".cart__main-top-count"),c=document.querySelector(".cart__main-top-btn-reset");if(s.length===0){t.innerHTML='<div class="cart__empty">Корзина пуста</div>',e.textContent="0 ₽",o.textContent="0 товаров";return}t.innerHTML=s.map(n=>`
    <div class="cart__main-box-row" data-id="${n.id}">
      <div class="cart__main-box-col">
        <img src="${n.image}" alt="${n.title}" class="cart__main-box-img">
      </div>
      <div class="cart__main-box-col">
        <h2 class="cart__main-box-title">${n.title}</h2>
        <div class="cart__main-box-price">${n.price} ₽</div>
      </div>
      <div class="cart__main-box-col">
        <div class="cart__main-box-controls">
          <button class="cart__main-box-controls-btn cart__main-box-controls-btn_minus" data-id="${n.id}">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="2" viewBox="0 0 12 2" fill="none">
              <path d="M1.3335 1H10.6668" stroke="black" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
          <span class="cart__main-box-controls-count">${n.quantity}</span>
          <button class="cart__main-box-controls-btn cart__main-box-controls-btn_plus" data-id="${n.id}">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 3.33325V12.6666" stroke="black" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M3.3335 8H12.6668" stroke="black" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>
      </div>
      <div class="cart__main-box-col">
        <button class="cart__main-box-btn-close" data-id="${n.id}">
          <svg class="cart__main-box-btn-close-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18" stroke="#1F2020" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M6 6L18 18" stroke="#1F2020" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>
    </div>
    `).join("");const r=s.reduce((n,d)=>n+d.price*d.quantity,0);e.textContent=`${r.toLocaleString()} ₽`;const i=s.reduce((n,d)=>n+d.quantity,0);o.textContent=`${i} ${B(i,"товар","товара","товаров")}`,M(),c.addEventListener("click",h)}function M(){document.querySelectorAll(".cart__main-box-controls-btn_plus").forEach(t=>{t.addEventListener("click",e=>{const o=e.currentTarget.dataset.id;b(o,1)})}),document.querySelectorAll(".cart__main-box-controls-btn_minus").forEach(t=>{t.addEventListener("click",e=>{const o=e.currentTarget.dataset.id;b(o,-1)})}),document.querySelectorAll(".cart__main-box-btn-close").forEach(t=>{t.addEventListener("click",e=>{const o=e.currentTarget.dataset.id;$(o)})})}function b(t,e){const o=s.findIndex(c=>c.id===t);o!==-1&&(s[o].quantity+=e,s[o].quantity<=0&&s.splice(o,1),p(),_(),l())}function $(t){const e=s.findIndex(o=>o.id===t);e!==-1&&(s.splice(e,1),p(),_(),l())}function h(){s.length=0,p(),_(),l()}function _(){const t=document.querySelector(".header__control-cart"),e=s.reduce((o,c)=>o+c.quantity,0);e>0?(t.textContent=e,t.style.display="flex"):t.style.display="none"}function B(t,e,o,c){let r=Math.abs(t);return r%=100,r>=5&&r<=20?c:(r%=10,r===1?e:r>=2&&r<=4?o:c)}const T=document.querySelector(".header__control-cart"),m=document.querySelector(".cart"),P=document.querySelector(".cart__btn-close"),a=document.querySelector(".overlay"),j=document.querySelector(".products__top-sort-current"),u=document.querySelector(".products__top-sort-popup"),A=document.querySelector(".header__nav-mobile-btn"),f=document.querySelector(".header__nav"),H=document.querySelector(".products__top-filters-btn"),g=document.querySelector(".filter");T.addEventListener("click",()=>{m.classList.toggle("active"),document.body.style.overflow="hidden",a.classList.toggle("active")});P.addEventListener("click",()=>{m.classList.toggle("active"),document.body.style.overflow="",a.classList.toggle("active")});document.querySelector(".cart__bottom-btn-order").addEventListener("click",()=>{s.length>0?(alert("Заказ оформлен!"),h(),m.classList.remove("active"),document.body.style.overflow="",a.classList.remove("active")):alert("Корзина пуста!")});j.addEventListener("click",function(){u.classList.toggle("active"),a.classList.toggle("active")});u.querySelectorAll(".products__top-sort-option").forEach(t=>{t.addEventListener("click",()=>{u.classList.toggle("active"),a.classList.remove("active")})});A.addEventListener("click",function(){f.classList.toggle("active"),a.classList.toggle("active")});a.addEventListener("click",function(){f.classList.remove("active"),a.classList.remove("active"),u.classList.remove("active"),m.classList.remove("active"),document.body.style.overflow="",g.classList.remove("active")});H.addEventListener("click",function(){g.classList.toggle("active"),a.classList.toggle("active")});
