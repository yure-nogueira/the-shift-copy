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

  const progressBars = gsap.utils.toArray<HTMLElement>(
    `[animation=${DOM.progressBar}]`
  );

  const progressBarLast = document.querySelector(
    `[animation=${DOM.progressBarLast}]`
  );

  if (progressBars) {
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
  }

  if (progressBarLast) {
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
  }
})();
