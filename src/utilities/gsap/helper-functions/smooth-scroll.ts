import { ScrollTrigger } from "gsap/ScrollTrigger";

import LocomotiveScroll from "locomotive-scroll";

export const container = document.querySelector(
  ".page-container"
) as HTMLElement;

export const locoScroll = new LocomotiveScroll({
  el: container,
  smooth: true,
  lerp: 0.05,
});

export const scrollSetup = function (
  locomotiveScroll: LocomotiveScroll,
  scrollContainer: HTMLElement
) {
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locomotiveScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(scrollContainer, {
    scrollTop(value) {
      return arguments.length
        ? locomotiveScroll.scrollTo(value, 0, 0)
        : locomotiveScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: scrollContainer.style.transform ? "transform" : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locomotiveScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();

  ScrollTrigger.defaults({
    scroller: scrollContainer,
  });
};

// scrollSetup(locoScroll, container);

export const scrollToTop = function (
  locomotiveScroll: LocomotiveScroll,
  button: HTMLElement
) {
  button.addEventListener("click", () => {
    locomotiveScroll.scrollTo(0);
  });
};
