import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

gsap.from('[animation="progress-bar"]', {
  xPercent: -100,
  scrollTrigger: {
    trigger: '[animation="progress-bar"]',
    end: "bottom 90%",
    scrub: 1,
    // markers: true,
  },
});
