const modalElem = document.querySelector('.modal');
const createEventCloseBtn = document.querySelector('.create-event__close-btn');

export function openModal() {
  modalElem.style.display = 'flex';
}

export function closeModal() {
  modalElem.style.display = 'none';
}

createEventCloseBtn.addEventListener('click', closeModal);