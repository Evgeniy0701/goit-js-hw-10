// Напиши скрипт, який після сабміту форми створює проміс.
//  В середині колбека цього промісу через вказану користувачем кількість мілісекунд
//  проміс має виконуватися(при fulfilled) або відхилятися(при rejected),
//     залежно від обраної опції в радіокнопках.Значенням промісу,
//     яке передається як аргумент у методи resolve / reject,
//         має бути значення затримки в мілісекундах.

// Створений проміс треба опрацювати у відповідних для вдалого/невдалого виконання методах.

// Якщо проміс виконується вдало, виводь у консоль наступний рядок,
//     де delay — це значення затримки виклику промісу в мілісекундах.

// `✅ Fulfilled promise in ${delay}ms`

// Якщо проміс буде відхилено, то виводь у консоль наступний рядок,
// де delay — це значення затримки промісу в мілісекундах.

// `❌ Rejected promise in ${delay}ms`

import { Notify } from "izitoast";


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}


const formElement = document.querySelector("#promise-form");

formElement.addEventListener("submit", (event) => {
  event.preventDefault();

  const amount = Number(event.target.elements.amount.value);
  const delay = Number(event.target.elements.delay.value);
  const step = Number(event.target.elements.step.value);

  let currentDelay = delay;

  for (let i = 1; i <= amount; i++) {
    createPromise(i, currentDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Обіцянка виконана: позиція ${position}, затримка ${delay} мс`);
      })
      .catch(({ position, delay }) => {
        Notify.error(`❌ Обіцянка відхилена: позиція ${position}, затримка ${delay} мс`);
      });

    currentDelay += step; 
  }
});
