import { getItem, setItem } from "../common/storage.js";
import { renderWeek } from "../calendar/calendar.js";
import { renderHeader } from "../calendar/header.js";
import { getStartOfWeek, getDisplayedMonth } from "../common/utils.js";
import { timeLine } from '../calendar/timeline.js';



const navElem = document.querySelector(".navigation");
const displayedMonthElem = document.querySelector(".navigation__displayed-month");

const renderCurrentMonth = () => {
  displayedMonthElem.innerHTML = getDisplayedMonth(getItem('displayedWeekStart'));
};

const onChangeWeek = (event) => {
  const { direction } = event.target.closest("button").dataset;
  const displayedWeekStart = new Date(getItem("displayedWeekStart"));
  let newDisplayedWeekStart = new Date(displayedWeekStart);

  if (direction === "next") {
    newDisplayedWeekStart.setDate(displayedWeekStart.getDate() + 7);
  } else if (direction === "prev") {
    newDisplayedWeekStart.setDate(displayedWeekStart.getDate() - 7);
  } else if (direction === "today") {
    newDisplayedWeekStart = getStartOfWeek(new Date());
  }

  setItem("displayedWeekStart", newDisplayedWeekStart);
  renderHeader();
  renderWeek();
  renderCurrentMonth();
  timeLine();
};

export const initNavigation = () => {
  
  timeLine();
  renderCurrentMonth();
  navElem.addEventListener("click", onChangeWeek);
};
navElem.addEventListener('click', onChangeWeek);