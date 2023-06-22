// components
import "./../../components/carousel/carousel";
import "./../../components/cursor/cursor";
import "./../../components/menu/menu";
import "./../../components/progress-bar/progress-bar";

// layout
import "../../components/carousel/carousel";
import "./../../layout/section/section";

// utilities
import "./../../utilities/animation-text";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { DOM, SCROLL_POSITION } from "./../../utilities/constants";

gsap.registerPlugin(ScrollTrigger);

const titles = document.querySelectorAll(`[animation=${DOM.researchTitle}]`);
const images = document.querySelectorAll(`[animation=${DOM.researchImages}]`);
const descriptions = document.querySelectorAll(
  `[animation=${DOM.researchDescriptions}]`
);

titles.forEach((title) => {
  gsap.fromTo(
    title,
    {
      y: 50,
    },
    {
      y: -50,
      scrollTrigger: {
        trigger: title,
        scrub: 1,
        // markers: true,
      },
    }
  );
});

images.forEach((image) => {
  gsap.from(image, {
    y: 20,
    opacity: 0,
    scrollTrigger: {
      trigger: image,
      start: SCROLL_POSITION.start,
      end: SCROLL_POSITION.end,
      scrub: 1,
      // markers: true,
    },
  });
});

descriptions.forEach((description) => {
  gsap.from(description, {
    y: 20,
    opacity: 0,
    scrollTrigger: {
      trigger: description,
      start: SCROLL_POSITION.start,
      end: SCROLL_POSITION.end,
      scrub: 1,
      // markers: true,
    },
  });
});
