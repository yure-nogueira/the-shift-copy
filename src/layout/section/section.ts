import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

gsap.from('[animation="heading"]', {
  opacity: 0,
  yPercent: 100,
  scrollTrigger: {
    trigger: '[animation="heading"]',
    end: "bottom 90%",
    scrub: 1,
    // markers: true,
  },
});
