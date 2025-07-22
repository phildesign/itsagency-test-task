const swiper = new Swiper('.swiper', {
	loop: true,
	pagination: {
		el: '.main-slider__pagination',
	},
	navigation: {
		prevEl: '.main-slider__btn-prev',
		nextEl: '.main-slider__btn-next',
	},
});

function createProductCard(product) {
	return `
		<div class="products__item" data-id="${product.id}">
			<div class="products__item-img-wrapper"><img src="${product.image}" alt="${product.title}" class="products__item-img"></div>
			<h2 class="products__item-title">${product.title}</h2>
			<div class="products__item-bottom">
				<div class="products__item-price"><span>${product.price}</span> ₽</div>
				<button class="products__item-btn" data-id="${product.id}">
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
						<path d="M10 4.16663V15.8333" stroke="#1F2020" stroke-width="2" stroke-linecap="round"
							stroke-linejoin="round" />
						<path d="M4.16699 10H15.8337" stroke="#1F2020" stroke-width="2" stroke-linecap="round"
							stroke-linejoin="round" />
					</svg>
				</button>
			</div>
		</div>
  `;
}

async function fetchProducts() {
	try {
		const response = await fetch('https://687a20daabb83744b7eb8e3f.mockapi.io/products');
		if (!response.ok) throw new Error('Ошибка загрузки данных');

		const products = await response.json();
		return products;
	} catch (error) {
		console.error('Ошибка:', error);
		document.querySelector('.products__box').innerHTML = `
      <div class="error-message">Произошла ошибка при загрузке товаров</div>
    `;
	}
}

async function renderProducts() {
	const products = await fetchProducts();

	const productsBox = document.querySelector('.products__box');
	const productsCount = document.querySelector('.products__top-count span');

	const productNew = document.querySelector('.filter__item_new input').checked;
	const productAvailable = document.querySelector('.filter__item_available input').checked;
	const productContractual = document.querySelector('.filter__item_contractual input').checked;
	const productExclusive = document.querySelector('.filter__item_exclusive input').checked;
	const productSale = document.querySelector('.filter__item_sale input').checked;

	const filteredProducts = products.filter(
		(product) =>
			product.new === productNew &&
			product.available === productAvailable &&
			product.contractual === productContractual &&
			product.exclusive === productExclusive &&
			product.sale === productSale,
	);

	productsBox.innerHTML = filteredProducts.map(createProductCard).join('');
	productsCount.textContent = filteredProducts.length;

	initCartHandlers();
}

const productsFilterBtns = document.querySelectorAll('.filter__item input');

productsFilterBtns.forEach((item) => {
	item.addEventListener('click', () => {
		renderProducts();
	});
});

document.addEventListener('DOMContentLoaded', renderProducts);

const cartBtn = document.querySelector('.header__control-cart');
const cartPopup = document.querySelector('.cart');
const cartPopupCloseBtn = document.querySelector('.cart__btn-close');

cartBtn.addEventListener('click', () => {
	cartPopup.classList.add('active');
	document.body.style.overflow = 'hidden';
});

cartPopupCloseBtn.addEventListener('click', () => {
	cartPopup.classList.remove('active');
	document.body.style.overflow = '';
});

const cartStore = [];

function initCartHandlers() {
	const products = document.querySelectorAll('.products__item');

	products.forEach((item) => {
		item.querySelector('.products__item-btn').addEventListener('click', () => {
			console.log(item, 'item');
			console.log(cartStore, 'cartStore');

			cartStore.push(item);
			renderCartProducts();
		});
	});
}

function renderCartProducts() {
	const cartProductsBox = document.querySelector('.cart__main-box');

	cartProductsBox.innerHTML = cartStore.map((item) => {
		return `
		<div class="cart__main-box-row">
			<div class="cart__main-box-col">
				<img src="${item.image}" alt="${item.title}" class="cart__main-box-img">
			</div>
			<div class="cart__main-box-col">
				<h2 class="cart__main-box-title">${item.title}</h2>
				<div class="cart__main-box-price">${item.price} ₽</div>
			</div>
			<div class="cart__main-box-col">
				<div class="cart__main-box-controls">
					<button class="cart__main-box-controls-btn cart__main-box-controls-btn_minus">
						<svg xmlns="http://www.w3.org/2000/svg" width="12" height="2" viewBox="0 0 12 2" fill="none">
							<path d="M1.3335 1H10.6668" stroke="black" stroke-width="1.4" stroke-linecap="round"
								stroke-linejoin="round" />
						</svg>
					</button>
					<span class="cart__main-box-controls-count">2</span>
					<button class="cart__main-box-controls-btn cart__main-box-controls-btn_plus">
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
				<button class="cart__main-box-btn-close">
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
	`;
	});
}
