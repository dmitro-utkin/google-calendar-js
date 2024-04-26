import { getItem, setItem, getEventsList,  updateEvent, serverUrl, deleteEvent } from '../common/storage.js';
import shmoment from '../common/shmoment.js';
import { openPopup, closePopup } from '../common/popup.js';
import { openModal, closeModal } from '../common/modal.js';

const weekElem = document.querySelector('.calendar__week');
const deleteEventBtn = document.querySelector('.delete-event-btn');
export const editEventBtn = document.querySelector('.edit-event-btn');

const handleEventClick = (event) => { const target = event.target.closest('.event');
  if (!target) {
    return;
  }
  openPopup(event.clientX, event.clientY);
  setItem('eventIdToDelete', target.dataset.eventId);
};

function removeEventsFromCalendar() {
  const eventsElems = document.querySelectorAll('.event');
  if (eventsElems) {
    eventsElems.forEach(eventElem => eventElem.remove());
  }
}

const createEventElement = (event) => {
  const { start, end, title, id, description  } = event;
  const startDate = new Date(start);
  const endDate = new Date(end);

  const eventElem = document.createElement('div');
  eventElem.dataset.eventId = id;
  eventElem.style.top = startDate.getMinutes() + 'px';
  let eventHeight = end - start;
  eventHeight /= 60000;

  eventHeight = Math.max(eventHeight, 100);
  eventElem.style.height = eventHeight.toFixed() + 'px';
  eventElem.classList.add('event');

  const eventTitleElem = document.createElement('div');
  eventTitleElem.textContent = title;
  eventTitleElem.classList.add('event__title');

  const eventTimeElem = document.createElement('div');
  eventTimeElem.textContent = `${startDate.getHours()}:${startDate.getMinutes()} - ${endDate.getHours()}:${endDate.getMinutes()}`;
  eventTimeElem.classList.add('event__time');
  
  const eventDescriptionElem = document.createElement('div');
  eventDescriptionElem.textContent = description;
  eventDescriptionElem.classList.add('event__description');
  
  eventElem.append(eventTitleElem, eventTimeElem, eventDescriptionElem);
  return eventElem;
};


export const renderEvents = async () => {
  removeEventsFromCalendar();

  const events = await getEventsList(serverUrl); // Fetch events from the server

  events.forEach(event => {
    const { start } = event;
    const startDate = new Date(start);
    const eventElem = createEventElement(event);
    const slotElem = document.querySelector(
      `.calendar__day[data-day="${startDate.getDate()}"] .calendar__time-slot[data-time="${startDate.getHours()}"]`
    );

    slotElem.append(eventElem);
  });  
};

function fillForm(event) {
  const { title, description, start, end, date } = event;

  const titleInput = document.querySelector('input[name="title"]');
  const descriptionInput = document.querySelector('textarea[name="description"]');
  const dateInput = document.querySelector('input[name="date"]');
  const startTimeInput = document.querySelector('input[name="startTime"]');
  const endTimeInput = document.querySelector('input[name="endTime"]');

  const startTime = new Date(start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const endTime = new Date(end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  titleInput.value = title;
  descriptionInput.value = description;
  dateInput.value = date;
  startTimeInput.value = startTime;
  endTimeInput.value = endTime;
}


async function onEventUpdate() {
  const eventIdToUpdate = getItem('eventIdToDelete');

  const response = await fetch(`${serverUrl}/${eventIdToUpdate}`);
  const event = await response.json();

  openModal();
  fillForm(event);

  const form = document.querySelector('.event-form');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const response = await updateEvent(serverUrl, eventIdToUpdate);

    if (response.ok) {
      await onDeleteEvent();
      await renderEvents();
      closeModal();
    } else {
      console.error('Failed to update event:', response.statusText);
    }
  });
}


function onDeleteEvent() {
  const eventIdToDelete = getItem('eventIdToDelete');

  deleteEvent(eventIdToDelete)
    .then(() => {
      const events = getItem('events');
      const index = events.findIndex(event => String(event.id) === String(eventIdToDelete));
      events.splice(index, 1);

      setItem('events', events);
      setItem('eventIdToDelete', null);
      closePopup();
      renderEvents();
    })
}

deleteEventBtn.addEventListener('click', onDeleteEvent);

weekElem.addEventListener('click', handleEventClick);

editEventBtn.addEventListener('click', () => {
  onEventUpdate();
  document.querySelector('.event-form__submit-btn').textContent = 'Edit';
});


// ---------------------------------------
// ---------------------------------------
// ---------------------------------------
// ---------------------------------------
// ---------------------------------------
// ---------------------------------------
// ---------------------------------------
// ---------------------------------------
// ---------------------------------------
// ---------------------------------------
// ---------------------------------------
// ---------------------------------------
// ---------------------------------------
// ---------------------------------------
// ---------------------------------------
// ---------------------------------------
// ---------------------------------------
// ---------------------------------------
// ---------------------------------------
// ---------------------------------------
// ---------------------------------------
// ---------------------------------------
// ---------------------------------------
// ---------------------------------------
// ---------------------------------------
// ---------------------------------------
// ---------------------------------------








// import { getItem, setItem, getEventsList, createEvent, updateEvent, serverUrl, deleteEvent } from '../common/storage.js';
// import shmoment from '../common/shmoment.js';
// import { openPopup, closePopup } from '../common/popup.js';

// const weekElem = document.querySelector('.calendar__week');
// const deleteEventBtn = document.querySelector('.delete-event-btn');

// const handleEventClick = (event) => {
//   // если произошел клик по событию, то нужно паказать попап с кнопкой удаления
//   // установите eventIdToDelete с id события в storage
//   const target = event.target.closest('.event');
//   if (!target) {
//     return;
//   }
//   openPopup(event.clientX, event.clientY);
//   setItem('eventIdToDelete', target.dataset.eventId);
// };

// function removeEventsFromCalendar() {
//   // f-ция для удаления всех событий с календаря
//   const eventsElems = document.querySelectorAll('.event');
//   if (eventsElems) {
//     eventsElems.forEach(eventElem => eventElem.remove());
//   }
// }

// const createEventElement = (event) => {
//   // ф-ция создает DOM элемент события
//   // событие должно позиционироваться абсолютно внутри нужной ячейки времени внутри дня
//   // нужно добавить id события в дата атрибут
//   // здесь для создания DOM элемента события используйте document.createElement

//   const { start, end, title, id, description  } = event;
//   const startDate = new Date(start);
//   const endDate = new Date(end);

//   const eventElem = document.createElement('div');
//   eventElem.dataset.eventId = id;
//   eventElem.style.top = startDate.getMinutes() + 'px';
//   let eventHeight = end - start;
//   eventHeight /= 60000;

//   eventHeight = Math.max(eventHeight, 100);
//   eventElem.style.height = eventHeight.toFixed() + 'px';
//   eventElem.classList.add('event');

//   const eventTitleElem = document.createElement('div');
//   eventTitleElem.textContent = title;
//   eventTitleElem.classList.add('event__title');

//   const eventTimeElem = document.createElement('div');
//   eventTimeElem.textContent = `${startDate.getHours()}:${startDate.getMinutes()} - ${endDate.getHours()}:${endDate.getMinutes()}`;
//   eventTimeElem.classList.add('event__time');
  
//   const eventDescriptionElem = document.createElement('div');
//   eventDescriptionElem.textContent = description;
//   eventDescriptionElem.classList.add('event__description');
  
//   eventElem.append(eventTitleElem, eventTimeElem, eventDescriptionElem);
//   return eventElem;
// };

// // export const renderEvents = () => {
// //   // достаем из storage все события и дату понедельника отображаемой недели
// //   // фильтруем события, оставляем только те, что входят в текущую неделю
// //   // создаем для них DOM элементы с помощью createEventElement
// //   // для каждого события находим на странице временную ячейку (.calendar__time-slot)
// //   // и вставляем туда событие
// //   // каждый день и временная ячейка должно содержать дата атрибуты, по которым можно будет найти нужную временную ячейку для события
// //   // не забудьте удалить с календаря старые события перед добавлением новых
// //   removeEventsFromCalendar();
// //   const events = getItem('events') || [];
// //   events
// //     .forEach(event => {
// //       const { start } = event;
// //       const startDate = new Date(start);
// //       const eventElem = createEventElement(event);
// //       const slotElem = document.querySelector(
// //         `.calendar__day[data-day="${startDate.getDate()}"] .calendar__time-slot[data-time="${startDate.getHours()}"]`
// //       );
// //       slotElem.append(eventElem);
// //     });
// // };

// export const renderEvents = async () => {
//   removeEventsFromCalendar();
//     const events = await getEventsList(serverUrl); // Fetch events from the server
//     events.forEach(event => {
//       const { start } = event;
//       const startDate = new Date(start);
//       const eventElem = createEventElement(event);
//       const slotElem = document.querySelector(
//         `.calendar__day[data-day="${startDate.getDate()}"] .calendar__time-slot[data-time="${startDate.getHours()}"]`
//       );
//       slotElem.append(eventElem);
//     });
// };

// // function onDeleteEvent() {
// //   const events = getItem('events');
// //   const eventIdToDelete = getItem('eventIdToDelete');
// //   const index = events.findIndex(event => String(event.id) === String(eventIdToDelete));

// //   events.splice(index, 1);
  
// //   setItem('events', events);
// //   setItem('eventIdToDelete', null);
// //   closePopup();
// //   renderEvents();
// // }

// function onDeleteEvent() {
//   const eventIdToDelete = getItem('eventIdToDelete');

//   deleteEvent(eventIdToDelete)
//     .then(() => {
//       const events = getItem('events');
//       const index = events.findIndex(event => String(event.id) === String(eventIdToDelete));
//       events.splice(index, 1);

//       setItem('events', events);
//       setItem('eventIdToDelete', null);
//       closePopup();
//       renderEvents();
//     })
// }

// deleteEventBtn.addEventListener('click', onDeleteEvent);

// weekElem.addEventListener('click', handleEventClick);
