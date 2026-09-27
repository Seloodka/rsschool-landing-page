import productsData from "../data/products.json" with { type: "json" };
import { cardContainer, categoryControls } from "./menu-categories.js";
import { getScrollWidth } from "./burger-menu.js";

const addToPrice = (value) => {
  price.priceAdds = value;
};

const deductFromPrice = (value) => {
  price.priceAdds = -value;
};

const setPrice = (basePrice) => {
  price._priceAdds = 0;
  price.basePrice = basePrice;
};

const sizeButtonHandler = (event) => {
  const currButton = event.currentTarget;
  const sizeButtons = document.querySelectorAll(
    ".modal-description__size button",
  );

  sizeButtons.forEach((button) => {
    if (button.classList.contains("modal-description__button_active")) {
      button.classList.remove("modal-description__button_active");
      button.disable = false;

      deductFromPrice(parseFloat(button.dataset.addPrice));
    }

    if (button === currButton) {
      button.classList.add("modal-description__button_active");
      button.disable = true;

      addToPrice(parseFloat(button.dataset.addPrice));
    }
  });
};

const additionButtonHandler = (event) => {
  const pressedButton = event.currentTarget;
  pressedButton.classList.toggle("modal-description__button_active");

  if (pressedButton.classList.contains("modal-description__button_active")) {
    addToPrice(parseFloat(pressedButton.dataset.addPrice));
  } else {
    deductFromPrice(parseFloat(pressedButton.dataset.addPrice));
  }
};

const createModalButton = () => {
  const button = document.createElement("button");
  button.classList.add("modal-description__button", "text_link");

  return button;
};

const createSizeButtons = (sizesData) => {
  const buttons = [];

  for (const size in sizesData) {
    const button = createModalButton();
    button.dataset.addPrice = sizesData[size]["add-price"];

    const buttonInnerHTML = `
      <div class="modal-description__button-icon">${size.toUpperCase()}</div>
      <span>${sizesData[size].size}</span>`;

    button.insertAdjacentHTML("beforeend", buttonInnerHTML);
    button.addEventListener("click", sizeButtonHandler);

    buttons.push(button);
  }
  buttons[0].classList.add("modal-description__button_active");

  return buttons;
};

const createAdditivesButtons = (additivesData) => {
  const buttons = additivesData.map((additive, ind) => {
    const button = createModalButton();
    button.dataset.addPrice = additive["add-price"];

    const buttonInnerHTML = `
      <div class="modal-description__button-icon">${ind + 1}</div>
      <span>${additive.name}</span>`;

    button.insertAdjacentHTML("beforeend", buttonInnerHTML);
    button.addEventListener("click", additionButtonHandler);

    return button;
  });

  return buttons;
};

const createModalWindowHTML = (product, imagePath) => {
  return `
  <div class="modal-image">
    <img src="${imagePath}" alt="${product.name} image">
  </div>
  <div class="modal-description">
    <div class="modal-description__title">
      <h2 class="heading-3">${product.name}</h2>
      <p>${product.description}</p>
    </div>
    <div class="modal-description__size">
      <span>Size</span>
      <div class="modal-description__button-container"></div>
    </div>

    <div class="modal-description__additives">
      <span>Additives</span>
      <div class="modal-description__button-container"></div>
    </div>

    <div class="modal-description__total">
      <h3>Total:</h3>
      <span class="modal-description__price heading-3">$${product.price}</span>
    </div>

    <div class="modal-description__alert">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_147813_9350)">
          <path d="M8 7.66675V11.0001" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M8 5.00667L8.00667 4.99926" stroke="#403F3D" stroke-linecap="round"
            stroke-linejoin="round" />
          <path
            d="M8.00016 14.6666C11.6821 14.6666 14.6668 11.6818 14.6668 7.99992C14.6668 4.31802 11.6821 1.33325 8.00016 1.33325C4.31826 1.33325 1.3335 4.31802 1.3335 7.99992C1.3335 11.6818 4.31826 14.6666 8.00016 14.6666Z"
            stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_147813_9350">
            <rect width="16" height="16" fill="white" />
          </clipPath>
        </defs>
      </svg>

      <p class="text_caption">The cost is not final. Download our mobile app to see the final price and place
        your order. Earn
        loyalty points and enjoy your favorite coffee with up to 20% discount.
      </p>
    </div>

    <button class="modal-description__close-button text_link">Close</button>
  </div>
  `;
};

const addModalCloseHandlers = () => {
  const modalBackdrop = document.querySelector(".modal-backdrop");
  const closeModalButton = modalBackdrop.querySelector(
    ".modal-description__close-button",
  );

  closeModalButton.addEventListener("click", modalClose);
  document.addEventListener("keydown", backdropCloseHandler);
};

const createModalWindow = (card) => {
  const name = getCardName(card);
  const imagePath = card.querySelector("img").attributes.src.value;
  const modalWindow = document.querySelector(".modal-window");
  const product = productsData.find((product) => product.name === name);

  modalWindow.insertAdjacentHTML(
    "beforeend",
    createModalWindowHTML(product, imagePath),
  );

  const buttonContainers = document.querySelectorAll(
    ".modal-description__button-container",
  );
  const sizeButtons = createSizeButtons(product.sizes);
  const additivesButtons = createAdditivesButtons(product.additives);

  buttonContainers[0].append(...sizeButtons);
  buttonContainers[1].append(...additivesButtons);

  addModalCloseHandlers();

  setPrice(parseFloat(product.price));
};

const modalOpen = () => {
  const page = document.querySelector(".page-wrapper");
  page.style.paddingRight = getScrollWidth() + "px";
  page.classList.add("prevent-scroll");

  const modalBackdrop = document.querySelector(".modal-backdrop");
  modalBackdrop.classList.remove("modal-hidden");
};

const modalClose = () => {
  const page = document.querySelector(".page-wrapper");
  page.style.paddingRight = "";
  page.classList.remove("prevent-scroll");

  const modalBackdrop = document.querySelector(".modal-backdrop");
  const modalWindow = modalBackdrop.querySelector(".modal-window");
  modalBackdrop.classList.add("modal-hidden");

  document.removeEventListener("keydown", backdropCloseHandler);
  price._priceAdds = 0;

  setTimeout(() => {
    modalWindow.replaceChildren();
  }, 300);
};

const backdropCloseHandler = (event) => {
  const backdrop = document.querySelector(".modal-backdrop");

  switch (event.type) {
    case "click":
      if (event.target === backdrop) {
        modalClose();
      }
      break;

    case "keydown":
      if (event.key === "Escape") {
        modalClose();
      }
      break;
  }
};

const getCardName = (card) => {
  return card.querySelector(".card-content__info").firstElementChild
    .textContent;
};

const cardClickHandler = (event) => {
  createModalWindow(event.currentTarget);
  modalOpen();
};

const addCardsHandler = () => {
  [...cardContainer.children].forEach((card) =>
    card.addEventListener("click", cardClickHandler),
  );
};

const modalSetUp = () => {
  const modalBackdrop = document.createElement("div");
  const modalWindow = document.createElement("section");

  modalBackdrop.classList.add("modal-backdrop", "modal-hidden");
  modalWindow.classList.add("modal-window");

  modalBackdrop.append(modalWindow);
  document.querySelector(".page").prepend(modalBackdrop);

  modalBackdrop.addEventListener("click", backdropCloseHandler);
  addCardsHandler();
};

const price = {
  set priceAdds(val) {
    this._priceAdds += val;
    document.querySelector(".modal-description__price").textContent =
      "$" + this.finalPrice.toFixed(2);
  },
  get finalPrice() {
    return this.basePrice + this._priceAdds;
  },

  _priceAdds: 0,
  basePrice: 0,
};

categoryControls.forEach((control) =>
  control.addEventListener("click", addCardsHandler),
);

modalSetUp();
