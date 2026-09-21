const pageWrapper = document.querySelector(".page-wrapper");
const lightThemeButton = document.querySelector(".theme-switch__button_light");
const darkThemeButton = document.querySelector(".theme-switch__button_dark");

const getCurrTheme = () => {
  return localStorage.getItem("theme") || "light";
};

const setTheme = (theme) => {
  localStorage.setItem("theme", theme);
  pageWrapper.dataset.theme = theme;

  if (theme === "light") {
    lightThemeButton.classList.add("theme-switch__button_active");
    lightThemeButton.disabled = true;

    darkThemeButton.classList.remove("theme-switch__button_active");
    darkThemeButton.disabled = false;
  }

  if (theme === "dark") {
    darkThemeButton.classList.add("theme-switch__button_active");
    darkThemeButton.disabled = true;

    lightThemeButton.classList.remove("theme-switch__button_active");
    lightThemeButton.disabled = false;
  }
};

const themeButtonHandler = (event) => {
  const currTheme = getCurrTheme();

  if (currTheme === "light") {
    setTheme("dark");
  }

  if (currTheme === "dark") {
    setTheme("light");
  }
};

const themeSwitchButtons = document.querySelectorAll(".theme-switch__button");

themeSwitchButtons.forEach((button) =>
  button.addEventListener("click", themeButtonHandler),
);

if (localStorage.getItem("theme")) {
  setTheme(localStorage.getItem("theme"));
}
