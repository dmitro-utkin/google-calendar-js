import { getItem } from '../common/storage.js';
import { updateEventColor } from '../common/gateways.js';
import { renderEvents } from './events.js';
import { closePopup } from "../common/popup.js";

export const handleColorButtonClick = () => {
  const colorButtons = document.querySelectorAll('.colors__item');

  const onClick = (event) => {
    const eventId = getItem('eventIdToDelete');
    const style = getComputedStyle(event.target);
    const color = style.backgroundColor;

    updateEventColor(+eventId, color)
      .then(() => {
        const eventsToUpdate = document.querySelectorAll(
          `.event[data-event-id="${eventId}"]`
        );
        eventsToUpdate.forEach(eventToUpdate => {
          eventToUpdate.style.setProperty('background-color', color);
        });
        closePopup();        
        renderEvents();
      })
      .catch(error => {
        console.error('Failed to update the event color:', error);
      });
  };

  colorButtons.forEach(button => button.addEventListener('click', onClick));
};


