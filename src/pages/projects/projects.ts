import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';
import SplitType from 'split-type';
import './../../components/cursor/cursor';

gsap.registerPlugin(ScrollTrigger, Draggable);

let iteration = 0; // gets iterated when we scroll all the way to the end or start and wraps around - allows us to smoothly continue the playhead scrubbing in the correct direction.

// set initial state of items
gsap.set('.card', { xPercent: 500 });

const spacing = 0.1, // spacing of the cards (stagger)
  snapTime = gsap.utils.snap(spacing), // we'll use this to snapTime the playhead on the seamlessLoop
  cards = gsap.utils.toArray('.card'),
  // this function will get called for each element in the buildSeamlessLoop() function, and we just need to return an animation that'll get inserted into a master timeline, spaced
  animateFunc = (element: any) => {
    const tl = gsap.timeline();
    tl.fromTo(
      element,
      {},
      {
        zIndex: 100,
        duration: 2,
        // yoyo: true,
        // repeat: 1,
        ease: 'power1.in',
        immediateRender: false
      }
    ).fromTo(
      element,
      { xPercent: 500 },
      { xPercent: -500, duration: 1, ease: 'none', immediateRender: false },
      0
    );
    return tl;
  },
  seamlessLoop = buildSeamlessLoop(cards, spacing, animateFunc),
  playhead = { offset: 0 }, // a proxy object we use to simulate the playhead position, but it can go infinitely in either direction and we'll just use an onUpdate to convert it to the corresponding time on the seamlessLoop timeline.
  wrapTime = gsap.utils.wrap(0, seamlessLoop.duration()), // feed in any offset (time) and it'll return the corresponding wrapped time (a safe value between 0 and the seamlessLoop's duration)
  scrub = gsap.to(playhead, {
    // we reuse this tween to smoothly scrub the playhead on the seamlessLoop
    offset: 0,
    onUpdate() {
      seamlessLoop.time(wrapTime(playhead.offset)); // convert the offset to a "safe" corresponding time on the seamlessLoop timeline
    },
    duration: 2,
    ease: 'power3',
    paused: true
  }),
  trigger = ScrollTrigger.create({
    start: 0,
    onUpdate(self) {
      let scroll = self.scroll();
      if (scroll > self.end - 1) {
        wrap(1, 2);
      } else if (scroll < 1 && self.direction < 0) {
        wrap(-1, self.end - 2);
      } else {
        scrub.vars.offset =
          (iteration + self.progress) * seamlessLoop.duration();
        scrub.invalidate().restart(); // to improve performance, we just invalidate and restart the same tween. No need for overwrites or creating a new tween on each update.
      }
    },
    end: '+=5000',
    pin: '.gallery'
  }),
  // converts a progress value (0-1, but could go outside those bounds when wrapping) into a "safe" scroll value that's at least 1 away from the start or end because we reserve those for sensing when the user scrolls ALL the way up or down, to wrap.
  progressToScroll = (progress: any) =>
    gsap.utils.clamp(
      1,
      trigger.end - 1,
      gsap.utils.wrap(0, 1, progress) * trigger.end
    ),
  wrap = (iterationDelta: any, scrollTo: any) => {
    iteration += iterationDelta;
    trigger.scroll(scrollTo);
    trigger.update(); // by default, when we trigger.scroll(), it waits 1 tick to update().
  };

// when the user stops scrolling, snap to the closest item.
ScrollTrigger.addEventListener('scrollEnd', () =>
  scrollToOffset(scrub.vars.offset)
);

// feed in an offset (like a time on the seamlessLoop timeline, but it can exceed 0 and duration() in either direction; it'll wrap) and it'll set the scroll position accordingly. That'll call the onUpdate() on the trigger if there's a change.
function scrollToOffset(offset: any) {
  // moves the scroll playhead to the place that corresponds to the totalTime value of the seamlessLoop, and wraps if necessary.
  let snappedTime = snapTime(offset),
    progress =
      (snappedTime - seamlessLoop.duration() * iteration) /
      seamlessLoop.duration(),
    scroll = progressToScroll(progress);
  if (progress >= 1 || progress < 0) {
    return wrap(Math.floor(progress), scroll);
  }
  trigger.scroll(scroll);
}

document
  ?.querySelector('.next')
  ?.addEventListener('click', () =>
    scrollToOffset(scrub.vars.offset + spacing)
  );
document
  ?.querySelector('.prev')
  ?.addEventListener('click', () =>
    scrollToOffset(scrub.vars.offset - spacing)
  );

function buildSeamlessLoop(items: any, spacing: any, animateFunc: any) {
  let rawSequence = gsap.timeline({ paused: true }), // this is where all the "real" animations live
    seamlessLoop = gsap.timeline({
      // this merely scrubs the playhead of the rawSequence so that it appears to seamlessly loop
      paused: true,
      repeat: -1, // to accommodate infinite scrolling/looping
      onRepeat() {
        // works around a super rare edge case bug that's fixed GSAP 3.6.1
        this._time === this._dur && (this._tTime += this._dur - 0.01);
      },
      onReverseComplete() {
        this.totalTime(this.rawTime() + this.duration() * 100); // seamless looping backwards
      }
    }),
    cycleDuration = spacing * items.length,
    dur: any; // the duration of just one animateFunc() (we'll populate it in the .forEach() below...

  // loop through 3 times so we can have an extra cycle at the start and end - we'll scrub the playhead only on the 2nd cycle
  items
    .concat(items)
    .concat(items)
    .forEach((_: any, i: any) => {
      let anim = animateFunc(items[i % items.length]);
      rawSequence.add(anim, i * spacing);
      dur || (dur = anim.duration());
    });

  // animate the playhead linearly from the start of the 2nd cycle to its end (so we'll have one "extra" cycle at the beginning and end)
  seamlessLoop.fromTo(
    rawSequence,
    {
      time: cycleDuration + dur / 2
    },
    {
      time: '+=' + cycleDuration,
      duration: cycleDuration,
      ease: 'none'
    }
  );
  return seamlessLoop;
}

// below is the dragging functionality (mobile-friendly too)...
Draggable.create('.drag-proxy', {
  type: 'x',
  trigger: '.cards',
  onPress() {
    this.startOffset = scrub.vars.offset;
  },
  onDrag() {
    scrub.vars.offset = this.startOffset + (this.startX - this.x) * 0.001;
    scrub.invalidate().restart(); // same thing as we do in the ScrollTrigger's onUpdate
  },
  onDragEnd() {
    scrollToOffset(scrub.vars.offset);
  }
});

(() => {
  let progress = Math.round(seamlessLoop.progress() * 100);
  const progressEl = document.querySelector('.progress__value') as HTMLElement;
  const galleryProgress = document.querySelector(
    '.gallery-progress__fill'
  ) as HTMLElement;

  gsap.to('.card-img', {
    scrollTrigger: {
      trigger: '.gallery',
      start: 0,
      end: '+=5000',
      scrub: 3,
      onUpdate: () => {
        const currentProgress = Math.round(seamlessLoop.progress() * 100);

        if (currentProgress != progress) {
          progress = currentProgress;
          progressEl.textContent = progress.toString();
          galleryProgress.style.setProperty('--progress', progress.toString());
        }
      }
    },
    xPercent: -50,
    ease: 'none'
  });
})();

const mm = gsap.matchMedia();
mm.add('(min-width: 992px)', cardAnimationsDesktop);
mm.add('(max-width: 992px)', cardAnimationsMobileAndTablet);

function cardAnimationsDesktop() {
  const cards = gsap.utils.toArray<HTMLElement>('.card');

  const cleanups = cards.map((card) => {
    const cardTarget = card.querySelector('.wrapper') as HTMLElement;
    const linkButton = card.querySelector('.card-button');
    const smallTitle = card.querySelector('.small-title-inner');
    const year = card.querySelector('.year-inner');
    const mainTitles = card.querySelectorAll<HTMLElement>('.title-inner');
    const title = new SplitType(mainTitles);

    const targets = {
      linkButton,
      smallTitle,
      year,
      title
    };

    const runAnimations = () => {
      runCardAnimations(targets);
    };

    const revertAnimations = () => {
      revertCardAnimations(targets);
    };

    cardTarget.addEventListener('mouseenter', runAnimations);
    cardTarget.addEventListener('mouseleave', revertAnimations);

    return () => {
      cardTarget.removeEventListener('mouseenter', runAnimations);
      cardTarget.removeEventListener('mouseleave', revertAnimations);
    };
  });

  return () => {
    cleanups.forEach((cleanup) => {
      cleanup();
    });
  };
}

function cardAnimationsMobileAndTablet() {
  const cards = gsap.utils.toArray<HTMLElement>('.card');

  cards.forEach((card) => {
    const linkButton = card.querySelector('.card-button');
    const smallTitle = card.querySelector('.small-title-inner');
    const year = card.querySelector('.year-inner');
    const mainTitles = card.querySelectorAll<HTMLElement>('.title-inner');
    const title = new SplitType(mainTitles);

    const targets = {
      linkButton,
      smallTitle,
      year,
      title
    };

    runCardAnimations(targets);
  });
}

function runCardAnimations(targets: any) {
  const { linkButton, smallTitle, year, title } = targets;

  gsap.fromTo(
    linkButton,
    {
      scale: 0
    },
    { scale: 1, duration: 0.4, ease: 'power1.in' }
  );

  gsap.fromTo(
    smallTitle,
    {
      yPercent: 0
    },
    { yPercent: -100, duration: 0.3, ease: 'power1.in' }
  );

  gsap.fromTo(
    year,
    {
      yPercent: 0
    },
    { yPercent: -100, duration: 0.3, ease: 'power1.in' }
  );

  gsap.fromTo(
    title.chars,
    {
      yPercent: 0,
      opacity: 0
    },
    {
      yPercent: -100,
      opacity: 1,
      scale: 0.9,
      duration: 0.3,
      stagger: { amount: 0.25 },
      ease: 'none'
    }
  );
}

function revertCardAnimations(targets: any) {
  const { linkButton, smallTitle, year, title } = targets;

  gsap.fromTo(
    linkButton,
    {
      scale: 1
    },
    { scale: 0, duration: 0.2, ease: 'power1.out' }
  );

  gsap.fromTo(
    smallTitle,
    {
      yPercent: -100
    },
    { yPercent: 0, duration: 0.2, ease: 'power1.out' }
  );

  gsap.fromTo(
    year,
    {
      yPercent: -100
    },
    { yPercent: 0, duration: 0.2, ease: 'power1.out' }
  );

  gsap.fromTo(
    title.chars,
    {
      yPercent: -100,
      opacity: 1
    },
    {
      yPercent: 0,
      opacity: 0,
      scale: 0.9,
      duration: 0.2,
      stagger: { amount: 0.15 },
      ease: 'power1.out'
    }
  );
}

// projects-menu
(() => {
  const links = gsap.utils.toArray('.header__link');
  const activeLink = document.querySelector('.header__link--active');
  const navigation = document.querySelector('.projects-header__navigation');
  const menuButton = document.querySelector('.projects-header__menu-button');

  const menuShowTl = gsap.timeline();
  const enterButtonTl = gsap.timeline();
  const leaveButtonTl = gsap.timeline();
  let mm = gsap.matchMedia();

  mm.add('(min-width: 768px)', () => {
    menuShowTl
      .fromTo(
        links,
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
      .to(activeLink, {
        '--before-visibility': 'visible',
        '--animation-in': 'highlight-in 300ms ease-in forwards'
      });
  });

  // hover link
  links.forEach((link) => {
    (link as HTMLElement).addEventListener('mouseenter', () => {
      gsap.to(link as HTMLElement, {
        '--before-visibility': 'visible',
        '--animation-in': 'highlight-in 300ms ease-in forwards'
      });
    });

    (link as HTMLElement).addEventListener('mouseleave', () => {
      gsap.to(link as HTMLElement, {
        '--animation-out': 'highlight-out 300ms ease-in forwards',
        duration: 0
      });
    });
  });

  const hoverButtonFunction = () => {
    enterButtonTl
      .to(menuButton, {
        marginRight: 'auto'
      })
      .to(
        navigation,
        {
          background: 'var(--color-dark-always)'
        },
        0
      )
      .to(
        links,
        {
          yPercent: 0,
          autoAlpha: 1
        },
        0
      )
      .to(activeLink, {
        '--before-visibility': 'visible',
        '--animation-in': 'highlight-in 300ms ease-in forwards'
      });
  };

  const leaveButtonFunction = () => {
    leaveButtonTl
      .to(menuButton, {
        marginRight: '0'
      })
      .to(
        navigation,
        {
          background: 'transparent'
        },
        0
      )
      .to(
        links,
        {
          yPercent: 100,
          autoAlpha: 0
        },
        0
      );
  };

  // hover button
  mm.add('(max-width: 768px)', () => {
    menuButton?.addEventListener('mouseenter', hoverButtonFunction);

    navigation?.addEventListener('mouseleave', leaveButtonFunction);
  });

  // window resize - up md - show links
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      links.forEach((link) => {
        (link as HTMLElement).style.visibility = 'visible';
      });
      navigation?.removeEventListener('mouseleave', leaveButtonFunction);
    }
  });
})();
