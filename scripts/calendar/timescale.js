import { createNumbersArray } from '../common/createNumbersArray.js';

// export const renderTimescale = () => {
//   // ф-ция должна генерировать разметку для боковой шкалы времени (24 часа)
//   // полученную разметку вставьте на страницу с помощью innerHTML в .calendar__time-scale
// };

export const renderTimescale = () => {
  let timescaleHTML = '';
  for(let i = 1; i <= 23; i++) {
      timescaleHTML += `
          <div class="time-slot">
              <span class="time-slot__time">${i}:00</span>
          </div>
      `;
  }
  document.querySelector('.calendar__time-scale').innerHTML = timescaleHTML;
};