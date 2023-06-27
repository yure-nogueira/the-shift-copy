import { gsap } from "gsap";

import { HOVER_TYPES } from "./../../utilities/constants";

(() => {
  if (window.innerWidth <= 576) return;

  const cursor = document.querySelector(".cursor__circle");
  const container = document.querySelector(".cursor__text-container");
  const span = document.querySelector(".cursor__span");
  const imageContainer = document.querySelector(".cursor__image-container");
  const image = document.querySelector(".cursor__image-background");

  const hoverableElements = document.querySelectorAll(
    `[data-cursor=${HOVER_TYPES.hover}]`
  );
  const draggableElements = document.querySelectorAll(
    `[data-cursor=${HOVER_TYPES.drag}]`
  );
  const explorableElements = document.querySelectorAll(
    `[data-cursor=${HOVER_TYPES.explore}]`
  );
  const imageElements = document.querySelectorAll(
    `[data-cursor=${HOVER_TYPES.image}]`
  );

  let xTo = gsap.quickTo([cursor, imageContainer], "x", {
      duration: 0.4,
      ease: "power3",
    }),
    yTo = gsap.quickTo([cursor, imageContainer], "y", {
      duration: 0.4,
      ease: "power3",
    });

  window.addEventListener("mousemove", (e) => {
    xTo(e.clientX);
    yTo(e.clientY);
  });

  if (hoverableElements || imageElements) {
    [hoverableElements, imageElements].forEach((nodeList) => {
      const array = Array.from(nodeList);
      if (!array) return;

      array.forEach((element) => {
        const type = (element as HTMLElement).dataset.cursor;

        if (!type) return;

        element.addEventListener("mouseenter", () => {
          gsap.to(cursor, {
            scale: 0.2,
          });

          if (type === "image") {
            const imageUrl = (element as HTMLElement).dataset.image;
            (image as HTMLElement).style.background = `url(${imageUrl})`;

            gsap.to(imageContainer, {
              autoAlpha: 1,
              duration: 1,
            });

            gsap.fromTo(
              image,
              {
                yPercent: 100,
              },
              {
                yPercent: 0,
                duration: 1,
              }
            );
          }
        });

        element.addEventListener("mouseleave", () => {
          gsap.to(cursor, {
            scale: 1,
          });

          if (type === "image") {
            gsap.to(imageContainer, {
              autoAlpha: 0,
              duration: 1,
            });

            gsap.fromTo(
              image,
              {
                yPercent: 0,
              },
              {
                yPercent: -100,
                duration: 1,
              }
            );
          }
        });
      });
    });
  }

  if (draggableElements || explorableElements) {
    [draggableElements, explorableElements].forEach((nodeList) => {
      const array = Array.from(nodeList);
      if (!array) return;

      array.forEach((element) => {
        const type = (element as HTMLElement).dataset.cursor;

        if (!type) return;

        element.addEventListener("mouseenter", () => {
          gsap.to(cursor, {
            scale: 4,
          });

          (span as HTMLSpanElement).textContent =
            type === "drag" ? "Drag" : "Explore";

          gsap.fromTo(
            span,
            {
              yPercent: 100,
              opacity: 0,
            },
            {
              yPercent: 0,
              opacity: 1,
              duration: 0.5,
            }
          );
        });

        element.addEventListener("mouseleave", () => {
          gsap.to(cursor, {
            scale: 1,
          });

          if (type === "drag") document.body.style.cursor = "default";

          gsap.fromTo(
            span,
            {
              yPercent: 100,
              opacity: 1,
            },
            {
              yPercent: 100,
              opacity: 0,
              duration: 0.5,
            }
          );

          (span as HTMLSpanElement).textContent = "";
        });

        if (type === "drag") {
          element.addEventListener("mousedown", () => {
            document.body.style.cursor = "grabbing";

            gsap.to(cursor, {
              scale: 2,
            });

            gsap.to(container, {
              scale: 2,
            });
          });

          element.addEventListener("mouseup", () => {
            document.body.style.cursor = "grab";

            gsap.to(cursor, {
              scale: 4,
            });

            gsap.to(container, {
              scale: 1,
            });
          });
        }
      });
    });
  }
})();
