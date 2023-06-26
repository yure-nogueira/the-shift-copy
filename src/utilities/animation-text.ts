import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { DOM, SCROLL_POSITION } from "./constants";

gsap.registerPlugin(ScrollTrigger);

(() => {
  const texts = document.querySelectorAll(`[animation=${DOM.text}]`);

  if (!texts) return;

  texts.forEach((text) => {
    gsap.from(text, {
      opacity: 0,
      y: 20,
      scrollTrigger: {
        trigger: text,
        start: SCROLL_POSITION.start,
        end: SCROLL_POSITION.end,
        toggleActions: "play none none reverse",
        // markers: true,
      },
    });
  });
})();
