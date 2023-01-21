/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable @typescript-eslint/no-explicit-any */
import Swiper, { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const swiperContainers = [...document.querySelectorAll('.swiper-container')];
const swipers = new Map();
const colors = ['#22c55e', '#eab308', '#ec4899'];

hideControls();
swiperInit();

function swiperInit() {
  swiperContainers.forEach((el, idx) => {
    const disableSwiperAboveThis = parseFloat(el?.getAttribute('disable-swp-above') || '1440');
    const debugMode = parseBoolean(el.getAttribute('debug-mode') || 'false');
    let swiperIsOn = swipers.get(idx)?.enabled || false;
    if (window.innerWidth < disableSwiperAboveThis && !swiperIsOn) {
      showControls();
      swiperIsOn = true;
      const swpEnabled = parseBoolean(el.getAttribute('swp-enabled') || 'false');
      const swpMEnabled = parseBoolean(el.getAttribute('swp-m-enabled') || 'true');
      const swpSEnabled = parseBoolean(el.getAttribute('swp-s-enabled') || 'true');
      const swpSlideCount = parseFloat(el.getAttribute('swp-slide-count') || '1');
      const swpMSlideCount = parseFloat(el.getAttribute('swp-m-slide-count') || '1');
      const swpSSlideCount = parseFloat(el.getAttribute('swp-s-slide-count') || '1');
      const swpSpace = parseFloat(el.getAttribute('swp-space') || '0');
      const swpMSpace = parseFloat(el.getAttribute('swp-m-space') || '0');
      const swpSSpace = parseFloat(el.getAttribute('swp-s-space') || '0');
      const swpCentered = parseBoolean(el.getAttribute('swp-centered') || 'false');
      const swpMCentered = parseBoolean(el.getAttribute('swp-m-centered') || 'false');
      const swpSCentered = parseBoolean(el.getAttribute('swp-s-centered') || 'false');
      const swpLoop = parseBoolean(el.getAttribute('swp-loop') || 'false');
      const swpMLoop = parseBoolean(el.getAttribute('swp-m-loop') || 'false');
      const swpSLoop = parseBoolean(el.getAttribute('swp-s-loop') || 'false');
      const swpAutoplay = parseBoolean(el.getAttribute('swp-autoplay') || 'false');
      const swpMAutoplay = parseBoolean(el.getAttribute('swp-m-autoplay') || 'false');
      const swpSAutoplay = parseBoolean(el.getAttribute('swp-s-autoplay') || 'false');
      const swiper = new Swiper(el as HTMLElement, {
        modules: [Navigation, Pagination],
        slidesPerView: swpSlideCount,
        spaceBetween: swpSpace,
        centeredSlides: swpCentered,
        loop: swpLoop,
        autoplay: swpAutoplay,
        enabled: swpEnabled,
        navigation: {
          prevEl: '.custom-navigation-prev',
          nextEl: '.custom-navigation-next',
        },
        pagination: {
          el: '.custom-pagination-wrapper',
          bulletClass: 'custom-bullet',
          bulletActiveClass: 'custom-bullet-active',
          clickable: true,
        },
        breakpoints: {
          240: {
            slidesPerView: swpSSlideCount,
            spaceBetween: swpSSpace,
            centeredSlides: swpSCentered,
            loop: swpSLoop,
            autoplay: swpSAutoplay,
            enabled: swpSEnabled,
          },
          797: {
            slidesPerView: swpMSlideCount,
            spaceBetween: swpMSpace,
            centeredSlides: swpMCentered,
            loop: swpMLoop,
            autoplay: swpMAutoplay,
            enabled: swpMEnabled,
          },
          991: {
            slidesPerView: swpSlideCount,
            spaceBetween: swpSpace,
            centeredSlides: swpCentered,
            loop: swpLoop,
            autoplay: swpAutoplay,
            enabled: swpEnabled,
          },
        },
      });
      el.querySelector('.swiper-wrapper')?.classList.remove('custom-wrapper');
      swipers.set(idx, swiper);
      document.querySelectorAll;
      debugMode &&
        console.log(
          `%c Swiper${
            swiperContainers.length > 1 ? ' #' + Number(idx + 1) : ''
          } is ON. Window size < ${disableSwiperAboveThis}px.`,
          `background: #222; color: ${colors[idx] || colors[idx % colors.length]}`
        );
    } else if (swiperIsOn && window.innerWidth > disableSwiperAboveThis) {
      hideControls();
      const swiper = swipers.get(idx);
      swiper.destroy(true, true);
      [...el.querySelectorAll('.swiper-slide')].forEach((slide) => {
        (slide as HTMLElement).style.width = 'auto';
      });
      el.querySelector('.swiper-wrapper')?.classList.add('custom-wrapper');
      debugMode &&
        console.log(
          `%c Swiper${
            swiperContainers.length > 1 ? ' #' + Number(idx + 1) : ''
          } is OFF. Window size > ${disableSwiperAboveThis}px.`,
          `background: #222; color: ${colors[idx] || colors[idx % colors.length]}`
        );
    } else if (!swiperIsOn && window.innerWidth > disableSwiperAboveThis) {
      [...el.querySelectorAll('.swiper-slide')].forEach((slide) => {
        (slide as HTMLElement).style.width = 'auto';
      });
    }
  });
}

window.addEventListener(
  'resize',
  debounce(function () {
    swiperInit();
  })
);

function parseBoolean(str: string) {
  return str === 'true' && true;
}

function debounce(func: any) {
  let timer: any;
  return function (event: any) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(func, 100, event);
  };
}

function hidePagination() {
  document.querySelector('.custom-pagination-wrapper')?.classList.add('custom-pagination-hidden');
}

function showPagination() {
  document
    .querySelector('.custom-pagination-wrapper')
    ?.classList.remove('custom-pagination-hidden');
}

function hideNavigation() {
  document.querySelector('.custom-navigation-prev')?.classList.add('custom-pagination-hidden');
  document.querySelector('.custom-navigation-next')?.classList.add('custom-pagination-hidden');
}

function showNavigation() {
  document.querySelector('.custom-navigation-prev')?.classList.remove('custom-pagination-hidden');
  document.querySelector('.custom-navigation-next')?.classList.remove('custom-pagination-hidden');
}

function hideControls() {
  hidePagination();
  hideNavigation();
}

function showControls() {
  showPagination();
  showNavigation();
}

const style = document.createElement('style');
style.textContent = `
    .custom-pagination-wrapper. .styler {
      display: none;
    }
    .swiper-horizontal > .swiper-pagination-bullets {
      bottom: 0;  
    }
    .custom-pagination-hidden {
      display: none;
    }
  `;

document.body.appendChild(style);
