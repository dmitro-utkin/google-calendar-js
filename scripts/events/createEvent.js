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
  // задача этой ф-ции только добавить новое событие в массив событий, что хранится в storage
  // создавать или менять DOM элементы здесь не нужно. Этим займутся другие ф-ции
  // при подтверждении формы нужно считать данные с формы
  // с формы вы получите поля date, startTime, endTime, title, description
  // на основе полей date, startTime, endTime нужно посчитать дату начала и окончания события
  // date, startTime, endTime - строки. Вам нужно с помощью getDateTime из утилит посчитать start и end объекта события
  // полученное событие добавляем в массив событий, что хранится в storage
  // закрываем форму
  // и запускаем перерисовку событий с помощью renderEvents
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
