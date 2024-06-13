import { getItem } from '../common/storage.js';
import { updateEventColor } from '../common/gateways.js';
import { renderEvents } from './events.js';
import { closePopup } from '../common/popup.js';

export const handleColorButtonClick = () => {
  const colorButtons = document.querySelectorAll('.colors__item');

  const onClick = async (event) => {
    const color = getComputedStyle(event.target).backgroundColor;
    const eventId = getItem('eventIdToDelete');

    try {
      await updateEventColor(+eventId, color);
      document
        .querySelectorAll(`.event[data-event-id="${eventId}"]`)
        .forEach((eventToUpdate) => {
          eventToUpdate.style.backgroundColor = color;
        });
    } catch (error) {
      console.error('Failed to update the event color:', error);
    } finally {
      closePopup();
      renderEvents();
    }
  };

  colorButtons.forEach((button) => button.addEventListener('click', onClick));
};
