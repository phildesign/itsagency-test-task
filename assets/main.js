(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))c(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&c(n)}).observe(document,{childList:!0,subtree:!0});function o(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function c(r){if(r.ep)return;r.ep=!0;const i=o(r);fetch(r.href,i)}})();new Swiper(".swiper",{loop:!0,pagination:{el:".main-slider__pagination"},navigation:{prevEl:".main-slider__btn-prev",nextEl:".main-slider__btn-next"}});function w(t){return`
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
  `}async function L(){try{const t=await fetch("https://687a20daabb83744b7eb8e3f.mockapi.io/products");if(!t.ok)throw new Error("Ошибка загрузки данных");return await t.json()}catch(t){console.error("Ошибка:",t),document.querySelector(".products__box").innerHTML=`
      <div class="error-message">Произошла ошибка при загрузке товаров</div>
    `}}async function m(){const t=await L(),e=document.querySelector(".products__box"),o=document.querySelector(".products__top-count span"),c={new:document.querySelector(".filter__item_new input").checked,available:document.querySelector(".filter__item_available input").checked,contractual:document.querySelector(".filter__item_contractual input").checked,exclusive:document.querySelector(".filter__item_exclusive input").checked,sale:document.querySelector(".filter__item_sale input").checked};let r=t.filter(l=>Object.entries(c).every(([h,x])=>!x||l[h]));const i=document.querySelector(".products__top-sort-option.active"),n=i?i.dataset.sort:"price-desc";v(i),r=S(r,n),e.innerHTML=r.map(w).join(""),o.textContent=r.length,$()}function S(t,e){switch(e){case"price-asc":return[...t].sort((o,c)=>o.price-c.price);case"price-desc":return[...t].sort((o,c)=>c.price-o.price);case"popular":return[...t].sort((o,c)=>c.popularity-o.popularity);case"new":return[...t].sort((o,c)=>new Date(c.dateAdded)-new Date(o.dateAdded));default:return t}}function v(t){const e=document.querySelector(".products__top-sort-current span");t&&e&&(e.innerHTML=t.textContent)}document.querySelectorAll(".products__top-sort-option").forEach(t=>{t.addEventListener("click",function(){document.querySelectorAll(".products__top-sort-option").forEach(e=>{e.classList.remove("active")}),this.classList.add("active"),v(this),m()})});document.addEventListener("DOMContentLoaded",()=>{if(!document.querySelector(".products__top-sort-option.active")){const t=document.querySelector('.products__top-sort-option[data-sort="price-desc"]');t&&(t.classList.add("active"),v(t))}m()});const q=document.querySelectorAll(".filter__item input");q.forEach(t=>{t.addEventListener("click",()=>{m()})});const k=document.querySelector(".header__control-cart"),u=document.querySelector(".cart"),E=document.querySelector(".cart__btn-close");k.addEventListener("click",()=>{u.classList.toggle("active"),document.body.style.overflow="hidden",a.classList.toggle("active")});E.addEventListener("click",()=>{u.classList.toggle("active"),document.body.style.overflow="",a.classList.toggle("active")});const s=[];function C(t){return{id:t.dataset.id,title:t.querySelector(".products__item-title").textContent,price:parseInt(t.querySelector(".products__item-price span").textContent),image:t.querySelector(".products__item-img").src}}function M(t){const e=s.find(o=>o.id===t.id);e?e.quantity+=1:s.push({...t,quantity:1}),p(),_()}function $(){document.querySelectorAll(".products__item").forEach(e=>{const o=e.querySelector(".products__item-btn");o.dataset.id,o.addEventListener("click",()=>{const c=C(e);M(c)})})}function p(){const t=document.querySelector(".cart__main-box"),e=document.querySelector(".cart__bottom-price"),o=document.querySelector(".cart__main-top-count"),c=document.querySelector(".cart__main-top-btn-reset");if(s.length===0){t.innerHTML='<div class="cart__empty">Корзина пуста</div>',e.textContent="0 ₽",o.textContent="0 товаров";return}t.innerHTML=s.map((n,l)=>`
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
              <path d="M1.3335 1H10.6668" stroke="black" stroke-width="1.4" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </button>
          <span class="cart__main-box-controls-count">${n.quantity}</span>
          <button class="cart__main-box-controls-btn cart__main-box-controls-btn_plus" data-id="${n.id}">
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
        <button class="cart__main-box-btn-close" data-id="${n.id}">
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
    `).join("");const r=s.reduce((n,l)=>n+l.price*l.quantity,0);e.textContent=`${r.toLocaleString()} ₽`;const i=s.reduce((n,l)=>n+l.quantity,0);o.textContent=`${i} ${T(i,"товар","товара","товаров")}`,P(),c.addEventListener("click",y)}function P(){document.querySelectorAll(".cart__main-box-controls-btn_plus").forEach(t=>{t.addEventListener("click",e=>{const o=e.currentTarget.dataset.id;f(o,1)})}),document.querySelectorAll(".cart__main-box-controls-btn_minus").forEach(t=>{t.addEventListener("click",e=>{const o=e.currentTarget.dataset.id;f(o,-1)})}),document.querySelectorAll(".cart__main-box-btn-close").forEach(t=>{t.addEventListener("click",e=>{const o=e.currentTarget.dataset.id;I(o)})})}function f(t,e){const o=s.findIndex(c=>c.id===t);o!==-1&&(s[o].quantity+=e,s[o].quantity<=0&&s.splice(o,1),p(),_())}function I(t){const e=s.findIndex(o=>o.id===t);e!==-1&&(s.splice(e,1),p(),_())}function y(){s.length=0,p(),_()}function _(){const t=document.querySelector(".header__control-cart"),e=s.reduce((o,c)=>o+c.quantity,0);e>0?(t.textContent=e,t.style.display="flex"):t.style.display="none"}function T(t,e,o,c){let r=Math.abs(t);return r%=100,r>=5&&r<=20?c:(r%=10,r===1?e:r>=2&&r<=4?o:c)}document.querySelector(".cart__bottom-btn-order").addEventListener("click",()=>{s.length>0?(alert("Заказ оформлен!"),y(),u.classList.remove("active"),document.body.style.overflow="",a.classList.remove("active")):alert("Корзина пуста!")});const a=document.querySelector(".overlay"),B=document.querySelector(".products__top-sort-current"),d=document.querySelector(".products__top-sort-popup"),j=document.querySelector(".header__nav-mobile-btn"),b=document.querySelector(".header__nav"),A=document.querySelector(".products__top-filters-btn"),g=document.querySelector(".filter");B.addEventListener("click",function(){d.classList.toggle("active"),a.classList.toggle("active")});d.querySelectorAll(".products__top-sort-option").forEach(t=>{t.addEventListener("click",()=>{d.classList.toggle("active"),a.classList.remove("active")})});j.addEventListener("click",function(){b.classList.toggle("active"),a.classList.toggle("active")});a.addEventListener("click",function(){b.classList.remove("active"),a.classList.remove("active"),d.classList.remove("active"),u.classList.remove("active"),document.body.style.overflow="",g.classList.remove("active")});A.addEventListener("click",function(){g.classList.toggle("active"),a.classList.toggle("active")});
