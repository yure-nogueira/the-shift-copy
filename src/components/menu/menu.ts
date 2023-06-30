import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

import { DOM } from './../../utilities/constants';

// plugins
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

// variables
const navigation = document.querySelector('[animation="menu"]');
let removeTimeline: () => void;
const htmlEl = document.querySelector('html') as HTMLElement;
let isLightMode = htmlEl.classList.contains('light-mode');

// function to set link color
const setLinkColor = function (isLightMode: boolean) {
  const links = document.querySelectorAll('[animation="menu-link"]');
  links.forEach((link) => {
    gsap.set(link, {
      '--color-link': isLightMode
        ? 'var(--color-dark-always)'
        : 'var(--color-light-always)'
    });
  });
};

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
      onLeaveBack: () => {
        removeTimeline();
        isLightMode = htmlEl.classList.contains('light-mode');
        setLinkColor(isLightMode);
      }
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
  isLightMode = false;
  setLinkColor(isLightMode);

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
      )
      ?.to(
        navigation,
        {
          backgroundColor: 'var(--color-dark-always)'
        },
        0
      )
      ?.to(
        '.header__menu-button',
        {
          marginRight: 'auto',
          duration: 0.4,
          ease: 'power4.out'
        },
        0
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
      })
      ?.to(
        navigation,
        {
          backgroundColor: 'transparent'
        },
        0
      )
      ?.to(
        '.header__menu-button',
        {
          marginRight: '0',
          duration: 0.4,
          ease: 'power4.out'
        },
        0
      );
  });

  removeTimeline = () => {
    menuInnerTL = null;
  };
}

//
// invert the color of "the shift" text
//
export const switchColor = function () {
  const htmlEl = document.querySelector('html') as HTMLElement;
  let isLightMode = htmlEl.classList.contains('light-mode');
  const headerTitle = document.querySelector(
    `[animation=${DOM.headerTitle}]`
  ) as HTMLElement;
  const switchColorSections = gsap.utils.toArray<HTMLElement>(
    `[animation=${DOM.switchColor}]`
  );
  const changingColor = gsap.timeline({ duration: 0.1 });

  switchColorSections.forEach((section) => {
    changingColor
      .to(headerTitle, {
        '--invert': isLightMode ? '1' : '0',
        scrollTrigger: {
          trigger: section,
          scroller: '.page-container',
          start: 'top 50px',
          end: 'top 50px',
          scrub: true
          // markers: true,
        },
        onReverseComplete: () => {
          headerTitle?.style.setProperty('--invert', '0');
        }
      })
      .to(headerTitle, {
        '--invert': '0',
        scrollTrigger: {
          trigger: section,
          scroller: '.page-container',
          start: 'bottom 50px',
          end: 'bottom 50px',
          scrub: true
          // markers: true,
        },
        onReverseComplete: () => {
          isLightMode = htmlEl.classList.contains('light-mode');
          headerTitle?.style.setProperty('--invert', isLightMode ? '1' : '0');
        }
      });
  });
};
