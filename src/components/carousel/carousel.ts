import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

gsap.fromTo(
  '[animation="carousel-first"]',
  {
    xPercent: 0,
  },
  {
    xPercent: -50,
    repeat: -1,
    duration: 50,
    ease: "none",
  }
);

gsap.fromTo(
  '[animation="carousel-second"]',
  {
    xPercent: 0,
  },
  {
    xPercent: 50,
    repeat: -1,
    duration: 50,
    ease: "none",
  }
);
