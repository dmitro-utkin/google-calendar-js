const modalElem = document.querySelector('.modal');
const createEventCloseBtn = document.querySelector('.create-event__close-btn');

export const openModal = () => {
  modalElem.style.display = 'flex';
  const currentDate = new Date();
  const currentTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateInput = document.querySelector('input[name="date"]');
  const startTimeInput = document.querySelector('input[name="startTime"]');
  
  dateInput.value = currentDate.toISOString().slice(0, 10);
  startTimeInput.value = currentTime;
};

export const closeModal = () => {
  modalElem.style.display = 'none';
};

createEventCloseBtn.addEventListener('click', closeModal);