import { getItem, setItem } from "../common/storage.js";
import { renderEvents } from "./events.js";
import { getDateTime } from "../common/time.utils.js";
import { closeModal } from "../common/modal.js";

const eventFormElem = document.querySelector(".event-form");
const closeEventFormBtn = document.querySelector(".create-event__close-btn");

const eventFormFields = document.querySelectorAll(
  ".event-form input, .event-form textarea"
);
function clearEventForm() {
  eventFormFields.forEach((field) => (field.value = ""));
}

function onCloseEventForm() {
  // здесь нужно закрыть модальное окно и очистить форму
  const modal = document.querySelector(".modal");

  modal.classList.add("hidden");
  clearEventForm();
}

function onCreateEvent(event) {
  // предотвращаем отправку формы
  event.preventDefault();

  // получаем данные из формы
  const formData = new FormData(event.target);

  // извлекаем значения из формы
  const title = formData.get("title");
  const description = formData.get("description");
  const startDate = formData.get("date");
  const startTime = formData.get("startTime");
  const endTime = formData.get("endTime");

  // создаем дату и время начала и конца события
  const startDateTime = getDateTime(startDate, startTime);
  const endDateTime = getDateTime(startDate, endTime);

  // создаем новое событие
  const newEvent = {
    id: Math.random().toString(36).substr(2, 9),
    start: startDateTime,
    end: endDateTime,
    title,
    description,
  };

  // получаем события из localStorage
  const events = JSON.parse(localStorage.getItem("events") || "[]");

  // добавляем новое событие к имеющимся
  events.push(newEvent);

  // сохраняем обновленный список событий в localStorage
  localStorage.setItem("events", JSON.stringify(events));

  // закрываем модальное окно
  closeModal();

  // перерисовываем календарь
  renderEvents();
}



export function initEventForm() {
  // подпишитесь на сабмит формы и на закрытие формы
    // отримуємо форму
    const form = document.querySelector('.event-form');

    // подписуємося на подію submit форми
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      onCreateEvent(event);
    });

    closeEventFormBtn.addEventListener('click', () => {
      onCloseEventForm();
    });
}
