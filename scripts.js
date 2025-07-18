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
			<div class="products__item-img-wrapper"><img src="./paint.jpg" alt="img" class="products__item-img"></div>
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

async function fetchAndRenderProducts() {
	try {
		const response = await fetch('https://687a20daabb83744b7eb8e3f.mockapi.io/products');
		if (!response.ok) throw new Error('Ошибка загрузки данных');

		const products = await response.json();
		const productsBox = document.querySelector('.products__box');
		const productsCount = document.querySelector('.products__top-count span');

		productsBox.innerHTML = products.map(createProductCard).join('');
		productsCount.innerHTML = products.length;
	} catch (error) {
		console.error('Ошибка:', error);
		document.querySelector('.products__box').innerHTML = `
      <div class="error-message">Произошла ошибка при загрузке товаров</div>
    `;
	}
}

document.addEventListener('DOMContentLoaded', fetchAndRenderProducts);
