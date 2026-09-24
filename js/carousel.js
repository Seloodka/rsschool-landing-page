const toggleBottomControl = (slide) => {
  const button = carouselBottomControls.item(slide);
  button.classList.toggle("carousel-controls__control_active");
};

const setNextSlide = () => {
  if (currentSlide === maxSlides) {
    currentSlide = 0;
    carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
  } else {
    currentSlide += 1;
    carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
  }
};

const setPrevSlide = () => {
  if (currentSlide === 0) {
    currentSlide = maxSlides;
    carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
  } else {
    currentSlide -= 1;
    carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
  }
};

const setSlide = (slide) => {
  currentSlide = slide;
  carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
};

const sideButtonsHandler = (event) => {
  toggleBottomControl(currentSlide);

  if (event.currentTarget.classList.contains("carousel-wrapper__button_prev")) {
    setPrevSlide();
  } else {
    setNextSlide();
  }

  toggleBottomControl(currentSlide);
};

const carouselBottomControlsHandler = (event) => {
  toggleBottomControl(currentSlide);

  currentSlide = [...carouselBottomControls].indexOf(event.currentTarget);

  setSlide(currentSlide);
  toggleBottomControl(currentSlide);
};

const carousel = document.querySelector(".carousel__slide-list");

const maxSlides = carousel.scrollWidth / carousel.clientWidth - 1;
let currentSlide = 0;

const carouselSideButtons = document.querySelectorAll(
  ".carousel-wrapper__button",
);
carouselSideButtons.forEach((button) =>
  button.addEventListener("click", sideButtonsHandler),
);

const carouselBottomControls = document.querySelectorAll(
  ".carousel-controls__control",
);
carouselBottomControls.forEach((button) =>
  button.addEventListener("click", carouselBottomControlsHandler),
);
