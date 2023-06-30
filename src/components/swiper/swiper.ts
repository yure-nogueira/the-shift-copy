//@ts-ignore
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

//@ts-ignore
const slides = document.querySelectorAll('.swiper__slide');

/**
 ** swiper
 **/
//@ts-ignore
const swiper = new Swiper('.swiper', {
  slidesPerView: 1.5,
  freeMode: true,
  loop: true,
  updateOnWindowResize: true,
  parallax: true,
  speed: 600,
  grabCursor: true,
  breakpoints: {
    1240: {
      slidesPerView: 2.5
    }
  }
});

/**
 ** animation triggers
 **/
//  slides.forEach((slide) => {
//   const title = slide.querySelector('.swiper__title') as HTMLElement;

//   slide.addEventListener('mouseleave', () => {
//     title.style.animationPlayState = 'running';

//     setTimeout(() => {
//       title.style.animation = 'none';
//     }, 600);

//     setTimeout(() => {
//       title.style.animation = '';
//     }, 650);
//   });
// });

// window.addEventListener('DOMContentLoaded', () => {
//   const slides = document.querySelectorAll('.swiper__slide');
//   slides.forEach((slide) => {
//     // const shades = slide.querySelector('.swiper__shades');
//     const image = slide.querySelector('.swiper__img') as HTMLElement;

//     // shades.style.animationPlayState = 'running';
//     image.style.animationPlayState = 'running';
//   });
// });
