import { gsap } from "gsap";

import { horizontalLoop } from "./../../utilities/gsap/helper-functions/helper-functions";
import { DOM } from "./../../utilities/constants";

const forward = gsap.utils.toArray(`[animation=${DOM.carouselForward}]`);
const backward = gsap.utils.toArray(`[animation=${DOM.carouselBackward}]`);

horizontalLoop(forward, {
  repeat: -1,
});

horizontalLoop(backward, {
  reversed: true,
  repeat: -1,
});
