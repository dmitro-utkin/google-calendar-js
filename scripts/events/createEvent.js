import { getItem, setItem } from '../common/storage.js';
import { createEvent, updateEvent } from '../common/gateways.js';
import { renderEvents } from './events.js';
import { getDateTime } from '../common/utils.js';
import { closeModal } from '../common/modal.js';

export const eventFormElem = document.querySelector('.event-form');
const closeEventFormBtn = document.querySelector('.create-event__close-btn');
const createButton = document.querySelector('.event-form__submit-btn');

const clearEventForm = () => eventFormElem.reset();

export const onCloseEventForm = () => {
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
    color: color,
  };

  console.log('Event details:', eventDetails);

  const action =
    createButton.textContent === 'Edit'
      ? updateEvent(+getItem('eventIdToDelete'), eventDetails)
      : createEvent(eventDetails);

  const response = await action;

  const events = getItem('events') || [];

  if (response.ok) {
    console.log('Event created successfully');
    const newEvent = await response.json();
    events.push(newEvent);
    setItem('events', events);
  } else {
    console.error('Failed to create event:', response.statusText);
  }
  
  console.log('Closing event form');
  onCloseEventForm();
  console.log('Rendering events');
  renderEvents();
};


export const initEventForm = () => {
  createButton.addEventListener('click', onCreateEvent);
  closeEventFormBtn.addEventListener('click', onCloseEventForm);
};
