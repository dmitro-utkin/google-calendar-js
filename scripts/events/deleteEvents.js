import { getItem, setItem } from '../common/storage.js';
import { deleteEvent } from '../common/gateways.js';
import { closePopup } from '../common/popup.js';
import { renderEvents } from './events.js';

const deleteEventBtn = document.querySelector('.events-btn__delete-btn');

export const onDeleteEvent = async () => {
  const eventIdToDelete = getItem('eventIdToDelete');

  try {
    await deleteEvent(eventIdToDelete);
    const events = getItem('events');
    const filteredEvents = events.filter(
      (event) => String(event.id) !== String(eventIdToDelete)
    );
    setItem('events', filteredEvents);
    setItem('eventIdToDelete', null);
    closePopup();
    renderEvents();
  } catch (error) {
    console.error('Failed to delete the event:', error);
  }
};

deleteEventBtn.addEventListener('click', onDeleteEvent);