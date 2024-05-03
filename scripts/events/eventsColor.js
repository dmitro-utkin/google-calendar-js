import { getItem, updateEventColor } from '../common/storage.js';
import { renderEvents } from './events.js';

// отримуємо всі кнопки кольору
export const handleColorButtonClick = () => {
  const colorButtons = document.querySelectorAll('.colors__item');

  // додаємо обробник помість до кожної кнопки
  colorButtons.forEach(button => {
    button.addEventListener('click', event => {
      // отримуємо колір кнопки
      const color = getComputedStyle(event.target).backgroundColor;

      // отримуємо id події
      const eventId = getItem('eventIdToDelete');

      // оновлюємо колір події
      updateEventColor(+eventId, color)
        .then(() => {
          const eventsToUpdate = document.querySelectorAll(
            `.event[data-event-id=" ${eventId} "]`
          );
          eventsToUpdate.forEach(eventToUpdate => {
            eventToUpdate.style.backgroundColor = color;
            
            // Check if the color is 'yellow' or 'green'
            eventToUpdate.style.color = selectedColorId === '#ffffff' ? '#000000' : '#ffffff';
          });
          renderEvents();
        })
        .catch(error => {
          console.error('Failed to update the event color:', error);
        });
    });
  });
};