import { cardContainer, categoryControls } from "./menu-categories.js";

const hideCards = (cards) => {
  cards.forEach((card) => card.classList.add("hidden"));
};

const showCards = (cards) => {
  cards.forEach((card) => card.classList.remove("hidden"));
};

const getCardsForHide = () => {
  return [...cardContainer.children].slice(4);
};

const hideLoadMoreButton = () => {
  menuFooter.classList.add("hidden");
};

const showLoadMoreButton = () => {
  menuFooter.classList.remove("hidden");
};

const loadMoreButtonHandler = () => {
  const cards = getCardsForHide();
  showCards(cards);
  hideLoadMoreButton();
  cardsShown = true;
};

const screenTabletHandler = (event) => {
  const cardsForHide = getCardsForHide();

  if (cardsForHide.length === 0) {
    hideLoadMoreButton();
    return;
  }

  if (cardsShown) {
    return;
  }

  if (event.matches) {
    hideCards(cardsForHide);
    showLoadMoreButton();
  } else {
    showCards(cardsForHide);
    hideLoadMoreButton();
  }
};

const categoryControlsHandler = () => {
  cardsShown = false;

  if (mediaQuery.matches) {
    screenTabletHandler(mediaQuery);
  }
};

const menuFooter = document.querySelector(".menu-footer");
const loadMoreButton = document.querySelector(".menu-footer__load-more-button");
let cardsShown = false;

const mediaQuery = window.matchMedia("(max-width: 768px)");
mediaQuery.addEventListener("change", screenTabletHandler);
screenTabletHandler(mediaQuery);

categoryControls.forEach((control) =>
  control.addEventListener("click", categoryControlsHandler),
);

loadMoreButton.addEventListener("click", loadMoreButtonHandler);
