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
		<div class="products__item">
			<div class="products__item-img-wrapper"><img src="${product.image}" alt="${product.title}" class="products__item-img"></div>
			<h2 class="products__item-title">${product.title}</h2>
			<div class="products__item-bottom">
				<div class="products__item-price">${product.price} ₽</div>
				<button class="products__item-btn">
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

	productsBox.innerHTML = products
		.filter(
			(product) =>
				product.new === productNew &&
				product.available === productAvailable &&
				product.contractual === productContractual &&
				product.exclusive === productExclusive &&
				product.sale === productSale,
		)
		.map(createProductCard)
		.join('');

	productsCount.innerHTML = productsBox.querySelectorAll('.products__item').length;
}

const productsFilterBtns = document.querySelectorAll('.filter__item input');

productsFilterBtns.forEach((item) => {
	item.addEventListener('click', () => {
		renderProducts();
	});
});

document.addEventListener('DOMContentLoaded', renderProducts);
