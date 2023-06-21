// components
import "./../../components/cursor/cursor";
import "./../../components/menu/menu";
import "./../../components/progress-bar/progress-bar";

// layout
import "./../../layout/section/section";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

gsap.fromTo(
  '[animation="research-title"]',
  {
    y: 50,
  },
  {
    y: -50,
    scrollTrigger: {
      trigger: '[animation="research-title"]',
      scrub: 1,
      // markers: true,
    },
  }
);

const images = document.querySelectorAll('[animation="research-image"]');

images.forEach((image) => {
  gsap.from(image, {
    y: 20,
    opacity: 0,
    scrollTrigger: {
      trigger: image,
      start: "top bottom",
      end: "20% bottom",
      scrub: 1,
      // markers: true,
    },
  });
});

gsap.from('[animation="research-description"]', {
  y: 20,
  opacity: 0,
  scrollTrigger: {
    trigger: '[animation="research-description"]',
    start: "top bottom",
    end: "20% bottom",
    scrub: 1,
    // markers: true,
  },
});
