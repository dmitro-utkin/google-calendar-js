export const serverUrl =
  'https://662630a1052332d55321f809.mockapi.io/api/v1/events';
export const storage = {
  eventIdToDelete: null,
  displayedWeekStart: null,
  events: []
};
export const setItem = (key, value) => Object.assign(storage, { [key]: value });
export const getItem = (key) => storage[key];
const mapEvents = (events) =>
  events.map(({ id, ...event }) => ({ ...event, id: id }));

export const getEventsList = () =>
  fetch(serverUrl)
    .then((res) => res.json())
    .then((events) => mapEvents(events));

export const createEvent = (event) =>
  fetch(serverUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(event)
  });

export async function updateEvent(serverUrl, eventIdToUpdate) {
  const formData = new FormData(document.querySelector('.event-form'));
  const response = await fetch(`${serverUrl}/${eventIdToUpdate}`, {
    method: 'PUT',
    body: formData
  });
  return response;
}

export const deleteEvent = (id) =>
  fetch(`${serverUrl}/${id}`, {
    method: 'DELETE'
  });

export const updateEventColor = (eventId, colorId) => {
  return fetch(`${serverUrl}/${eventId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ colorId })
  });
};

// -----------------------------
// -----------------------------
// -----------------------------
// -----------------------------
// -----------------------------
// -----------------------------
// -----------------------------
// -----------------------------
// -----------------------------
// -----------------------------
// -----------------------------
// -----------------------------
// -----------------------------
// -----------------------------
// -----------------------------
// -----------------------------
// -----------------------------
// -----------------------------

// // export const storage = {

//   //   // используется для удаления события
//   //   eventIdToDelete: null,
//   //   // хранит дату понедельника той отображаемой недели
//   //   displayedWeekStart: null,
//   //   // хранит массив всех событий
//   //   events: [],
//   //   // это все данные, которые вам нужно хранить для работы приложения
//   // };
//   // console.log(storage)

//   export const setItem = (key, value) => localStorage.setItem(key, JSON.stringify(value));
// // export const setItem = (key, value) => {
// //     // ф-ция должна устанавливать значения в объект storage
// //     // Object.assign(storage, { [key]: value });
// //   };

// // export const getItem = (key) => storage[key];
// export const getItem = (key) => JSON.parse(localStorage.getItem(key));
//   // ф-ция должна возвращать по ключу значения из объекта storage

// // пример объекта события
// const eventExample = {
//   id: 0.7520027086457333, // id понадобится для работы с событиями
//   title: 'Title',
//   description: 'Some description',
//   start: new Date('2020-03-17T01:10:00.000Z'),
//   end: new Date('2020-03-17T04:30:00.000Z'),
// };
