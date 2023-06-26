// components
import "./../../components/cursor/cursor";
import "./../../components/logo/logo";
import "./../../components/menu/menu";
import "./../../components/perfil/perfil";
import "./../../components/progress-bar/progress-bar";
import "./../../components/swiper/swiper";

// layout
import "./../../layout/section/section";
import "../../components/carousel/carousel";

// utilities
import "./../../utilities/animation-text";
import "./../../utilities/animation-title";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { DOM } from "./../../utilities/constants";

gsap.registerPlugin(ScrollTrigger);

const titles = document.querySelectorAll(`[animation=${DOM.aboutTitle}]`);

titles.forEach((title) => {
  gsap.to(title, {
    y: -30,
    scrollTrigger: {
      trigger: title,
      scrub: 1,
    },
  });
});
