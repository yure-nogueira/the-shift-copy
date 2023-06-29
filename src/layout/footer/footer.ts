// utilities
import {
  locoScroll,
  scrollToTop,
} from "./../../utilities/gsap/helper-functions/smooth-scroll";

(() => {
  const backToTop = document.querySelector(".footer__up") as HTMLElement;

  scrollToTop(locoScroll, backToTop);
})();
