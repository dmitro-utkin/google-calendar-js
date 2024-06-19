import { setItem } from '../common/storage.js';
import { getEventsList, serverUrl } from '../common/gateways.js';
import { openPopup } from '../common/popup.js';
import { initDeleteEventBtn } from './deleteEvents.js';
import { initEditEvent } from './updateEvent.js';
import { handleColorButtonClick } from './eventsColor.js';

const weekElem = document.querySelector('.calendar__week');

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
  const { start, end, title, id, description, color } = event;
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
  eventElem.style.backgroundColor = color;

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

weekElem.addEventListener('click', handleEventClick);

export const initEventActions = () => {
  initDeleteEventBtn();
  initEditEvent();
  handleColorButtonClick();
};
