export const serverUrl =
  'https://6666ad4da2f8516ff7a45a72.mockapi.io/api/v1/events';

export const getEventsList = () =>
  fetch(serverUrl)
    .then((res) => res.json())

export const createEvent = (event) => {
  return fetch(serverUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(event)
  });
}
export const updateEvent = ( eventIdToUpdate, data) => {
  return fetch(`${serverUrl}/${eventIdToUpdate}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  })
};

export const deleteEvent = (eventIdToUpdate) =>
  fetch(`${serverUrl}/${eventIdToUpdate}`, {
    method: 'DELETE'
  });

export const updateEventColor = (eventIdToUpdate, color) => {
  return fetch(`${serverUrl}/${eventIdToUpdate}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ color })
  });
};