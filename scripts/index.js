import { renderTimescale } from './calendar/timescale.js';
import { renderWeek } from './calendar/calendar.js';
import { renderHeader } from './calendar/header.js';
import { initNavigation } from './header/navigation.js';
import { initEventForm } from './events/createEvent.js';
import { timeLine } from './calendar/timeline.js';
import { handleColorButtonClick } from './events/eventsColor.js';


document.addEventListener('DOMContentLoaded', () => {
  renderTimescale();
  renderWeek();
  renderHeader();
  initNavigation()
  initEventForm();
  timeLine();
  handleColorButtonClick();
});
