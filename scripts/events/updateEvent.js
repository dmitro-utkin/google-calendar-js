import { getItem } from '../common/storage.js';
import { serverUrl, updateEvent } from '../common/gateways.js';
import { closePopup } from '../common/popup.js';
import { openModal, closeModal } from '../common/modal.js';
import { getDateTime } from '../common/utils.js';
import { renderEvents } from './events.js';

const editEventBtn = document.querySelector('.events-btn__edit-btn');
const formSubmitBtn = document.querySelector('.event-form__submit-btn');
const formElem = document.querySelector('.event-form');

const fillEditForm = async () => {
  const { title, description, start, end, date } = await fetch(
    `${serverUrl}/${getItem('eventIdToDelete')}`,
  ).then(response => response.json());
  const setinputValue = (selector, value) => (document.querySelector(selector).value = value);
  const formatTime = date => date.toTimeString().slice(0, 5);

  setinputValue('input[name="title"]', title);
  setinputValue('textarea[name="description"]', description);
  setinputValue('input[name="date"]', date);
  setinputValue('input[name="startTime"]', formatTime(new Date(start)));
  setinputValue('input[name="endTime"]', formatTime(new Date(end)));
};

const handleUpdate = async e => {
  e.preventDefault();

  const formData = Object.fromEntries(new FormData(formElem).entries());
  const { startTime, endTime, date, ...rest } = formData;
  const eventDetails = {
    ...rest,
    start: getDateTime(date, startTime),
    end: getDateTime(date, endTime),
  };
  const response = await updateEvent(getItem('eventIdToDelete'), eventDetails);

  if (response.ok) {
    await renderEvents();
    closeModal();
  } else {
    console.error('Failed to update the event:', response.statusText);
  }
};

export const initEditEvent = () => {
  editEventBtn.addEventListener('click', () => {
    openModal();
    closePopup();
    fillEditForm();
    formSubmitBtn.textContent = 'Edit';
    formSubmitBtn.addEventListener('click', handleUpdate, { once: true });
  });
};
