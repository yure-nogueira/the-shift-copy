// components
import "../../components/carousel/carousel";
import "./../../components/cursor/cursor";
import "./../../components/link/link";
import "./../../components/logo/logo";
import "./../../components/menu/menu";
import "./../../components/perfil/perfil";
import "./../../components/progress-bar/progress-bar";
import "./../../components/swiper/swiper";
import "./../../components/shell-button/shell-button";
import "./../../components/switch-color-mode/switch-color-mode";

// layout
import "./../../layout/footer/footer";
import "./../../layout/intro/intro";
import "./../../layout/section/section";

// utilities
import "./../../utilities/animation-text";
import "./../../utilities/animation-title";
import {
  container,
  locoScroll,
  scrollSetup,
} from "./../../utilities/gsap/helper-functions/smooth-scroll";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { DOM } from "./../../utilities/constants";

gsap.registerPlugin(ScrollTrigger);

(() => {
  scrollSetup(locoScroll, container);

  const titles = document.querySelectorAll(`[animation=${DOM.aboutTitle}]`);

  if (!titles) return;

  titles.forEach((title) => {
    gsap.to(title, {
      y: -30,
      scrollTrigger: {
        trigger: title,
        scrub: 1,
      },
    });
  });
})();
