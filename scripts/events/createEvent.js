import { getItem, setItem, createEvent } from "../common/storage.js";
import { renderEvents } from "./events.js";
import { getDateTime } from "../common/time.utils.js";
import { closeModal } from "../common/modal.js";

export const eventFormElem = document.querySelector(".event-form");
const closeEventFormBtn = document.querySelector(".create-event__close-btn");

function clearEventForm() {
  eventFormElem.reset();
}

function onCloseEventForm() {
  closeModal();
  clearEventForm();
}
async function onCreateEvent(event) {
  event.preventDefault();
  const formData = new FormData(eventFormElem);

  const title = formData.get('title');
  const description = formData.get('description');
  const date = formData.get('date');
  const startTime = formData.get('startTime');
  const endTime = formData.get('endTime');

  const start = getDateTime(date, startTime);
  const end = getDateTime(date, endTime);

  const eventDetails = {
    title,
    description,
    start,
    end,
    date,
  };

  const events = getItem('events') || [];

  const response = await createEvent(eventDetails);

  if (response.ok) {
    events.push(await response.json());
    setItem('events', events);
  } else {
    console.error('Failed to create event:', response.statusText);
  }

  onCloseEventForm();
  renderEvents();
}

export function initEventForm() {
  eventFormElem.addEventListener("submit", onCreateEvent);
  closeEventFormBtn.addEventListener("click", onCloseEventForm);
}