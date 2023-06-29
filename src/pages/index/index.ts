// components
import "./../../components/about-us/about-us";
import "./../../components/carousel/carousel";
import "./../../components/cursor/cursor";
import "./../../components/forward-slider/forward-slider";
import "./../../components/link/link";
import "./../../components/menu/menu";
import "./../../components/progress-bar/progress-bar";
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

(() => {
  scrollSetup(locoScroll, container);
})();
