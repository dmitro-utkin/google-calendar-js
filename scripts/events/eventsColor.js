import { getItem, updateEventColor } from '../common/storage.js';
import { renderEvents } from './events.js';

// Optimization: Cache the event ID and computed styles
let eventId, color, textColor;
export const handleColorButtonClick = () => {
  const colorButtons = document.querySelectorAll('.colors__item');

  const onClick = (event) => {
    const eventId = getItem('eventIdToDelete');
    const style = getComputedStyle(event.target);
    const color = style.backgroundColor;
    let textColor = style.color;
    if (color === 'rgb(21, 0, 255)' || color === 'rgb(255, 0, 0)') {
      textColor = 'rgb(255, 255, 255)';
    }

    updateEventColor(+eventId, color, textColor)
      .then(() => {
        const eventsToUpdate = document.querySelectorAll(
          `.event[data-event-id="${eventId}"]`
        );
        eventsToUpdate.forEach(eventToUpdate => {
          eventToUpdate.style.setProperty('background-color', color);
          eventToUpdate.style.setProperty('color', textColor);
        });
        renderEvents();
      })
      .catch(error => {
        console.error('Failed to update the event color:', error);
      });
  };

  colorButtons.forEach(button => button.addEventListener('click', onClick));
};


