import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { DOM, SCROLL_POSITION } from "./../../utilities/constants";

gsap.registerPlugin(ScrollTrigger);

// const progressBars = document.querySelectorAll(
//   `[animation=${DOM.progressBar}]`
// );

const progressBars = gsap.utils.toArray<HTMLElement>(
  `[animation=${DOM.progressBar}]`
);

const progressBarLast = document.querySelector(
  `[animation=${DOM.progressBarLast}]`
);

progressBars.forEach((progressBar) => {
  const progressBarTL = gsap.timeline({
    defaults: { duration: 0.8, ease: "power1.inOut" },
    scrollTrigger: {
      trigger: progressBar,
      start: SCROLL_POSITION.start,
      toggleActions: "play none none reverse",
      // markers: true,
    },
  });

  progressBarTL.from(progressBar, {
    xPercent: -100,
  });
});

const progressBarLastTL = gsap.timeline({
  defaults: { duration: 0.8, ease: "power1.inOut" },
  scrollTrigger: {
    trigger: progressBarLast,
    toggleActions: "play none none reverse",
    // markers: true,
  },
});

progressBarLastTL.from(progressBarLast, {
  xPercent: -100,
});
