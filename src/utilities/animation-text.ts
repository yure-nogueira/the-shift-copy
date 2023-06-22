import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { DOM, scrollPosition } from "./constants";

gsap.registerPlugin(ScrollTrigger);

const texts = document.querySelectorAll(`[animation=${DOM.text}]`);

texts.forEach((text) => {
  gsap.from(text, {
    opacity: 0,
    yPercent: 100,
    scrollTrigger: {
      trigger: text,
      start: scrollPosition.start,
      end: scrollPosition.end,
      scrub: 1,
      // markers: true,
    },
  });
});
