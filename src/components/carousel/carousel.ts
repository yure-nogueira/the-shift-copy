import { gsap } from "gsap";

import { horizontalLoop } from "./../../utilities/gsap/helper-functions/helper-functions";
import { DOM } from "./../../utilities/constants";

(() => {
  const forward = gsap.utils.toArray(`[animation=${DOM.carouselForward}]`);
  const backward = gsap.utils.toArray(`[animation=${DOM.carouselBackward}]`);
  
  forward.forEach((carousel) => {
    const carouselSpan = gsap.utils.toArray(
      `[animation=${DOM.carouselForwardSpan}]`,
      carousel as HTMLElement
    );
    horizontalLoop(carouselSpan, {
      repeat: -1,
    });
  });
  
  backward.forEach((carousel) => {
    const carouselSpan = gsap.utils.toArray(
      `[animation=${DOM.carouselBackwardSpan}]`,
      carousel as HTMLElement
    );
    horizontalLoop(carouselSpan, {
      reversed: true,
      repeat: -1,
    });
  });
})()


