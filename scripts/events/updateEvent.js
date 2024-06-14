import { getItem } from '../common/storage.js';
import { updateEvent, serverUrl } from '../common/gateways.js';
import { closePopup } from '../common/popup.js';
import { openModal, closeModal } from '../common/modal.js';
import { getDateTime } from '../common/utils.js';


const editEventBtn = document.querySelector('.events-btn__edit-btn');

const fillForm = (event) => {
  const { title, description, start, end, date } = event;

  const titleInput = document.querySelector('input[name="title"]');
  const descriptionInput = document.querySelector(
    'textarea[name="description"]'
  );
  const dateInput = document.querySelector('input[name="date"]');
  const startTimeInput = document.querySelector('input[name="startTime"]');
  const endTimeInput = document.querySelector('input[name="endTime"]');

  const startTime = new Date(start).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });
  const endTime = new Date(end).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });

  titleInput.value = title;
  descriptionInput.value = description;
  dateInput.value = date;
  startTimeInput.value = startTime;
  endTimeInput.value = endTime;
};

export const onEventUpdate = async () => {
  const eventIdToUpdate = getItem('eventIdToDelete');

  const response = await fetch(`${serverUrl}/${eventIdToUpdate}`);
  const event = await response.json();
  closePopup();
  openModal();
  fillForm(event);

  const form = document.querySelector('.event-form');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const { startTime, endTime, date, ...rest } = Object.fromEntries(
      formData.entries()
    );

    const eventDetails = {
      ...rest,
      date,
      start: getDateTime(date, startTime),
      end: getDateTime(date, endTime)
    };

    const response = await updateEvent(eventIdToUpdate, {
      ...event,
      ...eventDetails
    });

    if (response.ok) {
      await renderEvents();
      closeModal();
    } else {
      console.error('Failed to update the event:', response.statusText);
    }
  });
};

editEventBtn.addEventListener('click', () => {
  onEventUpdate();
  document.querySelector('.event-form__edit-btn').textContent = 'Edit';
});
