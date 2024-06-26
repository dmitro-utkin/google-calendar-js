import { getItem } from '../common/storage.js';
import { generateWeekRange, daysOfWeek } from '../common/utils.js';
import { openModal } from '../common/modal.js';

import { handleCreate } from '../events/createEvent.js';

const formSubmitBtn = document.querySelector('.event-form__submit-btn');

export const renderHeader = () => {
  const displayedWeekStart = getItem('displayedWeekStart');
  const weekDays = generateWeekRange(displayedWeekStart);
  let weekHTML = '';

  const today = new Date();

  weekDays.forEach(day => {
    const dayOfWeek = daysOfWeek[day.getDay()];
    const dayOfMonth = day.getDate();
    const isToday = day.toDateString() === today.toDateString();
    const todayNameClass = isToday ? 'today-name' : '';
    const todayDayClass = isToday ? 'today-number' : '';

    weekHTML += `<div class="calendar__day-label day-label">
        <span class="day-label__day-name ${todayNameClass}">${dayOfWeek}</span>
        <span class="day-label__day-number ${todayDayClass}">${dayOfMonth}</span>
    </div>`;
  });
  document.querySelector('.calendar__header').innerHTML = weekHTML;
};

document.querySelector('.create-event-btn').addEventListener('click', () => {
  openModal();
  formSubmitBtn.textContent = 'Create';
  formSubmitBtn.addEventListener('click', handleCreate, { once: true });
});
