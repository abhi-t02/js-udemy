'use strict';

const modal = document.querySelector('.modal');
const showModelsBtn = document.querySelectorAll('.show-modal');
const closeModal = document.querySelector('.close-modal');
const overlay = document.querySelector('.overlay');

const openModal = () => {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModalFunc = () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

showModelsBtn.forEach((btnShowModal, index) => {
  btnShowModal.addEventListener('click', openModal);
});

closeModal.addEventListener('click', closeModalFunc);

overlay.addEventListener('click', closeModalFunc);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModalFunc();
});
