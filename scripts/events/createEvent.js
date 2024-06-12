import { getItem, setItem } from '../common/storage.js';
import { createEvent } from '../common/gateways.js';
import { renderEvents } from './events.js';
import { getDateTime } from '../common/utils.js';
import { closeModal } from '../common/modal.js';

export const eventFormElem = document.querySelector('.event-form');
const closeEventFormBtn = document.querySelector('.create-event__close-btn');

const clearEventForm = () => eventFormElem.reset();

const onCloseEventForm = () => {
  closeModal();
  clearEventForm();
}
const onCreateEvent = async (event) => {
  console.log('onCreateEvent called');
  event.preventDefault();
  
  const formData = new FormData(eventFormElem);
  const { title, description, date, startTime, endTime, color } = Object.fromEntries(formData.entries());

  const eventDetails = {
    title,
    description,
    start: getDateTime(date, startTime),
    end: getDateTime(date, endTime),
    date,
    color: color || 'rgb(0, 153, 255)',
  };

  console.log('Event details:', eventDetails);

  const events = getItem('events') || [];

  const response = await createEvent(eventDetails);

  if (response.ok) {
    const newEvent = await response.json();
    console.log('New event created:', newEvent);
    events.push(newEvent);
    setItem('events', events);
  } else {
    console.error('Failed to create event:', response.statusText);
  }

  onCloseEventForm();
  console.log('Rendering events...');
  renderEvents();
};


export const initEventForm = () => {
  // eventFormElem.addEventListener('submit', onCreateEvent);
  closeEventFormBtn.addEventListener('click', onCloseEventForm);
};
