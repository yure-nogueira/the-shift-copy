import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

import { DOM, SCROLL_POSITION } from './constants';

gsap.registerPlugin(ScrollTrigger);

(() => {
  const titles = gsap.utils.toArray(`[animation=${DOM.title}]`);
  const title = new SplitType(titles as HTMLElement[]);
  const titlesScroll = gsap.utils.toArray(`[animation=${DOM.titleScroll}]`);

  if (title) {
    gsap.from(title.chars, {
      opacity: 0,
      y: 100,
      scale: 0.9,
      stagger: { amount: 0.5 }
    });
  }

  if (titlesScroll) {
    titlesScroll.forEach((title) => {
      const titleScroll = new SplitType(title as HTMLElement[]);
      gsap.from(titleScroll.chars, {
        opacity: 0,
        y: 100,
        scale: 0.9,
        stagger: { amount: 0.4 },
        scrollTrigger: {
          trigger: title as any,
          start: SCROLL_POSITION.start,
          end: SCROLL_POSITION.end,
          toggleActions: 'play none none reverse'
          // markers: true,
        }
      });
    });
  }
})();
