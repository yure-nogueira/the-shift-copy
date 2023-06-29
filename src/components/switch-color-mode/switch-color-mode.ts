import { switchColor } from "./../menu/menu";

(() => {
  const button = document.getElementById("switch-color-mode");
  if (!button) return;

  const html = document.querySelector("html");
  button.addEventListener("click", () => {
    html?.classList.toggle("light-mode");
    switchColor();
  });
})();
