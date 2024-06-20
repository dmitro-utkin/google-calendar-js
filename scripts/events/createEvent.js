import { getItem, setItem } from '../common/storage.js';
import { createEvent } from '../common/gateways.js';
import { renderEvents } from './events.js';
import { getDateTime } from '../common/utils.js';
import { closeModal } from '../common/modal.js';

export const eventFormElem = document.querySelector('.event-form');

const clearEventForm = () => eventFormElem.reset();

export const onCloseEventForm = () => {
  closeModal();
  clearEventForm();
};

export const handleCreate = async e => {
  e.preventDefault();

  const formData = Object.fromEntries(new FormData(eventFormElem).entries());
  const { title, description, date, startTime, endTime, color } = formData;

  const response = await createEvent({
    title,
    description,
    start: getDateTime(date, startTime),
    end: getDateTime(date, endTime),
    date,
    color,
  });

  if (response.ok) {
    setItem('events', [...getItem('events'), await response.json()]);
    onCloseEventForm();
    renderEvents();
  } else {
    console.error('Failed to create the event:', response.statusText);
  }
};
