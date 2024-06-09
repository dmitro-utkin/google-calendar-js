import { getItem, setItem } from '../common/storage.js';
import { createEvent } from '../common/gateways.js';
import { renderEvents } from './events.js';
import { getDateTime } from '../common/time.utils.js';
import { closeModal } from '../common/modal.js';

export const eventFormElem = document.querySelector('.event-form');
const closeEventFormBtn = document.querySelector('.create-event__close-btn');

const clearEventForm = () => eventFormElem.reset();

const onCloseEventForm = () => {
  closeModal();
  clearEventForm();
}
const onCreateEvent = async (event) => {
  event.preventDefault();
  
  const formData = new FormData(eventFormElem);
  const { title, description, date, startTime, endTime } = Object.fromEntries(formData.entries());

  const eventDetails = {
    title,
    description,
    start: getDateTime(date, startTime),
    end: getDateTime(date, endTime),
    date,
  };

  const events = getItem('events') || [];

  const response = await createEvent(eventDetails);

  if (response.ok) {
    events.push(await response.json());
    setItem('events', events);
  } else {
    console.error('Failed to create event:', response.statusText);
  }

  onCloseEventForm();
  renderEvents();
};


export const initEventForm = () => {
  eventFormElem.addEventListener('submit', onCreateEvent);
  closeEventFormBtn.addEventListener('click', onCloseEventForm);
};
