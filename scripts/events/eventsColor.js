import { getItem } from '../common/storage.js';
import { updateEventColor } from '../common/gateways.js';
import { renderEvents } from './events.js';
import { closePopup } from "../common/popup.js";

export const handleColorButtonClick = () => {
  const colorButtons = document.querySelectorAll('.colors__item');

  const onClick = (event) => {
    console.log('Color button clicked');

    const eventId = getItem('eventIdToDelete');
    const style = getComputedStyle(event.target);
    const color = style.backgroundColor;

    console.log('Event ID:', eventId);
    console.log('Color:', color);

    updateEventColor(+eventId, color)
      .then(() => {
        console.log('Event color updated successfully');

        const eventsToUpdate = document.querySelectorAll(
          `.event[data-event-id="${eventId}"]`
        );
        eventsToUpdate.forEach(eventToUpdate => {
          eventToUpdate.style.setProperty('background-color', color);
        });
        console.log('Events updated:', eventsToUpdate);

        closePopup();
        console.log('Popup closed');

        renderEvents();
        console.log('Events rendered');
      })
      .catch(error => {
        console.error('Failed to update the event color:', error);
      });
  };

  colorButtons.forEach(button => button.addEventListener('click', onClick));
};


