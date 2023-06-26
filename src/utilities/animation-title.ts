import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

import { DOM, SCROLL_POSITION } from "./constants";

gsap.registerPlugin(ScrollTrigger);

const titles = gsap.utils.toArray(`[animation=${DOM.title}]`);
const titlesScroll = gsap.utils.toArray(`[animation=${DOM.titleScroll}]`);

const title = new SplitType(titles as HTMLElement[]);
const titleScroll = new SplitType(titlesScroll as HTMLElement[]);

gsap.from(title.chars, {
  opacity: 0,
  y: 100,
  scale: 0.9,
  stagger: { amount: 0.5 },
});

titlesScroll.forEach((title) => {
  gsap.from(titleScroll.chars, {
    opacity: 0,
    y: 100,
    scale: 0.9,
    stagger: { amount: 0.4 },
    scrollTrigger: {
      trigger: title,
      start: SCROLL_POSITION.start,
      end: SCROLL_POSITION.end,
      toggleActions: "play none none reverse",
    },
  });
});