import { gsap } from "gsap";

import { DOM } from "./../../utilities/constants";

const texts = document.querySelectorAll(`[animation=${DOM.introText}]`);

texts.forEach((text) => {
  gsap.from(text, {
    yPercent: 100,
    duration: 1.8,
    ease: "power4.out",
  });
});