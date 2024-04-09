// export const timeLine = () => {
//   const getCurTimeEl = document.querySelector('.current-time');
//   const getTimeSlotsArr = document.querySelectorAll('.calendar__time-slot');
//   const curHour = new Date().getHours();
//   const curMinutes = new Date().getMinutes();

//   getCurTimeEl.dataset.time = curHour;
//   getCurTimeEl.dataset.day = new Date().getDay();
//   getCurTimeEl.style.left = '-5px';
//   getCurTimeEl.style.top = `${curMinutes}px`;
  
//   [...getTimeSlotsArr].find(slot => {
//     if (curHour === Number(slot.dataset.time)) {
//       slot.append(getCurTimeEl);
//       return true;
//     }
//   });
// };

