'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function (e) {
  e.preventDefault();
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// for (let i = 0; i < btnsOpenModal.length; i++)
btnsOpenModal.forEach(btnOpenModal => {
  btnOpenModal.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// creating elements
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML =
  " We use cookies for improving performance.<button class='btn btn--close-cookie'>Got it!</button>";
const header = document.querySelector('.header');

// append message as first child
header.prepend(message);

// append message as last child of element
// header.append(message);

document.querySelector('.btn--close-cookie').addEventListener('click', e => {
  e.preventDefault();
  message.remove();
});

// changing style of attributes
message.style.backgroundColor = '#37383d';
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 20 + 'px';

// const logo = document.querySelector('.nav__logo');
// console.log(logo.src);
// console.log(logo.getAttribute('src'));

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

// for smooth scrolling to view
btnScrollTo.addEventListener('click', e => {
  e.preventDefault();
  // const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });
  section1.scrollIntoView({ behavior: 'smooth' });
});

// document.querySelectorAll('.nav__link').forEach(el => {
//   el.addEventListener('click', e => {
//     e.preventDefault();
//     const id = el.getAttribute('href').slice(1);
//     console.log(id);
//     document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

document.querySelector('.nav__links').addEventListener('click', e => {
  e.preventDefault();
  // console.log(e.target);
  if (e.target.classList.contains('nav__link')) {
    document
      .querySelector(e.target.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
  }
});

// DOM traversal
// const h1 = document.querySelector("h1");

const container = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const contents = document.querySelectorAll('.operations__content');

container.addEventListener('click', e => {
  e.preventDefault();
  // console.log(e.target);
  const clicked = e.target.closest('.operations__tab');

  if (!clicked) return;

  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  contents.forEach(content =>
    content.classList.remove('operations__content--active')
  );
  // console.log(clicked.dataset.tab);
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// navigation styling
const handler = (e, opacity) => {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;

    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      el.style.opacity = opacity;
    });
    link.style.opacity = 1;
  }
};
nav.addEventListener('mouseover', e => handler(e, 0.5));
nav.addEventListener('mouseout', e => handler(e, 1));

// sticky behaviour
// const initialCoaard = section1.getBoundingClientRect();

// window.addEventListener('scroll', e => {
//   if (window.scrollY > initialCoaard.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

// observer API
const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      !entry.isIntersecting
        ? nav.classList.add('sticky')
        : nav.classList.remove('sticky');
    });
  },
  {
    root: null,
    threshold: [0.2],
  }
);
observer.observe(header);

const sectionObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.remove('section--hidden');

      observer.unobserve(entry.target);
    });
  },
  {
    root: null,
    threshold: 0.1,
  }
);

document
  .querySelectorAll('.section')
  .forEach(el => sectionObserver.observe(el));

const imgObserver = new IntersectionObserver(
  (entries, observer) => {
    const [entry] = entries;
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener('load', e => {
      e.target.classList.remove('lazy-img');
    });
    observer.unobserve(entry.target);
  },
  {
    root: null,
    threshold: 0,
  }
);

document
  .querySelectorAll('img[data-src]')
  .forEach(img => imgObserver.observe(img));

// building slider component
let curSlide = 0;

// -----------------------------------------

const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const btnRight = document.querySelector('.slider__btn--right');
const btnLeft = document.querySelector('.slider__btn--left');
// slider.style.overflow = 'visible';

// dots logic
const dotsContainer = document.querySelector('.dots');

const createDots = () => {
  slides.forEach((_, i) => {
    dotsContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
  // const html = `<button class="dots__dot" data-slide="${i}"></button>`;
};

const activeDot = function (slide) {
  document.querySelectorAll('.dots__dot').forEach(dot => {
    dot.classList.remove('dots__dot--active');
  });
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};

const slideTo = curSlide => {
  slides.forEach(
    (slide, i) =>
      (slide.style.transform = `translateX(${100 * (i - curSlide)}%)`)
  );
};

const init = () => {
  createDots();
  activeDot(0);
};
init();

dotsContainer.addEventListener('click', e => {
  e.preventDefault();
  // console.log(e.target.dataset.slide);
  curSlide = e.target.dataset.slide;
  activeDot(curSlide);
  slideTo(curSlide);
});

slides.forEach(
  (slide, i) => (slide.style.transform = `translateX(${100 * i}%)`)
);

// right btn
btnRight.addEventListener('click', e => {
  e.preventDefault();
  curSlide++;
  if (curSlide === slides.length) curSlide = 0;
  activeDot(curSlide);
  slideTo(curSlide);
});

// left btn
btnLeft.addEventListener('click', e => {
  e.preventDefault();
  curSlide--;
  if (curSlide === -1) curSlide = slides.length - 1;
  activeDot(curSlide);
  slideTo(curSlide);
});
