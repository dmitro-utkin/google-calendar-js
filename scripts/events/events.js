import { getItem, setItem } from '../common/storage.js';
import {
  getEventsList,
  updateEvent,
  serverUrl,
  deleteEvent
} from '../common/gateways.js';
import { openPopup, closePopup } from '../common/popup.js';
import { openModal, closeModal } from '../common/modal.js';

const weekElem = document.querySelector('.calendar__week');
const deleteEventBtn = document.querySelector('.events-btn__delete-btn');
const editEventBtn = document.querySelector('.events-btn__edit-btn');

const handleEventClick = (event) => {
  event.preventDefault();
  const target = event.target.closest('.event');
  if (!target) {
    return;
  }
  openPopup(event.clientX, event.clientY);
  setItem('eventIdToDelete', target.dataset.eventId);
};

const removeEventsFromCalendar = () => {
  const eventsElems = document.querySelectorAll('.event');
  eventsElems.forEach((eventElem) => eventElem.remove());
};


const createEventElement = (event) => {
  const { start, end, title, id, description, colorId } = event;
  const startDate = new Date(start);
  const endDate = new Date(end);
  const formatTime = (date) => (date + '').padStart(2, '0');
  const startHours = formatTime(startDate.getHours());
  const startMinutes = formatTime(startDate.getMinutes());
  const endHours = formatTime(endDate.getHours());
  const endMinutes = formatTime(endDate.getMinutes());

  const eventTimeContent = `${startHours}:${startMinutes} - ${endHours}:${endMinutes}`;

  const eventElem = document.createElement('div');
  eventElem.dataset.eventId = id;
  eventElem.style.top = startDate.getMinutes() + 'px';
  eventElem.style.height = ((endDate - startDate) / 60000).toFixed() + 'px';
  eventElem.classList.add('event');
  eventElem.style.backgroundColor = colorId;

  const eventTitleElem = document.createElement('div');
  eventTitleElem.textContent = title;
  eventTitleElem.classList.add('event__title');

  const eventTimeElem = document.createElement('div');
  eventTimeElem.textContent = eventTimeContent;
  eventTimeElem.classList.add('event__time');

  const eventDescriptionElem = document.createElement('div');
  eventDescriptionElem.textContent = description;
  eventDescriptionElem.classList.add('event__description');

  eventElem.append(eventTitleElem, eventTimeElem, eventDescriptionElem);
  return eventElem;
};

export const renderEvents = async () => {
  removeEventsFromCalendar();
  const events = await getEventsList(serverUrl);
  const eventsByDateAndTime = events.reduce((events, event) => {
    const { start } = event;
    const startDate = new Date(start);
    const day = startDate.getDate();
    const month = startDate.getMonth() + 1;
    const time = startDate.getHours();
    const key = `${day}-${month}-${time}`;
    events[key] = events[key] || [];
    events[key].push(event);
    return events;
  }, {});

  const timeSlotsElems = document.querySelectorAll('.calendar__time-slot');
  timeSlotsElems.forEach((timeSlotElem) => {
    const day = timeSlotElem.closest('.calendar__day').dataset.day;
    const time = timeSlotElem.dataset.time;
    const month = timeSlotElem.closest('.calendar__day').dataset.month;
    const key = `${day}-${month}-${time}`;
    const eventsForTimeSlot = eventsByDateAndTime[key] || [];
    eventsForTimeSlot.forEach((event) => {
      timeSlotElem.append(createEventElement(event));
    });
  });
};

const fillForm = ({ title, description, start, end, date }) => {
  const formInputs = document.querySelectorAll('input[name], textarea[name]');
  const inputs = {
    title: formInputs[0],
    description: formInputs[1],
    date: formInputs[2],
    startTime: formInputs[3],
    endTime: formInputs[4]
  };

  const startTime = new Date(start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const endTime = new Date(end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  Object.entries({ title, description, date, startTime, endTime }).forEach(([name, value]) => {
    inputs[name].value = value;
  });
};

const onEventUpdate = async () => {
  const eventIdToUpdate = getItem('eventIdToDelete');

  const response = await fetch(`${serverUrl}/${eventIdToUpdate}`);
  const event = await response.json();
  closePopup();
  openModal();
  fillForm(event);

  const form = document.querySelector('.event-form');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const response = await updateEvent(serverUrl, eventIdToUpdate);

    if (response.ok) {
      onDeleteEvent();
      await renderEvents();
      closeModal();
    } else {
      console.error('Failed to update event:', response.statusText);
    }
  });
};


const onDeleteEvent = () => {
  const eventIdToDelete = getItem('eventIdToDelete');

  deleteEvent(eventIdToDelete).then(() => {
    const events = getItem('events');
    const index = events.findIndex(
      event => String(event.id) === String(eventIdToDelete)
    );
    events.splice(index, 1);

    setItem('events', events);
    setItem('eventIdToDelete', null);
    closePopup();
    renderEvents();
  });
};

deleteEventBtn.addEventListener('click', onDeleteEvent);

weekElem.addEventListener('click', handleEventClick);

editEventBtn.addEventListener('click', () => {
  onEventUpdate();
  document.querySelector('.event-form__submit-btn').textContent = 'Edit';
});
