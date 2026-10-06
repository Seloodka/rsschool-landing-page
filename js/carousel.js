const toggleBottomControl = (slide) => {
  const button = carouselBottomControls.item(slide);
  button.classList.toggle("carousel-controls__control_active");
};

const setNextSlide = () => {
  toggleBottomControl(currentSlide);

  if (currentSlide === maxSlides) {
    currentSlide = 0;
  } else {
    currentSlide += 1;
  }

  carousel.style.transform = `translateX(-${currentSlide * 100}%)`;

  toggleBottomControl(currentSlide);
};

const setPrevSlide = () => {
  toggleBottomControl(currentSlide);

  if (currentSlide === 0) {
    currentSlide = maxSlides;
  } else {
    currentSlide -= 1;
  }

  carousel.style.transform = `translateX(-${currentSlide * 100}%)`;

  toggleBottomControl(currentSlide);
};

const setSlide = (slide) => {
  currentSlide = slide;
  carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
};

const sideButtonsHandler = (event) => {
  if (event.currentTarget.classList.contains("carousel-wrapper__button_prev")) {
    setPrevSlide();
  } else {
    setNextSlide();
  }
};

const carouselBottomControlsHandler = (event) => {
  toggleBottomControl(currentSlide);

  currentSlide = [...carouselBottomControls].indexOf(event.currentTarget);

  setSlide(currentSlide);
  toggleBottomControl(currentSlide);
};

const carouselTouchStartHandler = (event) => {
  touchPos.start = event.touches[0].clientX;
};

const carouselTouchEndHandler = (event) => {
  touchPos.end = event.changedTouches[0].clientX;
  const minDiff = 50;
  const currDiff = touchPos.start - touchPos.end;

  if (Math.abs(currDiff) < minDiff) {
    return;
  }

  if (currDiff > 0) {
    setNextSlide();
  } else {
    setPrevSlide();
  }
};

const initCarouselSwipes = (carousel) => {
  carousel.addEventListener("touchstart", carouselTouchStartHandler);
  carousel.addEventListener("touchend", carouselTouchEndHandler);
};
const carousel = document.querySelector(".carousel__slide-list");

const maxSlides = carousel.scrollWidth / carousel.clientWidth - 1;
let currentSlide = 0;

const touchPos = {
  start: 0,
  end: 0,
};

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

initCarouselSwipes(carousel);
