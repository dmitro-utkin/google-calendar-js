export const timeLine = () => {
  console.log('timeline fn called');

  const curTimeEl = document.querySelector('.time-line');
  const timeSlots = document.querySelectorAll('.calendar__time-slot');

  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();
  const currentDay = currentTime.getDate();

  console.log('current hour', currentHour);
  console.log('current minute', currentMinute);
  console.log('current day', currentDay);

  curTimeEl.dataset.time = currentHour;
  curTimeEl.dataset.day = currentDay;
  curTimeEl.style.top = `${currentMinute}px`;

  let selectedIndex = -1;

  timeSlots.forEach((slot, index) => {
    const slotTime = parseInt(slot.dataset.time, 10);
    const slotDay = parseInt(slot.parentElement.dataset.day, 10);

    console.log('slot', slot);
    console.log('slot time', slotTime);
    console.log('slot day', slotDay);

    if (slotTime === currentHour && slotDay === currentDay) {
      selectedIndex = index;
    }
  });

  console.log('selected index', selectedIndex);

  if (selectedIndex !== -1) {
    console.log('appending to slot', selectedIndex);
    timeSlots[selectedIndex].append(curTimeEl);
  }
};

