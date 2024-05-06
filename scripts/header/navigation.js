import { getItem, setItem } from "../common/storage.js";
import { renderWeek } from "../calendar/calendar.js";
import { renderHeader } from "../calendar/header.js";
import { getStartOfWeek, getDisplayedMonth } from "../common/time.utils.js";
import { timeLine } from '../calendar/timeline.js';



const navElem = document.querySelector(".navigation");
const displayedMonthElem = document.querySelector(".navigation__displayed-month");

function renderCurrentMonth() {
  displayedMonthElem.innerHTML = getDisplayedMonth(getItem('displayedWeekStart'));
}

const onChangeWeek = (event) => {
  const buttonElem = event.target.closest("button");
  const {direction} = buttonElem.dataset;
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