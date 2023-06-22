import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// plugins
gsap.registerPlugin(ScrollTrigger);

// variables
let frontSlideIndex = 0;
let running = false;
const automaticSlidingTime = 5000;
const nextButton = document.querySelector(
  '[animation="forward-slider-button"]'
);
const slides = gsap.utils.toArray<HTMLElement>(
  '[animation="forward-slider-slide"]'
);
const sliderTl = gsap.timeline({
  onComplete: () => {
    running = false;
  }
});

nextButton?.addEventListener('click', runSlider);

setInterval(() => {
  runSlider();
}, automaticSlidingTime);

function runSlider() {
  if (running) return;

  running = true;

  let frontSlide: HTMLElement | null = null;
  sliderTl.clear();

  slides.forEach((slide, index) => {
    sliderTl.to(
      slide,
      {
        xPercent: '+=100',
        duration: 1
      },
      '<'
    );

    if (index === frontSlideIndex) {
      frontSlide = slide;
    }
  });

  frontSlideIndex = (frontSlideIndex + 1) % slides.length;

  sliderTl.to(frontSlide, {
    xPercent: `+=-${slides.length * 100}`,
    duration: 0
  });

  sliderTl.play();
}
