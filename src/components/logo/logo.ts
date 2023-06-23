import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// plugins
gsap.registerPlugin(ScrollTrigger);

// variables
const logoFigures = gsap.utils.toArray<HTMLElement>(
  '[animation="logo-slide-figure"]'
);

const logoTL = gsap.timeline({
  defaults: { duration: 0.8, ease: 'power1.inOut' },
  scrollTrigger: {
    trigger: '[animation="logo-slide"]',
    start: '-=120 center',
    toggleActions: 'play none none reverse'
  }
});
logoFigures.forEach((figure, index) => {
  logoTL.from(
    figure,
    {
      xPercent: index % 2 === 0 ? -100 : 100
    },
    '<0.06'
  );
});
