import { getStartOfWeek } from './utils.js';

export const storage = {
  eventIdToDelete: null,
  displayedWeekStart: getStartOfWeek(new Date()),
  events: [],
};

export const setItem = (key, value) => Object.assign(storage, { [key]: value });
export const getItem = key => storage[key];
