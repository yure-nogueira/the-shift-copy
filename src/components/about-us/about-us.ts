import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  container,
  locoScroll,
  scrollSetup,
} from "./../../utilities/gsap/helper-functions/smooth-scroll";
import { DOM, SCROLL_POSITION } from "./../../utilities/constants";

gsap.registerPlugin(ScrollTrigger);

(() => {
  scrollSetup(locoScroll, container);

  const aboutUs = document.querySelector(`[animation=${DOM.aboutUs}]`);

  if (!aboutUs) return;

  gsap.from(aboutUs, {
    opacity: 0,
    scale: 0,
    scrollTrigger: {
      trigger: aboutUs,
      start: SCROLL_POSITION.start,
      end: SCROLL_POSITION.end,
      toggleActions: "play none none reverse",
      // markers: true,
    },
  });

  aboutUs.addEventListener("mouseenter", () => {
    gsap.to(aboutUs, {
      "--position-x": "100%",
    });
  });

  aboutUs.addEventListener("mouseleave", () => {
    gsap.from(aboutUs, {
      "--position-x": "-100%",
    });
  });
})();
