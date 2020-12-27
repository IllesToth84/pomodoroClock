document.addEventListener('DOMContentLoaded', () => {
  const stateContainer = document.querySelector('#state');
  const timeContainer = document.querySelector('#time');
  const breakContainer = document.querySelector('#break-length');
  const sessionContainer = document.querySelector('#session-length');
  let currentState = 'session'; // session or break
  let breakTime = 5 * 60;
  let sessionTime = 25 * 60;
  let timer = sessionTime;
  let interval = null;

  renderTime();
  renderBreak();
  renderSession();

  function startTimer() {
    interval = setInterval(() => {
      if (timer > 0) {
        --timer;
      } else {
        if (currentState === 'session') {
          timer = breakTime;
          currentState = 'break';
        } else {
          timer = sessionTime;
          currentState = 'session';
        }

        clearInterval(interval);
        interval = null;
      }

      renderTime();
    }, 1000);
  }

  function stopTimer() {
    clearInterval(interval);
    interval = null;
  }

  function toggleTimer() {
    if (interval) {
      stopTimer();
    } else {
      startTimer();
    }
  }

  function reset() {
    timer = sessionTime;
    renderTime();
  }

  function incrementBreak() {
    breakTime += 60;
    renderBreak();
  }

  function decrementBreak() {
    if (breakTime <= 1) return;
    breakTime -= 60;
    renderBreak();
  }

  function incrementSession() {
    sessionTime += 60;
    renderSession();
    if (!interval) {
      timer = sessionTime;
      renderTime();
    }
  }

  function decrementSession() {
    if (sessionTime <= 1) return;
    sessionTime -= 60;
    renderSession();
    if (!interval) {
      timer = sessionTime;
      renderTime();
    }
  }

  function renderBreak() {
    breakContainer.innerHTML = breakTime / 60;
  }

  function renderSession() {
    sessionContainer.innerHTML = sessionTime / 60;
  }

  function renderTime() {
    let minutes = Math.floor(timer / 60);
    minutes = minutes > 10 ? minutes : `0${minutes}`;
    let seconds = timer % 60;
    seconds = seconds > 10 ? seconds : `0${seconds}`;

    stateContainer.innerHTML = currentState;
    timeContainer.innerHTML = `${minutes}:${seconds}`;
  }

  document
    .querySelector('#break-decrement')
    .addEventListener('click', decrementBreak);
  document
    .querySelector('#break-increment')
    .addEventListener('click', incrementBreak);
  document
    .querySelector('#session-decrement')
    .addEventListener('click', decrementSession);
  document
    .querySelector('#session-increment')
    .addEventListener('click', incrementSession);
  document.querySelector('#start-stop').addEventListener('click', toggleTimer);
  document.querySelector('#reset').addEventListener('click', reset);
});
