export const serverUrl =
  'https://6666ad4da2f8516ff7a45a72.mockapi.io/api/v1/events';

export const getEventsList = () =>
  fetch(serverUrl)
    .then((res) => res.json())

export const createEvent = (event) =>
  fetch(serverUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(event)
  });

export const updateEvent = (serverUrl, eventIdToUpdate, data) => (
  fetch(`${serverUrl}/${eventIdToUpdate}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
);

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
