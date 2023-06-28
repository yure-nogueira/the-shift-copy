import { gsap } from 'gsap';

const perfis = document.querySelectorAll('.perfil');

perfis.forEach((perfil) => {
  let perfilOpened = false;
  const perfilTL = gsap.timeline({
    defaults: { duration: 0.5, ease: 'power1.out' }
  });

  perfil.addEventListener('click', () => {
    const perfilText = perfil.querySelectorAll(
      '[shell-button-target] .perfil__text'
    );

    if (!perfilOpened) {
      perfilOpened = true;
      perfilTL

        .to(perfilText, {
          height: 'auto'
        })
        .to(
          perfilText,
          {
            opacity: 1
          },
          '<'
        );
    } else {
      perfilOpened = false;
      perfilTL
        .to(perfilText, {
          opacity: 0
        })
        .to(
          perfilText,
          {
            height: 0
          },
          '<'
        );
    }
  });
});
