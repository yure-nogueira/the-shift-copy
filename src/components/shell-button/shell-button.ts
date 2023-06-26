import { gsap } from "gsap";

const targets = gsap.utils.toArray<HTMLElement>("[shell-button-target]");

targets.forEach((target) => {
  const shellButton = target.querySelector(
    '[animation="shell-button"]'
  ) as HTMLElement;
  const shell = shellButton.querySelector(
    '[animation="shell-button-shell"]'
  ) as HTMLElement;
  let showingDefaultLabel = true;

  target.addEventListener("mouseenter", () =>
    animateShellButton(shell, 0, -100)
  );

  target.addEventListener("mouseleave", () =>
    animateShellButton(shell, -100, -210)
  );

  if (shellButton.hasAttribute("shell-button-toggles")) {
    const defaultLabel = shellButton.querySelector(
      '[animation="shell-button-default-label"]'
    ) as HTMLElement;

    const secondaryLabel = shellButton.querySelector(
      '[animation="shell-button-secondary-label"]'
    ) as HTMLElement;

    target.addEventListener("click", () => {
      if (showingDefaultLabel) {
        animateShellButton(defaultLabel, 0, -100, 0.6);
        animateShellButton(secondaryLabel, 0, -100, 0.6);
        showingDefaultLabel = false;
      } else {
        animateShellButton(defaultLabel, -100, 0, 0.6);
        animateShellButton(secondaryLabel, -100, 0, 0.6);
        showingDefaultLabel = true;
      }
    });
  }
});

function animateShellButton(
  el: HTMLElement,
  yStart: number,
  yEnd: number,
  duration = 0.3
) {
  gsap.fromTo(
    el,
    {
      yPercent: yStart,
    },
    {
      yPercent: yEnd,
      duration,
    }
  );
}
