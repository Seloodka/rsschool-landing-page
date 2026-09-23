const page = document.querySelector(".page-wrapper");
const burgerMenu = document.querySelector(".burger-menu");
const burgerNav = document.querySelector(".burger-menu__nav");

const isMenuOpen = () => {
  return burgerMenu.classList.contains("burger-menu_open");
};

const keyDownHandler = (event) => {
  if (event.key === "Escape") {
    closeBurgerMenu();
  }
};

const getScrollWidth = () => {
  return window.innerWidth - document.documentElement.clientWidth;
};

const openBurgerMenu = () => {
  document.body.style.paddingRight = getScrollWidth() + "px";
  burgerNav.style.paddingLeft = "";

  page.classList.add("prevent-scroll");
  burgerMenu.classList.add("burger-menu_open");
  document.addEventListener("keydown", keyDownHandler);
};

const closeBurgerMenu = () => {
  burgerNav.style.paddingLeft = page.style.paddingRight;
  page.style.paddingRight = "";

  page.classList.remove("prevent-scroll");
  burgerMenu.classList.remove("burger-menu_open");
  document.removeEventListener("keydown", keyDownHandler);
};

const widthChangeHandler = (event) => {
  if (event.matches && isMenuOpen()) {
    closeBurgerMenu();
  }
};

const burgerMenuHandler = () => {
  if (!isMenuOpen()) {
    openBurgerMenu();
  } else {
    closeBurgerMenu();
  }
};

const burgerMenuButton = document.querySelector(".burger-menu__button");
burgerMenuButton.addEventListener("click", burgerMenuHandler);

const mediaQuery = window.matchMedia("(min-width: 769px)");
mediaQuery.addEventListener("change", widthChangeHandler);

const burgerLinks = burgerNav.querySelectorAll("a");
burgerLinks.forEach((link) => {
  link.addEventListener("click", closeBurgerMenu);
});
