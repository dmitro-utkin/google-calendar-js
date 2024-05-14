import { getItem } from "../common/storage.js";
import { generateWeekRange } from "../common/time.utils.js";
import { renderEvents } from "../events/events.js";
import { createNumbersArray } from "../common/createNumbersArray.js";

const generateDay = (day) => {
  const hoursOfDay = createNumbersArray(0, 23)
    .map(
      timeSlot =>
        `<div class="calendar__time-slot"
        data-time="${timeSlot}">   
          </div>`
    )
    .join('');
  return hoursOfDay;
};

export const renderWeek = () => {
  const getWeekElem = document.querySelector('.calendar__week');
  const startDate = getItem('displayedWeekStart');
  const daysList = generateWeekRange(startDate);
  const dayTemplateString = generateDay();

  const result = daysList.map(day => {
    const newDivForDay = document.createElement('div');
    newDivForDay.classList.add('calendar__day');
    newDivForDay.dataset.day = day.getDate();
    newDivForDay.dataset.month = day.getMonth() + 1;
    newDivForDay.dataset.year = day.getFullYear();

    const newSlots = createNumbersArray(0, 23).map(timeNumber => {
      const newTimeSlotEL = document.createElement('div');
      newTimeSlotEL.classList.add('calendar__time-slot');
      newTimeSlotEL.setAttribute('data-time', timeNumber);
      newTimeSlotEL.setAttribute('data-day', day.getDate());
      newTimeSlotEL.setAttribute('data-month', day.getMonth() + 1);
      newTimeSlotEL.setAttribute('data-year', day.getFullYear());

      newTimeSlotEL.innerText = ``;
      return newTimeSlotEL;
    });

    newDivForDay.append(...newSlots);
    return newDivForDay;
  });

  getWeekElem.innerHTML = '';
  getWeekElem.prepend(...result);
  renderEvents();
};
