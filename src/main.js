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
		document.querySelector(
			'.products__box',
		).innerHTML = `<div class="error-message">Произошла ошибка при загрузке товаров</div>`;
	}
}

function updateProductButtons() {
	const products = document.querySelectorAll('.products__item');
	products.forEach((item) => {
		const productId = item.dataset.id;
		const btn = item.querySelector('.products__item-btn');
		const plusIcon = btn.querySelector('.products__item-btn-icon-plus');
		const checkIcon = btn.querySelector('.products__item-btn-icon-check');
		const isInCart = cartStore.some((item) => item.id === productId);
		if (isInCart) {
			plusIcon.style.display = 'none';
			checkIcon.style.display = 'block';
		} else {
			plusIcon.style.display = 'block';
			checkIcon.style.display = 'none';
		}
	});
}

async function renderProducts() {
	const products = await fetchProducts();
	const productsBox = document.querySelector('.products__box');
	const productsCount = document.querySelector('.products__top-count span');

	const filters = {
		new: document.querySelector('.filter__item_new input').checked,
		available: document.querySelector('.filter__item_available input').checked,
		contractual: document.querySelector('.filter__item_contractual input').checked,
		exclusive: document.querySelector('.filter__item_exclusive input').checked,
		sale: document.querySelector('.filter__item_sale input').checked,
	};

	let filteredProducts = products.filter((product) => {
		return Object.entries(filters).every(([key, isActive]) => !isActive || product[key]);
	});

	const activeSortOption = document.querySelector('.products__top-sort-option.active');
	const sortType = activeSortOption ? activeSortOption.dataset.sort : 'price-desc';

	updateCurrentSortText(activeSortOption);

	filteredProducts = sortProducts(filteredProducts, sortType);

	productsBox.innerHTML = filteredProducts.map(createProductCard).join('');
	productsCount.textContent = filteredProducts.length;

	initCartHandlers();
	updateProductButtons();
}

function sortProducts(products, sortType) {
	switch (sortType) {
		case 'price-asc':
			return [...products].sort((a, b) => a.price - b.price);
		case 'price-desc':
			return [...products].sort((a, b) => b.price - a.price);
		case 'popular':
			return [...products].sort((a, b) => b.popularity - a.popularity);
		case 'new':
			return [...products].sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
		default:
			return products;
	}
}

function updateCurrentSortText(activeOption) {
	const currentSortElement = document.querySelector('.products__top-sort-current span');
	if (activeOption && currentSortElement) {
		currentSortElement.innerHTML = activeOption.textContent;
	}
}

document.querySelectorAll('.products__top-sort-option').forEach((option) => {
	option.addEventListener('click', function () {
		document
			.querySelectorAll('.products__top-sort-option')
			.forEach((el) => el.classList.remove('active'));
		this.classList.add('active');
		updateCurrentSortText(this);
		renderProducts();
	});
});

document.addEventListener('DOMContentLoaded', () => {
	if (!document.querySelector('.products__top-sort-option.active')) {
		const defaultSort = document.querySelector(
			'.products__top-sort-option[data-sort="price-desc"]',
		);
		if (defaultSort) {
			defaultSort.classList.add('active');
			updateCurrentSortText(defaultSort);
		}
	}
	renderProducts();
});

const productsFilterBtns = document.querySelectorAll('.filter__item input');
productsFilterBtns.forEach((item) => {
	item.addEventListener('click', () => renderProducts());
});

const cartStore = [];

function getProductData(item) {
	return {
		id: item.dataset.id,
		title: item.querySelector('.products__item-title').textContent,
		price: parseInt(item.querySelector('.products__item-price span').textContent),
		image: item.querySelector('.products__item-img').src,
	};
}

function addToCart(product) {
	const existingItem = cartStore.find((item) => item.id === product.id);
	if (existingItem) {
		existingItem.quantity += 1;
	} else {
		cartStore.push({ ...product, quantity: 1 });
	}
	renderCartProducts();
	updateCartCounter();
	updateProductButtons();
}

function initCartHandlers() {
	const products = document.querySelectorAll('.products__item');
	products.forEach((item) => {
		const btn = item.querySelector('.products__item-btn');
		const productId = btn.dataset.id;
		btn.addEventListener('click', () => {
			const product = getProductData(item);
			addToCart(product);
		});
	});
}

function renderCartProducts() {
	const cartProductsBox = document.querySelector('.cart__main-box');
	const cartTotalPrice = document.querySelector('.cart__bottom-price');
	const cartItemsCount = document.querySelector('.cart__main-top-count');
	const clearCartBtn = document.querySelector('.cart__main-top-btn-reset');

	if (cartStore.length === 0) {
		cartProductsBox.innerHTML = '<div class="cart__empty">Корзина пуста</div>';
		cartTotalPrice.textContent = '0 ₽';
		cartItemsCount.textContent = '0 товаров';
		return;
	}

	cartProductsBox.innerHTML = cartStore
		.map((item) => {
			return `
    <div class="cart__main-box-row" data-id="${item.id}">
      <div class="cart__main-box-col">
        <img src="${item.image}" alt="${item.title}" class="cart__main-box-img">
      </div>
      <div class="cart__main-box-col">
        <h2 class="cart__main-box-title">${item.title}</h2>
        <div class="cart__main-box-price">${item.price} ₽</div>
      </div>
      <div class="cart__main-box-col">
        <div class="cart__main-box-controls">
          <button class="cart__main-box-controls-btn cart__main-box-controls-btn_minus" data-id="${item.id}">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="2" viewBox="0 0 12 2" fill="none">
              <path d="M1.3335 1H10.6668" stroke="black" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
          <span class="cart__main-box-controls-count">${item.quantity}</span>
          <button class="cart__main-box-controls-btn cart__main-box-controls-btn_plus" data-id="${item.id}">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 3.33325V12.6666" stroke="black" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M3.3335 8H12.6668" stroke="black" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>
      </div>
      <div class="cart__main-box-col">
        <button class="cart__main-box-btn-close" data-id="${item.id}">
          <svg class="cart__main-box-btn-close-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18" stroke="#1F2020" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M6 6L18 18" stroke="#1F2020" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>
    </div>
    `;
		})
		.join('');

	const total = cartStore.reduce((sum, item) => sum + item.price * item.quantity, 0);
	cartTotalPrice.textContent = `${total.toLocaleString()} ₽`;

	const totalItems = cartStore.reduce((count, item) => count + item.quantity, 0);
	cartItemsCount.textContent = `${totalItems} ${getNoun(totalItems, 'товар', 'товара', 'товаров')}`;

	initCartItemHandlers();
	clearCartBtn.addEventListener('click', clearCart);
}

function initCartItemHandlers() {
	document.querySelectorAll('.cart__main-box-controls-btn_plus').forEach((btn) => {
		btn.addEventListener('click', (e) => {
			const productId = e.currentTarget.dataset.id;
			changeQuantity(productId, 1);
		});
	});

	document.querySelectorAll('.cart__main-box-controls-btn_minus').forEach((btn) => {
		btn.addEventListener('click', (e) => {
			const productId = e.currentTarget.dataset.id;
			changeQuantity(productId, -1);
		});
	});

	document.querySelectorAll('.cart__main-box-btn-close').forEach((btn) => {
		btn.addEventListener('click', (e) => {
			const productId = e.currentTarget.dataset.id;
			removeFromCart(productId);
		});
	});
}

function changeQuantity(productId, change) {
	const itemIndex = cartStore.findIndex((item) => item.id === productId);
	if (itemIndex !== -1) {
		cartStore[itemIndex].quantity += change;
		if (cartStore[itemIndex].quantity <= 0) {
			cartStore.splice(itemIndex, 1);
		}
		renderCartProducts();
		updateCartCounter();
		updateProductButtons();
	}
}

function removeFromCart(productId) {
	const itemIndex = cartStore.findIndex((item) => item.id === productId);
	if (itemIndex !== -1) {
		cartStore.splice(itemIndex, 1);
		renderCartProducts();
		updateCartCounter();
		updateProductButtons();
	}
}

function clearCart() {
	cartStore.length = 0;
	renderCartProducts();
	updateCartCounter();
	updateProductButtons();
}

function updateCartCounter() {
	const cartCounter = document.querySelector('.header__control-cart');
	const totalItems = cartStore.reduce((count, item) => count + item.quantity, 0);
	if (totalItems > 0) {
		cartCounter.textContent = totalItems;
		cartCounter.style.display = 'flex';
	} else {
		cartCounter.style.display = 'none';
	}
}

function getNoun(number, one, two, five) {
	let n = Math.abs(number);
	n %= 100;
	if (n >= 5 && n <= 20) return five;
	n %= 10;
	if (n === 1) return one;
	if (n >= 2 && n <= 4) return two;
	return five;
}

const cartBtn = document.querySelector('.header__control-cart');
const cartPopup = document.querySelector('.cart');
const cartPopupCloseBtn = document.querySelector('.cart__btn-close');
const overlay = document.querySelector('.overlay');
const productsTopSortCurrent = document.querySelector('.products__top-sort-current');
const productTopSortPopup = document.querySelector('.products__top-sort-popup');
const navMobileBtn = document.querySelector('.header__nav-mobile-btn');
const navMobile = document.querySelector('.header__nav');
const filtersMobileBtn = document.querySelector('.products__top-filters-btn');
const filter = document.querySelector('.filter');

cartBtn.addEventListener('click', () => {
	cartPopup.classList.toggle('active');
	document.body.style.overflow = 'hidden';
	overlay.classList.toggle('active');
});

cartPopupCloseBtn.addEventListener('click', () => {
	cartPopup.classList.toggle('active');
	document.body.style.overflow = '';
	overlay.classList.toggle('active');
});

document.querySelector('.cart__bottom-btn-order').addEventListener('click', () => {
	if (cartStore.length > 0) {
		alert('Заказ оформлен!');
		clearCart();
		cartPopup.classList.remove('active');
		document.body.style.overflow = '';
		overlay.classList.remove('active');
	} else {
		alert('Корзина пуста!');
	}
});

productsTopSortCurrent.addEventListener('click', function () {
	productTopSortPopup.classList.toggle('active');
	overlay.classList.toggle('active');
});

productTopSortPopup.querySelectorAll('.products__top-sort-option').forEach((item) => {
	item.addEventListener('click', () => {
		productTopSortPopup.classList.toggle('active');
		overlay.classList.remove('active');
	});
});

navMobileBtn.addEventListener('click', function () {
	navMobile.classList.toggle('active');
	overlay.classList.toggle('active');
});

overlay.addEventListener('click', function () {
	navMobile.classList.remove('active');
	overlay.classList.remove('active');
	productTopSortPopup.classList.remove('active');
	cartPopup.classList.remove('active');
	document.body.style.overflow = '';
	filter.classList.remove('active');
});

filtersMobileBtn.addEventListener('click', function () {
	filter.classList.toggle('active');
	overlay.classList.toggle('active');
});
