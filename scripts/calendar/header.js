import { getItem } from '../common/storage.js';
import { generateWeekRange } from '../common/time.utils.js';
import { openModal } from '../common/modal.js';

const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

export const renderHeader = () => {
  // на основе displayedWeekStart из storage с помощью generateWeekRange сформируйте массив дней текущей недели
  // на основе полученного массива сформируйте разметку в виде строки - 7 дней (день недели и число в месяце)
  // полученную разметку вставить на страницу с помощью innerHTML в .calendar__header
  // в дата атрибуте каждой ячейки должно хранить для какого часа эта ячейка
  const displayedWeekStart = getItem('displayedWeekStart');
    const weekDays = generateWeekRange(displayedWeekStart);
    let weekHTML = '';

    const today = new Date(); // Отримання поточної дати

    weekDays.forEach(day => {
        const dayOfWeek = daysOfWeek[day.getDay()];
        const dayOfMonth = day.getDate();

        const isToday = day.toDateString() === today.toDateString();
        const todayDayClass = isToday ? 'today' : ''; 
        const todayNameClass = isToday ? 'today-name' : ''; 

        weekHTML += `<div class="calendar__day-label day-label">
            <span class="day-label__day-name ${todayNameClass}">${dayOfWeek}</span>
            <span class="day-label__day-number  ${todayDayClass}">${dayOfMonth}</span>
        </div>`;
    });
    document.querySelector('.calendar__header').innerHTML = weekHTML;
    
};
renderHeader();

// при клике на кнопку "Create" открыть модальное окно с формой для создания события
// назначьте здесь обработчик
document.querySelector('.create-event-btn').addEventListener('click', openModal);