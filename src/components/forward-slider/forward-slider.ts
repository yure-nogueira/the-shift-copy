import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// plugins
gsap.registerPlugin(ScrollTrigger);

// variables
let frontSlideIndex = 0;
let running = false;
let intervalId: number;
const automaticSlidingInterval = 5000;
const nextButton = document.querySelector(
  '[animation="forward-slider-button"]'
);
const slides = gsap.utils.toArray<HTMLElement>(
  '[animation="forward-slider-slide"]'
);
const numbers = gsap.utils.toArray<HTMLElement>(
  '[animation="forward-slider-number"]'
);
const sliderTl = gsap.timeline({
  onComplete: () => {
    running = false;
  },
});
// para animação ao carregar a tela
const title = document.querySelector(".forward-slider__title");
const container = document.querySelector(".forward-slider__container");
const counter = document.querySelector(".forward-slider__counter");

nextButton?.addEventListener("click", () => runSlider("forced"));

intervalId = setInterval(() => {
  runSlider("natural");
}, automaticSlidingInterval);

function runSlider(caller: "natural" | "forced") {
  if (running) return;
  running = true;

  if (caller === "forced") {
    clearInterval(intervalId);
    intervalId = setInterval(() => {
      runSlider("natural");
    }, automaticSlidingInterval);
  }

  let frontSlide: HTMLElement | null = null;
  let frontNumber: HTMLElement | null = null;
  sliderTl.clear();

  slides.forEach((slide, index) => {
    sliderTl
      .to(
        slide,
        {
          xPercent: "+=100",
          duration: 1,
        },
        "<"
      )
      .to(
        numbers[index],
        {
          yPercent: "+=-100",
          duration: 1,
        },
        "<"
      );

    if (index === frontSlideIndex) {
      frontSlide = slide;
      frontNumber = numbers[index];
    }
  });

  frontSlideIndex = (frontSlideIndex + 1) % slides.length;

  sliderTl
    .to(frontSlide, {
      xPercent: `+=-${slides.length * 100}`,
      duration: 0,
    })
    .to(frontNumber, {
      yPercent: `+=${slides.length * 100}`,
      duration: 0,
    });

  sliderTl.play();
}

// animação ao carregar a tela
[title, container, counter].forEach((element) => {
  gsap.from(element, {
    opacity: 0,
    y: 30,
    duration: 1,
  });
});
