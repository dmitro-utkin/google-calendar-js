export const timeLine = () => {
  const existingTimeLine = document.querySelector('.time-line');
  if (existingTimeLine) {
    existingTimeLine.remove();
  }

  const curTimeEl = document.createElement('div');
  curTimeEl.className = 'time-line';

  const circleEl = document.createElement('div');
  circleEl.className = 'time-line__circle';
  curTimeEl.appendChild(circleEl);

  const rectangleEl = document.createElement('div');
  rectangleEl.className = 'time-line__rectangle';
  curTimeEl.appendChild(rectangleEl);
  const timeSlots = document.querySelectorAll('.calendar__time-slot');

  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();
  const currentDay = currentTime.getDate();
  const currentMonth = currentTime.getMonth() + 1;

  curTimeEl.dataset.time = currentHour;
  curTimeEl.dataset.day = currentDay;
  curTimeEl.style.left = '-3px';
  curTimeEl.style.top = `${currentMinute - 2}px`;

  let selectedIndex = -1;

  timeSlots.forEach((slot, index) => {
    const slotTime = parseInt(slot.dataset.time, 10);
    const slotDay = parseInt(slot.parentElement.dataset.day, 10);
    const slotMonth = parseInt(slot.parentElement.dataset.month, 10);

    if (slotTime === currentHour && slotDay === currentDay && slotMonth === currentMonth) {
      selectedIndex = index;
    }
  });

  if (selectedIndex !== -1) {
    timeSlots[selectedIndex].append(curTimeEl);
  }
};
