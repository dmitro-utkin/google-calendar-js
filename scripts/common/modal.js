const modalElem = document.querySelector('.modal');
const createEventCloseBtn = document.querySelector('.create-event__close-btn');

export const openModal = () => {
  modalElem.style.display = 'flex';
  const currentDate = new Date();

  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const currentTime = `${hours}:${minutes}`;

  const dateInput = document.querySelector('input[name="date"]');
  const startTimeInput = document.querySelector('input[name="startTime"]');

  dateInput.value = currentDate.toISOString().slice(0, 10);
  startTimeInput.value = currentTime;
};

export const closeModal = () => {
  modalElem.style.display = 'none';
};

createEventCloseBtn.addEventListener('click', closeModal);
