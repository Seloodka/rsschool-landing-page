const currTheme = localStorage.getItem("theme") || "light";

document.documentElement.dataset.theme = currTheme;
