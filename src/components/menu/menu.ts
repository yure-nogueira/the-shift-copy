import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// plugins
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

// variables
const navigation = document.querySelector('[animation="menu"]');
let removeTimeline: () => void;

//
// header page load animations
//
const loadTL = gsap.timeline({
  onComplete: setOuterMenuAnimations
});

loadTL
  .to('body', {
    overflow: 'hidden',
    duration: 0
  })
  .to('[animation="menu-link"]', {
    '--animation-out': 'highlight-out 300ms ease-in forwards',
    duration: 0
  })
  .to(window, { duration: 0.5, scrollTo: 0 })
  .fromTo(
    '[animation="menu-link"]',
    {
      yPercent: 100,
      opacity: 0
    },
    {
      yPercent: 0,
      opacity: 1,
      duration: 0.5,
      stagger: 0.05,
      ease: 'none'
    }
  )
  .to('[animation="menu-link"]', {
    '--before-visibility': 'visible',
    '--animation-in': 'highlight-in 300ms ease-in forwards'
  })
  .to('body', {
    overflow: 'auto',
    duration: 0
  });

//
// header menu outer animations
//
function setOuterMenuAnimations() {
  const menuOuterTL = gsap.timeline({
    defaults: { duration: 0.4, ease: 'none' },
    scrollTrigger: {
      trigger: '[animation="header"]',
      start: 'bottom top',
      toggleActions: 'play none reverse none',
      onEnter: setInnerMenuAnimations,
      onLeaveBack: () => removeTimeline()
    }
  });

  menuOuterTL
    .to('[animation="menu"]', {
      y: '-3.5rem'
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
        yPercent: 100,
        opacity: 0,
        stagger: 0.05
      },
      '<'
    )
    .to('[animation="menu-links"]', {
      height: 0,
      duration: 0
    });
}

//
// header menu inner animations
//
function setInnerMenuAnimations() {
  let menuInnerTL: gsap.core.Timeline | null = gsap.timeline({
    defaults: { ease: 'none' }
  });

  navigation?.addEventListener('mouseenter', () => {
    menuInnerTL?.clear();
    menuInnerTL
      ?.to('[animation="menu-links"]', {
        height: 'auto',
        duration: 0
      })
      ?.to('[animation="menu-link"]', {
        yPercent: 0,
        opacity: 1,
        duration: 0.3,
        stagger: 0.05
      })
      ?.fromTo(
        '[animation="menu-button-shell"]',
        {
          yPercent: 0
        },
        {
          yPercent: -100,
          duration: 0.3
        },
        '<'
      );
  });

  navigation?.addEventListener('mouseleave', () => {
    menuInnerTL?.clear();
    menuInnerTL
      ?.to('[animation="menu-link"]', {
        yPercent: 100,
        opacity: 0,
        duration: 0.2,
        stagger: 0.05
      })
      ?.fromTo(
        '[animation="menu-button-shell"]',
        {
          yPercent: -100
        },
        {
          yPercent: -210,
          duration: 0.3
        },
        '<'
      )
      ?.to('[animation="menu-links"]', {
        height: 0,
        duration: 0
      });
  });

  removeTimeline = () => {
    menuInnerTL = null;
  };
}
