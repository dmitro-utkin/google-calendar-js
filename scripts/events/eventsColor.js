import { getItem, updateEventColor } from '../common/storage.js';
import { renderEvents } from './events.js';

// отримуємо всі кнопки кольору
export const handleColorButtonClick = () => {
  const colorButtons = document.querySelectorAll('.colors__item');

  // Add an event listener to each color button
  colorButtons.forEach(button => {
    button.addEventListener('click', event => {
      // Obtain the color of the button
      const color = getComputedStyle(event.target).backgroundColor;
      const textColor = getComputedStyle(event.target).color;
      // Obtain the event ID
      const eventId = getItem('eventIdToDelete');

      // Update the event color
      updateEventColor(+eventId, color, textColor)
        .then(() => {
          const eventsToUpdate = document.querySelectorAll(
            `.event[data-event-id="${eventId}"]`
          );
          eventsToUpdate.forEach(eventToUpdate => {
            eventToUpdate.style.backgroundColor = color;
            // Set the text color based on the background color
            if (color === 'rgb(255, 238, 1)' || color === 'rgb(0, 200, 0)') {
              eventToUpdate.style.color = '#000000'; // Set text color to black for yellow and green backgrounds
            } else {
              eventToUpdate.style.color = '#ffffff'; // Set text color to white for other backgrounds
            }
          });
          renderEvents();
        })
        .catch(error => {
          console.error('Failed to update the event color:', error);
        });
    });
  });
};