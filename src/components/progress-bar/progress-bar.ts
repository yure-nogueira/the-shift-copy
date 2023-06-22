import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { DOM, SCROLL_POSITION } from "./../../utilities/constants";

gsap.registerPlugin(ScrollTrigger);

const progressBars = document.querySelectorAll(
  `[animation=${DOM.progressBar}]`
);

const progressBarLast = document.querySelector(
  `[animation=${DOM.progressBarLast}]`
);

progressBars.forEach((progressBar) => {
  gsap.from(progressBar, {
    xPercent: -100,
    scrollTrigger: {
      trigger: progressBar,
      start: SCROLL_POSITION.start,
      end: SCROLL_POSITION.end,
      scrub: 1,
      // markers: true,
    },
  });
});

gsap.from(progressBarLast, {
  xPercent: -100,
  scrollTrigger: {
    trigger: progressBarLast,
    start: "top 95%",
    end: "top 90%",
    scrub: 1,
    // markers: true,
  },
});
