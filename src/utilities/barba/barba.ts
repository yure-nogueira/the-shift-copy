import barba from "@barba/core";
import barbaCss from "@barba/css";
// import { gsap } from "gsap";

barba.use(barbaCss);

barba.init({
  transitions: [
    {
      name: "transition",
      to: {
        namespace: ["home", "research", "about"],
      },
      once() {},
      leave() {},
      enter() {},
    },
  ],
});
