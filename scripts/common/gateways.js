export const serverUrl = 'https://662630a1052332d55321f809.mockapi.io/api/v1/events';


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