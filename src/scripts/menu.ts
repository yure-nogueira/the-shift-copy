import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

//
// header menu outer animations
//
const navigationTl = gsap.timeline({
  duration: 0.4,
  scrollTrigger: {
    trigger: '[animation="header"]',
    start: 'bottom top',
    toggleActions: 'play none reverse none',
    onEnter: setInnerMenuAnimations
  }
});

navigationTl
  .to('[animation="menu"]', {
    yPercent: 0
  })
  .to(
    '[animation="menu-button"]',
    {
      opacity: 1
    },
    '<'
  )
  .to(
    '[animation="menu-link"]',
    {
      yPercent: 100
    },
    '<'
  )
  .to('[animation="menu-links"]', {
    height: 0,
    duration: 0
  });

//
// header menu inner animations
//

function setInnerMenuAnimations() {
  const menuTl = gsap.timeline();

  menuTl.to('[animation="menu-links"]', {
    height: 'auto',
    duration: 0
  });
}

// const menuButton = document.querySelector('[animation="menu"]');
// menuButton?.addEventListener('mouseenter', () => {
//   menuTl.play();
// });

// menuButton?.addEventListener('mouseleave', () => {
//   menuTl.reverse();
// });
