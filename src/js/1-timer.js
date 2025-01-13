import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from "izitoast";

// Ініціалізація flatpickr
const inputElement = document.querySelector("#datetime-picker");
const startButton = document.querySelector("#start-button");
const timerDisplay = document.querySelector("#timer-display");

let selectedTime = null;
let intervalId = null;


flatpickr(inputElement, {
  enableTime: true,
  dateFormat: "Y-m-d H:i",
  onClose(selectedDates) {
    selectedTime = selectedDates[0].getTime();
    if (selectedTime <= Date.now()) {
      Notify.error("Будь ласка, оберіть дату у майбутньому");
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
});


function updateTimerDisplay() {
  const currentTime = Date.now();
  const timeDiff = selectedTime - currentTime;

  if (timeDiff <= 0) {
    clearInterval(intervalId);
    Notify.success("Таймер завершився!");
    timerDisplay.textContent = "00:00:00";
    return;
  }

  const hours = String(Math.floor((timeDiff / (1000 * 60 * 60)) % 24)).padStart(2, "0");
  const minutes = String(Math.floor((timeDiff / (1000 * 60)) % 60)).padStart(2, "0");
  const seconds = String(Math.floor((timeDiff / 1000) % 60)).padStart(2, "0");

  timerDisplay.textContent = `${hours}:${minutes}:${seconds}`;
}


startButton.addEventListener("click", () => {
  if (intervalId) {
    clearInterval(intervalId); 
  }

  updateTimerDisplay(); 
  intervalId = setInterval(updateTimerDisplay, 1000); 
});
