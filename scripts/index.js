import { renderTimescale } from './calendar/timescale.js';
import { renderWeek } from './calendar/calendar.js';
import { renderHeader } from './calendar/header.js';
import { initNavigation } from './header/navigation.js';
import { timeLine } from './calendar/timeline.js';
import { initEventActions } from './events/events.js';

document.addEventListener('DOMContentLoaded', () => {
  renderTimescale();
  renderWeek();
  renderHeader();
  initNavigation();
  timeLine();
  initEventActions();
});
