const modalElem = document.querySelector('.modal');
const modalContentElem = document.querySelector('.modal__content');
const createEventCloseBtn = document.querySelector('.create-event__close-btn');

// опишите ф-ции openModal и closeModal
// модальное окно работает похожим на попап образом
// отличие в том, что попап отображается в месте клика, а модальное окно - по центру экрана

export function openModal() {
  modalElem.style.display = 'flex';
}

export function closeModal() {
  modalElem.style.display = 'none';
}

createEventCloseBtn.addEventListener('click', closeModal);