import productsData from "../data/products.json" with { type: "json" };

const createCardHTML = (product, index) => {
  return `
  <article class="card-wrapper">
    <header class="card-header">
      <img src="./assets/img/menu/${product.category}/${product.category}-${index + 1}.jpg" alt="${product.name} image">
    </header>
    <div class="card-content">
      <div class="card-content__info">
        <h2 class="heading-3">${product.name}</h2>
        <p>${product.description}</p>
      </div>
      <div class="card-content__price">
          <h3>$${product.price}</h3>
      </div>
    </div>
  </article>
  `;
};

const showCards = (products) => {
  products.forEach((product, ind) => {
    cardContainer.insertAdjacentHTML("beforeend", createCardHTML(product, ind));
  });
};

const getProductsByCategory = (category) => {
  return productsData.filter((product) => product.category === category);
};

const changeActiveButton = (category) => {
  categoryControls.forEach((control) => {
    if (control.dataset.category !== category) {
      control.classList.remove("menu-tabs__button_active");
    } else {
      control.classList.add("menu-tabs__button_active");
    }
  });
};

const clearCardsContainer = () => {
  cardContainer.replaceChildren();
};

const setStartCategory = () => {
  const category = categoryControls[0].dataset.category;
  const productsByCategory = getProductsByCategory(category);

  changeActiveButton(category);
  showCards(productsByCategory);
};

const categoryControlHandler = (event) => {
  const category = event.currentTarget.dataset.category;
  const productsByCategory = getProductsByCategory(category);

  clearCardsContainer();
  changeActiveButton(category);
  showCards(productsByCategory);
};

export const cardContainer = document.querySelector(".card-container");
export const categoryControls = document.querySelectorAll(".menu-tabs__button");

categoryControls.forEach((control) =>
  control.addEventListener("click", categoryControlHandler),
);

setStartCategory();
