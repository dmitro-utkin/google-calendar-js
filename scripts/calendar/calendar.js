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
  const startDate = getItem('displayedWeekStart');
  const daysList = generateWeekRange(startDate);
  const dayTemplateString = generateDay();
  const weekElementString = daysList
    .map(day => `<div class="calendar__day" data-day="${day.getDate()}">${dayTemplateString}</div>`)
    .join('');
  document.querySelector('.calendar__week').innerHTML = weekElementString;
  renderEvents();
};
