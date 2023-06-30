import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {
  container,
  locoScroll,
  scrollSetup
} from './../../utilities/gsap/helper-functions/smooth-scroll';
import { DOM, SCROLL_POSITION } from './../../utilities/constants';

gsap.registerPlugin(ScrollTrigger);

(() => {
  scrollSetup(locoScroll, container);

  const links = gsap.utils.toArray(`[animation=${DOM.link}]`);

  if (!links) return;

  links.forEach((link) => {
    const isSocial = (link as HTMLElement).closest('.footer__link-container');

    gsap.from(link as HTMLElement, {
      opacity: 0,
      y: 20,
      scrollTrigger: {
        trigger: link as any,
        start: !isSocial ? SCROLL_POSITION.start : 'top bottom',
        end: !isSocial ? SCROLL_POSITION.end : 'top bottom',
        toggleActions: 'play none none reverse'
        // markers: true,
      }
    });

    (link as HTMLElement).addEventListener('mouseenter', () => {
      gsap.to(link as HTMLElement, {
        '--position-x': '100%'
      });
    });

    (link as HTMLElement).addEventListener('mouseleave', () => {
      gsap.from(link as HTMLElement, {
        '--position-x': '-100%'
      });
    });
  });
})();
