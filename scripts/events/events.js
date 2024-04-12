import { getItem, setItem } from '../common/storage.js';
import shmoment from '../common/shmoment.js';
import { openPopup, closePopup } from '../common/popup.js';

const weekElem = document.querySelector('.calendar__week');
const deleteEventBtn = document.querySelector('.delete-event-btn');


const handleEventClick = (event) => {
  const target = event.target.closest('.event');
  if (!target) {
    return;
  }
  openPopup(event.clientX, event.clientY);
  setItem('eventIdToDelete', target.dataset.eventId);

  // если произошел клик по событию, то нужно паказать попап с кнопкой удаления
  // установите eventIdToDelete с id события в storage
};



function removeEventsFromCalendar() {
  // f-ция для удаления всех событий с календаря
  const eventsElems = document.querySelectorAll('.event');
  if (eventsElems) {
    eventsElems.forEach(eventElem => eventElem.remove());
  }
}

const createEventElement = (event) => {
  // ф-ция создает DOM элемент события
  // событие должно позиционироваться абсолютно внутри нужной ячейки времени внутри дня
  // нужно добавить id события в дата атрибут
  // здесь для создания DOM элемента события используйте document.createElement

  const { start, end, title, id, description  } = event;

  const eventElem = document.createElement('div');
  eventElem.dataset.eventId = id;
  eventElem.style.top = start.getMinutes() + 'px';
  let eventHeight = end - start;
  eventHeight /= 60000;

  eventHeight = Math.max(eventHeight, 100);
  eventElem.style.height = eventHeight.toFixed() + 'px';
  eventElem.classList.add('event');

  const eventTitleElem = document.createElement('div');
  eventTitleElem.textContent = title;
  eventTitleElem.classList.add('event__title');

  const eventTimeElem = document.createElement('div');
  eventTimeElem.textContent = `${start.getHours()}:${start.getMinutes()} - ${end.getHours()}:${end.getMinutes()}`;
  eventTimeElem.classList.add('event__time');
  
  const eventDescriptionElem = document.createElement('div');
  eventDescriptionElem.textContent = description;
  eventDescriptionElem.classList.add('event__description');
  
  eventElem.append(eventTitleElem, eventTimeElem, eventDescriptionElem);
  return eventElem;
};

export const renderEvents = () => {
  // достаем из storage все события и дату понедельника отображаемой недели
  // фильтруем события, оставляем только те, что входят в текущую неделю
  // создаем для них DOM элементы с помощью createEventElement
  // для каждого события находим на странице временную ячейку (.calendar__time-slot)
  // и вставляем туда событие
  // каждый день и временная ячейка должно содержать дата атрибуты, по которым можно будет найти нужную временную ячейку для события
  // не забудьте удалить с календаря старые события перед добавлением новых
  removeEventsFromCalendar();
  // const events = getItem('events') || [];
  // const startDateTime = getItem('displayedWeekStart');
  const events = JSON.parse(localStorage.getItem('events')) || [];
  const startDateTime = JSON.parse(localStorage.getItem('displayedWeekStart'));
  const endDateTime = shmoment(startDateTime).add('days', 7).result();
  events
    .filter(event => {
      return event.start >= startDateTime && event.end < endDateTime;
    })
    .forEach(event => {
      const { start } = event;
      const eventElem = createEventElement(event);
      const slotElem = document.querySelector(
        `.calendar__day[data-day="${start.getDate()}"] .calendar__time-slot[data-time="${start.getHours()}"]`
      );
      slotElem.append(eventElem);
    });
};

function onDeleteEvent() {
  console.log('Deleting event...');
  const events = getItem('events');
  const eventIdToDelete = getItem('eventIdToDelete');
  console.log('Events from storage:', events);
  console.log('Event id to delete:', eventIdToDelete);
  const index = events.findIndex(event => String(event.id) === String(eventIdToDelete));
  console.log('Found event index:', index);

  events.splice(index, 1);
  
  setItem('events', events);
  setItem('eventIdToDelete', null);

  console.log('Closing popup...');
  closePopup();

  console.log('Re-rendering events...');
  renderEvents();
  console.log('Done.');
}



deleteEventBtn.addEventListener('click', onDeleteEvent);

weekElem.addEventListener('click', handleEventClick);
