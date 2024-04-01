import { getItem, setItem } from "../common/storage.js";
import { renderWeek } from "../calendar/calendar.js";
import { renderHeader } from "../calendar/header.js";
import { getStartOfWeek, getDisplayedMonth } from "../common/time.utils.js";

const navElem = document.querySelector(".navigation");
const displayedMonthElem = document.querySelector(
  ".navigation__displayed-month"
);

function renderCurrentMonth() {
  // отрисовать месяц, к которому относиться текущая неделя (getDisplayedMonth)
  // вставить в .navigation__displayed-month
  const displayedWeekStart = getItem("displayedWeekStart");
  const displayedMonth = getDisplayedMonth(displayedWeekStart);
  displayedMonthElem.textContent = displayedMonth;
}

const onChangeWeek = (event) => {
  // console.log('Start of onChangeWeek function');
  // при переключении недели обновите displayedWeekStart в storage
  // и перерисуйте все необходимые элементы страницы (renderHeader, renderWeek, renderCurrentMonth)
  const buttonElem = event.target.closest("button");
  const {direction} = buttonElem.dataset;
  // console.log('direction', direction)
  let newDisplayedWeekStart;
  
  if (direction === "next" || direction === "prev") {
    const displayedWeekStart = new Date(getItem("displayedWeekStart"));
    newDisplayedWeekStart = new Date(displayedWeekStart);
    
    if (direction === "next") {
      newDisplayedWeekStart.setDate(displayedWeekStart.getDate() + 7);
    } else if (direction === "prev") {
      newDisplayedWeekStart.setDate(displayedWeekStart.getDate() - 7);
    }
    
  } else if (direction === "today") {
    newDisplayedWeekStart = getStartOfWeek(new Date());
  }
  
  setItem("displayedWeekStart", newDisplayedWeekStart);
  // console.log('New Displayed Week Start:', newDisplayedWeekStart);

  // console.log('Updated `displayedWeekStart` in storage');
  renderHeader();
  // console.log('Header re-rendered');
  renderWeek();
  // console.log('Week re-rendered');
  renderCurrentMonth();
  // console.log('Current month re-rendered');

  // console.log('End of onChangeWeek function');
};



export const initNavigation = () => {
  renderCurrentMonth();
  navElem.addEventListener("click", onChangeWeek);
};
